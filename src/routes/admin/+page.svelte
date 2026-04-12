<script lang="ts">
	import { onMount } from 'svelte';
	import { getBlogs, type Blog } from '$lib/firebase/blogs';
	import { getProductions } from '$lib/firebase/productions';
	import { getEvents } from '$lib/firebase/events';
	import { FEATURED_SERVICE_SLUGS, getServiceImages } from '$lib/firebase/services';
	import {
		getFirestoreUsage,
		formatBytes,
		usagePercent,
		usageStatus,
		SPARK_LIMITS
	} from '$lib/firebase/usage';

	let blogs = $state<Blog[]>([]);
	let totalProductions = $state(0);
	let totalEvents = $state(0);
	let serviceGalleryPhotos = $state(0);
	let loading = $state(true);
	let error = $state('');

	// Storage mini widget
	let storageBytes = $state(0);
	let storageLoaded = $state(false);

	onMount(async () => {
		try {
			const [blogsData, prods, evts, ...galleries] = await Promise.all([
				getBlogs(),
				getProductions(),
				getEvents(),
				...FEATURED_SERVICE_SLUGS.map((slug) => getServiceImages(slug))
			]);
			blogs = blogsData;
			totalProductions = prods.length;
			totalEvents = evts.length;
			serviceGalleryPhotos = galleries.reduce((sum, imgs) => sum + imgs.length, 0);
		} catch (e) {
			error = 'Gagal memuat data.';
		} finally {
			loading = false;
		}

		// Load storage info di background (non-blocking)
		try {
			const usage = await getFirestoreUsage();
			storageBytes = usage.totalBytes;
		} catch {
			// abaikan jika gagal, tidak kritis untuk dashboard
		} finally {
			storageLoaded = true;
		}
	});

	let totalBlogs = $derived(blogs.length);
	let categories = $derived([...new Set(blogs.map((b) => b.category))]);
	let latestBlog = $derived(blogs[0]);
	let storagePct = $derived(usagePercent(storageBytes, SPARK_LIMITS.firestoreStorageBytes));
	let storageStatusVal = $derived(usageStatus(storagePct));
</script>

<svelte:head>
	<title>Dashboard — Admin Redline</title>
</svelte:head>

