<script lang="ts">
	import { onMount } from 'svelte';
	import { getLatestBlogs, type Blog } from '$lib/firebase/blogs';

	const fallbackPosts = [
		{
			id: '1',
			category: 'Event Organizer',
			tag: 'Featured',
			title: 'Bagaimana Kami Mengelola Event 5.000 Peserta di Padang dengan Zero Incident',
			excerpt: 'Studi kasus lengkap tentang manajemen risiko, koordinasi tim, dan eksekusi event berskala besar yang sukses bersama Redline Communication.',
			date: '12 Maret 2025',
			readTime: '8 min read',
			imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
			author: 'Tim Redline',
			slug: ''
		},
		{
			id: '2',
			category: 'MICE',
			tag: 'Tips',
			title: 'Checklist Lengkap Persiapan MICE yang Wajib Anda Miliki',
			excerpt: 'Panduan step-by-step dari venue selection hingga post-event report untuk meeting, incentive, conference, dan exhibition.',
			date: '5 Maret 2025',
			readTime: '5 min read',
			imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80',
			author: 'Sarah R.',
			slug: ''
		},
		{
			id: '3',
			category: 'Production',
			tag: 'Insight',
			title: 'Tren Stage Production 2025: LED Wall vs Hologram',
			excerpt: 'Breakdown perbandingan teknologi visual terkini untuk event produksi — mana yang lebih impactful untuk brand anda.',
			date: '28 Feb 2025',
			readTime: '6 min read',
			imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80',
			author: 'Andi P.',
			slug: ''
		},
		{
			id: '4',
			category: 'Branding',
			tag: 'Case Study',
			title: 'Product Launch Spektakuler: Strategi yang Membuat 10.000 Orang Hadir',
			excerpt: 'Bagaimana strategi komunikasi yang tepat mampu mendrive attendance jauh melampaui target awal.',
			date: '20 Feb 2025',
			readTime: '7 min read',
			imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80',
			author: 'Tim Redline',
			slug: ''
		}
	];

	let posts = $state<any[]>(fallbackPosts);
	let sectionEl: HTMLElement;
	let hasEntered = $state(false);

	onMount(() => {
		const obs = new IntersectionObserver(
			(entries) => { if (entries[0].isIntersecting) hasEntered = true; },
			{ threshold: 0.1 }
		);
		if (sectionEl) obs.observe(sectionEl);

		getLatestBlogs(4).then(latest => {
			if (latest && latest.length > 0) {
				posts = latest.map((b) => ({
					id: b.id,
					category: b.category,
					tag: b.tag,
					title: b.title,
					excerpt: b.excerpt,
					date: b.publishedAt?.seconds 
						? new Date(b.publishedAt.seconds * 1000).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
						: '',
					readTime: b.readTime,
					imageUrl: b.imageUrl,
					author: b.author,
					slug: b.slug
				}));
			}
		}).catch(e => {
			console.error('Failed to load recent blogs', e);
		});

		return () => obs.disconnect();
	});
</script>

