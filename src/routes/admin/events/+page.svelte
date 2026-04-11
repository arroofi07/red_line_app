<script lang="ts">
	import { onMount } from 'svelte';
	import { getEvents, deleteEvent, type EventItem } from '$lib/firebase/events';

	let events = $state<EventItem[]>([]);
	let loading = $state(true);
	let error = $state('');
	let deletingId = $state<string | null>(null);
	let confirmDeleteId = $state<string | null>(null);
	let searchQuery = $state('');

	onMount(async () => {
		await loadData();
	});

	async function loadData() {
		loading = true;
		try {
			events = await getEvents();
		} catch {
			error = 'Gagal memuat data event.';
		} finally {
			loading = false;
		}
	}

	async function handleDelete(item: EventItem) {
		if (confirmDeleteId !== item.id) {
			confirmDeleteId = item.id;
			return;
		}
		deletingId = item.id;
		confirmDeleteId = null;
		try {
			await deleteEvent(item.id);
			events = events.filter((e) => e.id !== item.id);
		} catch {
			error = 'Gagal menghapus event.';
		} finally {
			deletingId = null;
		}
	}

	let filtered = $derived(
		searchQuery.trim()
			? events.filter(
					(e) =>
						e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
						e.place?.toLowerCase().includes(searchQuery.toLowerCase())
				)
			: events
	);

	function formatDate(ts: any) {
		if (!ts?.seconds) return '—';
		return new Date(ts.seconds * 1000).toLocaleDateString('id-ID', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>Manajemen Event — Admin Redline</title>
</svelte:head>

<div class="page">
	<div class="page-header">
		<div>
			<h1 class="page-title">Manajemen Event</h1>
			<p class="page-sub">{events.length} event tersedia</p>
		</div>
		<a href="/admin/events/create" class="btn-primary">+ Tambah Event</a>
	</div>

	<div class="search-wrap">
		<span class="search-icon">🔍</span>
		<input
			type="text"
			bind:value={searchQuery}
			placeholder="Cari judul atau lokasi..."
			class="search-input"
		/>
		{#if searchQuery}
			<button class="search-clear" onclick={() => (searchQuery = '')}>✕</button>
		{/if}
	</div>

	{#if error}
		<div class="alert-error">{error}</div>
	{/if}

	{#if loading}
		<div class="skeleton-list">
			{#each Array(4) as _}
				<div class="skeleton-row"></div>
			{/each}
		</div>
	{:else if filtered.length === 0}
		<div class="empty-state">
			{#if searchQuery}
				<p>Tidak ada event yang cocok dengan "<strong>{searchQuery}</strong>"</p>
			{:else}
				<p>Belum ada event. <a href="/admin/events/create" class="link">Tambah sekarang!</a></p>
			{/if}
		</div>
	{:else}
		<div class="table-wrap">
			<table class="data-table">
				<thead>
					<tr>
						<th>Event</th>
						<th>Lokasi</th>
						<th>Tanggal</th>
						<th>Aksi</th>
					</tr>
				</thead>
				<tbody>
					{#each filtered as item (item.id)}
						<tr>
							<td>
								<div class="cell-with-thumb">
									{#if item.imageUrl}
										<img src={item.imageUrl} alt={item.title} class="thumb" />
									{:else}
										<div class="thumb-placeholder">📷</div>
									{/if}
									<div class="cell-info">
										<div class="cell-title">{item.title}</div>
									</div>
								</div>
							</td>
							<td class="text-cell">{item.place || '—'}</td>
							<td class="date-cell">{formatDate(item.createdAt)}</td>
							<td>
								<div class="action-wrap">
									<a href="/admin/events/{item.id}/edit" class="action-btn edit">Edit</a>
									<button
										class="action-btn delete"
										class:confirm={confirmDeleteId === item.id}
										onclick={() => handleDelete(item)}
										disabled={deletingId === item.id}
									>
										{#if deletingId === item.id}
											⏳
										{:else if confirmDeleteId === item.id}
											Yakin?
										{:else}
											Hapus
										{/if}
									</button>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>

<style>
	.page { display: flex; flex-direction: column; gap: 1.5rem; }
	.page-header { display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
	.page-title { font-family: 'Bebas Neue', sans-serif; font-size: 2.25rem; color: white; margin: 0 0 0.25rem; letter-spacing: 0.04em; }
	.page-sub { color: rgba(255,255,255,0.4); font-size: 0.9rem; margin: 0; }
	.btn-primary { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.65rem 1.25rem; background: #dc2626; color: white; border-radius: 0.75rem; text-decoration: none; font-weight: 600; font-size: 0.9rem; transition: all 0.2s; }
	.btn-primary:hover { background: #b91c1c; transform: translateY(-1px); }

	.search-wrap { position: relative; display: flex; align-items: center; }
	.search-icon { position: absolute; left: 1rem; font-size: 0.875rem; pointer-events: none; }
	.search-input { width: 100%; max-width: 360px; padding: 0.65rem 2.5rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 0.75rem; color: white; font-size: 0.9rem; font-family: inherit; outline: none; transition: border-color 0.2s; }
	.search-input:focus { border-color: rgba(220,38,38,0.5); }
	.search-clear { position: absolute; right: calc(100% - 360px + 0.75rem); background: none; border: none; color: rgba(255,255,255,0.4); cursor: pointer; font-size: 0.8rem; padding: 0; }

	.table-wrap { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 1rem; overflow: hidden; }
	.data-table { width: 100%; border-collapse: collapse; }
	.data-table thead tr { border-bottom: 1px solid rgba(255,255,255,0.07); }
	.data-table th { padding: 0.875rem 1rem; text-align: left; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(255,255,255,0.35); font-weight: 700; }
	.data-table td { padding: 0.875rem 1rem; border-bottom: 1px solid rgba(255,255,255,0.04); vertical-align: middle; }
	.data-table tbody tr:last-child td { border-bottom: none; }
	.data-table tbody tr:hover td { background: rgba(255,255,255,0.02); }

	.cell-with-thumb { display: flex; align-items: center; gap: 0.875rem; }
	.thumb { width: 52px; height: 52px; border-radius: 0.5rem; object-fit: cover; flex-shrink: 0; }
	.thumb-placeholder { width: 52px; height: 52px; border-radius: 0.5rem; background: rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: center; font-size: 1.25rem; flex-shrink: 0; }
	.cell-info { min-width: 0; }
	.cell-title { font-size: 0.875rem; font-weight: 600; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px; }

	.text-cell { color: rgba(255,255,255,0.5); font-size: 0.8rem; }
	.date-cell { color: rgba(255,255,255,0.4); font-size: 0.8rem; white-space: nowrap; }

	.action-wrap { display: flex; gap: 0.5rem; }
	.action-btn { display: inline-flex; align-items: center; gap: 0.3rem; padding: 0.3rem 0.7rem; border-radius: 0.4rem; font-size: 0.75rem; font-weight: 600; cursor: pointer; text-decoration: none; border: 1px solid transparent; font-family: inherit; transition: all 0.15s; }
	.action-btn.edit { background: rgba(220,38,38,0.12); color: #f87171; border-color: rgba(220,38,38,0.2); }
	.action-btn.edit:hover { background: rgba(220,38,38,0.22); }
	.action-btn.delete { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.45); border-color: rgba(255,255,255,0.1); }
	.action-btn.delete:hover { background: rgba(255,50,50,0.1); color: #f87171; }
	.action-btn.delete.confirm { background: rgba(220,38,38,0.2); color: #fca5a5; border-color: rgba(220,38,38,0.4); }
	.action-btn:disabled { opacity: 0.5; cursor: not-allowed; }

	.skeleton-list { display: flex; flex-direction: column; gap: 0.75rem; }
	.skeleton-row { height: 70px; border-radius: 0.75rem; background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.04) 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; }
	@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

	.empty-state { padding: 3rem; text-align: center; color: rgba(255,255,255,0.35); }
	.link { color: #f87171; }
	.alert-error { padding: 0.875rem 1rem; background: rgba(220,38,38,0.12); border: 1px solid rgba(220,38,38,0.25); border-radius: 0.75rem; color: #f87171; font-size: 0.875rem; }
</style>
