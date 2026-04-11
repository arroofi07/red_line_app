<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import {
		getServiceImages,
		addServiceImage,
		deleteServiceImage,
		isFeaturedServiceSlug,
		FEATURED_SERVICES_STATIC,
		type ServiceImage
	} from '$lib/firebase/services';
	import { uploadContentImage } from '$lib/firebase/storage';

	const serviceId = $derived(page.params.id ?? '');
	const meta = $derived(
		isFeaturedServiceSlug(serviceId) ? FEATURED_SERVICES_STATIC[serviceId] : null
	);

	let galleryImages = $state<ServiceImage[]>([]);
	let uploadingGallery = $state(false);
	let galleryError = $state('');
	let confirmDeleteImageId = $state<string | null>(null);
	let deletingImageId = $state<string | null>(null);
	let loading = $state(true);
	let errors = $state<Record<string, string>>({});

	onMount(async () => {
		const id = page.params.id ?? '';
		if (!isFeaturedServiceSlug(id)) {
			loading = false;
			goto('/admin/services');
			return;
		}
		try {
			galleryImages = await getServiceImages(id);
		} catch {
			errors = { global: 'Gagal memuat galeri.' };
		} finally {
			loading = false;
		}
	});

	async function handleGalleryUpload(e: Event) {
		const input = e.target as HTMLInputElement;
		const files = input.files;
		if (!files || files.length === 0 || !isFeaturedServiceSlug(serviceId)) return;

		uploadingGallery = true;
		galleryError = '';

		try {
			for (const file of Array.from(files)) {
				if (!file.type.startsWith('image/')) continue;

				const imageUrl = await uploadContentImage(file);
				const newOrder = galleryImages.length;
				const id = await addServiceImage({
					serviceId,
					imageUrl,
					alt: file.name.replace(/\.[^.]+$/, ''),
					order: newOrder
				});
				galleryImages = [
					...galleryImages,
					{
						id,
						serviceId,
						imageUrl,
						alt: file.name.replace(/\.[^.]+$/, ''),
						order: newOrder,
						createdAt: { seconds: Date.now() / 1000 } as unknown as ServiceImage['createdAt']
					}
				];
			}
		} catch {
			galleryError = 'Gagal mengupload gambar. Coba lagi.';
		} finally {
			uploadingGallery = false;
			input.value = '';
		}
	}

	async function handleDeleteImage(img: ServiceImage) {
		if (confirmDeleteImageId !== img.id) {
			confirmDeleteImageId = img.id;
			return;
		}
		deletingImageId = img.id;
		confirmDeleteImageId = null;
		try {
			await deleteServiceImage(img.id);
			galleryImages = galleryImages.filter((g) => g.id !== img.id);
		} catch {
			galleryError = 'Gagal menghapus gambar.';
		} finally {
			deletingImageId = null;
		}
	}
</script>

<svelte:head>
	<title>{meta ? `${meta.title} — Galeri` : 'Galeri'} — Admin Redline</title>
</svelte:head>

