<script lang="ts">
	import { onMount } from 'svelte';
	import { getBlogs, type Blog } from '$lib/firebase/blogs';

	let blogs = $state<Blog[]>([]);
	let loading = $state(true);
	let error = $state('');

	onMount(async () => {
		try {
			blogs = await getBlogs();
		} catch (e) {
			error = 'Gagal memuat data blog.';
		} finally {
			loading = false;
		}
	});

	$derived: {
		// stats
	}
	let totalBlogs = $derived(blogs.length);
	let categories = $derived([...new Set(blogs.map((b) => b.category))]);
	let latestBlog = $derived(blogs[0]);
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
	</div>

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
</style>