<section id="blogs" class="is" bind:this={sectionEl}>
	<div class="is-bg" aria-hidden="true">
		<div class="is-bg-orb is-bg-orb1"></div>
		<div class="is-bg-orb is-bg-orb2"></div>
	</div>
	<div class="is-dots" aria-hidden="true"></div>

	<div class="is-inner">
		<header class="is-header" class:entered={hasEntered}>
			<div class="is-header-left">
				<h2 class="is-title uppercase">
					Insight <span class="is-title-accent">& Post</span>
				</h2>
				<p class="is-subtitle">
					Tips, tren, dan studi kasus seputar event organizer, MICE, dan strategic communication.
				</p>
			</div>
			<div class="is-header-right">
				<a href="/blogs" class="is-all-btn">
					<span>Lihat Semua</span>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>
		</header>

		<div class="is-grid" class:entered={hasEntered}>
			{#if posts.length > 0}
			<a href={posts[0].slug ? `/blogs/${posts[0].slug}` : '#'} class="is-featured cursor-pointer block no-underline">
				<div class="is-featured-img-wrap">
					<img src={posts[0].imageUrl} alt={posts[0].title} class="is-featured-img" loading="lazy" />
				</div>
				<div class="is-featured-body">
					<div class="is-featured-meta">
						<span class="is-cat-badge">{posts[0].category}</span>
						<span class="is-meta-date">{posts[0].date}</span>
					</div>
					<h3 class="is-featured-title">{posts[0].title}</h3>
					<p class="is-featured-excerpt">{posts[0].excerpt}</p>
				</div>
			</a>
			{/if}

			<div class="is-side-posts">
				{#each posts.slice(1) as post}
					<a href={post.slug ? `/blogs/${post.slug}` : '#'} class="is-card cursor-pointer block no-underline text-current">
						<div class="is-card-thumb">
							<img src={post.imageUrl} alt={post.title} class="is-card-img" loading="lazy" />
						</div>
						<div class="is-card-body">
							<div class="is-card-meta">{post.category} • {post.date}</div>
							<h3 class="is-card-title">{post.title}</h3>
						</div>
					</a>
				{/each}
			</div>
		</div>

		<div class="is-ticker" class:entered={hasEntered}>
			<div class="is-ticker-label">TERBARU</div>
			<div class="is-ticker-track">
				{#each [...posts, ...posts] as post}
					<div class="is-ticker-item">
						<span style="color: var(--primary)">{post.category}</span>
						<span>{post.title}</span>
						<span>◆</span>
					</div>
				{/each} 
			</div>
		</div>
	</div>
</section>

<style>
	/* ── Base ── */
	.is {
		font-family: 'Outfit', sans-serif;
		position: relative;
		background: var(--background);
		overflow: hidden;
		padding: 80px 0;
	}

	/* ── BG ── */
	.is-bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
	.is-bg-orb {
		position: absolute; border-radius: 50%;
		filter: blur(100px); pointer-events: none;
	}
	.is-bg-orb1 {
		width: 55vw; height: 55vw; top: -20%; right: -10%;
		background: radial-gradient(circle, rgba(220,38,38,0.05) 0%, transparent 70%);
	}
	.is-bg-orb2 {
		width: 40vw; height: 40vw; bottom: -15%; left: -8%;
		background: radial-gradient(circle, rgba(220,38,38,0.04) 0%, transparent 70%);
	}

	.is-dots {
		position: absolute; inset: 0; z-index: 0; pointer-events: none;
		background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
		background-size: 30px 30px;
	}

	/* ── Inner ── */
	.is-inner {
		position: relative; z-index: 2;
		max-width: 1200px; margin: 0 auto;
		padding: 0 1.5rem;
	}

	/* ── Header ── */
	.is-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		margin-bottom: 52px;
		gap: 24px;
		flex-wrap: wrap;
		opacity: 0;
		transform: translateY(24px);
		transition: opacity 0.7s ease, transform 0.7s ease;
	}
	.is-header.entered { opacity: 1; transform: translateY(0); }

	.is-title {
		font-family: var(--font-display);
		font-size: clamp(3rem, 6vw, 4.5rem);
		line-height: 1;
		color: white;
		margin: 0 0 16px;
	}
	.is-title-accent {
		color: var(--primary);
	}

	.is-subtitle {
		font-size: 1.125rem;
		color: rgba(255, 255, 255, 0.5);
		max-width: 600px;
		margin: 0;
	}

	.is-all-btn {
		display: inline-flex; align-items: center; gap: 8px;
		padding: 12px 24px;
		background: var(--primary); color: white;
		border-radius: 100px; text-decoration: none;
		transition: all 0.3s ease;
	}
	.is-all-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 20px rgba(220, 38, 38, 0.2);
	}

	/* ── Main grid ── */
	.is-grid {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: 2rem;
		opacity: 0;
		transform: translateY(28px);
		transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
	}
	@media (min-width: 1024px) {
		.is-grid { grid-template-columns: 1.2fr 0.8fr; }
	}
	.is-grid.entered { opacity: 1; transform: translateY(0); }

	/* ── FEATURED ── */
	.is-featured {
		position: relative;
		border-radius: 2rem;
		overflow: hidden;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.08);
		cursor: pointer;
		transition: all 0.4s ease;
	}
	.is-featured:hover {
		border-color: var(--primary);
		background: rgba(255, 255, 255, 0.05);
	}

	.is-featured-img-wrap {
		position: relative; height: 320px; overflow: hidden;
	}
	.is-featured-img {
		width: 100%; height: 100%; object-fit: cover;
	}

	.is-featured-body {
		padding: 2rem;
	}
	.is-featured-meta {
		display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem;
	}
	.is-cat-badge {
		background: var(--primary); color: white; padding: 4px 12px; border-radius: 100px; font-size: 0.75rem; font-weight: bold;
	}
	.is-meta-date {
		color: rgba(255, 255, 255, 0.4); font-size: 0.875rem;
	}
	.is-featured-title {
		font-family: var(--font-display);
		font-size: 2rem;
		color: white;
		margin-bottom: 1rem;
		line-height: 1.2;
	}
	.is-featured-excerpt {
		color: rgba(255, 255, 255, 0.5);
		margin-bottom: 2rem;
		line-height: 1.6;
	}

	/* ── Side posts ── */
	.is-side-posts {
		display: flex; flex-direction: column; gap: 1.5rem;
	}

	.is-card {
		display: flex; gap: 1.5rem;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 1.5rem;
		padding: 1rem;
		transition: all 0.3s ease;
	}
	.is-card:hover { border-color: var(--primary); background: rgba(255, 255, 255, 0.05); }

	.is-card-thumb { width: 100px; height: 100px; border-radius: 1rem; overflow: hidden; flex-shrink: 0; }
	.is-card-img { width: 100%; height: 100%; object-fit: cover; }

	.is-card-body { flex: 1; display: flex; flex-direction: column; justify-content: center; }
	.is-card-title { font-family: var(--font-display); font-size: 1.25rem; color: white; margin-bottom: 0.5rem; line-height: 1.3; }
	.is-card-meta { font-size: 0.875rem; color: var(--primary); font-weight: bold; }

	/* ── Ticker ── */
	.is-ticker {
		display: flex; align-items: center;
		margin-top: 64px;
		background: rgba(220, 38, 38, 0.1);
		height: 48px; border-radius: 100px; overflow: hidden;
		opacity: 0;
		transition: opacity 0.7s ease 0.8s;
	}
	.is-ticker.entered { opacity: 1; }

	.is-ticker-label {
		padding: 0 20px; font-weight: bold; color: white; background: var(--primary);
		height: 100%; display: flex; align-items: center;
		position: relative;
		z-index: 10;
		flex-shrink: 0;
	}

	.is-ticker-track { display: flex; animation: tickerScroll 30s linear infinite; }
	@keyframes tickerScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
	.is-ticker-item { padding: 0 24px; color: white; white-space: nowrap; display: flex; align-items: center; gap: 10px; }
</style>