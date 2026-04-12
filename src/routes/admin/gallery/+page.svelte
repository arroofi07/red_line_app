<script lang="ts">
	import { onMount } from 'svelte';
	import {
		getGalleryItems,
		addGalleryItem,
		updateGalleryItem,
		deleteGalleryItem,
		type GalleryItem
	} from '$lib/firebase/gallery';
	import { uploadContentImage } from '$lib/firebase/storage';

	let items = $state<GalleryItem[]>([]);
	let loading = $state(true);
	let uploading = $state(false);
	let uploadError = $state('');
	let confirmDeleteId = $state<string | null>(null);
	let deletingId = $state<string | null>(null);
	// Inline title editing
	let editingId = $state<string | null>(null);
	let editTitle = $state('');
	let savingId = $state<string | null>(null);

	onMount(async () => {
		await loadItems();
	});

	async function loadItems() {
		loading = true;
		try {
			items = await getGalleryItems();
		} catch {
			uploadError = 'Gagal memuat data galeri.';
		} finally {
			loading = false;
		}
	}

	async function handleUpload(e: Event) {
		const input = e.target as HTMLInputElement;
		const files = input.files;
		if (!files || files.length === 0) return;

		uploading = true;
		uploadError = '';

		try {
			for (const file of Array.from(files)) {
				if (!file.type.startsWith('image/')) continue;

				const imageUrl = await uploadContentImage(file);
				const title = file.name.replace(/\.[^.]+$/, '');
				const order = items.length;
				const id = await addGalleryItem({ imageUrl, title, order });
				items = [
					...items,
					{
						id,
						imageUrl,
						title,
						order,
						createdAt: { seconds: Date.now() / 1000 } as unknown as GalleryItem['createdAt']
					}
				];
			}
		} catch {
			uploadError = 'Gagal mengupload gambar. Coba lagi.';
		} finally {
			uploading = false;
			input.value = '';
		}
	}

	async function handleDelete(item: GalleryItem) {
		if (confirmDeleteId !== item.id) {
			confirmDeleteId = item.id;
			return;
		}
		deletingId = item.id;
		confirmDeleteId = null;
		try {
			await deleteGalleryItem(item.id);
			items = items.filter((i) => i.id !== item.id);
		} catch {
			uploadError = 'Gagal menghapus item.';
		} finally {
			deletingId = null;
		}
	}

	function startEdit(item: GalleryItem) {
		editingId = item.id;
		editTitle = item.title;
	}

	async function saveTitle(item: GalleryItem) {
		const trimmed = editTitle.trim();
		if (!trimmed || trimmed === item.title) {
			editingId = null;
			return;
		}
		savingId = item.id;
		try {
			await updateGalleryItem(item.id, { title: trimmed });
			items = items.map((i) => (i.id === item.id ? { ...i, title: trimmed } : i));
		} catch {
			uploadError = 'Gagal menyimpan judul.';
		} finally {
			savingId = null;
			editingId = null;
		}
	}

	function cancelEdit() {
		editingId = null;
	}

	function handleTitleKeydown(e: KeyboardEvent, item: GalleryItem) {
		if (e.key === 'Enter') saveTitle(item);
		if (e.key === 'Escape') cancelEdit();
	}

	// Dismiss confirm-delete on click elsewhere
	function handleGridClick() {
		confirmDeleteId = null;
	}
</script>

<svelte:head>
	<title>Galeri Landing Page — Admin Redline</title>
