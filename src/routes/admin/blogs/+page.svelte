<script lang="ts">
	import { onMount } from 'svelte';
	import { getBlogs, deleteBlog, type Blog } from '$lib/firebase/blogs';
	import { deleteBlogImage } from '$lib/firebase/storage';

	let blogs = $state<Blog[]>([]);
	let loading = $state(true);
	let error = $state('');
	let deletingId = $state<string | null>(null);
	let confirmDeleteId = $state<string | null>(null);
	let searchQuery = $state('');

	onMount(async () => {
		await loadBlogs();
	});

	async function loadBlogs() {
		loading = true;
		try {
			blogs = await getBlogs();
		} catch {
			error = 'Gagal memuat data blog.';
		} finally {
			loading = false;
		}
	}

	async function handleDelete(blog: Blog) {
		if (confirmDeleteId !== blog.id) {
			confirmDeleteId = blog.id;
			return;
		}
		deletingId = blog.id;
		confirmDeleteId = null;
		try {
			if (blog.imagePath) {
				await deleteBlogImage(blog.imagePath);
			}
			await deleteBlog(blog.id);
			blogs = blogs.filter((b) => b.id !== blog.id);
		} catch {
			error = 'Gagal menghapus blog.';
		} finally {
			deletingId = null;
		}
	}

	let filtered = $derived(
		searchQuery.trim()
			? blogs.filter(
					(b) =>
						b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
						b.category.toLowerCase().includes(searchQuery.toLowerCase())
				)
			: blogs
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
	<title>Manajemen Blog — Admin Redline</title>
</svelte:head>

<div class="page">
	<div class="page-header">
		<div>
			<h1 class="page-title">Manajemen Blog</h1>
			<p class="page-sub">{blogs.length} artikel tersedia</p>
		</div>
		<a href="/admin/blogs/create" class="btn-primary">✏️ Buat Blog Baru</a>
	</div>

	<!-- Search -->
	<div class="search-wrap">
		<span class="search-icon">🔍</span>
		<input
			type="text"
			bind:value={searchQuery}
			placeholder="Cari judul atau kategori..."
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
				<p>Tidak ada blog yang cocok dengan "<strong>{searchQuery}</strong>"</p>
			{:else}
				<p>Belum ada blog. <a href="/admin/blogs/create" class="link">Buat sekarang!</a></p>
			{/if}
		</div>
	{:else}
		<div class="blog-table-wrap">
			<table class="blog-table">
				<thead>
					<tr>
						<th>Blog</th>
						<th>Kategori</th>
						<th>Tag</th>
						<th>Tanggal</th>
						<th>Aksi</th>
					</tr>
				</thead>
				<tbody>
					{#each filtered as blog (blog.id)}
						<tr>
							<td>
								<div class="blog-cell">
									{#if blog.imageUrl}
										<img src={blog.imageUrl} alt={blog.title} class="blog-thumb" />
									{:else}
										<div class="blog-thumb-placeholder">📷</div>
									{/if}
									<div class="blog-info">
										<div class="blog-title">{blog.title}</div>
										<div class="blog-excerpt">{blog.excerpt?.substring(0, 60)}...</div>
									</div>
								</div>
							</td>
							<td><span class="badge-cat">{blog.category}</span></td>
							<td><span class="badge-tag">{blog.tag}</span></td>
							<td class="date-cell">{formatDate(blog.publishedAt)}</td>
							<td>
								<div class="action-wrap">
									<a href="/admin/blogs/{blog.id}/edit" class="action-btn edit" title="Edit">✏️ Edit</a>
									<button
										class="action-btn delete"
										class:confirm={confirmDeleteId === blog.id}
										onclick={() => handleDelete(blog)}
										disabled={deletingId === blog.id}
										title={confirmDeleteId === blog.id ? 'Klik lagi untuk konfirmasi' : 'Hapus'}
									>
										{#if deletingId === blog.id}
											⏳
										{:else if confirmDeleteId === blog.id}
											⚠️ Yakin?
										{:else}
											🗑️ Hapus
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
	.page-header {
		display: flex; align-items: flex-start; justify-content: space-between;
		flex-wrap: wrap; gap: 1rem;
	}
	.page-title {
		font-family: 'Bebas Neue', sans-serif; font-size: 2.25rem;
		color: white; margin: 0 0 0.25rem; letter-spacing: 0.04em;
	}
	.page-sub { color: rgba(255,255,255,0.4); font-size: 0.9rem; margin: 0; }
	.btn-primary {
		display: inline-flex; align-items: center; gap: 0.5rem;
		padding: 0.65rem 1.25rem; background: #dc2626; color: white;
		border-radius: 0.75rem; text-decoration: none; font-weight: 600;
		font-size: 0.9rem; transition: all 0.2s;
	}
	.btn-primary:hover { background: #b91c1c; transform: translateY(-1px); }

	/* Search */
	.search-wrap {
		position: relative; display: flex; align-items: center;
	}
	.search-icon {
		position: absolute; left: 1rem; font-size: 0.875rem; pointer-events: none;
	}
	.search-input {
		width: 100%; max-width: 360px; padding: 0.65rem 2.5rem 0.65rem 2.5rem;
		background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
		border-radius: 0.75rem; color: white; font-size: 0.9rem; font-family: inherit;
		outline: none; transition: border-color 0.2s;
	}
	.search-input:focus { border-color: rgba(220,38,38,0.5); }
	.search-clear {
		position: absolute; right: calc(100% - 360px + 0.75rem);
		background: none; border: none; color: rgba(255,255,255,0.4);
		cursor: pointer; font-size: 0.8rem; padding: 0;
	}

	/* Table */
	.blog-table-wrap {
		background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
		border-radius: 1rem; overflow: hidden;
	}
	.blog-table {
		width: 100%; border-collapse: collapse;
	}
	.blog-table thead tr {
		border-bottom: 1px solid rgba(255,255,255,0.07);
	}
	.blog-table th {
		padding: 0.875rem 1rem; text-align: left; font-size: 0.72rem;
		text-transform: uppercase; letter-spacing: 0.08em;
		color: rgba(255,255,255,0.35); font-weight: 700;
	}
	.blog-table td {
		padding: 0.875rem 1rem; border-bottom: 1px solid rgba(255,255,255,0.04);
		vertical-align: middle;
	}
	.blog-table tbody tr:last-child td { border-bottom: none; }
	.blog-table tbody tr:hover td { background: rgba(255,255,255,0.02); }

	.blog-cell { display: flex; align-items: center; gap: 0.875rem; }
	.blog-thumb {
		width: 52px; height: 52px; border-radius: 0.5rem;
		object-fit: cover; flex-shrink: 0;
	}
	.blog-thumb-placeholder {
		width: 52px; height: 52px; border-radius: 0.5rem;
		background: rgba(255,255,255,0.06); display: flex; align-items: center;
		justify-content: center; font-size: 1.25rem; flex-shrink: 0;
	}
	.blog-info { min-width: 0; }
	.blog-title {
		font-size: 0.875rem; font-weight: 600; color: white;
		white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 240px;
	}
	.blog-excerpt {
		font-size: 0.75rem; color: rgba(255,255,255,0.35); margin-top: 2px;
		white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 240px;
	}

	.badge-cat {
		display: inline-block; padding: 0.2rem 0.6rem; border-radius: 100px;
		background: rgba(220,38,38,0.15); color: #f87171;
		font-size: 0.72rem; font-weight: 700; white-space: nowrap;
	}
	.badge-tag {
		display: inline-block; padding: 0.2rem 0.6rem; border-radius: 100px;
		background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.6);
		font-size: 0.72rem; font-weight: 600; white-space: nowrap;
	}
	.date-cell { color: rgba(255,255,255,0.4); font-size: 0.8rem; white-space: nowrap; }

	.action-wrap { display: flex; gap: 0.5rem; }
	.action-btn {
		display: inline-flex; align-items: center; gap: 0.3rem;
		padding: 0.3rem 0.7rem; border-radius: 0.4rem;
		font-size: 0.75rem; font-weight: 600; cursor: pointer;
		text-decoration: none; border: 1px solid transparent;
		font-family: inherit; transition: all 0.15s;
	}
	.action-btn.edit {
		background: rgba(220,38,38,0.12); color: #f87171;
		border-color: rgba(220,38,38,0.2);
	}
	.action-btn.edit:hover { background: rgba(220,38,38,0.22); }
	.action-btn.delete {
		background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.45);
		border-color: rgba(255,255,255,0.1);
	}
	.action-btn.delete:hover { background: rgba(255,50,50,0.1); color: #f87171; }
	.action-btn.delete.confirm {
		background: rgba(220,38,38,0.2); color: #fca5a5;
		border-color: rgba(220,38,38,0.4);
	}
	.action-btn:disabled { opacity: 0.5; cursor: not-allowed; }

	/* Skeleton */
	.skeleton-list { display: flex; flex-direction: column; gap: 0.75rem; }
	.skeleton-row {
		height: 70px; border-radius: 0.75rem;
		background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.04) 75%);
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite;
	}
	@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

	.empty-state { padding: 3rem; text-align: center; color: rgba(255,255,255,0.35); }
	.link { color: #f87171; }
	.alert-error {
		padding: 0.875rem 1rem; background: rgba(220,38,38,0.12);
		border: 1px solid rgba(220,38,38,0.25); border-radius: 0.75rem;
		color: #f87171; font-size: 0.875rem;
	}
</style>