<div class="page">
	<div class="page-header">
		<div>
			<h1 class="page-title">Dashboard</h1>
			<p class="page-sub">Selamat datang kembali di panel admin Redline Communication.</p>
		</div>
		<a href="/admin/blogs/create" class="btn-primary">
			<span>✏️</span> Buat Blog Baru
		</a>
	</div>

	<!-- Stats -->
	<div class="stats-grid">
		<div class="stat-card">
			<div class="stat-icon">📝</div>
			<div class="stat-body">
				<div class="stat-value">{totalBlogs}</div>
				<div class="stat-label">Total Blog</div>
			</div>
		</div>
		<div class="stat-card">
			<div class="stat-icon">🏷️</div>
			<div class="stat-body">
				<div class="stat-value">{categories.length}</div>
				<div class="stat-label">Kategori</div>
			</div>
		</div>
		<div class="stat-card">
			<div class="stat-icon">📅</div>
			<div class="stat-body">
				<div class="stat-value">
					{#if latestBlog?.publishedAt}
						{new Date(latestBlog.publishedAt.seconds * 1000).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
					{:else}
						—
					{/if}
				</div>
				<div class="stat-label">Post Terakhir</div>
			</div>
		</div>
		<div class="stat-card">
			<div class="stat-icon">🎬</div>
			<div class="stat-body">
				<div class="stat-value">{totalProductions}</div>
				<div class="stat-label">Production</div>
			</div>
		</div>
		<div class="stat-card">
			<div class="stat-icon">🎪</div>
			<div class="stat-body">
				<div class="stat-value">{totalEvents}</div>
				<div class="stat-label">Events</div>
			</div>
		</div>
		<div class="stat-card">
			<div class="stat-icon">🖼️</div>
			<div class="stat-body">
				<div class="stat-value">{serviceGalleryPhotos}</div>
				<div class="stat-label">Foto galeri layanan</div>
			</div>
		</div>
	</div>

	<!-- Storage Mini Widget -->
	<a href="/admin/storage" class="storage-widget" class:sw-warning={storageStatusVal === 'warning'} class:sw-danger={storageStatusVal === 'danger'}>
		<div class="sw-left">
			<span class="sw-icon">💾</span>
			<div>
				<div class="sw-title">Kapasitas Penyimpanan</div>
				<div class="sw-sub">
					{#if storageLoaded}
						{formatBytes(storageBytes)} / {formatBytes(SPARK_LIMITS.firestoreStorageBytes)}
						{#if storageStatusVal === 'danger'}
							<span class="sw-badge sw-badge-danger">Kritis</span>
						{:else if storageStatusVal === 'warning'}
							<span class="sw-badge sw-badge-warning">Perlu Perhatian</span>
						{:else}
							<span class="sw-badge sw-badge-safe">Aman</span>
						{/if}
					{:else}
						Memuat...
					{/if}
				</div>
			</div>
		</div>
		<div class="sw-right">
			{#if storageLoaded}
				<div class="sw-pct" class:sw-pct-warn={storageStatusVal === 'warning'} class:sw-pct-danger={storageStatusVal === 'danger'}>
					{storagePct.toFixed(1)}%
				</div>
			{/if}
			<div class="sw-progress-track">
				<div
					class="sw-progress-fill"
					class:sw-fill-warn={storageStatusVal === 'warning'}
					class:sw-fill-danger={storageStatusVal === 'danger'}
					style="width: {storageLoaded ? storagePct : 0}%"
				></div>
			</div>
			<div class="sw-link-hint">Lihat Detail →</div>
		</div>
	</a>

	<!-- Recent Posts -->
	<div class="section-card">
		<div class="section-card-header">
			<h2 class="section-card-title">Blog Terbaru</h2>
			<a href="/admin/blogs" class="link-all">Lihat Semua →</a>
		</div>

		{#if loading}
			<div class="empty-state">Memuat data...</div>
		{:else if error}
			<div class="empty-state error">{error}</div>
		{:else if blogs.length === 0}
			<div class="empty-state">
				<p>Belum ada blog. <a href="/admin/blogs/create" class="link">Buat yang pertama!</a></p>
			</div>
		{:else}
			<div class="recent-list">
				{#each blogs.slice(0, 5) as blog}
					<div class="recent-item">
						{#if blog.imageUrl}
							<img src={blog.imageUrl} alt={blog.title} class="recent-thumb" />
						{:else}
							<div class="recent-thumb-placeholder">📷</div>
						{/if}
						<div class="recent-info">
							<div class="recent-cat">{blog.category}</div>
							<div class="recent-title">{blog.title}</div>
							<div class="recent-date">
								{#if blog.publishedAt}
									{new Date(blog.publishedAt.seconds * 1000).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
								{/if}
							</div>
						</div>
						<div class="recent-actions">
							<a href="/admin/blogs/{blog.id}/edit" class="action-btn edit">Edit</a>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
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
		font-size: 0.9rem;
		margin: 0;
	}
	.btn-primary {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.65rem 1.25rem;
		background: #dc2626;
		color: white;
		border-radius: 0.75rem;
		text-decoration: none;
		font-weight: 600;
		font-size: 0.9rem;
		transition: all 0.2s;
	}
	.btn-primary:hover {
		background: #b91c1c;
		transform: translateY(-1px);
		box-shadow: 0 6px 16px rgba(220, 38, 38, 0.3);
	}

	/* Stats */
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
		gap: 1rem;
	}
	.stat-card {
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 1rem;
		padding: 1.25rem;
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	.stat-icon {
		font-size: 1.75rem;
	}
	.stat-value {
		font-family: 'Bebas Neue', sans-serif;
		font-size: 1.75rem;
		color: #dc2626;
		line-height: 1;
	}
	.stat-label {
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.4);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		margin-top: 2px;
	}

	/* Section card */
	.section-card {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-radius: 1rem;
		overflow: hidden;
	}
	.section-card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.25rem 1.5rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}
	.section-card-title {
		font-size: 1rem;
		font-weight: 700;
		color: white;
		margin: 0;
	}
	.link-all {
		font-size: 0.8rem;
		color: #f87171;
		text-decoration: none;
	}
	.link-all:hover { text-decoration: underline; }

	/* Recent */
	.recent-list {
		display: flex;
		flex-direction: column;
	}
	.recent-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem 1.5rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
		transition: background 0.15s;
	}
	.recent-item:last-child { border-bottom: none; }
	.recent-item:hover { background: rgba(255, 255, 255, 0.03); }
	.recent-thumb {
		width: 56px;
		height: 56px;
		border-radius: 0.5rem;
		object-fit: cover;
		flex-shrink: 0;
	}
	.recent-thumb-placeholder {
		width: 56px;
		height: 56px;
		border-radius: 0.5rem;
		background: rgba(255, 255, 255, 0.06);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.25rem;
		flex-shrink: 0;
	}
	.recent-info { flex: 1; min-width: 0; }
	.recent-cat {
		font-size: 0.7rem;
		color: #f87171;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		margin-bottom: 2px;
	}
	.recent-title {
		font-size: 0.9rem;
		color: white;
		font-weight: 600;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.recent-date {
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.35);
		margin-top: 2px;
	}
	.recent-actions { display: flex; gap: 0.5rem; }
	.action-btn {
		padding: 0.3rem 0.75rem;
		border-radius: 0.375rem;
		font-size: 0.75rem;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.15s;
	}
	.action-btn.edit {
		background: rgba(220, 38, 38, 0.15);
		color: #f87171;
		border: 1px solid rgba(220, 38, 38, 0.25);
	}
	.action-btn.edit:hover {
		background: rgba(220, 38, 38, 0.25);
	}
	.empty-state {
		padding: 2.5rem;
		text-align: center;
		color: rgba(255, 255, 255, 0.35);
		font-size: 0.9rem;
	}
	.empty-state.error { color: #f87171; }
	.link { color: #f87171; }

	/* Storage Widget */
	.storage-widget {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 1rem 1.5rem;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 1rem;
		text-decoration: none;
		transition: all 0.2s;
		flex-wrap: wrap;
	}
	.storage-widget:hover {
		background: rgba(255, 255, 255, 0.05);
		border-color: rgba(255, 255, 255, 0.14);
	}
	.storage-widget.sw-warning {
		border-color: rgba(245, 158, 11, 0.3);
		background: rgba(245, 158, 11, 0.05);
	}
	.storage-widget.sw-danger {
		border-color: rgba(220, 38, 38, 0.3);
		background: rgba(220, 38, 38, 0.06);
	}
	.sw-left {
		display: flex;
		align-items: center;
		gap: 0.875rem;
	}
	.sw-icon { font-size: 1.5rem; }
	.sw-title {
		font-size: 0.9rem;
		font-weight: 700;
		color: white;
	}
	.sw-sub {
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.4);
		margin-top: 2px;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
	}
	.sw-badge {
		padding: 0.1rem 0.5rem;
		border-radius: 999px;
		font-size: 0.65rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}
	.sw-badge-safe {
		background: rgba(34, 197, 94, 0.15);
		color: #86efac;
	}
	.sw-badge-warning {
		background: rgba(245, 158, 11, 0.15);
		color: #fcd34d;
	}
	.sw-badge-danger {
		background: rgba(220, 38, 38, 0.2);
		color: #fca5a5;
	}
	.sw-right {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.3rem;
		min-width: 120px;
	}
	.sw-pct {
		font-family: 'Bebas Neue', sans-serif;
		font-size: 1.3rem;
		color: #22c55e;
		line-height: 1;
	}
	.sw-pct.sw-pct-warn { color: #f59e0b; }
	.sw-pct.sw-pct-danger { color: #dc2626; }
	.sw-progress-track {
		width: 120px;
		height: 5px;
		background: rgba(255, 255, 255, 0.07);
		border-radius: 999px;
		overflow: hidden;
	}
	.sw-progress-fill {
		height: 100%;
		border-radius: 999px;
		background: #22c55e;
		transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
		min-width: 2px;
	}
	.sw-progress-fill.sw-fill-warn { background: #f59e0b; }
	.sw-progress-fill.sw-fill-danger { background: #dc2626; }
	.sw-link-hint {
		font-size: 0.7rem;
		color: rgba(255, 255, 255, 0.25);
	}
</style>