</svelte:head>

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
<div class="page" onclick={handleGridClick}>
	<div class="page-header">
		<div>
			<h1 class="page-title">Galeri Landing Page</h1>
			<p class="page-sub">
				Kelola foto yang tampil di bagian <strong>Event Gallery</strong> pada halaman utama.
				Jika belum ada foto di sini, halaman utama akan menampilkan gambar bawaan (logo klien).
				Setiap gambar dikompres otomatis ke ~30–60 KB.
			</p>
		</div>
		<div class="header-actions" onclick={(e) => e.stopPropagation()}>
			<label class="btn-upload" for="gallery-upload">
				{uploading ? '⏳ Mengupload...' : '+ Tambah Foto'}
			</label>
			<input
				id="gallery-upload"
				type="file"
				accept="image/*"
				multiple
				onchange={handleUpload}
				disabled={uploading}
				class="sr-only"
			/>
		</div>
	</div>

	{#if uploadError}
		<div class="alert-error">{uploadError}</div>
	{/if}

	<div class="info-box">
		<span class="info-icon">💡</span>
		<span>
			Gambar disimpan sebagai <strong>Base64</strong> di Firestore (hemat Firebase Storage).
			Gunakan <strong>logo atau foto klien berukuran kecil</strong> agar tidak cepat memenuhi kuota.
			Disarankan maksimal <strong>12 foto</strong>.
		</span>
	</div>

	{#if loading}
		<div class="skeleton-grid">
			{#each [0, 1, 2, 3, 4, 5] as i (i)}
				<div class="skeleton-card"></div>
			{/each}
		</div>
	{:else if items.length === 0}
		<div class="empty-state">
			<p>Belum ada foto. Klik <strong>+ Tambah Foto</strong> untuk mengunggah gambar.</p>
			<p class="empty-hint">Halaman utama saat ini menampilkan logo klien bawaan.</p>
		</div>
	{:else}
		<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
		<div class="gallery-grid" onclick={(e) => e.stopPropagation()}>
			{#each items as item (item.id)}
				<div class="gallery-card">
					<!-- Image -->
					<div class="img-wrap">
						<img src={item.imageUrl} alt={item.title} class="gallery-img" />
						<div class="img-overlay">
							<button
								type="button"
								class="btn-delete"
								class:confirm={confirmDeleteId === item.id}
								onclick={() => handleDelete(item)}
								disabled={deletingId === item.id}
							>
								{#if deletingId === item.id}
									⏳
								{:else if confirmDeleteId === item.id}
									Yakin hapus?
								{:else}
									Hapus
								{/if}
							</button>
						</div>
					</div>

					<!-- Title / edit -->
					<div class="card-meta">
						{#if editingId === item.id}
							<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
							<div class="edit-row" onclick={(e) => e.stopPropagation()}>
								<input
									type="text"
									class="edit-input"
									bind:value={editTitle}
									onkeydown={(e) => handleTitleKeydown(e, item)}
									disabled={savingId === item.id}
									autofocus
								/>
								<button
									type="button"
									class="btn-save"
									onclick={() => saveTitle(item)}
									disabled={savingId === item.id}
								>
									{savingId === item.id ? '⏳' : '✓'}
								</button>
								<button type="button" class="btn-cancel" onclick={cancelEdit}>✕</button>
							</div>
						{:else}
							<button
								type="button"
								class="title-btn"
								onclick={(e) => { e.stopPropagation(); startEdit(item); }}
								title="Klik untuk edit judul"
							>
								<span class="item-title">{item.title}</span>
								<span class="edit-hint">✏️</span>
							</button>
						{/if}
						<span class="order-badge">#{item.order + 1}</span>
					</div>
				</div>
			{/each}
		</div>
		<p class="count-hint">{items.length} foto terdaftar — ditampilkan di halaman utama.</p>
	{/if}
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	.page-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.page-title {
		font-family: 'Bebas Neue', sans-serif;
		font-size: 2.25rem;
		color: white;
		margin: 0 0 0.25rem;
		letter-spacing: 0.04em;
	}
	.page-sub {
		color: rgba(255, 255, 255, 0.4);
		font-size: 0.875rem;
		margin: 0;
		max-width: 44rem;
		line-height: 1.55;
	}
	.page-sub strong {
		color: rgba(255, 255, 255, 0.65);
	}

	.header-actions {
		flex-shrink: 0;
	}
	.btn-upload {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.6rem 1.1rem;
		background: #dc2626;
		color: white;
		border-radius: 0.625rem;
		font-weight: 600;
		font-size: 0.875rem;
		cursor: pointer;
		transition: all 0.2s;
	}
	.btn-upload:hover {
		background: #b91c1c;
		transform: translateY(-1px);
		box-shadow: 0 6px 16px rgba(220, 38, 38, 0.3);
	}

	.alert-error {
		padding: 0.875rem 1rem;
		background: rgba(220, 38, 38, 0.12);
		border: 1px solid rgba(220, 38, 38, 0.25);
		border-radius: 0.75rem;
		color: #f87171;
		font-size: 0.875rem;
	}

	.info-box {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		padding: 0.875rem 1rem;
		background: rgba(59, 130, 246, 0.08);
		border: 1px solid rgba(59, 130, 246, 0.18);
		border-radius: 0.75rem;
		font-size: 0.82rem;
		color: rgba(255, 255, 255, 0.5);
		line-height: 1.5;
	}
	.info-box strong {
		color: rgba(255, 255, 255, 0.75);
	}
	.info-icon {
		font-size: 1rem;
		flex-shrink: 0;
		margin-top: 1px;
	}

	/* Gallery Grid */
	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: 1rem;
	}
	.gallery-card {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-radius: 0.875rem;
		overflow: hidden;
		transition: border-color 0.2s;
	}
	.gallery-card:hover {
		border-color: rgba(255, 255, 255, 0.13);
	}
	.img-wrap {
		position: relative;
	}
	.gallery-img {
		width: 100%;
		aspect-ratio: 4 / 3;
		object-fit: contain;
		background: rgba(255, 255, 255, 0.03);
		display: block;
		padding: 0.75rem;
	}
	.img-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.55);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 0.2s;
	}
	.img-wrap:hover .img-overlay {
		opacity: 1;
	}
	.btn-delete {
		padding: 0.35rem 0.8rem;
		background: rgba(220, 38, 38, 0.85);
		color: white;
		border: none;
		border-radius: 0.375rem;
		font-size: 0.75rem;
		font-weight: 600;
		cursor: pointer;
		font-family: inherit;
		transition: background 0.15s;
		white-space: nowrap;
	}
	.btn-delete:hover { background: #dc2626; }
	.btn-delete.confirm { background: #991b1b; }
	.btn-delete:disabled { opacity: 0.5; cursor: not-allowed; }

	/* Card meta / title editing */
	.card-meta {
		padding: 0.5rem 0.625rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.4rem;
	}
	.title-btn {
		display: flex;
		align-items: center;
		gap: 0.3rem;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		font-family: inherit;
		min-width: 0;
		flex: 1;
	}
	.item-title {
		font-size: 0.72rem;
		color: rgba(255, 255, 255, 0.5);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.edit-hint {
		font-size: 0.65rem;
		opacity: 0;
		transition: opacity 0.15s;
		flex-shrink: 0;
	}
	.title-btn:hover .edit-hint { opacity: 1; }
	.title-btn:hover .item-title { color: rgba(255, 255, 255, 0.75); }

	.edit-row {
		display: flex;
		align-items: center;
		gap: 0.3rem;
		flex: 1;
		min-width: 0;
	}
	.edit-input {
		flex: 1;
		min-width: 0;
		padding: 0.25rem 0.45rem;
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(220, 38, 38, 0.4);
		border-radius: 0.3rem;
		color: white;
		font-size: 0.72rem;
		font-family: inherit;
		outline: none;
	}
	.btn-save, .btn-cancel {
		background: none;
		border: none;
		cursor: pointer;
		font-size: 0.75rem;
		padding: 0.2rem 0.3rem;
		border-radius: 0.25rem;
		font-family: inherit;
		flex-shrink: 0;
	}
	.btn-save { color: #4ade80; }
	.btn-save:hover { background: rgba(74, 222, 128, 0.12); }
	.btn-cancel { color: rgba(255, 255, 255, 0.3); }
	.btn-cancel:hover { background: rgba(255, 255, 255, 0.07); }

	.order-badge {
		font-size: 0.62rem;
		color: rgba(255, 255, 255, 0.2);
		font-weight: 600;
		flex-shrink: 0;
	}

	/* Empty / count */
	.empty-state {
		padding: 3rem 2rem;
		text-align: center;
		color: rgba(255, 255, 255, 0.35);
		border: 2px dashed rgba(255, 255, 255, 0.08);
		border-radius: 1rem;
		font-size: 0.875rem;
	}
	.empty-state p { margin: 0 0 0.35rem; }
	.empty-state strong { color: rgba(255, 255, 255, 0.55); }
	.empty-hint { font-size: 0.78rem; color: rgba(255, 255, 255, 0.22); }

	.count-hint {
		font-size: 0.78rem;
		color: rgba(255, 255, 255, 0.25);
		margin: 0;
		text-align: right;
	}

	/* Skeleton */
	.skeleton-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: 1rem;
	}
	.skeleton-card {
		aspect-ratio: 4 / 3;
		border-radius: 0.875rem;
		background: linear-gradient(
			90deg,
			rgba(255, 255, 255, 0.04) 25%,
			rgba(255, 255, 255, 0.07) 50%,
			rgba(255, 255, 255, 0.04) 75%
		);
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite;
	}
	@keyframes shimmer {
		0% { background-position: 200% 0; }
		100% { background-position: -200% 0; }
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
	}
</style>
