<script lang="ts">
	import { onMount } from 'svelte';
	import { getBlogs, type Blog } from '$lib/firebase/blogs';
	import Seo from '$lib/components/seo/Seo.svelte';
	import { breadcrumbSchema } from '$lib/seo/schemas';

	let blogs = $state<Blog[]>([]);
	let loading = $state(true);
	let error = $state('');
	let activeCategory = $state('Semua');
	let searchQuery = $state('');

	let categories = $derived(['Semua', ...new Set(blogs.map((b) => b.category))]);

	let filtered = $derived(
		blogs.filter((b) => {
			const matchCat = activeCategory === 'Semua' || b.category === activeCategory;
			const matchSearch =
				!searchQuery.trim() ||
				b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				b.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
			return matchCat && matchSearch;
		})
	);

	onMount(async () => {
		try {
			blogs = await getBlogs();
		} catch {
			error = 'Gagal memuat artikel. Silakan refresh.';
		} finally {
			loading = false;
		}
	});

	function formatDate(ts: any) {
		if (!ts?.seconds) return '';
		return new Date(ts.seconds * 1000).toLocaleDateString('id-ID', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}

	let sectionEl: HTMLElement;
	let hasEntered = $state(false);

	onMount(() => {
		if (!sectionEl) return;
		const obs = new IntersectionObserver(
			(entries) => { if (entries[0].isIntersecting) hasEntered = true; },
			{ threshold: 0.05 }
		);
		obs.observe(sectionEl);
		return () => obs.disconnect();
	});
</script>

<Seo
	title="Blog & Insight Event Organizer | Redline Communication Padang"
	description="Tips, tren, dan studi kasus seputar event organizer, event production, MICE, dan strategic communication dari tim EO Padang - Redline Communication."
	jsonLd={breadcrumbSchema([{ name: 'Home', url: 'https://redlinecomunication.com' }, { name: 'Blog', url: 'https://redlinecomunication.com/blogs' }])}
/>

<section class="blogs-page" bind:this={sectionEl}>
	<!-- BG decoration -->
	<div class="blogs-bg" aria-hidden="true">
		<div class="bg-orb bg-orb1"></div>
		<div class="bg-orb bg-orb2"></div>
	</div>
	<div class="blogs-dots" aria-hidden="true"></div>

	<div class="blogs-inner">
		<!-- Header -->
		<header class="blogs-header" class:entered={hasEntered}>
			<div class="blogs-breadcrumb">
				<a href="/" class="breadcrumb-link">Home</a>
				<span class="breadcrumb-sep">›</span>
				<span class="breadcrumb-current">Blog & Insight</span>
			</div>
			<h1 class="blogs-title">
				Blog <span class="blogs-title-accent">&amp; Insight</span>
			</h1>
			<p class="blogs-subtitle">
				Tips, tren, dan studi kasus seputar event organizer, MICE, dan strategic communication.
			</p>
		</header>

		<!-- Search & Filter -->
		<div class="filter-bar" class:entered={hasEntered}>
			<div class="search-wrap">
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Cari artikel..."
					class="search-input"
				/>
				<span class="search-icon">🔍</span>
			</div>
			<div class="cat-tabs">
				{#each categories as cat}
					<button
						class="cat-tab"
						class:active={activeCategory === cat}
						onclick={() => (activeCategory = cat)}
					>
						{cat}
					</button>
				{/each}
			</div>
		</div>

		<!-- Error -->
		{#if error}
			<div class="blogs-error">{error}</div>
		{/if}

		<!-- Loading Skeleton -->
		{#if loading}
			<div class="blogs-grid">
				{#each Array(6) as _}
					<div class="skeleton-card">
						<div class="skeleton-img"></div>
						<div class="skeleton-body">
							<div class="skeleton-line short"></div>
							<div class="skeleton-line"></div>
							<div class="skeleton-line medium"></div>
						</div>
					</div>
				{/each}
			</div>

		<!-- Grid Blog -->
		{:else if filtered.length > 0}
			<div class="blogs-grid" class:entered={hasEntered}>
				{#each filtered as blog, i (blog.id)}
					<a
						href="/blogs/{blog.slug}"
						class="blog-card"
						style="animation-delay: {i * 60}ms"
					>
						<div class="card-img-wrap">
							{#if blog.imageUrl}
								<img
									src={blog.imageUrl}
									alt={blog.title}
									class="card-img"
									loading="lazy"
								/>
							{:else}
								<div class="card-img-placeholder">
									<span>📷</span>
								</div>
							{/if}
							<div class="card-img-overlay"></div>
							<span class="card-cat-badge">{blog.category}</span>
							{#if blog.tag}
								<span class="card-tag-badge">{blog.tag}</span>
							{/if}
						</div>

						<div class="card-body">
							<div class="card-meta">
								<span class="card-date">{formatDate(blog.publishedAt)}</span>
								{#if blog.readTime}
									<span class="card-sep">·</span>
									<span class="card-read">{blog.readTime}</span>
								{/if}
							</div>
							<h2 class="card-title">{blog.title}</h2>
							<p class="card-excerpt">{blog.excerpt}</p>
							<div class="card-footer">
								<span class="card-author">✍️ {blog.author}</span>
								<span class="card-read-more">Baca →</span>
							</div>
						</div>
					</a>
				{/each}
			</div>

		<!-- Empty -->
		{:else}
			<div class="blogs-empty">
				<div class="empty-icon">🔍</div>
				<p>
					{searchQuery || activeCategory !== 'Semua'
						? 'Tidak ditemukan artikel yang cocok.'
						: 'Belum ada artikel dipublikasi.'}
				</p>
			</div>
		{/if}
	</div>
</section>

<style>
	/* ── Base ── */
	.blogs-page {
		position: relative;
		min-height: 100vh;
		background: var(--background, #050505);
		overflow: hidden;
		padding: 100px 0 80px;
	}

	/* ── BG ── */
	.blogs-bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
	.bg-orb {
		position: absolute; border-radius: 50%;
		filter: blur(120px); pointer-events: none;
	}
	.bg-orb1 {
		width: 60vw; height: 60vw; top: -20%; right: -15%;
		background: radial-gradient(circle, rgba(220,38,38,0.06) 0%, transparent 70%);
	}
	.bg-orb2 {
		width: 45vw; height: 45vw; bottom: -10%; left: -10%;
		background: radial-gradient(circle, rgba(220,38,38,0.04) 0%, transparent 70%);
	}
	.blogs-dots {
		position: absolute; inset: 0; z-index: 0; pointer-events: none;
		background-image: radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px);
		background-size: 30px 30px;
	}

	/* ── Inner ── */
	.blogs-inner {
		position: relative; z-index: 2;
		max-width: 1200px; margin: 0 auto;
		padding: 0 1.5rem;
		display: flex; flex-direction: column; gap: 2.5rem;
	}

	/* ── Header ── */
	.blogs-header {
		opacity: 0; transform: translateY(24px);
		transition: opacity 0.7s ease, transform 0.7s ease;
	}
	.blogs-header.entered { opacity: 1; transform: translateY(0); }

	.blogs-breadcrumb {
		display: flex; align-items: center; gap: 0.5rem;
		font-size: 0.8rem; color: rgba(255,255,255,0.35);
		margin-bottom: 1.25rem;
	}
	.breadcrumb-link { color: rgba(255,255,255,0.35); text-decoration: none; transition: color 0.2s; }
	.breadcrumb-link:hover { color: #f87171; }
	.breadcrumb-sep { color: rgba(255,255,255,0.2); }
	.breadcrumb-current { color: rgba(255,255,255,0.55); }

	.blogs-title {
		font-family: 'Bebas Neue', sans-serif;
		font-size: clamp(3rem, 7vw, 5rem);
		line-height: 1; color: white; margin: 0 0 1rem;
		text-transform: uppercase;
	}
	.blogs-title-accent { color: var(--primary, #dc2626); }
	.blogs-subtitle {
		font-size: 1.1rem; color: rgba(255,255,255,0.45);
		max-width: 550px; margin: 0; line-height: 1.7;
	}

	/* ── Filter bar ── */
	.filter-bar {
		display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;
		opacity: 0; transform: translateY(16px);
		transition: opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s;
	}
	.filter-bar.entered { opacity: 1; transform: translateY(0); }

	.search-wrap { position: relative; }
	.search-input {
		padding: 0.6rem 2.25rem 0.6rem 1rem;
		background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
		border-radius: 100px; color: white; font-family: inherit; font-size: 0.875rem;
		outline: none; transition: border-color 0.2s; width: 220px;
	}
	.search-input:focus { border-color: rgba(220,38,38,0.4); }
	.search-icon {
		position: absolute; right: 0.75rem; top: 50%;
		transform: translateY(-50%); font-size: 0.8rem; pointer-events: none;
	}
	.cat-tabs { display: flex; flex-wrap: wrap; gap: 0.5rem; }
	.cat-tab {
		padding: 0.45rem 1rem; border-radius: 100px; font-size: 0.8rem;
		font-weight: 600; border: 1px solid rgba(255,255,255,0.1);
		background: transparent; color: rgba(255,255,255,0.5);
		cursor: pointer; transition: all 0.2s; font-family: inherit;
	}
	.cat-tab:hover { border-color: rgba(220,38,38,0.4); color: white; }
	.cat-tab.active {
		background: var(--primary, #dc2626); border-color: var(--primary, #dc2626);
		color: white;
	}

	/* ── Grid ── */
	.blogs-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1.5rem;
		opacity: 0; transform: translateY(24px);
		transition: opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s;
	}
	.blogs-grid.entered { opacity: 1; transform: translateY(0); }

	/* ── Card ── */
	.blog-card {
		display: flex; flex-direction: column;
		background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
		border-radius: 1.25rem; overflow: hidden; text-decoration: none;
		transition: all 0.35s ease;
		animation: fadeSlideUp 0.6s ease both;
	}
	.blog-card:hover {
		border-color: var(--primary, #dc2626);
		transform: translateY(-4px);
		background: rgba(255,255,255,0.05);
		box-shadow: 0 16px 40px rgba(220,38,38,0.1);
	}
	@keyframes fadeSlideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

	.card-img-wrap {
		position: relative; height: 200px; overflow: hidden;
	}
	.card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
	.blog-card:hover .card-img { transform: scale(1.05); }
	.card-img-placeholder {
		width: 100%; height: 100%; background: rgba(255,255,255,0.04);
		display: flex; align-items: center; justify-content: center; font-size: 2.5rem;
	}
	.card-img-overlay {
		position: absolute; inset: 0;
		background: linear-gradient(to top, rgba(5,5,5,0.7) 0%, transparent 50%);
	}
	.card-cat-badge {
		position: absolute; top: 0.875rem; left: 0.875rem;
		background: var(--primary, #dc2626); color: white; padding: 3px 10px;
		border-radius: 100px; font-size: 0.7rem; font-weight: 700;
	}
	.card-tag-badge {
		position: absolute; top: 0.875rem; right: 0.875rem;
		background: rgba(0,0,0,0.6); color: rgba(255,255,255,0.7); padding: 3px 10px;
		border-radius: 100px; font-size: 0.7rem; font-weight: 600;
		border: 1px solid rgba(255,255,255,0.15);
	}

	.card-body { flex: 1; padding: 1.25rem; display: flex; flex-direction: column; gap: 0.625rem; }
	.card-meta { display: flex; align-items: center; gap: 0.4rem; font-size: 0.75rem; color: rgba(255,255,255,0.35); }
	.card-sep { color: rgba(255,255,255,0.2); }
	.card-title {
		font-family: 'Bebas Neue', sans-serif; font-size: 1.3rem;
		color: white; margin: 0; line-height: 1.25;
		transition: color 0.2s;
	}
	.blog-card:hover .card-title { color: #f87171; }
	.card-excerpt { font-size: 0.85rem; color: rgba(255,255,255,0.45); line-height: 1.6; margin: 0; flex: 1; }
	.card-footer {
		display: flex; align-items: center; justify-content: space-between;
		margin-top: 0.25rem; padding-top: 0.75rem;
		border-top: 1px solid rgba(255,255,255,0.06); font-size: 0.75rem;
	}
	.card-author { color: rgba(255,255,255,0.35); }
	.card-read-more { color: var(--primary, #dc2626); font-weight: 600; }

	/* ── Skeleton ── */
	.skeleton-card { border-radius: 1.25rem; overflow: hidden; border: 1px solid rgba(255,255,255,0.06); }
	.skeleton-img { height: 200px; background: rgba(255,255,255,0.05); animation: shimmer 1.5s infinite; }
	.skeleton-body { padding: 1.25rem; display: flex; flex-direction: column; gap: 0.75rem; }
	.skeleton-line { height: 14px; border-radius: 4px; background: rgba(255,255,255,0.05); animation: shimmer 1.5s infinite; }
	.skeleton-line.short { width: 40%; }
	.skeleton-line.medium { width: 70%; }
	@keyframes shimmer { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }

	/* ── Empty / Error ── */
	.blogs-empty { text-align: center; padding: 4rem; color: rgba(255,255,255,0.35); }
	.empty-icon { font-size: 3rem; margin-bottom: 1rem; }
	.blogs-error {
		padding: 1rem; background: rgba(220,38,38,0.1); border: 1px solid rgba(220,38,38,0.2);
		border-radius: 0.75rem; color: #f87171; text-align: center;
	}
</style>
