<script lang="ts">
	import { onMount } from 'svelte';
	import { getBlogs, type Blog } from '$lib/firebase/blogs';
	import { getLandingEventIds, setLandingEventIds } from '$lib/firebase/landing';

	let allBlogs = $state<Blog[]>([]);
	let selectedIds = $state<string[]>([]);
	let loading = $state(true);
	let saving = $state(false);
	let error = $state('');
	let successMsg = $state('');

	const MAX_ITEMS = 4; // 1 featured + 3 side

	onMount(async () => {
		try {
			const [blogs, ids] = await Promise.all([getBlogs(), getLandingEventIds('insight-posts')]);
			allBlogs = blogs;
			selectedIds = ids;
		} catch {
			error = 'Gagal memuat data. Coba refresh halaman.';
		} finally {
			loading = false;
		}
	});

	function isSelected(id: string) { return selectedIds.includes(id); }
	function orderOf(id: string) { return selectedIds.indexOf(id) + 1; }

	function toggle(id: string) {
		if (isSelected(id)) {
			selectedIds = selectedIds.filter((s) => s !== id);
		} else {
			if (selectedIds.length >= MAX_ITEMS) return;
			selectedIds = [...selectedIds, id];
		}
		successMsg = '';
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

	async function save() {
		saving = true;
		error = '';
		successMsg = '';
		try {
			await setLandingEventIds('insight-posts', selectedIds);
			successMsg = 'Tersimpan! Post akan diperbarui di halaman utama.';
		} catch {
			error = 'Gagal menyimpan. Coba lagi.';
		} finally {
			saving = false;
		}
	}

	function formatDate(blog: Blog) {
		if (!blog.publishedAt?.seconds) return '';
		return new Date(blog.publishedAt.seconds * 1000).toLocaleDateString('id-ID', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		});
	}

	let orderedSelected = $derived(
		selectedIds.map((id) => allBlogs.find((b) => b.id === id)).filter(Boolean) as Blog[]
	);
</script>

<svelte:head>
	<title>Insight & Post — Halaman Depan Admin</title>
</svelte:head>

