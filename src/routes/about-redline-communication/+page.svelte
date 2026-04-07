<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let mounted = $state(false);
	let heroVisible = $state(false);
	let statsVisible = $state(false);
	let missionVisible = $state(false);
	let whyVisible = $state(false);
	let ctaVisible = $state(false);

	let heroEl: HTMLElement;
	let statsEl: HTMLElement;
	let missionEl: HTMLElement;
	let whyEl: HTMLElement;
	let ctaEl: HTMLElement;

	const stats = [
		{ value: '150+', label: 'Satisfied Client', icon: '🤝' },
		{ value: '200+', label: 'Successful Event', icon: '🎉' },
		{ value: '12+', label: 'Years of Experience', icon: '📅' },
		{ value: '800M', label: 'Revenue of Investment', icon: '📈' }
	];

	const reasons = [
		{
			title: 'Budget Rasional',
			desc: 'Kami menawarkan jasa terbaik dengan range budget yang menarik dan rasional untuk semua kalangan.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`
		},
		{
			title: 'Ide Out of the Box',
			desc: 'Tentunya event dan kegiatan anda akan memorable dengan ide konten yang out of the box dan kreatif.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`
		},
		{
			title: 'Jaminan Terbaik',
			desc: 'Jaminan untuk hasil terbaik dengan mempertimbangkan detail-detail kecil hingga event anda sukses.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
		},
		{
			title: 'Tim Profesional',
			desc: 'Tim dari perusahaan kami terdiri dari orang-orang yang berpengalaman, bersertifikat, dan professional.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
		}
	];

	onMount(() => {
		mounted = true;

		const createObserver = (el: HTMLElement, setter: (v: boolean) => void) => {
			const obs = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) {
						setter(true);
						obs.disconnect();
					}
				},
				{ threshold: 0.1 }
			);
			if (el) obs.observe(el);
			return () => obs.disconnect();
		};

		const cleanups = [
			createObserver(heroEl, (v) => (heroVisible = v)),
			createObserver(statsEl, (v) => (statsVisible = v)),
			createObserver(missionEl, (v) => (missionVisible = v)),
			createObserver(whyEl, (v) => (whyVisible = v)),
			createObserver(ctaEl, (v) => (ctaVisible = v))
		];

		return () => cleanups.forEach((fn) => fn());
	});
</script>

<svelte:head>
	<title>About Us | REDLINE Communication</title>
	<meta
		name="description"
		content="Redline Communication adalah perusahaan Full Integrated Marketing Communication yang bergerak di bidang Event Organizer berpengalaman lebih dari 12 tahun."
	/>
</svelte:head>