<div class="page">
	<div class="page-header">
		<div>
			<a href="/admin/services" class="back-link">← Kembali ke galeri layanan</a>
			<h1 class="page-title">{meta ? meta.title : 'Galeri'}</h1>
			{#if meta}
				<p class="page-sub">{meta.subtitle}</p>
			{/if}
		</div>
	</div>

	{#if errors.global}
		<div class="alert-error">{errors.global}</div>
	{/if}

	{#if loading}
		<div class="loading-state">Memuat galeri...</div>
	{:else if meta}
		<div class="gallery-section">
			<div class="gallery-header">
				<div>
					<h2 class="gallery-title">Foto galeri</h2>
					<p class="gallery-sub">
						{galleryImages.length} foto · Setiap foto dikompres otomatis ke ~30–60KB. Tanpa foto dari
						admin, halaman publik memakai galeri bawaan.
					</p>
				</div>
				<label class="btn-upload" for="gallery-input">
					{uploadingGallery ? '⏳ Mengupload...' : '+ Tambah foto'}
				</label>
				<input
					id="gallery-input"
					type="file"
					accept="image/*"
					multiple
					onchange={handleGalleryUpload}
					disabled={uploadingGallery}
					class="sr-only"
				/>
			</div>

			{#if galleryError}
				<div class="alert-error">{galleryError}</div>
			{/if}

			{#if galleryImages.length === 0}
				<div class="gallery-empty">
					<p>Belum ada foto. Tambahkan foto agar tampil di halaman Services untuk layanan ini.</p>
				</div>
			{:else}
				<div class="gallery-grid">
					{#each galleryImages as img (img.id)}
						<div class="gallery-item">
							<div class="gallery-img-wrap">
								<img src={img.imageUrl} alt={img.alt} class="gallery-img" />
								<div class="gallery-overlay">
									<button
										type="button"
										class="gallery-delete-btn"
										class:confirm={confirmDeleteImageId === img.id}
										onclick={() => handleDeleteImage(img)}
										disabled={deletingImageId === img.id}
									>
										{#if deletingImageId === img.id}
											⏳
										{:else if confirmDeleteImageId === img.id}
											Yakin hapus?
										{:else}
											Hapus
										{/if}
									</button>
								</div>
							</div>
							<div class="gallery-meta">
								<span class="gallery-alt">{img.alt}</span>
								<span class="gallery-order">#{img.order}</span>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	.back-link {
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.4);
		text-decoration: none;
		display: inline-block;
		margin-bottom: 0.5rem;
		transition: color 0.2s;
	}
	.back-link:hover {
		color: #f87171;
	}
	.page-title {
		font-family: 'Bebas Neue', sans-serif;
		font-size: 2.25rem;
		color: white;
		margin: 0;
		letter-spacing: 0.04em;
	}
	.page-sub {
		color: rgba(255, 255, 255, 0.45);
		font-size: 0.85rem;
		margin: 0.35rem 0 0;
	}

	.gallery-section {
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-radius: 1rem;
		padding: 1.5rem;
	}
	.gallery-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 1rem;
		margin-bottom: 1.25rem;
	}
	.gallery-title {
		font-family: 'Bebas Neue', sans-serif;
		font-size: 1.5rem;
		color: white;
		margin: 0;
		letter-spacing: 0.04em;
	}
	.gallery-sub {
		color: rgba(255, 255, 255, 0.4);
		font-size: 0.8rem;
		margin: 0.25rem 0 0;
		max-width: 36rem;
		line-height: 1.45;
	}
	.btn-upload {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.55rem 1rem;
		background: #dc2626;
		color: white;
		border-radius: 0.625rem;
		font-weight: 600;
		font-size: 0.85rem;
		cursor: pointer;
		transition: all 0.2s;
	}
	.btn-upload:hover {
		background: #b91c1c;
		transform: translateY(-1px);
	}

	.gallery-empty {
		padding: 2rem;
		text-align: center;
		color: rgba(255, 255, 255, 0.3);
		border: 2px dashed rgba(255, 255, 255, 0.08);
		border-radius: 0.75rem;
	}
	.gallery-empty p {
		margin: 0;
		font-size: 0.85rem;
	}

	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
		gap: 1rem;
	}
	.gallery-item {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-radius: 0.75rem;
		overflow: hidden;
	}
	.gallery-img-wrap {
		position: relative;
	}
	.gallery-img {
		width: 100%;
		aspect-ratio: 4/3;
		object-fit: cover;
		display: block;
	}
	.gallery-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 0.2s;
	}
	.gallery-img-wrap:hover .gallery-overlay {
		opacity: 1;
	}
	.gallery-delete-btn {
		padding: 0.35rem 0.75rem;
		background: rgba(220, 38, 38, 0.8);
		color: white;
		border: none;
		border-radius: 0.375rem;
		font-size: 0.75rem;
		font-weight: 600;
		cursor: pointer;
		font-family: inherit;
		transition: background 0.15s;
	}
	.gallery-delete-btn:hover {
		background: #dc2626;
	}
	.gallery-delete-btn.confirm {
		background: #991b1b;
	}
	.gallery-delete-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.gallery-meta {
		padding: 0.5rem 0.625rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.gallery-alt {
		font-size: 0.7rem;
		color: rgba(255, 255, 255, 0.4);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 100px;
	}
	.gallery-order {
		font-size: 0.65rem;
		color: rgba(255, 255, 255, 0.25);
		font-weight: 600;
	}

	.alert-error {
		padding: 0.875rem 1rem;
		background: rgba(220, 38, 38, 0.12);
		border: 1px solid rgba(220, 38, 38, 0.25);
		border-radius: 0.75rem;
		color: #f87171;
		font-size: 0.875rem;
		margin-bottom: 1rem;
	}
	.loading-state {
		padding: 3rem;
		text-align: center;
		color: rgba(255, 255, 255, 0.4);
	}
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
	}
</style>
