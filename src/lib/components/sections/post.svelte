<script lang="ts">
	import { onMount } from 'svelte';

	const posts = [
		{
			id: 1,
			category: 'Event Organizer',
			tag: 'Featured',
			title: 'Bagaimana Kami Mengelola Event 5.000 Peserta di Padang dengan Zero Incident',
			excerpt: 'Studi kasus lengkap tentang manajemen risiko, koordinasi tim, dan eksekusi event berskala besar yang sukses bersama Redline Communication.',
			date: '12 Maret 2025',
			readTime: '8 min read',
			image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
			author: 'Tim Redline',
			authorAvatar: 'https://i.pravatar.cc/40?img=1'
		},
		{
			id: 2,
			category: 'MICE',
			tag: 'Tips',
			title: 'Checklist Lengkap Persiapan MICE yang Wajib Anda Miliki',
			excerpt: 'Panduan step-by-step dari venue selection hingga post-event report untuk meeting, incentive, conference, dan exhibition.',
			date: '5 Maret 2025',
			readTime: '5 min read',
			image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80',
			author: 'Sarah R.',
			authorAvatar: 'https://i.pravatar.cc/40?img=5'
		},
		{
			id: 3,
			category: 'Production',
			tag: 'Insight',
			title: 'Tren Stage Production 2025: LED Wall vs Hologram',
			excerpt: 'Breakdown perbandingan teknologi visual terkini untuk event produksi — mana yang lebih impactful untuk brand anda.',
			date: '28 Feb 2025',
			readTime: '6 min read',
			image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80',
			author: 'Andi P.',
			authorAvatar: 'https://i.pravatar.cc/40?img=3'
		},
		{
			id: 4,
			category: 'Branding',
			tag: 'Case Study',
			title: 'Product Launch Spektakuler: Strategi yang Membuat 10.000 Orang Hadir',
			excerpt: 'Bagaimana strategi komunikasi yang tepat mampu mendrive attendance jauh melampaui target awal.',
			date: '20 Feb 2025',
			readTime: '7 min read',
			image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80',
			author: 'Tim Redline',
			authorAvatar: 'https://i.pravatar.cc/40?img=2'
		}
	];

	const categoryColors: Record<string, string> = {
		'Event Organizer': '#dc2626',
		'MICE': '#b91c1c',
		'Production': '#ef4444',
		'Branding': '#991b1b'
	};

	let sectionEl: HTMLElement;
	let hasEntered = $state(false);
	let hoveredCard = $state<number | null>(null);
	let featuredMouseX = $state(0);
	let featuredMouseY = $state(0);
	let featuredEl: HTMLElement;

	function handleFeaturedMouseMove(e: MouseEvent) {
		const rect = featuredEl.getBoundingClientRect();
		featuredMouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
		featuredMouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
	}
	function resetFeatured() {
		featuredMouseX = 0;
		featuredMouseY = 0;
	}

	onMount(() => {
		const obs = new IntersectionObserver(
			(entries) => { if (entries[0].isIntersecting) hasEntered = true; },
			{ threshold: 0.1 }
		);
		obs.observe(sectionEl);

		const rect = sectionEl.getBoundingClientRect();
		if (rect.top < window.innerHeight) hasEntered = true;

		return () => obs.disconnect();
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700&family=Lora:ital,wght@0,400;1,400&display=swap" rel="stylesheet" />
</svelte:head>

<section class="is" bind:this={sectionEl}>

	<!-- Background elements -->
	<div class="is-bg" aria-hidden="true">
		<div class="is-bg-orb is-bg-orb1"></div>
		<div class="is-bg-orb is-bg-orb2"></div>
	</div>
	<div class="is-dots" aria-hidden="true"></div>
	<div class="is-diagonal" aria-hidden="true"></div>

	<!-- Top border -->
	<div class="is-border-top" aria-hidden="true">
		<span class="is-gem"></span>
	</div>

	<div class="is-inner">

		<!-- ── HEADER ── -->
		<header class="is-header" class:entered={hasEntered}>

			<div class="is-header-left">
				<div class="is-eyebrow">
					<span class="is-eyebrow-dot"></span>
					<span>Insight & Artikel</span>
				</div>
				<h2 class="is-title">
					<span class="is-title-solid">Insight</span><br />
					<span class="is-title-outline">&</span>
					<span class="is-title-accent">Post</span>
				</h2>
				<p class="is-subtitle">
					Tips, tren, dan studi kasus seputar event organizer,<br />
					MICE, dan strategic communication.
				</p>
			</div>

			<div class="is-header-right">
				<a href="#blog" class="is-all-btn">
					<span>Lihat Semua</span>
					<span class="is-all-btn-icon">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
							<path d="M5 12h14M12 5l7 7-7 7"/>
						</svg>
					</span>
				</a>

				<!-- Decorative counter -->
				<div class="is-post-count">
					<span class="is-post-count-num">{posts.length}</span>
					<span class="is-post-count-label">Artikel Terbaru</span>
				</div>
			</div>
		</header>

		<!-- ── MAIN GRID ── -->
		<div class="is-grid" class:entered={hasEntered}>

			<!-- FEATURED POST (left, large) -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<article
				class="is-featured"
				bind:this={featuredEl}
				on:mousemove={handleFeaturedMouseMove}
				on:mouseleave={resetFeatured}
			>
				<!-- Parallax image -->
				<div class="is-featured-img-wrap">
					<img
						src={posts[0].image}
						alt={posts[0].title}
						class="is-featured-img"
						style="transform: translate({featuredMouseX * 0.4}px, {featuredMouseY * 0.4}px) scale(1.08)"
						loading="lazy"
					/>
					<div class="is-featured-img-overlay"></div>
					<!-- Category badge -->
					<div class="is-featured-badges">
						<span class="is-cat-badge" style="background:{categoryColors[posts[0].category]}">
							{posts[0].category}
						</span>
						<span class="is-tag-badge">{posts[0].tag}</span>
					</div>
					<!-- Read time pill -->
					<span class="is-featured-readtime">
						<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
						{posts[0].readTime}
					</span>
				</div>

				<!-- Content -->
				<div class="is-featured-body">
					<div class="is-featured-meta">
						<span class="is-meta-date">
							<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
							{posts[0].date}
						</span>
					</div>

					<h3 class="is-featured-title">{posts[0].title}</h3>
					<p class="is-featured-excerpt">{posts[0].excerpt}</p>

					<div class="is-featured-footer">
						<div class="is-author">
							<img src={posts[0].authorAvatar} alt={posts[0].author} class="is-author-avatar" />
							<span class="is-author-name">{posts[0].author}</span>
						</div>
						<a href="#post-1" class="is-read-btn">
							<span>Baca Selengkapnya</span>
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
						</a>
					</div>
				</div>

				<!-- Hover corner brackets -->
				<div class="is-corner is-corner-tl"></div>
				<div class="is-corner is-corner-tr"></div>
				<div class="is-corner is-corner-bl"></div>
				<div class="is-corner is-corner-br"></div>
			</article>

			<!-- SMALLER POSTS (right, stacked) -->
			<div class="is-side-posts">
				{#each posts.slice(1) as post, i}
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<article
						class="is-card"
						class:hovered={hoveredCard === post.id}
						on:mouseenter={() => hoveredCard = post.id}
						on:mouseleave={() => hoveredCard = null}
						style="animation-delay: {0.15 + i * 0.12}s"
					>
						<!-- Thumb -->
						<div class="is-card-thumb">
							<img src={post.image} alt={post.title} class="is-card-img" loading="lazy" />
							<div class="is-card-img-overlay"></div>
							<span class="is-card-cat" style="background:{categoryColors[post.category]}">
								{post.category}
							</span>
						</div>

						<!-- Body -->
						<div class="is-card-body">
							<div class="is-card-meta">
								<span class="is-tag-sm">{post.tag}</span>
								<span class="is-dot-sep">·</span>
								<span class="is-meta-sm">{post.date}</span>
								<span class="is-dot-sep">·</span>
								<span class="is-meta-sm">{post.readTime}</span>
							</div>
							<h3 class="is-card-title">{post.title}</h3>
							<p class="is-card-excerpt">{post.excerpt}</p>

							<div class="is-card-footer">
								<div class="is-author-sm">
									<img src={post.authorAvatar} alt={post.author} class="is-author-avatar-sm" />
									<span class="is-author-name-sm">{post.author}</span>
								</div>
								<a href="#post-{post.id}" class="is-card-link">
									Baca
									<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
								</a>
							</div>

							<!-- Bottom progress bar on hover -->
							<div class="is-card-progress" class:active={hoveredCard === post.id}></div>
						</div>
					</article>
				{/each}
			</div>

		</div>

		<!-- ── BOTTOM TICKER ── -->
		<div class="is-ticker" class:entered={hasEntered}>
			<div class="is-ticker-label">
				<span class="is-ticker-dot"></span>
				TERBARU
			</div>
			<div class="is-ticker-track-wrap">
				<div class="is-ticker-track">
					{#each [...posts, ...posts] as post}
						<a href="#post" class="is-ticker-item">
							<span class="is-ticker-cat" style="color:{categoryColors[post.category]}">{post.category}</span>
							<span class="is-ticker-title">{post.title}</span>
							<span class="is-ticker-sep">◆</span>
						</a>
					{/each}
				</div>
			</div>
		</div>

	</div>

	<!-- Bottom border -->
	<div class="is-border-bottom" aria-hidden="true">
		<span class="is-gem"></span>
	</div>

</section>

<style>
	/* ── Base ── */
	.is {
		font-family: 'Outfit', sans-serif;
		position: relative;
		background: #ffffff;
		overflow: hidden;
		padding: 0;
	}

	/* ── BG ── */
	.is-bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
	.is-bg-orb {
		position: absolute; border-radius: 50%;
		filter: blur(100px); pointer-events: none;
	}
	.is-bg-orb1 {
		width: 55vw; height: 55vw; top: -20%; right: -10%;
		background: radial-gradient(circle, rgba(220,38,38,0.055) 0%, transparent 70%);
		animation: orbFloat 24s ease-in-out infinite;
	}
	.is-bg-orb2 {
		width: 40vw; height: 40vw; bottom: -15%; left: -8%;
		background: radial-gradient(circle, rgba(185,28,28,0.04) 0%, transparent 70%);
		animation: orbFloat 32s ease-in-out infinite reverse 5s;
	}
	@keyframes orbFloat {
		0%,100% { transform: translate(0,0) scale(1); }
		33% { transform: translate(-3%,4%) scale(1.05); }
		66% { transform: translate(2%,-3%) scale(0.96); }
	}

	.is-dots {
		position: absolute; inset: 0; z-index: 0; pointer-events: none;
		background-image: radial-gradient(rgba(220,38,38,0.08) 1px, transparent 1px);
		background-size: 30px 30px;
	}

	.is-diagonal {
		position: absolute; top: 0; left: 0;
		width: 45vw; height: 100%;
		background: linear-gradient(135deg, rgba(220,38,38,0.025) 0%, transparent 50%);
		z-index: 0; pointer-events: none;
	}

	/* ── Borders ── */
	.is-border-top, .is-border-bottom {
		position: relative; z-index: 2;
		height: 3px;
		background: linear-gradient(90deg,
			transparent 0%, rgba(220,38,38,0.12) 15%,
			#dc2626 50%, rgba(220,38,38,0.12) 85%, transparent 100%
		);
		display: flex; align-items: center; justify-content: center;
	}
	.is-gem {
		width: 10px; height: 10px;
		background: #dc2626; transform: rotate(45deg);
		box-shadow: 0 0 20px rgba(220,38,38,0.8), 0 0 40px rgba(220,38,38,0.4);
		animation: gemPulse 2.5s ease-in-out infinite;
	}
	@keyframes gemPulse {
		0%,100% { box-shadow: 0 0 16px rgba(220,38,38,0.8),0 0 32px rgba(220,38,38,0.4); }
		50% { box-shadow: 0 0 30px rgba(220,38,38,1),0 0 60px rgba(220,38,38,0.6); }
	}

	/* ── Inner ── */
	.is-inner {
		position: relative; z-index: 2;
		max-width: 1200px; margin: 0 auto;
		padding: 72px 48px 56px;
	}
	@media (max-width: 768px) { .is-inner { padding: 56px 20px 40px; } }

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

	.is-eyebrow {
		display: inline-flex; align-items: center; gap: 8px;
		padding: 6px 16px;
		background: rgba(220,38,38,0.06);
		border: 1px solid rgba(220,38,38,0.2);
		border-radius: 100px;
		font-size: 0.7rem; font-weight: 600;
		letter-spacing: 0.12em; text-transform: uppercase;
		color: #dc2626; margin-bottom: 16px;
	}
	.is-eyebrow-dot {
		width: 6px; height: 6px; border-radius: 50%;
		background: #dc2626; box-shadow: 0 0 10px rgba(220,38,38,0.8);
		animation: dotBlink 2s ease-in-out infinite;
	}
	@keyframes dotBlink {
		0%,100% { opacity:1; box-shadow:0 0 10px rgba(220,38,38,0.8); }
		50% { opacity:0.4; box-shadow:0 0 20px rgba(220,38,38,1); }
	}

	.is-title {
		font-family: 'Bebas Neue', sans-serif;
		font-size: clamp(2.8rem, 5vw, 4.5rem);
		line-height: 0.95;
		letter-spacing: 0.03em;
		margin: 0 0 16px;
	}
	.is-title-solid { color: #111111; }
	.is-title-outline {
		-webkit-text-stroke: 2.5px rgba(17,17,17,0.2);
		color: transparent;
	}
	.is-title-accent {
		color: #dc2626;
		text-shadow: 0 0 32px rgba(220,38,38,0.25);
	}

	.is-subtitle {
		font-size: 0.88rem; color: rgba(17,17,17,0.45);
		font-weight: 300; line-height: 1.7; margin: 0;
	}

	.is-header-right {
		display: flex; flex-direction: column;
		align-items: flex-end; gap: 16px;
	}

	/* All posts button */
	.is-all-btn {
		display: inline-flex; align-items: center; gap: 0;
		font-size: 0.85rem; font-weight: 600;
		color: #ffffff; text-decoration: none; letter-spacing: 0.04em;
		background: #dc2626; border-radius: 100px; overflow: hidden;
		box-shadow: 0 0 0 0 rgba(220,38,38,0.3);
		transition: box-shadow 0.3s ease, transform 0.3s ease;
	}
	.is-all-btn span:first-child { padding: 10px 18px 10px 20px; }
	.is-all-btn-icon {
		display: flex; align-items: center; justify-content: center;
		padding: 10px 14px; background: rgba(0,0,0,0.15);
		transition: background 0.3s ease;
	}
	.is-all-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 0 32px rgba(220,38,38,0.45), 0 8px 20px rgba(220,38,38,0.22);
	}
	.is-all-btn:hover .is-all-btn-icon { background: rgba(0,0,0,0.22); }

	/* Post count badge */
	.is-post-count {
		display: flex; flex-direction: column; align-items: flex-end; gap: 2px;
	}
	.is-post-count-num {
		font-family: 'Bebas Neue', sans-serif;
		font-size: 2.2rem; color: rgba(220,38,38,0.18);
		line-height: 1;
	}
	.is-post-count-label {
		font-size: 0.6rem; text-transform: uppercase;
		letter-spacing: 0.14em; color: rgba(17,17,17,0.3);
	}

	/* ── Main grid ── */
	.is-grid {
		display: grid;
		grid-template-columns: 1.1fr 0.9fr;
		gap: 28px;
		opacity: 0;
		transform: translateY(28px);
		transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
	}
	.is-grid.entered { opacity: 1; transform: translateY(0); }

	@media (max-width: 900px) {
		.is-grid { grid-template-columns: 1fr; }
	}

	/* ── FEATURED ── */
	.is-featured {
		position: relative;
		border-radius: 24px;
		overflow: hidden;
		background: #ffffff;
		border: 1px solid rgba(220,38,38,0.1);
		box-shadow: 0 4px 24px rgba(0,0,0,0.06);
		cursor: pointer;
		transition: border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease;
	}
	.is-featured:hover {
		border-color: rgba(220,38,38,0.3);
		box-shadow: 0 20px 60px rgba(220,38,38,0.12), 0 8px 24px rgba(0,0,0,0.08);
		transform: translateY(-4px);
	}

	/* Corner brackets */
	.is-corner {
		position: absolute;
		width: 14px; height: 14px;
		border-color: #dc2626; border-style: solid;
		opacity: 0;
		transition: opacity 0.3s ease, transform 0.3s ease;
		z-index: 5;
	}
	.is-corner-tl { top: 6px; left: 6px; border-width: 2px 0 0 2px; transform: translate(-3px,-3px); }
	.is-corner-tr { top: 6px; right: 6px; border-width: 2px 2px 0 0; transform: translate(3px,-3px); }
	.is-corner-bl { bottom: 6px; left: 6px; border-width: 0 0 2px 2px; transform: translate(-3px,3px); }
	.is-corner-br { bottom: 6px; right: 6px; border-width: 0 2px 2px 0; transform: translate(3px,3px); }
	.is-featured:hover .is-corner {
		opacity: 1; transform: translate(0,0);
	}

	/* Featured image */
	.is-featured-img-wrap {
		position: relative; height: 300px; overflow: hidden;
	}
	.is-featured-img {
		width: 100%; height: 100%;
		object-fit: cover;
		transition: transform 0.1s ease-out;
		will-change: transform;
	}
	.is-featured-img-overlay {
		position: absolute; inset: 0;
		background: linear-gradient(
			to bottom,
			transparent 40%,
			rgba(17,17,17,0.5) 100%
		);
	}
	.is-featured-badges {
		position: absolute; top: 16px; left: 16px;
		display: flex; gap: 8px; align-items: center;
	}
	.is-cat-badge {
		display: inline-block; padding: 4px 12px;
		border-radius: 100px; font-size: 0.68rem;
		font-weight: 700; text-transform: uppercase;
		letter-spacing: 0.08em; color: #ffffff;
	}
	.is-tag-badge {
		display: inline-block; padding: 4px 10px;
		border-radius: 100px; font-size: 0.65rem;
		font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em;
		color: #dc2626; background: rgba(255,255,255,0.92);
		border: 1px solid rgba(220,38,38,0.2);
	}
	.is-featured-readtime {
		position: absolute; bottom: 14px; right: 16px;
		display: inline-flex; align-items: center; gap: 5px;
		padding: 4px 10px;
		background: rgba(255,255,255,0.9); backdrop-filter: blur(8px);
		border-radius: 100px; font-size: 0.7rem; font-weight: 500;
		color: #111111;
	}

	/* Featured body */
	.is-featured-body {
		padding: 28px 28px 24px;
	}
	.is-featured-meta {
		display: flex; align-items: center; gap: 10px;
		margin-bottom: 14px;
	}
	.is-meta-date {
		display: inline-flex; align-items: center; gap: 5px;
		font-size: 0.75rem; color: rgba(17,17,17,0.4); font-weight: 400;
	}
	.is-featured-title {
		font-family: 'Lora', serif;
		font-size: clamp(1.15rem, 2vw, 1.4rem);
		font-weight: 400;
		line-height: 1.45;
		color: #111111;
		margin: 0 0 14px;
		transition: color 0.3s ease;
	}
	.is-featured:hover .is-featured-title { color: #dc2626; }

	.is-featured-excerpt {
		font-size: 0.88rem; line-height: 1.7;
		color: rgba(17,17,17,0.5); font-weight: 300; margin: 0 0 24px;
	}
	.is-featured-footer {
		display: flex; align-items: center;
		justify-content: space-between; gap: 12px;
	}
	.is-author {
		display: flex; align-items: center; gap: 10px;
	}
	.is-author-avatar {
		width: 32px; height: 32px; border-radius: 50%;
		object-fit: cover; border: 2px solid rgba(220,38,38,0.2);
	}
	.is-author-name { font-size: 0.8rem; font-weight: 500; color: rgba(17,17,17,0.6); }

	.is-read-btn {
		display: inline-flex; align-items: center; gap: 8px;
		padding: 10px 20px;
		background: #dc2626; color: #ffffff;
		font-size: 0.82rem; font-weight: 600; letter-spacing: 0.04em;
		border-radius: 100px; text-decoration: none;
		transition: all 0.3s ease;
		box-shadow: 0 0 0 0 rgba(220,38,38,0.4);
	}
	.is-read-btn:hover {
		background: #b91c1c;
		box-shadow: 0 0 28px rgba(220,38,38,0.4), 0 6px 16px rgba(220,38,38,0.2);
		transform: translateY(-1px);
	}

	/* ── Side posts ── */
	.is-side-posts {
		display: flex; flex-direction: column; gap: 18px;
	}

	.is-card {
		position: relative;
		display: flex; gap: 0;
		border-radius: 18px;
		overflow: hidden;
		background: #ffffff;
		border: 1px solid rgba(220,38,38,0.08);
		box-shadow: 0 2px 12px rgba(0,0,0,0.04);
		cursor: pointer;
		transition: all 0.35s ease;
		opacity: 0;
		transform: translateX(30px);
	}
	.is-grid.entered .is-card {
		opacity: 1;
		transform: translateX(0);
		animation: slideInRight 0.6s cubic-bezier(0.34,1.1,0.64,1) both;
	}
	@keyframes slideInRight {
		from { opacity:0; transform: translateX(30px); }
		to   { opacity:1; transform: translateX(0); }
	}
	.is-card:hover {
		border-color: rgba(220,38,38,0.28);
		box-shadow: 0 12px 40px rgba(220,38,38,0.1), 0 4px 12px rgba(0,0,0,0.06);
		transform: translateX(-4px);
	}

	/* Card thumb */
	.is-card-thumb {
		position: relative;
		flex-shrink: 0;
		width: 130px;
		overflow: hidden;
	}
	.is-card-img {
		width: 100%; height: 100%;
		object-fit: cover;
		transition: transform 0.5s ease, filter 0.4s ease;
		filter: grayscale(20%);
	}
	.is-card:hover .is-card-img {
		transform: scale(1.08);
		filter: grayscale(0%);
	}
	.is-card-img-overlay {
		position: absolute; inset: 0;
		background: linear-gradient(90deg, transparent 60%, rgba(255,255,255,0.3) 100%);
		opacity: 0; transition: opacity 0.3s ease;
	}
	.is-card:hover .is-card-img-overlay { opacity: 1; }

	.is-card-cat {
		position: absolute; top: 10px; left: 10px;
		display: inline-block; padding: 3px 9px;
		border-radius: 100px; font-size: 0.6rem;
		font-weight: 700; text-transform: uppercase;
		letter-spacing: 0.06em; color: #ffffff;
	}

	/* Card body */
	.is-card-body {
		flex: 1; padding: 16px 18px 14px;
		display: flex; flex-direction: column; gap: 8px;
		position: relative; overflow: hidden;
	}
	.is-card-meta {
		display: flex; align-items: center; gap: 6px;
		flex-wrap: wrap;
	}
	.is-tag-sm {
		font-size: 0.62rem; font-weight: 700;
		text-transform: uppercase; letter-spacing: 0.08em;
		color: #dc2626;
	}
	.is-dot-sep { color: rgba(17,17,17,0.25); font-size: 0.6rem; }
	.is-meta-sm { font-size: 0.68rem; color: rgba(17,17,17,0.38); font-weight: 400; }

	.is-card-title {
		font-family: 'Lora', serif;
		font-size: 0.95rem; font-weight: 400;
		line-height: 1.45; color: #111111; margin: 0;
		transition: color 0.3s ease;
		display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
	}
	.is-card:hover .is-card-title { color: #dc2626; }

	.is-card-excerpt {
		font-size: 0.78rem; line-height: 1.6;
		color: rgba(17,17,17,0.42); font-weight: 300; margin: 0;
		display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
	}

	.is-card-footer {
		display: flex; align-items: center;
		justify-content: space-between; margin-top: auto; gap: 8px;
	}
	.is-author-sm { display: flex; align-items: center; gap: 6px; }
	.is-author-avatar-sm {
		width: 24px; height: 24px; border-radius: 50%;
		object-fit: cover; border: 1.5px solid rgba(220,38,38,0.2);
	}
	.is-author-name-sm { font-size: 0.72rem; color: rgba(17,17,17,0.5); font-weight: 500; }

	.is-card-link {
		display: inline-flex; align-items: center; gap: 4px;
		font-size: 0.72rem; font-weight: 700;
		color: #dc2626; text-decoration: none;
		letter-spacing: 0.04em; text-transform: uppercase;
		opacity: 0;
		transform: translateX(-6px);
		transition: opacity 0.3s ease, transform 0.3s ease;
	}
	.is-card:hover .is-card-link { opacity: 1; transform: translateX(0); }

	/* Progress bar */
	.is-card-progress {
		position: absolute; bottom: 0; left: 0;
		height: 2.5px; width: 0;
		background: linear-gradient(90deg, #dc2626, rgba(220,38,38,0.3));
		border-radius: 2px;
		transition: width 0.5s cubic-bezier(0.4,0,0.2,1);
	}
	.is-card-progress.active { width: 100%; }

	/* ── Ticker ── */
	.is-ticker {
		display: flex; align-items: center;
		margin-top: 52px;
		border-top: 1px solid rgba(220,38,38,0.1);
		border-bottom: 1px solid rgba(220,38,38,0.1);
		height: 48px; overflow: hidden;
		opacity: 0;
		transition: opacity 0.7s ease 0.8s;
	}
	.is-ticker.entered { opacity: 1; }

	.is-ticker-label {
		flex-shrink: 0;
		display: flex; align-items: center; gap: 8px;
		padding: 0 20px;
		font-size: 0.62rem; font-weight: 800;
		letter-spacing: 0.18em; text-transform: uppercase;
		color: #ffffff; background: #dc2626;
		height: 100%; white-space: nowrap;
		box-shadow: 4px 0 16px rgba(220,38,38,0.25);
	}
	.is-ticker-dot {
		width: 6px; height: 6px; border-radius: 50%;
		background: #ffffff; opacity: 0.8;
		animation: tickerBlink 1s ease-in-out infinite;
	}
	@keyframes tickerBlink {
		0%,100% { opacity: 0.8; } 50% { opacity: 0.2; }
	}

	.is-ticker-track-wrap {
		flex: 1; overflow: hidden;
		-webkit-mask-image: linear-gradient(90deg, transparent 0, black 40px, black calc(100% - 40px), transparent 100%);
		mask-image: linear-gradient(90deg, transparent 0, black 40px, black calc(100% - 40px), transparent 100%);
	}
	.is-ticker-track {
		display: flex; gap: 0;
		width: max-content;
		animation: tickerScroll 30s linear infinite;
	}
	.is-ticker-track:hover { animation-play-state: paused; }
	@keyframes tickerScroll {
		from { transform: translateX(0); }
		to   { transform: translateX(-50%); }
	}
	.is-ticker-item {
		display: inline-flex; align-items: center; gap: 10px;
		padding: 0 24px; white-space: nowrap;
		text-decoration: none; cursor: pointer;
		transition: background 0.2s ease;
	}
	.is-ticker-item:hover { background: rgba(220,38,38,0.04); }
	.is-ticker-cat {
		font-size: 0.62rem; font-weight: 800;
		text-transform: uppercase; letter-spacing: 0.1em;
	}
	.is-ticker-title {
		font-size: 0.78rem; color: rgba(17,17,17,0.6);
		font-weight: 400;
	}
	.is-ticker-sep {
		font-size: 0.5rem; color: rgba(220,38,38,0.3);
		margin: 0 4px;
	}
</style>