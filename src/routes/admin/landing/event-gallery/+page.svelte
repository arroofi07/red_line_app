<script lang="ts">
	import { onMount } from 'svelte';
	import { getEvents, type EventItem } from '$lib/firebase/events';
	import { getLandingEventIds, setLandingEventIds } from '$lib/firebase/landing';

	let allEvents = $state<EventItem[]>([]);
	let selectedIds = $state<string[]>([]);
	let loading = $state(true);
	let saving = $state(false);
	let error = $state('');
	let successMsg = $state('');

	onMount(async () => {
		try {
			const [events, ids] = await Promise.all([getEvents(), getLandingEventIds('event-gallery')]);
			allEvents = events;
			selectedIds = ids;
		} catch {
			error = 'Gagal memuat data. Coba refresh halaman.';
		} finally {
			loading = false;
		}
	});

	function isSelected(id: string): boolean {
		return selectedIds.includes(id);
	}

	function orderOf(id: string): number {
		return selectedIds.indexOf(id) + 1;
	}

	function toggle(id: string) {
		if (isSelected(id)) {
			selectedIds = selectedIds.filter((s) => s !== id);
		} else {
			selectedIds = [...selectedIds, id];
		}
		successMsg = '';
	}

	async function save() {
		saving = true;
		error = '';
		successMsg = '';
		try {
			await setLandingEventIds('event-gallery', selectedIds);
			successMsg = 'Tersimpan! Perubahan akan tampil di halaman utama.';
		} catch {
			error = 'Gagal menyimpan. Coba lagi.';
		} finally {
			saving = false;
		}
	}

	function moveUp(id: string) {
		const idx = selectedIds.indexOf(id);
		if (idx <= 0) return;
		const copy = [...selectedIds];
		[copy[idx - 1], copy[idx]] = [copy[idx], copy[idx - 1]];
		selectedIds = copy;
		successMsg = '';
	}

	function moveDown(id: string) {
		const idx = selectedIds.indexOf(id);
		if (idx < 0 || idx >= selectedIds.length - 1) return;
		const copy = [...selectedIds];
		[copy[idx + 1], copy[idx]] = [copy[idx], copy[idx + 1]];
		selectedIds = copy;
		successMsg = '';
	}

	// Selected events in order (for preview)
	let orderedSelected = $derived(
		selectedIds.map((id) => allEvents.find((e) => e.id === id)).filter(Boolean) as EventItem[]
	);
</script>

<svelte:head>
	<title>Event Gallery — Halaman Depan Admin</title>
</svelte:head>

