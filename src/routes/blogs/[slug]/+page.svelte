<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { getBlogBySlug, getBlogs, type Blog } from '$lib/firebase/blogs';

	const slug = $derived(page.params.slug);

	let blog = $state<Blog | null>(null);
	let relatedBlogs = $state<Blog[]>([]);
	let loading = $state(true);
	let error = $state('');

	// Parse konten: pisah berdasarkan baris kosong ganda → paragraf & sub-heading
	let paragraphs = $derived(
		blog?.content
			?.split(/\n\n+/)
			.map((p) => p.trim())
			.filter(Boolean) ?? []
	);

	function isHeading(text: string): boolean {
		// Baris pendek yang tidak diakhiri titik = kemungkinan heading
		return text.length < 80 && !text.endsWith('.') && !text.endsWith(',');
	}

	function formatDate(ts: any): string {
		if (!ts?.seconds) return '';
		return new Date(ts.seconds * 1000).toLocaleDateString('id-ID', {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}

	onMount(async () => {
		try {
			const [found, all] = await Promise.all([getBlogBySlug(slug || ''), getBlogs()]);
			if (!found) {
				error = 'Artikel tidak ditemukan.';
				return;
			}
			blog = found;
			// Related: same category, exclude current
			relatedBlogs = all
				.filter((b) => b.id !== found.id && b.category === found.category)
				.slice(0, 3);
		} catch {
			error = 'Gagal memuat artikel.';
		} finally {
			loading = false;
		}
	});
</script>

<svelte:head>
	{#if blog}
		<title>{blog.title} — Redline Communication</title>
		<meta name="description" content={blog.excerpt} />
		<meta property="og:title" content={blog.title} />
		<meta property="og:description" content={blog.excerpt} />
		{#if blog.imageUrl}
			<meta property="og:image" content={blog.imageUrl} />
		{/if}
	{:else}
		<title>Artikel — Redline Communication</title>
	{/if}
</svelte:head>

<div class="article-page">
	<!-- BG -->
	<div class="article-bg" aria-hidden="true">
		<div class="bg-orb bg-orb1"></div>
	</div>
	<div class="article-dots" aria-hidden="true"></div>

	{#if loading}
		<!-- Skeleton -->
		<div class="article-container">
			<div class="skeleton-header">
				<div class="sk-line short"></div>
				<div class="sk-line title"></div>
				<div class="sk-line medium"></div>
			</div>
			<div class="sk-hero-img"></div>
			<div class="sk-body">
				{#each Array(6) as _}
					<div class="sk-line"></div>
				{/each}
			</div>
		</div>

	{:else if error}
		<div class="article-container">
			<div class="article-error">
				<p>😔 {error}</p>
				<a href="/blogs" class="error-link">← Kembali ke Blog</a>
			</div>
		</div>

	{:else if blog}
		<!-- Hero Image -->
		{#if blog.imageUrl}
			<div class="article-hero">
				<img src={blog.imageUrl} alt={blog.title} class="article-hero-img" />
				<div class="article-hero-overlay"></div>
			</div>
		{/if}

		<div class="article-container">
			<!-- Breadcrumb -->
			<nav class="article-breadcrumb">
				<a href="/" class="bc-link">Home</a>
				<span class="bc-sep">›</span>
				<a href="/blogs" class="bc-link">Blog</a>
				<span class="bc-sep">›</span>
				<span class="bc-current">{blog.category}</span>
			</nav>

			<!-- Header -->
			<header class="article-header">
				<div class="article-badges">
					<span class="badge-cat">{blog.category}</span>
					{#if blog.tag}
						<span class="badge-tag">{blog.tag}</span>
					{/if}
				</div>
				<h1 class="article-title">{blog.title}</h1>
				<p class="article-excerpt">{blog.excerpt}</p>
				<div class="article-meta">
					<span class="meta-author">✍️ {blog.author}</span>
					<span class="meta-sep">·</span>
					<span class="meta-date">{formatDate(blog.publishedAt)}</span>
					{#if blog.readTime}
						<span class="meta-sep">·</span>
						<span class="meta-read">⏱️ {blog.readTime}</span>
					{/if}
				</div>
			</header>

			<!-- Divider -->
			<div class="article-divider"></div>

			<!-- Content -->
			<article class="article-content">
				{#each paragraphs as para}
					{#if isHeading(para)}
						<h2 class="content-heading">{para}</h2>
					{:else}
						<p class="content-para">{para}</p>
					{/if}
				{/each}
			</article>

			<!-- Divider -->
			<div class="article-divider"></div>

			<!-- Author box -->
			<div class="author-box">
				<div class="author-avatar">
					{blog.author.charAt(0).toUpperCase()}
				</div>
				<div class="author-info">
					<div class="author-name">{blog.author}</div>
					<div class="author-role">Tim Redline Communication</div>
				</div>
			</div>

			<!-- Back -->
			<div class="article-back">
				<a href="/blogs" class="back-btn">← Kembali ke Blog</a>
			</div>

			<!-- Related -->
			{#if relatedBlogs.length > 0}
				<div class="related-section">
					<h3 class="related-title">Artikel Terkait</h3>
					<div class="related-grid">
						{#each relatedBlogs as rel}
							<a href="/blogs/{rel.slug}" class="related-card">
								{#if rel.imageUrl}
									<img src={rel.imageUrl} alt={rel.title} class="related-img" loading="lazy" />
								{:else}
									<div class="related-img-placeholder">📷</div>
								{/if}
								<div class="related-body">
									<span class="related-cat">{rel.category}</span>
									<div class="related-card-title">{rel.title}</div>
								</div>
							</a>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	/* ── Page ── */
	.article-page {
		position: relative;
		background: var(--background, #050505);
		min-height: 100vh;
		padding-bottom: 80px;
		overflow: hidden;
	}

	/* ── BG ── */
	.article-bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
	.bg-orb { position: absolute; border-radius: 50%; filter: blur(130px); pointer-events: none; }
	.bg-orb1 {
		width: 70vw; height: 70vw; top: -20%; left: 50%; transform: translateX(-50%);
		background: radial-gradient(circle, rgba(220,38,38,0.06) 0%, transparent 70%);
	}
	.article-dots {
		position: absolute; inset: 0; z-index: 0; pointer-events: none;
		background-image: radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px);
		background-size: 30px 30px;
	}

	/* ── Hero Image ── */
	.article-hero {
		position: relative; width: 100%; height: clamp(240px, 40vw, 480px); overflow: hidden;
	}
	.article-hero-img { width: 100%; height: 100%; object-fit: cover; }
	.article-hero-overlay {
		position: absolute; inset: 0;
		background: linear-gradient(to bottom, rgba(5,5,5,0.2) 0%, rgba(5,5,5,0.8) 100%);
	}

	/* ── Container ── */
	.article-container {
		position: relative; z-index: 2;
		max-width: 780px; margin: 0 auto;
		padding: 2rem 1.5rem 0;
	}

	/* ── Breadcrumb ── */
	.article-breadcrumb {
		display: flex; align-items: center; gap: 0.5rem;
		font-size: 0.78rem; color: rgba(255,255,255,0.35);
		margin-bottom: 1.5rem; margin-top: 1rem;
	}
	.bc-link { color: rgba(255,255,255,0.35); text-decoration: none; transition: color 0.2s; }
	.bc-link:hover { color: #f87171; }
	.bc-sep { color: rgba(255,255,255,0.2); }
	.bc-current { color: rgba(255,255,255,0.55); }

	/* ── Header ── */
	.article-header { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem; }
	.article-badges { display: flex; gap: 0.5rem; flex-wrap: wrap; }
	.badge-cat {
		display: inline-block; padding: 4px 12px; border-radius: 100px;
		background: var(--primary, #dc2626); color: white; font-size: 0.75rem; font-weight: 700;
	}
	.badge-tag {
		display: inline-block; padding: 4px 12px; border-radius: 100px;
		background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.6);
		font-size: 0.75rem; font-weight: 600; border: 1px solid rgba(255,255,255,0.12);
	}
	.article-title {
		font-family: 'Bebas Neue', sans-serif;
		font-size: clamp(2rem, 5vw, 3.25rem);
		color: white; margin: 0; line-height: 1.1;
	}
	.article-excerpt {
		font-size: 1.05rem; color: rgba(255,255,255,0.5);
		line-height: 1.7; margin: 0;
	}
	.article-meta {
		display: flex; align-items: center; flex-wrap: wrap;
		gap: 0.5rem; font-size: 0.82rem; color: rgba(255,255,255,0.4);
	}
	.meta-author { color: rgba(255,255,255,0.5); }
	.meta-sep { color: rgba(255,255,255,0.2); }

	/* ── Divider ── */
	.article-divider {
		height: 1px; background: rgba(255,255,255,0.07);
		margin: 1.75rem 0;
	}

	/* ── Content ── */
	.article-content { display: flex; flex-direction: column; gap: 1.25rem; }
	.content-heading {
		font-family: 'Bebas Neue', sans-serif;
		font-size: 1.5rem; color: white;
		margin: 0.5rem 0 0; letter-spacing: 0.02em;
		border-left: 3px solid var(--primary, #dc2626); padding-left: 0.875rem;
	}
	.content-para {
		font-size: 1rem; color: rgba(255,255,255,0.72);
		line-height: 1.85; margin: 0;
	}

	/* ── Author Box ── */
	.author-box {
		display: flex; align-items: center; gap: 1rem;
		background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
		border-radius: 1rem; padding: 1.125rem;
	}
	.author-avatar {
		width: 48px; height: 48px; border-radius: 50%;
		background: var(--primary, #dc2626);
		display: flex; align-items: center; justify-content: center;
		font-family: 'Bebas Neue', sans-serif; font-size: 1.25rem;
		color: white; flex-shrink: 0;
	}
	.author-name { font-weight: 700; color: white; font-size: 0.95rem; }
	.author-role { font-size: 0.78rem; color: rgba(255,255,255,0.4); margin-top: 2px; }

	/* ── Back ── */
	.article-back { margin-top: 1.5rem; }
	.back-btn {
		display: inline-flex; align-items: center; gap: 0.5rem;
		padding: 0.6rem 1.25rem; background: rgba(255,255,255,0.05);
		border: 1px solid rgba(255,255,255,0.1); border-radius: 100px;
		color: rgba(255,255,255,0.55); text-decoration: none;
		font-size: 0.875rem; transition: all 0.2s;
	}
	.back-btn:hover {
		background: rgba(220,38,38,0.1); border-color: rgba(220,38,38,0.3);
		color: #f87171;
	}

	/* ── Related ── */
	.related-section { margin-top: 3rem; }
	.related-title {
		font-family: 'Bebas Neue', sans-serif; font-size: 1.5rem;
		color: white; margin: 0 0 1.25rem; letter-spacing: 0.04em;
	}
	.related-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; }
	.related-card {
		display: flex; flex-direction: column; gap: 0.75rem;
		background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
		border-radius: 0.875rem; overflow: hidden; text-decoration: none;
		transition: all 0.25s;
	}
	.related-card:hover { border-color: var(--primary, #dc2626); transform: translateY(-2px); }
	.related-img { width: 100%; height: 130px; object-fit: cover; }
	.related-img-placeholder {
		height: 130px; display: flex; align-items: center; justify-content: center;
		background: rgba(255,255,255,0.04); font-size: 2rem;
	}
	.related-body { padding: 0 0.875rem 0.875rem; display: flex; flex-direction: column; gap: 0.375rem; }
	.related-cat { font-size: 0.68rem; color: #f87171; font-weight: 700; text-transform: uppercase; }
	.related-card-title { font-size: 0.85rem; color: white; font-weight: 600; line-height: 1.3; }

	/* ── Skeleton ── */
	.skeleton-header { padding: 2rem 0 1.5rem; display: flex; flex-direction: column; gap: 0.875rem; }
	.sk-line {
		height: 14px; border-radius: 4px;
		background: rgba(255,255,255,0.06); animation: shimmer 1.5s infinite;
	}
	.sk-line.short { width: 30%; }
	.sk-line.title { height: 40px; width: 90%; }
	.sk-line.medium { width: 60%; }
	.sk-hero-img {
		width: 100%; height: 260px; border-radius: 1rem;
		background: rgba(255,255,255,0.06); animation: shimmer 1.5s infinite; margin-bottom: 1.5rem;
	}
	.sk-body { display: flex; flex-direction: column; gap: 0.75rem; }
	@keyframes shimmer { 0%,100%{opacity:0.5} 50%{opacity:1} }

	/* ── Error ── */
	.article-error { text-align: center; padding: 4rem; color: rgba(255,255,255,0.4); }
	.error-link {
		display: inline-block; margin-top: 1rem; color: #f87171; text-decoration: none;
		font-weight: 600;
	}
</style>