<main class="about-page">
	<!-- ══ HERO SECTION ══ -->
	<section class="about-hero" bind:this={heroEl}>
		<!-- Background layers -->
		<div class="hero-bg" aria-hidden="true"></div>
		<div class="blob b1" aria-hidden="true"></div>
		<div class="blob b2" aria-hidden="true"></div>
		<div class="grid-overlay" aria-hidden="true"></div>

		<div class="hero-container">
			<!-- Breadcrumb -->
			{#if mounted}
				<div class="breadcrumb" in:fly={{ y: -20, duration: 700, delay: 100 }}>
					<a href="/" class="bc-link">Home</a>
					<span class="bc-sep">›</span>
					<span class="bc-current">About Us</span>
				</div>
			{/if}

			<!-- Hero Content -->
			<div class="hero-content">
				{#if mounted}
					<div class="hero-left" in:fly={{ y: 60, duration: 900, delay: 200 }}>
						<!-- Badge pill -->
						<div class="hero-badge">
							<span class="badge-dot"></span>
							<span class="badge-label">WELCOME TO REDLINE COMMUNICATION</span>
						</div>

						<h1 class="hero-title">
							About <span class="text-primary">Us</span>
						</h1>

						<p class="hero-subtitle">Kami tak sabar bekerja sama dengan anda !</p>

						<p class="hero-desc">
							REDLINE COMMUNICATION adalah perusahaan Full Integrated Marketing Communication yang
							bergerak di bidang Event Organizer. Redline mempunyai Head Office yang berlokasi di
							kota Padang, dan representative office di Provinsi Banten.
						</p>

						<div class="hero-actions">
							<a href="https://wa.me/0811663528" target="_blank" rel="noopener" class="btn-primary">
								Consult With Us
								<span class="btn-arrow">→</span>
							</a>
							<a href="#why-us" class="btn-secondary">
								Discover More
							</a>
						</div>
					</div>

					<!-- Right side visual -->
					<div class="hero-right" in:fly={{ x: 60, duration: 900, delay: 350 }}>
						<div class="visual-card">
							<div class="vc-glow" aria-hidden="true"></div>
							<div class="vc-content">
								<!-- Company identity card -->
								<div class="company-card">
									<div class="cc-logo-ring">
										<span class="cc-logo-text">RC</span>
									</div>
									<div class="cc-info">
										<h3 class="cc-name">Redline Communication</h3>
										<p class="cc-tagline">Full Integrated Marketing Communication</p>
										<div class="cc-tags">
											<span class="cc-tag">EO Padang</span>
											<span class="cc-tag">Est. 2010</span>
											<span class="cc-tag">Berpengalaman</span>
										</div>
									</div>
								</div>

								<!-- Decorative lines -->
								<div class="vc-divider" aria-hidden="true"></div>

								<!-- Services chips -->
								<div class="vc-chips">
									<span class="vc-chip">Event Organizer</span>
									<span class="vc-chip">Event Production</span>
									<span class="vc-chip">Rental Equipment</span>
									<span class="vc-chip">Brand Activation</span>
									<span class="vc-chip">MICE</span>
									<span class="vc-chip">Show Management</span>
								</div>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>

		<!-- Bottom fade -->
		<div class="hero-fade-bottom" aria-hidden="true"></div>
	</section>

	<!-- ══ STATS SECTION ══ -->
	<section class="stats-section" bind:this={statsEl}>
		<div class="stats-bg" aria-hidden="true"></div>
		<div class="stats-container">
			<div class="stats-grid">
				{#each stats as stat, i}
					<div class="stat-card" class:visible={statsVisible} style="--delay: {i * 100}ms">
						<div class="stat-icon">{stat.icon}</div>
						<div class="stat-value">{stat.value}</div>
						<div class="stat-label">{stat.label}</div>
						<div class="stat-glow" aria-hidden="true"></div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ══ MISSION SECTION ══ -->
	<section class="mission-section" bind:this={missionEl}>
		<div class="mission-container">
			<div class="mission-grid">
				<!-- Who Are We -->
				<div class="mission-card" class:visible={missionVisible} style="--delay: 0ms">
					<div class="mc-accent" aria-hidden="true"></div>
					<div class="mc-icon-wrap">
						<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
							<circle cx="9" cy="7" r="4"/>
							<path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
							<path d="M16 3.13a4 4 0 0 1 0 7.75"/>
						</svg>
					</div>
					<h2 class="mc-title">Who Are We</h2>
					<p class="mc-text">
						REDLINE COMMUNICATION adalah perusahaan Full Integrated Marketing Communication yang
						bergerak di bidang Event Organizer. Redline mempunyai Head Office yang berlokasi di
						kota Padang, dan representative office di Provinsi Banten.
					</p>
					<div class="mc-tag-row">
						<span class="mc-badge">EO Padang</span>
						<span class="mc-badge">Banten</span>
					</div>
				</div>

				<!-- Our Mission -->
				<div class="mission-card" class:visible={missionVisible} style="--delay: 150ms">
					<div class="mc-accent" aria-hidden="true"></div>
					<div class="mc-icon-wrap">
						<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<circle cx="12" cy="12" r="10"/>
							<polyline points="12 6 12 12 16 14"/>
						</svg>
					</div>
					<h2 class="mc-title">Our Mission</h2>
					<p class="mc-text">
						Bisnis kami terus bertumbuh, lini usaha kami kian bertambah. Misi kami menjadi
						perusahaan terintegrasi – Integrated Marketing Communication di tahun 2025 terlaksana
						sepenuhnya.
					</p>
					<div class="mc-tag-row">
						<span class="mc-badge">Terintegrasi</span>
						<span class="mc-badge">2025 Vision</span>
					</div>
				</div>

				<!-- What We Do -->
				<div class="mission-card mission-card-wide" class:visible={missionVisible} style="--delay: 300ms">
					<div class="mc-accent" aria-hidden="true"></div>
					<div class="mc-icon-wrap">
						<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
						</svg>
					</div>
					<h2 class="mc-title">What We Do</h2>
					<div class="what-we-do-grid">
						{#each ['Event Organizer', 'Event Production', 'Rental Equipment', 'Brand Activation', 'MICE', 'Show Management', 'Advertising', 'Product Launching'] as service}
							<div class="wwd-item">
								<span class="wwd-dot" aria-hidden="true"></span>
								<span>{service}</span>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ══ WHY CHOOSE US SECTION ══ -->
	<section id="why-us" class="why-section" bind:this={whyEl}>
		<div class="why-bg" aria-hidden="true"></div>
		<div class="why-container">
			<!-- Header -->
			<div class="why-header" class:visible={whyVisible}>
				<div class="section-label">OUR ADVANTAGES</div>
				<h2 class="why-title">
					Why Choose <span class="text-primary">Us?</span>
				</h2>
				<p class="why-subtitle">
					Mungkin anda masih ragu untuk bekerjasama dengan kami? Kami menawarkan jasa terbaik
					dengan range budget yang menarik dan rasional.
				</p>
			</div>

			<!-- Cards Grid -->
			<div class="why-grid">
				{#each reasons as reason, i}
					<div class="why-card" class:visible={whyVisible} style="--delay: {i * 120}ms">
						<div class="wc-icon-wrap">
							<!-- eslint-disable-next-line svelte/no-at-html-tags -->
							{@html reason.icon}
						</div>
						<h3 class="wc-title">{reason.title}</h3>
						<p class="wc-desc">{reason.desc}</p>
						<div class="wc-line" aria-hidden="true"></div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ══ CTA SECTION ══ -->
	<section class="cta-section" bind:this={ctaEl}>
		<div class="cta-bg" aria-hidden="true"></div>
		<div class="cta-blob" aria-hidden="true"></div>
		<div class="cta-container" class:visible={ctaVisible}>
			<div class="cta-inner">
				<div class="cta-label">READY TO START?</div>
				<h2 class="cta-title">
					Would you like to start a<br />
					<span class="text-primary">project with us?</span>
				</h2>
				<p class="cta-subtitle">
					Tunggu apa lagi? Ayo segera konsultasikan kebutuhan event mu bersama kami!!
				</p>
				<div class="cta-actions">
					<a
						href="https://wa.me/0811663528"
						target="_blank"
						rel="noopener"
						class="cta-btn-primary"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
							<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
						</svg>
						Hubungi Kami: 0811-663-528
					</a>
					<div class="cta-services">
						<span class="cta-service-tag">Event Organizer</span>
						<span class="cta-sep" aria-hidden="true">·</span>
						<span class="cta-service-tag">Event Production</span>
					</div>
				</div>

				<!-- Location chips -->
				<div class="locations">
					<div class="loc-item">
						<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
						<span>Padang, Sumatera Barat (Head Office)</span>
					</div>
					<div class="loc-item">
						<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
						<span>Banten / Jakarta (Representative Office)</span>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>

<style>
	/* ── Page base ── */
	.about-page {
		background: var(--background);
		min-height: 100vh;
		font-family: 'Outfit', sans-serif;
		overflow-x: hidden;
	}

	.text-primary {
		color: var(--primary);
	}

	/* ══════════════════════════════
	   HERO
	══════════════════════════════ */
	.about-hero {
		position: relative;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		padding-top: 80px; /* navbar height */
	}

	.hero-bg {
		position: absolute;
		inset: 0;
		background:
			radial-gradient(ellipse 80% 60% at 60% 20%, oklch(0.15 0.05 25 / 25%) 0%, transparent 60%),
			radial-gradient(ellipse 50% 50% at 15% 80%, oklch(0.15 0.05 25 / 12%) 0%, transparent 70%);
		z-index: 0;
	}

	.blob {
		position: absolute;
		border-radius: 9999px;
		filter: blur(100px);
		pointer-events: none;
		z-index: 1;
	}
	.b1 {
		width: 500px; height: 500px;
		top: -10%; left: 5%;
		background: oklch(0.55 0.22 25.26 / 7%);
	}
	.b2 {
		width: 600px; height: 400px;
		bottom: 5%; right: -5%;
		background: oklch(0.55 0.22 25.26 / 10%);
	}

	.grid-overlay {
		position: absolute;
		inset: 0;
		z-index: 0;
		opacity: 0.03;
		background-image:
			linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px);
		background-size: 60px 60px;
	}

	.hero-container {
		position: relative;
		z-index: 10;
		max-width: 1200px;
		margin: 0 auto;
		padding: 4rem 1.5rem 6rem;
		width: 100%;
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	/* Breadcrumb */
	.breadcrumb {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 3rem;
		font-size: 0.813rem;
		font-weight: 500;
		letter-spacing: 0.05em;
	}
	.bc-link {
		color: rgba(255,255,255,0.4);
		text-decoration: none;
		transition: color 0.2s ease;
	}
	.bc-link:hover { color: var(--primary); }
	.bc-sep { color: rgba(255,255,255,0.2); }
	.bc-current { color: var(--primary); }

	/* Hero content layout */
	.hero-content {
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
		align-items: center;
		flex: 1;
	}
	@media (min-width: 1024px) {
		.hero-content { grid-template-columns: 1fr 420px; gap: 5rem; }
	}

	/* Left */
	.hero-left {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.625rem;
		padding: 0.5rem 1rem;
		border-radius: 9999px;
		border: 1px solid rgba(255,255,255,0.1);
		background: rgba(255,255,255,0.04);
		width: fit-content;
		backdrop-filter: blur(8px);
	}
	.badge-dot {
		width: 8px; height: 8px;
		border-radius: 9999px;
		background: var(--primary);
		animation: pulse 2s ease-in-out infinite;
		flex-shrink: 0;
	}
	.badge-label {
		font-size: 0.688rem;
		font-weight: 600;
		letter-spacing: 0.2em;
		color: rgba(255,255,255,0.55);
		text-transform: uppercase;
	}

	.hero-title {
		font-family: var(--font-display), 'Bebas Neue', sans-serif;
		font-size: clamp(3.5rem, 10vw, 7rem);
		line-height: 0.93;
		color: white;
		text-transform: uppercase;
		letter-spacing: -0.01em;
		margin: 0;
	}

	.hero-subtitle {
		font-size: 1.25rem;
		font-weight: 500;
		color: rgba(255,255,255,0.6);
		font-style: italic;
		margin: 0;
	}

	.hero-desc {
		font-size: 1rem;
		line-height: 1.75;
		color: rgba(255,255,255,0.45);
		max-width: 520px;
		margin: 0;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1rem;
		margin-top: 0.5rem;
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		gap: 0.625rem;
		padding: 0.875rem 2rem;
		background: var(--primary);
		color: white;
		font-weight: 700;
		font-size: 0.9rem;
		border-radius: 9999px;
		text-decoration: none;
		transition: all 0.3s ease;
		box-shadow: 0 0 30px oklch(0.55 0.22 25.26 / 35%);
	}
	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 30px oklch(0.55 0.22 25.26 / 45%);
		background: oklch(0.6 0.22 25.26);
	}
	.btn-arrow {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 28px; height: 28px;
		border-radius: 9999px;
		background: rgba(255,255,255,0.2);
		transition: transform 0.3s ease;
	}
	.btn-primary:hover .btn-arrow { transform: translateX(3px); }

	.btn-secondary {
		display: inline-flex;
		align-items: center;
		padding: 0.875rem 1.75rem;
		border: 1px solid rgba(255,255,255,0.12);
		color: rgba(255,255,255,0.7);
		font-weight: 600;
		font-size: 0.9rem;
		border-radius: 9999px;
		text-decoration: none;
		transition: all 0.3s ease;
		background: rgba(255,255,255,0.03);
	}
	.btn-secondary:hover {
		border-color: var(--primary);
		color: white;
		background: rgba(220,38,38,0.06);
	}

	/* Right: visual card */
	.hero-right {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.visual-card {
		position: relative;
		width: 100%;
		max-width: 400px;
		border-radius: 2rem;
		border: 1px solid rgba(255,255,255,0.08);
		background: rgba(255,255,255,0.02);
		backdrop-filter: blur(16px);
		overflow: hidden;
		padding: 2rem;
	}
	.vc-glow {
		position: absolute;
		inset: 0;
		background: radial-gradient(ellipse at 50% 0%, oklch(0.55 0.22 25 / 15%) 0%, transparent 70%);
		pointer-events: none;
		z-index: 0;
	}
	.vc-content {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.company-card {
		display: flex;
		align-items: flex-start;
		gap: 1.25rem;
	}
	.cc-logo-ring {
		flex-shrink: 0;
		width: 60px;
		height: 60px;
		border-radius: 9999px;
		border: 2px solid var(--primary);
		display: flex;
		align-items: center;
		justify-content: center;
		background: oklch(0.55 0.22 25 / 12%);
		box-shadow: 0 0 20px oklch(0.55 0.22 25 / 20%);
	}
	.cc-logo-text {
		font-family: var(--font-display);
		font-size: 1.25rem;
		color: var(--primary);
	}
	.cc-info { flex: 1; }
	.cc-name {
		font-weight: 700;
		font-size: 1rem;
		color: white;
		margin: 0 0 0.25rem;
	}
	.cc-tagline {
		font-size: 0.75rem;
		color: rgba(255,255,255,0.4);
		margin: 0 0 0.75rem;
	}
	.cc-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
	}
	.cc-tag {
		padding: 0.2rem 0.625rem;
		background: rgba(255,255,255,0.06);
		border: 1px solid rgba(255,255,255,0.08);
		border-radius: 9999px;
		font-size: 0.688rem;
		color: rgba(255,255,255,0.5);
	}

	.vc-divider {
		height: 1px;
		background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
	}

	.vc-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.vc-chip {
		padding: 0.375rem 0.875rem;
		background: rgba(220,38,38,0.08);
		border: 1px solid rgba(220,38,38,0.15);
		border-radius: 9999px;
		font-size: 0.75rem;
		color: rgba(255,255,255,0.65);
		font-weight: 500;
		transition: all 0.25s ease;
	}
	.vc-chip:hover {
		background: rgba(220,38,38,0.15);
		border-color: var(--primary);
		color: white;
	}

	.hero-fade-bottom {
		position: absolute;
		bottom: 0; left: 0; right: 0;
		height: 6rem;
		background: linear-gradient(to top, var(--background), transparent);
		z-index: 5;
		pointer-events: none;
	}

	/* ══════════════════════════════
	   STATS
	══════════════════════════════ */
	.stats-section {
		position: relative;
		padding: 5rem 1.5rem;
		overflow: hidden;
	}
	.stats-bg {
		position: absolute; inset: 0;
		background:
			radial-gradient(circle at 50% 50%, oklch(0.55 0.22 25 / 5%) 0%, transparent 60%);
		pointer-events: none;
	}
	.stats-container {
		max-width: 1200px;
		margin: 0 auto;
	}
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
	}
	@media (min-width: 768px) {
		.stats-grid { grid-template-columns: repeat(4, 1fr); }
	}

	.stat-card {
		position: relative;
		padding: 2rem 1.5rem;
		border-radius: 1.5rem;
		border: 1px solid rgba(255,255,255,0.06);
		background: rgba(255,255,255,0.02);
		text-align: center;
		overflow: hidden;
		opacity: 0;
		transform: translateY(32px);
		transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0ms);
		cursor: default;
	}
	.stat-card.visible {
		opacity: 1;
		transform: none;
	}
	.stat-card:hover {
		border-color: rgba(220,38,38,0.25);
		background: rgba(220,38,38,0.04);
	}
	.stat-card:hover .stat-glow {
		opacity: 1;
	}

	.stat-icon {
		font-size: 2rem;
		margin-bottom: 0.75rem;
		display: block;
	}
	.stat-value {
		font-family: var(--font-display), 'Bebas Neue', sans-serif;
		font-size: clamp(2.5rem, 5vw, 3.5rem);
		color: var(--primary);
		line-height: 1;
		margin-bottom: 0.5rem;
	}
	.stat-label {
		font-size: 0.875rem;
		color: rgba(255,255,255,0.45);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}
	.stat-glow {
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at 50% 100%, oklch(0.55 0.22 25 / 8%) 0%, transparent 70%);
		opacity: 0;
		transition: opacity 0.4s ease;
		pointer-events: none;
	}

	/* ══════════════════════════════
	   MISSION
	══════════════════════════════ */
	.mission-section {
		padding: 5rem 1.5rem;
	}
	.mission-container {
		max-width: 1200px;
		margin: 0 auto;
	}
	.mission-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}
	@media (min-width: 768px) {
		.mission-grid {
			grid-template-columns: 1fr 1fr;
		}
		.mission-card-wide {
			grid-column: 1 / -1;
		}
	}

	.mission-card {
		position: relative;
		padding: 2rem;
		border-radius: 1.75rem;
		border: 1px solid rgba(255,255,255,0.07);
		background: rgba(255,255,255,0.02);
		overflow: hidden;
		opacity: 0;
		transform: translateY(32px);
		transition: all 0.7s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0ms);
	}
	.mission-card.visible {
		opacity: 1;
		transform: none;
	}
	.mission-card:hover {
		border-color: rgba(220,38,38,0.2);
	}

	.mc-accent {
		position: absolute;
		top: 0; left: 0; right: 0;
		height: 2px;
		background: linear-gradient(90deg, transparent, var(--primary), transparent);
		opacity: 0.5;
	}

	.mc-icon-wrap {
		width: 52px; height: 52px;
		border-radius: 1rem;
		background: oklch(0.55 0.22 25 / 10%);
		border: 1px solid oklch(0.55 0.22 25 / 20%);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--primary);
		margin-bottom: 1.25rem;
	}

	.mc-title {
		font-family: var(--font-display), 'Bebas Neue', sans-serif;
		font-size: 2rem;
		color: white;
		margin: 0 0 1rem;
		text-transform: uppercase;
	}

	.mc-text {
		font-size: 0.9375rem;
		line-height: 1.75;
		color: rgba(255,255,255,0.5);
		margin: 0;
	}

	.mc-tag-row {
		display: flex;
		gap: 0.5rem;
		margin-top: 1.25rem;
	}
	.mc-badge {
		padding: 0.3rem 0.75rem;
		background: rgba(220,38,38,0.08);
		border: 1px solid rgba(220,38,38,0.15);
		border-radius: 9999px;
		font-size: 0.75rem;
		color: var(--primary);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	/* What We Do grid */
	.what-we-do-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.75rem;
		margin-top: 0.25rem;
	}
	@media (min-width: 640px) {
		.what-we-do-grid { grid-template-columns: repeat(4, 1fr); }
	}
	.wwd-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		color: rgba(255,255,255,0.6);
		padding: 0.625rem 0.875rem;
		border-radius: 0.625rem;
		background: rgba(255,255,255,0.03);
		border: 1px solid rgba(255,255,255,0.05);
		transition: all 0.25s ease;
	}
	.wwd-item:hover {
		background: rgba(220,38,38,0.06);
		border-color: rgba(220,38,38,0.15);
		color: rgba(255,255,255,0.85);
	}
	.wwd-dot {
		width: 6px; height: 6px;
		border-radius: 9999px;
		background: var(--primary);
		flex-shrink: 0;
	}

	/* ══════════════════════════════
	   WHY CHOOSE US
	══════════════════════════════ */
	.why-section {
		position: relative;
		padding: 6rem 1.5rem;
		overflow: hidden;
	}
	.why-bg {
		position: absolute; inset: 0;
		background:
			radial-gradient(circle at 80% 20%, oklch(0.55 0.22 25 / 6%) 0%, transparent 50%),
			radial-gradient(circle at 20% 80%, oklch(0.55 0.22 25 / 4%) 0%, transparent 50%);
		pointer-events: none;
	}
	.why-container {
		max-width: 1200px;
		margin: 0 auto;
	}

	.why-header {
		text-align: center;
		margin-bottom: 4rem;
		opacity: 0;
		transform: translateY(24px);
		transition: all 0.7s ease;
	}
	.why-header.visible {
		opacity: 1;
		transform: none;
	}

	.section-label {
		font-size: 0.688rem;
		font-weight: 700;
		letter-spacing: 0.25em;
		color: var(--primary);
		text-transform: uppercase;
		margin-bottom: 1rem;
	}

	.why-title {
		font-family: var(--font-display), 'Bebas Neue', sans-serif;
		font-size: clamp(3rem, 7vw, 5rem);
		color: white;
		text-transform: uppercase;
		line-height: 1;
		margin: 0 0 1.25rem;
	}

	.why-subtitle {
		font-size: 1rem;
		color: rgba(255,255,255,0.45);
		max-width: 600px;
		margin: 0 auto;
		line-height: 1.75;
	}

	.why-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}
	@media (min-width: 640px) {
		.why-grid { grid-template-columns: repeat(2, 1fr); }
	}
	@media (min-width: 1024px) {
		.why-grid { grid-template-columns: repeat(4, 1fr); }
	}

	.why-card {
		padding: 2rem 1.75rem;
		border-radius: 1.5rem;
		border: 1px solid rgba(255,255,255,0.06);
		background: rgba(255,255,255,0.02);
		display: flex;
		flex-direction: column;
		gap: 1rem;
		opacity: 0;
		transform: translateY(32px);
		transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0ms);
		position: relative;
		overflow: hidden;
	}
	.why-card.visible {
		opacity: 1;
		transform: none;
	}
	.why-card:hover {
		border-color: rgba(220,38,38,0.25);
		background: rgba(220,38,38,0.03);
		transform: translateY(-4px);
	}
	.why-card:hover .wc-line {
		opacity: 0.6;
	}

	.wc-icon-wrap {
		width: 48px; height: 48px;
		border-radius: 0.875rem;
		background: oklch(0.55 0.22 25 / 10%);
		border: 1px solid oklch(0.55 0.22 25 / 20%);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--primary);
		transition: all 0.3s ease;
	}
	.why-card:hover .wc-icon-wrap {
		background: oklch(0.55 0.22 25 / 18%);
		box-shadow: 0 0 20px oklch(0.55 0.22 25 / 15%);
	}

	.wc-title {
		font-family: var(--font-display), 'Bebas Neue', sans-serif;
		font-size: 1.625rem;
		color: white;
		margin: 0;
		text-transform: uppercase;
	}

	.wc-desc {
		font-size: 0.875rem;
		line-height: 1.7;
		color: rgba(255,255,255,0.45);
		margin: 0;
		flex: 1;
	}

	.wc-line {
		height: 2px;
		border-radius: 1px;
		background: linear-gradient(90deg, var(--primary), transparent);
		opacity: 0.25;
		transition: opacity 0.3s ease;
	}

	/* ══════════════════════════════
	   CTA
	══════════════════════════════ */
	.cta-section {
		position: relative;
		padding: 6rem 1.5rem;
		overflow: hidden;
	}
	.cta-bg {
		position: absolute; inset: 0;
		background:
			radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.55 0.22 25 / 8%) 0%, transparent 70%);
		pointer-events: none;
	}
	.cta-blob {
		position: absolute;
		width: 600px; height: 600px;
		border-radius: 9999px;
		top: 50%; left: 50%;
		transform: translate(-50%, -50%);
		background: oklch(0.55 0.22 25 / 4%);
		filter: blur(80px);
		pointer-events: none;
	}
	.cta-container {
		max-width: 800px;
		margin: 0 auto;
		opacity: 0;
		transform: translateY(24px);
		transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
	}
	.cta-container.visible {
		opacity: 1;
		transform: none;
	}
	.cta-inner {
		background: rgba(255,255,255,0.02);
		border: 1px solid rgba(255,255,255,0.07);
		border-radius: 2.5rem;
		padding: clamp(2rem, 5vw, 4rem);
		text-align: center;
		position: relative;
		overflow: hidden;
	}
	.cta-inner::before {
		content: '';
		position: absolute;
		top: 0; left: 0; right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent, oklch(0.55 0.22 25 / 50%), transparent);
	}

	.cta-label {
		font-size: 0.688rem;
		font-weight: 700;
		letter-spacing: 0.25em;
		color: var(--primary);
		text-transform: uppercase;
		margin-bottom: 1.25rem;
	}

	.cta-title {
		font-family: var(--font-display), 'Bebas Neue', sans-serif;
		font-size: clamp(2.5rem, 6vw, 4rem);
		color: white;
		text-transform: uppercase;
		line-height: 1.1;
		margin: 0 0 1.25rem;
	}

	.cta-subtitle {
		font-size: 1rem;
		color: rgba(255,255,255,0.45);
		margin: 0 0 2rem;
		line-height: 1.75;
	}

	.cta-actions {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.25rem;
	}

	.cta-btn-primary {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem 2.25rem;
		background: var(--primary);
		color: white;
		font-weight: 700;
		font-size: 1rem;
		border-radius: 9999px;
		text-decoration: none;
		transition: all 0.3s ease;
		box-shadow: 0 0 40px oklch(0.55 0.22 25.26 / 30%);
	}
	.cta-btn-primary:hover {
		transform: translateY(-3px);
		box-shadow: 0 12px 40px oklch(0.55 0.22 25.26 / 45%);
	}

	.cta-services {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}
	.cta-service-tag {
		font-size: 0.813rem;
		color: rgba(255,255,255,0.35);
		font-weight: 500;
	}
	.cta-sep {
		color: rgba(255,255,255,0.15);
		font-size: 0.875rem;
	}

	.locations {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.625rem;
		margin-top: 2rem;
		padding-top: 2rem;
		border-top: 1px solid rgba(255,255,255,0.05);
	}
	.loc-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.813rem;
		color: rgba(255,255,255,0.3);
	}
	.loc-item svg {
		flex-shrink: 0;
		color: var(--primary);
		opacity: 0.6;
	}

	/* ══════════════════════════════
	   Animations
	══════════════════════════════ */
	@keyframes pulse {
		0%, 100% { opacity: 1; transform: scale(1); }
		50% { opacity: 0.5; transform: scale(1.4); }
	}
</style>