<div class="page">
	<div class="page-header">
		<div>
			<a href="/admin" class="back-link">← Dashboard</a>
			<h1 class="page-title">Insight & Post</h1>
			<p class="page-sub">
				Pilih blog yang akan tampil di seksi <strong>Insight & Post</strong> pada halaman utama.
				Post <strong>pertama</strong> akan menjadi featured (besar), sisanya tampil di kolom kanan.
				Maks <strong>{MAX_ITEMS} post</strong>. Jika kosong, otomatis tampil {MAX_ITEMS} blog terbaru.
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
			Klik kartu untuk <strong>memilih / membatalkan</strong>.
			{#if selectedIds.length >= MAX_ITEMS}
				<strong class="warn">Batas {MAX_ITEMS} post tercapai.</strong>
			{:else}
				Urutan pertama = <strong>featured post</strong> (ditampilkan besar di kiri).
			{/if}
		</span>
	</div>

	<!-- Preview order hint -->
	{#if orderedSelected.length > 0}
		<div class="preview-strip">
			<span class="preview-label">Pratinjau urutan:</span>
			{#each orderedSelected as blog, i (blog.id)}
				<div class="preview-chip" class:featured={i === 0}>
					<span class="preview-num">{i + 1}</span>
					<span class="preview-title">{blog.title}</span>
					{#if i === 0}<span class="preview-tag">Featured</span>{/if}
				</div>
			{/each}
		</div>
	{/if}

	{#if loading}
		<div class="skeleton-grid">
			{#each [0, 1, 2, 3] as i (i)}
				<div class="skeleton-card"></div>
			{/each}
		</div>
	{:else}
		<div class="layout">
			<!-- Left: All blogs -->
			<div class="panel">
				<div class="panel-header">
					<h2 class="panel-title">Semua Blog</h2>
					<span class="panel-count">{allBlogs.length} post</span>
				</div>

				{#if allBlogs.length === 0}
					<div class="empty-state">
						Belum ada blog. Buat di menu <a href="/admin/blogs/create" class="link">Buat Blog Baru</a>.
					</div>
				{:else}
					<div class="blogs-list">
						{#each allBlogs as blog (blog.id)}
							<button
								type="button"
								class="blog-row"
								class:selected={isSelected(blog.id)}
								class:maxed={!isSelected(blog.id) && selectedIds.length >= MAX_ITEMS}
								onclick={() => toggle(blog.id)}
							>
								{#if isSelected(blog.id)}
									<span class="order-badge" class:featured-badge={orderOf(blog.id) === 1}>
										{orderOf(blog.id) === 1 ? '★' : orderOf(blog.id)}
									</span>
								{/if}
								<div class="blog-thumb">
									{#if blog.imageUrl}
										<img src={blog.imageUrl} alt={blog.title} class="blog-img" />
									{:else}
										<div class="blog-img-placeholder">📄</div>
									{/if}
								</div>
								<div class="blog-info">
									<div class="blog-meta">
										<span class="blog-cat">{blog.category}</span>
										{#if blog.tag}<span class="blog-tag">{blog.tag}</span>{/if}
									</div>
									<div class="blog-title">{blog.title}</div>
									{#if blog.excerpt}
										<div class="blog-excerpt">{blog.excerpt}</div>
									{/if}
									<div class="blog-date">{formatDate(blog)}{blog.author ? ` · ${blog.author}` : ''}</div>
								</div>
							</button>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Right: Selected order -->
			<div class="panel panel-right">
				<div class="panel-header">
					<h2 class="panel-title">Tampil di Landing</h2>
					<span class="panel-count">{selectedIds.length} / {MAX_ITEMS}</span>
				</div>

				{#if orderedSelected.length === 0}
					<div class="empty-state small">
						<p>Belum dipilih.</p>
						<p class="hint">Jika dibiarkan kosong, otomatis tampil {MAX_ITEMS} blog terbaru.</p>
					</div>
				{:else}
					<div class="ordered-list">
						{#each orderedSelected as blog, i (blog.id)}
							<div class="ordered-item" class:ordered-featured={i === 0}>
								<div class="ordered-left">
									<span class="order-num" class:order-star={i === 0}>
										{i === 0 ? '★' : i + 1}
									</span>
									<div class="ordered-img-wrap">
										{#if blog.imageUrl}
											<img src={blog.imageUrl} alt={blog.title} class="ordered-img" />
										{:else}
											<div class="ordered-img-placeholder">📄</div>
										{/if}
									</div>
									<div class="ordered-info">
										{#if i === 0}<div class="ordered-featured-label">Featured</div>{/if}
										<div class="ordered-title">{blog.title}</div>
										<div class="ordered-meta">{blog.category}</div>
									</div>
								</div>
								<div class="ordered-actions">
									<button type="button" class="btn-move" onclick={() => moveUp(blog.id)} disabled={i === 0} title="Naikan">↑</button>
									<button type="button" class="btn-move" onclick={() => moveDown(blog.id)} disabled={i === orderedSelected.length - 1} title="Turunkan">↓</button>
									<button type="button" class="btn-remove" onclick={() => toggle(blog.id)} title="Hapus">✕</button>
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
	.page { display: flex; flex-direction: column; gap: 1.5rem; }
	.back-link {
		font-size: 0.8rem; color: rgba(255,255,255,0.4);
		text-decoration: none; display: inline-block; margin-bottom: 0.5rem; transition: color 0.2s;
	}
	.back-link:hover { color: #f87171; }
	.page-header {
		display: flex; align-items: flex-start;
		justify-content: space-between; flex-wrap: wrap; gap: 1rem;
	}
	.page-title {
		font-family: 'Bebas Neue', sans-serif; font-size: 2.25rem;
		color: white; margin: 0 0 0.25rem; letter-spacing: 0.04em;
	}
	.page-sub {
		color: rgba(255,255,255,0.4); font-size: 0.875rem;
		margin: 0; max-width: 44rem; line-height: 1.55;
	}
	.page-sub strong { color: rgba(255,255,255,0.65); }

	.btn-save {
		padding: 0.65rem 1.4rem; background: #dc2626; color: white;
		border: none; border-radius: 0.75rem; font-weight: 700;
		font-size: 0.9rem; cursor: pointer; font-family: inherit;
		transition: all 0.2s; flex-shrink: 0;
	}
	.btn-save:hover:not(:disabled) {
		background: #b91c1c; transform: translateY(-1px);
		box-shadow: 0 6px 16px rgba(220,38,38,0.3);
	}
	.btn-save:disabled { opacity: 0.5; cursor: not-allowed; }

	.alert-error {
		padding: 0.875rem 1rem; background: rgba(220,38,38,0.12);
		border: 1px solid rgba(220,38,38,0.25); border-radius: 0.75rem;
		color: #f87171; font-size: 0.875rem;
	}
	.alert-success {
		padding: 0.875rem 1rem; background: rgba(34,197,94,0.1);
		border: 1px solid rgba(34,197,94,0.25); border-radius: 0.75rem;
		color: #86efac; font-size: 0.875rem;
	}

	.info-box {
		display: flex; align-items: flex-start; gap: 0.75rem;
		padding: 0.875rem 1rem; background: rgba(59,130,246,0.08);
		border: 1px solid rgba(59,130,246,0.18); border-radius: 0.75rem;
		font-size: 0.82rem; color: rgba(255,255,255,0.5); line-height: 1.5;
	}
	.info-box strong { color: rgba(255,255,255,0.75); }
	.warn { color: #fcd34d !important; }

	/* Preview strip */
	.preview-strip {
		display: flex; align-items: center; flex-wrap: wrap; gap: 0.5rem;
		padding: 0.75rem 1rem;
		background: rgba(255,255,255,0.02);
		border: 1px solid rgba(255,255,255,0.06);
		border-radius: 0.75rem;
	}
	.preview-label {
		font-size: 0.72rem; color: rgba(255,255,255,0.3);
		font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em;
		margin-right: 0.25rem;
	}
	.preview-chip {
		display: flex; align-items: center; gap: 0.35rem;
		padding: 0.25rem 0.65rem;
		background: rgba(255,255,255,0.05);
		border: 1px solid rgba(255,255,255,0.08);
		border-radius: 999px; font-size: 0.72rem;
	}
	.preview-chip.featured {
		background: rgba(220,38,38,0.12);
		border-color: rgba(220,38,38,0.25);
	}
	.preview-num {
		font-weight: 800; color: rgba(255,255,255,0.35); font-size: 0.65rem;
	}
	.preview-chip.featured .preview-num { color: #f87171; }
	.preview-title {
		color: rgba(255,255,255,0.6); max-width: 140px;
		overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
	}
	.preview-tag {
		font-size: 0.6rem; font-weight: 700; background: #dc2626;
		color: white; padding: 0.1rem 0.4rem; border-radius: 999px;
		text-transform: uppercase; letter-spacing: 0.06em;
	}

	/* Layout */
	.layout {
		display: grid; grid-template-columns: 1fr 320px;
		gap: 1.25rem; align-items: start;
	}
	@media (max-width: 900px) { .layout { grid-template-columns: 1fr; } }

	/* Panels */
	.panel {
		background: rgba(255,255,255,0.02);
		border: 1px solid rgba(255,255,255,0.07);
		border-radius: 1rem; overflow: hidden;
	}
	.panel-header {
		display: flex; align-items: center; justify-content: space-between;
		padding: 1rem 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.06);
	}
	.panel-title {
		font-family: 'Bebas Neue', sans-serif; font-size: 1.25rem;
		color: white; margin: 0; letter-spacing: 0.04em;
	}
	.panel-count { font-size: 0.72rem; color: rgba(255,255,255,0.3); font-weight: 600; }

	/* Blog list rows */
	.blogs-list { display: flex; flex-direction: column; }
	.blog-row {
		position: relative; display: flex; align-items: flex-start;
		gap: 0.875rem; padding: 0.875rem 1rem;
		border-bottom: 1px solid rgba(255,255,255,0.04);
		background: none; border-left: none; border-right: none; border-top: none;
		border-radius: 0; cursor: pointer; text-align: left;
		font-family: inherit; transition: background 0.15s;
	}
	.blog-row:last-child { border-bottom: none; }
	.blog-row:hover:not(.maxed) { background: rgba(255,255,255,0.03); }
	.blog-row.selected { background: rgba(220,38,38,0.06); border-left: 2px solid #dc2626; }
	.blog-row.maxed { opacity: 0.3; cursor: not-allowed; }

	.order-badge {
		position: absolute; top: 0.6rem; left: 0.6rem;
		width: 20px; height: 20px; border-radius: 50%;
		background: #dc2626; color: white;
		font-size: 0.6rem; font-weight: 800;
		display: flex; align-items: center; justify-content: center;
		z-index: 1; line-height: 1;
	}
	.featured-badge { background: #b45309; }

	.blog-thumb {
		width: 72px; height: 54px; border-radius: 0.5rem;
		overflow: hidden; flex-shrink: 0;
	}
	.blog-img { width: 100%; height: 100%; object-fit: cover; display: block; }
	.blog-img-placeholder {
		width: 100%; height: 100%; background: rgba(255,255,255,0.05);
		display: flex; align-items: center; justify-content: center; font-size: 1.25rem;
	}
	.blog-info { flex: 1; min-width: 0; }
	.blog-meta { display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.25rem; flex-wrap: wrap; }
	.blog-cat {
		font-size: 0.65rem; font-weight: 700; color: #f87171;
		text-transform: uppercase; letter-spacing: 0.06em;
	}
	.blog-tag {
		font-size: 0.6rem; background: rgba(255,255,255,0.08);
		color: rgba(255,255,255,0.4); padding: 0.1rem 0.4rem; border-radius: 999px;
	}
	.blog-title {
		font-size: 0.82rem; font-weight: 600; color: rgba(255,255,255,0.75);
		line-height: 1.35; margin-bottom: 0.2rem;
		overflow: hidden; display: -webkit-box;
		-webkit-line-clamp: 2; -webkit-box-orient: vertical;
	}
	.blog-excerpt {
		font-size: 0.72rem; color: rgba(255,255,255,0.3);
		line-height: 1.4; margin-bottom: 0.25rem;
		overflow: hidden; display: -webkit-box;
		-webkit-line-clamp: 1; -webkit-box-orient: vertical;
	}
	.blog-date { font-size: 0.68rem; color: rgba(255,255,255,0.25); }

	/* Ordered list */
	.ordered-list { display: flex; flex-direction: column; }
	.ordered-item {
		padding: 0.75rem 0.875rem;
		border-bottom: 1px solid rgba(255,255,255,0.04);
		transition: background 0.15s;
	}
	.ordered-item:last-child { border-bottom: none; }
	.ordered-item:hover { background: rgba(255,255,255,0.02); }
	.ordered-item.ordered-featured {
		background: rgba(220,38,38,0.05);
		border-left: 2px solid rgba(220,38,38,0.4);
	}
	.ordered-left { display: flex; align-items: center; gap: 0.55rem; margin-bottom: 0.5rem; }
	.order-num {
		font-family: 'Bebas Neue', sans-serif; font-size: 1.25rem;
		color: rgba(255,255,255,0.3); width: 20px; flex-shrink: 0; line-height: 1;
	}
	.order-num.order-star { color: #dc2626; font-size: 1rem; }
	.ordered-img-wrap {
		width: 40px; height: 30px; border-radius: 0.3rem;
		overflow: hidden; flex-shrink: 0;
	}
	.ordered-img { width: 100%; height: 100%; object-fit: cover; }
	.ordered-img-placeholder {
		width: 100%; height: 100%; background: rgba(255,255,255,0.04);
		display: flex; align-items: center; justify-content: center; font-size: 0.75rem;
	}
	.ordered-info { flex: 1; min-width: 0; }
	.ordered-featured-label {
		font-size: 0.6rem; font-weight: 700; color: #dc2626;
		text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 1px;
	}
	.ordered-title {
		font-size: 0.72rem; font-weight: 600; color: rgba(255,255,255,0.7);
		white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
	}
	.ordered-meta { font-size: 0.62rem; color: rgba(255,255,255,0.28); text-transform: uppercase; letter-spacing: 0.05em; }
	.ordered-actions { display: flex; gap: 0.2rem; justify-content: flex-end; }
	.btn-move {
		width: 24px; height: 24px; background: rgba(255,255,255,0.06);
		border: 1px solid rgba(255,255,255,0.1); border-radius: 0.3rem;
		color: rgba(255,255,255,0.5); font-size: 0.7rem; cursor: pointer;
		font-family: inherit; display: flex; align-items: center;
		justify-content: center; transition: all 0.15s; padding: 0;
	}
	.btn-move:hover:not(:disabled) { background: rgba(255,255,255,0.12); color: white; }
	.btn-move:disabled { opacity: 0.25; cursor: not-allowed; }
	.btn-remove {
		width: 24px; height: 24px; background: rgba(220,38,38,0.1);
		border: 1px solid rgba(220,38,38,0.2); border-radius: 0.3rem;
		color: #f87171; font-size: 0.65rem; cursor: pointer;
		font-family: inherit; display: flex; align-items: center;
		justify-content: center; transition: all 0.15s; padding: 0;
	}
	.btn-remove:hover { background: rgba(220,38,38,0.2); }

	/* Skeleton */
	.skeleton-grid {
		display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 0.75rem;
	}
	.skeleton-card {
		height: 80px; border-radius: 0.75rem;
		background: linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.07) 50%,rgba(255,255,255,0.04) 75%);
		background-size: 200% 100%; animation: shimmer 1.5s infinite;
	}
	@keyframes shimmer {
		0% { background-position: 200% 0; }
		100% { background-position: -200% 0; }
	}

	.empty-state {
		padding: 2.5rem; text-align: center;
		color: rgba(255,255,255,0.3); font-size: 0.85rem;
	}
	.empty-state.small { padding: 1.5rem; }
	.hint { font-size: 0.75rem; color: rgba(255,255,255,0.2); margin-top: 0.35rem; }
	.link { color: #f87171; text-decoration: none; }
	.link:hover { text-decoration: underline; }
</style>