<div class="page">
	<div class="page-header">
		<div>
			<a href="/admin" class="back-link">← Dashboard</a>
			<h1 class="page-title">Event Gallery</h1>
			<p class="page-sub">
				Pilih event yang akan tampil di seksi <strong>Event Gallery</strong> pada halaman utama.
				Gambar diambil langsung dari data event — tidak ada upload ganda.
			</p>
		</div>
		<button class="btn-save" onclick={save} disabled={saving || loading}>
			{saving ? '⏳ Menyimpan...' : '💾 Simpan'}
		</button>
	</div>

	{#if error}
		<div class="alert-error">{error}</div>
	{/if}
	{#if successMsg}
		<div class="alert-success">{successMsg}</div>
	{/if}

	<div class="info-box">
		<span>💡</span>
		<span>
			Klik kartu event untuk <strong>memilih / membatalkan pilihan</strong>. Angka merah menunjukkan
			urutan tampil. Gunakan tombol ↑↓ di panel kanan untuk mengubah urutan.
			Disarankan <strong>maks 12 foto</strong>.
		</span>
	</div>

	{#if loading}
		<div class="skeleton-grid">
			{#each [0, 1, 2, 3, 4, 5] as i (i)}
				<div class="skeleton-card"></div>
			{/each}
		</div>
	{:else}
		<div class="layout">
			<!-- Left: All events -->
			<div class="panel">
				<div class="panel-header">
					<h2 class="panel-title">Semua Event</h2>
					<span class="panel-count">{allEvents.length} event</span>
				</div>

				{#if allEvents.length === 0}
					<div class="empty-state">
						Belum ada event. Tambahkan event di menu <a href="/admin/events" class="link">Events</a>.
					</div>
				{:else}
					<div class="events-grid">
						{#each allEvents as event (event.id)}
							<button
								type="button"
								class="event-card"
								class:selected={isSelected(event.id)}
								onclick={() => toggle(event.id)}
							>
								{#if isSelected(event.id)}
									<span class="order-badge">{orderOf(event.id)}</span>
								{/if}
								<div class="event-img-wrap">
									{#if event.imageUrl}
										<img src={event.imageUrl} alt={event.title} class="event-img" />
									{:else}
										<div class="event-img-placeholder">📷</div>
									{/if}
								</div>
								<div class="event-info">
									<div class="event-title">{event.title}</div>
									{#if event.category}
										<div class="event-cat">{event.category}</div>
									{/if}
								</div>
							</button>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Right: Selected order -->
			<div class="panel panel-right">
				<div class="panel-header">
					<h2 class="panel-title">Dipilih</h2>
					<span class="panel-count">{selectedIds.length} / 12</span>
				</div>

				{#if orderedSelected.length === 0}
					<div class="empty-state">Belum ada yang dipilih. Klik event di sebelah kiri.</div>
				{:else}
					<div class="ordered-list">
						{#each orderedSelected as event, i (event.id)}
							<div class="ordered-item">
								<span class="order-num">{i + 1}</span>
								<div class="ordered-img-wrap">
									{#if event.imageUrl}
										<img src={event.imageUrl} alt={event.title} class="ordered-img" />
									{:else}
										<div class="ordered-img-placeholder">📷</div>
									{/if}
								</div>
								<div class="ordered-info">
									<div class="ordered-title">{event.title}</div>
									{#if event.category}
										<div class="ordered-cat">{event.category}</div>
									{/if}
								</div>
								<div class="ordered-actions">
									<button
										type="button"
										class="btn-move"
										onclick={() => moveUp(event.id)}
										disabled={i === 0}
										title="Naikan"
									>↑</button>
									<button
										type="button"
										class="btn-move"
										onclick={() => moveDown(event.id)}
										disabled={i === orderedSelected.length - 1}
										title="Turunkan"
									>↓</button>
									<button
										type="button"
										class="btn-remove"
										onclick={() => toggle(event.id)}
										title="Hapus dari pilihan"
									>✕</button>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
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
		color: rgba(255,255,255,0.4);
		text-decoration: none;
		display: inline-block;
		margin-bottom: 0.5rem;
		transition: color 0.2s;
	}
	.back-link:hover { color: #f87171; }
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
		color: rgba(255,255,255,0.4);
		font-size: 0.875rem;
		margin: 0;
		max-width: 44rem;
		line-height: 1.55;
	}
	.page-sub strong { color: rgba(255,255,255,0.65); }

	.btn-save {
		padding: 0.65rem 1.4rem;
		background: #dc2626;
		color: white;
		border: none;
		border-radius: 0.75rem;
		font-weight: 700;
		font-size: 0.9rem;
		cursor: pointer;
		font-family: inherit;
		transition: all 0.2s;
		flex-shrink: 0;
	}
	.btn-save:hover:not(:disabled) {
		background: #b91c1c;
		transform: translateY(-1px);
		box-shadow: 0 6px 16px rgba(220,38,38,0.3);
	}
	.btn-save:disabled { opacity: 0.5; cursor: not-allowed; }

	.alert-error {
		padding: 0.875rem 1rem;
		background: rgba(220,38,38,0.12);
		border: 1px solid rgba(220,38,38,0.25);
		border-radius: 0.75rem;
		color: #f87171;
		font-size: 0.875rem;
	}
	.alert-success {
		padding: 0.875rem 1rem;
		background: rgba(34,197,94,0.1);
		border: 1px solid rgba(34,197,94,0.25);
		border-radius: 0.75rem;
		color: #86efac;
		font-size: 0.875rem;
	}

	.info-box {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		padding: 0.875rem 1rem;
		background: rgba(59,130,246,0.08);
		border: 1px solid rgba(59,130,246,0.18);
		border-radius: 0.75rem;
		font-size: 0.82rem;
		color: rgba(255,255,255,0.5);
		line-height: 1.5;
	}
	.info-box strong { color: rgba(255,255,255,0.75); }

	/* Two-panel layout */
	.layout {
		display: grid;
		grid-template-columns: 1fr 320px;
		gap: 1.25rem;
		align-items: start;
	}
	@media (max-width: 900px) {
		.layout { grid-template-columns: 1fr; }
	}

	/* Panel */
	.panel {
		background: rgba(255,255,255,0.02);
		border: 1px solid rgba(255,255,255,0.07);
		border-radius: 1rem;
		overflow: hidden;
	}
	.panel-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 1.25rem;
		border-bottom: 1px solid rgba(255,255,255,0.06);
	}
	.panel-title {
		font-family: 'Bebas Neue', sans-serif;
		font-size: 1.25rem;
		color: white;
		margin: 0;
		letter-spacing: 0.04em;
	}
	.panel-count {
		font-size: 0.72rem;
		color: rgba(255,255,255,0.3);
		font-weight: 600;
	}

	/* Event grid (left panel) */
	.events-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
		gap: 0.75rem;
		padding: 1rem;
	}
	.event-card {
		position: relative;
		background: rgba(255,255,255,0.03);
		border: 2px solid rgba(255,255,255,0.07);
		border-radius: 0.75rem;
		overflow: hidden;
		cursor: pointer;
		text-align: left;
		font-family: inherit;
		transition: all 0.2s;
		padding: 0;
	}
	.event-card:hover {
		border-color: rgba(255,255,255,0.18);
		transform: translateY(-2px);
	}
	.event-card.selected {
		border-color: #dc2626;
		background: rgba(220,38,38,0.08);
	}
	.order-badge {
		position: absolute;
		top: 0.4rem;
		right: 0.4rem;
		width: 22px;
		height: 22px;
		border-radius: 50%;
		background: #dc2626;
		color: white;
		font-size: 0.65rem;
		font-weight: 800;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1;
		line-height: 1;
	}
	.event-img-wrap {
		width: 100%;
		aspect-ratio: 4/3;
	}
	.event-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
	.event-img-placeholder {
		width: 100%;
		height: 100%;
		background: rgba(255,255,255,0.04);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
	}
	.event-info {
		padding: 0.5rem 0.625rem;
	}
	.event-title {
		font-size: 0.72rem;
		font-weight: 600;
		color: rgba(255,255,255,0.7);
		line-height: 1.3;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.event-cat {
		font-size: 0.63rem;
		color: rgba(255,255,255,0.3);
		margin-top: 2px;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	/* Ordered list (right panel) */
	.ordered-list {
		display: flex;
		flex-direction: column;
	}
	.ordered-item {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.625rem 0.875rem;
		border-bottom: 1px solid rgba(255,255,255,0.04);
		transition: background 0.15s;
	}
	.ordered-item:last-child { border-bottom: none; }
	.ordered-item:hover { background: rgba(255,255,255,0.02); }
	.order-num {
		font-family: 'Bebas Neue', sans-serif;
		font-size: 1.25rem;
		color: #dc2626;
		width: 20px;
		flex-shrink: 0;
		line-height: 1;
	}
	.ordered-img-wrap {
		width: 40px;
		height: 30px;
		border-radius: 0.3rem;
		overflow: hidden;
		flex-shrink: 0;
	}
	.ordered-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.ordered-img-placeholder {
		width: 100%;
		height: 100%;
		background: rgba(255,255,255,0.04);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.75rem;
	}
	.ordered-info {
		flex: 1;
		min-width: 0;
	}
	.ordered-title {
		font-size: 0.72rem;
		font-weight: 600;
		color: rgba(255,255,255,0.7);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.ordered-cat {
		font-size: 0.62rem;
		color: rgba(255,255,255,0.28);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	.ordered-actions {
		display: flex;
		gap: 0.2rem;
		flex-shrink: 0;
	}
	.btn-move {
		width: 24px;
		height: 24px;
		background: rgba(255,255,255,0.06);
		border: 1px solid rgba(255,255,255,0.1);
		border-radius: 0.3rem;
		color: rgba(255,255,255,0.5);
		font-size: 0.7rem;
		cursor: pointer;
		font-family: inherit;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.15s;
		padding: 0;
	}
	.btn-move:hover:not(:disabled) {
		background: rgba(255,255,255,0.12);
		color: white;
	}
	.btn-move:disabled { opacity: 0.25; cursor: not-allowed; }
	.btn-remove {
		width: 24px;
		height: 24px;
		background: rgba(220,38,38,0.1);
		border: 1px solid rgba(220,38,38,0.2);
		border-radius: 0.3rem;
		color: #f87171;
		font-size: 0.65rem;
		cursor: pointer;
		font-family: inherit;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.15s;
		padding: 0;
	}
	.btn-remove:hover {
		background: rgba(220,38,38,0.2);
	}

	/* Skeleton */
	.skeleton-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
		gap: 0.75rem;
	}
	.skeleton-card {
		aspect-ratio: 4/3;
		border-radius: 0.75rem;
		background: linear-gradient(
			90deg,
			rgba(255,255,255,0.04) 25%,
			rgba(255,255,255,0.07) 50%,
			rgba(255,255,255,0.04) 75%
		);
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite;
	}
	@keyframes shimmer {
		0% { background-position: 200% 0; }
		100% { background-position: -200% 0; }
	}

	.empty-state {
		padding: 2.5rem;
		text-align: center;
		color: rgba(255,255,255,0.3);
		font-size: 0.85rem;
	}
	.link { color: #f87171; text-decoration: none; }
	.link:hover { text-decoration: underline; }
</style>
