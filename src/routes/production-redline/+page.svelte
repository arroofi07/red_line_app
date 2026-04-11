<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import {
		biofarma,
		bgpIndonesia,
		datamine,
		deltaSaintifik,
		dsi,
		enseval,
		euroClinic,
		kasoemHearing,
		kilangPertamina,
		lessential,
		merck,
		nawaTech
	} from '$lib/assets/production-page';

	let mounted = $state(false);
	let heroVisible = $state(false);
	let servicesVisible = $state(false);
	let galleryVisible = $state(false);
	let processVisible = $state(false);
	let ctaVisible = $state(false);

	let heroEl: HTMLElement;
	let servicesEl: HTMLElement;
	let galleryEl: HTMLElement;
	let processEl: HTMLElement;
	let ctaEl: HTMLElement;

	const services = [
		{
			title: 'Custom Booth',
			desc: 'Desain dan produksi booth custom yang unik, tematik, dan menarik untuk exhibition, pameran, atau pop-up store yang merepresentasikan identitas brand Anda.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10h16"/><path d="M4 14h16"/><path d="M4 6h16"/><path d="M3 21h18"/><path d="M5 21V3"/><path d="M19 21V3"/></svg>`
		},
		{
			title: 'Event Organizer',
			desc: 'Manajemen acara end-to-end mulai dari konsep, perencanaan, hingga eksekusi di lapangan untuk berbagai skala event dari corporate gathering hingga konser musik.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>`
		},
		{
			title: 'Event Production',
			desc: 'Dukungan teknis produksi secara menyeluruh meliputi multimedia, sound system, lighting, panggung, rigging, dan perlengkapan show management lainnya.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>`
		}
	];

	const processSteps = [
		{ title: 'Idea & Concept', desc: 'Brainstorming dan penyelarasan konsep event dengan tujuan klien.' },
		{ title: 'Design & Render', desc: 'Pembuatan desain visual 3D, layout arrangement, dan stage design.' },
		{ title: 'Production', desc: 'Fabrikasi dan persiapan teknis peralatan yang dibutuhkan.' },
		{ title: 'Execution', desc: 'Loading in, show management, dan eksekusi event di hari H.' }
	];

	const galleryItems: { src: string; name: string }[] = [
		{ src: biofarma, name: 'biofarma' },
		{ src: bgpIndonesia, name: 'bgpIndonesia' },
		{ src: datamine, name: 'datamine' },
		{ src: deltaSaintifik, name: 'deltaSaintifik' },
		{ src: dsi, name: 'dsi' },
		{ src: enseval, name: 'enseval' },
		{ src: euroClinic, name: 'euroClinic' },
		{ src: kasoemHearing, name: 'kasoemHearing' },
		{ src: kilangPertamina, name: 'kilangPertamina' },
		{ src: lessential, name: 'lessential' },
		{ src: merck, name: 'merck' },
		{ src: nawaTech, name: 'nawaTech' }
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
			createObserver(servicesEl, (v) => (servicesVisible = v)),
			createObserver(galleryEl, (v) => (galleryVisible = v)),
			createObserver(processEl, (v) => (processVisible = v)),
			createObserver(ctaEl, (v) => (ctaVisible = v))
		];

		return () => cleanups.forEach((fn) => fn());
	});
</script>

<svelte:head>
	<title>Production | REDLINE Communication</title>
	<meta
		name="description"
		content="Production Redline - Spesialis produksi event profesional Menyediakan solusi kreatif, teknis, dan visual untuk acara spektakuler!"
	/>
</svelte:head>

<main class="production-page">
	<!-- ══ HERO SECTION ══ -->
	<section class="prod-hero" bind:this={heroEl}>
		<div class="hero-bg" aria-hidden="true"></div>
		<div class="blob b1" aria-hidden="true"></div>
		<div class="blob b2" aria-hidden="true"></div>
		<div class="grid-overlay" aria-hidden="true"></div>

		<div class="hero-container">
			{#if mounted}
				<div class="breadcrumb" in:fly={{ y: -20, duration: 700, delay: 100 }}>
					<a href="/" class="bc-link">Home</a>
					<span class="bc-sep">›</span>
					<span class="bc-current">Production</span>
				</div>

				<div class="hero-content">
					<div class="hero-text-wrapper" in:fly={{ y: 50, duration: 900, delay: 200 }}>
						<div class="hero-badge">
							<span class="badge-dot"></span>
							<span class="badge-label">DIVISI PRODUKSI EVENT</span>
						</div>

						<h1 class="hero-title">
							Make It <span class="text-primary">Happen</span>
						</h1>

						<p class="hero-subtitle">Production Redline</p>

						<p class="hero-desc">
							Spesialis produksi event profesional. Menyediakan solusi kreatif, teknis, dan visual
							untuk acara spektakuler dari skala kecil hingga mega-event!
						</p>

						<div class="hero-actions">
							<a href="https://wa.me/0811663528" target="_blank" rel="noopener" class="btn-primary">
								Discuss Your Project
								<span class="btn-arrow">→</span>
							</a>
							<a href="#services" class="btn-secondary">Explore Services</a>
						</div>
					</div>

					<div class="hero-visual-wrapper" in:fly={{ x: 50, duration: 900, delay: 400 }}>
						<div class="tech-card">
							<div class="tc-bg" aria-hidden="true"></div>
							<div class="tc-inner">
								<div class="tc-header">
									<div class="tc-dot red"></div>
									<div class="tc-dot yellow"></div>
									<div class="tc-dot green"></div>
								</div>
								<div class="tc-body">
									<div class="tc-line placeholder-title"></div>
									<div class="tc-line placeholder-text"></div>
									<div class="tc-line placeholder-text short"></div>
								</div>
								<div class="tc-footer">
									<div class="tc-stat">
										<span class="tc-stat-val">100%</span>
										<span class="tc-stat-lbl">Dedication</span>
									</div>
									<div class="tc-stat">
										<span class="tc-stat-val">24/7</span>
										<span class="tc-stat-lbl">Support</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<div class="fade-bottom" aria-hidden="true"></div>
	</section>

	<!-- ══ SERVICES SECTION ══ -->
	<section id="services" class="services-section" bind:this={servicesEl}>
		<div class="services-container">
			<div class="section-header" class:visible={servicesVisible}>
				<div class="section-label">OUR CORE CAPABILITIES</div>
				<h2 class="section-title">
					Production <span class="text-primary">Services</span>
				</h2>
				<p class="section-desc">
					Kami memiliki tim dan workshop in-house untuk memastikan setiap detail produksi
					event Anda dieksekusi dengan presisi tinggi dan kualitas terbaik.
				</p>
			</div>

			<div class="services-grid">
				{#each services as svc, i}
					<div class="service-card" class:visible={servicesVisible} style="--delay: {i * 150}ms">
						<div class="sc-glow" aria-hidden="true"></div>
						<div class="sc-icon">
							{@html svc.icon}
						</div>
						<h3 class="sc-title">{svc.title}</h3>
						<p class="sc-desc">{svc.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ══ GALLERY SECTION ══ -->
	<section class="gallery-section" bind:this={galleryEl}>
		<div class="gallery-container">
			<div class="section-header" class:visible={galleryVisible}>
				<div class="section-label">OUR PORTFOLIO</div>
				<h2 class="section-title">
					Project <span class="text-primary">Gallery</span>
				</h2>
				<p class="section-desc">
					Kilas balik beberapa karya dan produksi yang telah kami eksekusi dengan sempurna untuk berbagai klien kami.
				</p>
			</div>

			<div class="masonry-grid">
				{#each galleryItems as item, i}
					<div class="masonry-item" class:visible={galleryVisible} style="--delay: {(i % 4) * 100}ms">
						<img src={item.src} alt={item.name} loading="lazy" />
						<div class="mi-overlay" aria-hidden="true"></div>
						<p class="mi-caption">{item.name}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ══ PROCESS SECTION ══ -->
	<section class="process-section" bind:this={processEl}>
		<div class="process-bg" aria-hidden="true"></div>
		<div class="process-container">
			<div class="process-header" class:visible={processVisible}>
				<div class="section-label">HOW WE WORK</div>
				<h2 class="section-title">Workflow <span class="text-primary">Produksi</span></h2>
			</div>

			<div class="process-timeline">
				{#each processSteps as step, i}
					<div class="process-step" class:visible={processVisible} style="--delay: {i * 150}ms">
						<div class="step-num">0{i + 1}</div>
						<div class="step-content">
							<h3 class="step-title">{step.title}</h3>
							<p class="step-desc">{step.desc}</p>
						</div>
						{#if i !== processSteps.length - 1}
							<div class="step-line" aria-hidden="true"></div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ══ CTA SECTION ══ -->
	<section class="cta-section" bind:this={ctaEl}>
		<div class="cta-bg" aria-hidden="true"></div>
		<div class="cta-container" class:visible={ctaVisible}>
			<div class="cta-content">
				<h2 class="cta-title">
					Siap mewujudkan event <span class="text-primary">impian Anda?</span>
				</h2>
				<p class="cta-desc">
					Tim produksi kami siap memberikan solusi terbaik sesuai dengan kebutuhan dan budget Anda.
				</p>
				<a href="https://wa.me/0811663528" target="_blank" rel="noopener" class="cta-btn">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
						<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
					</svg>
					Konsultasi Sekarang
				</a>
			</div>
		</div>
	</section>
</main>

<style>
	/* ── Base ── */
	.production-page {
		background: var(--background);
		min-height: 100vh;
		font-family: 'Outfit', sans-serif;
		overflow-x: hidden;
		color: white;
	}

	.text-primary {
		color: var(--primary);
	}

	/* ── Reuse styles similar to About Page ── */
	.prod-hero {
		position: relative;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-top: 80px;
	}

	.hero-bg {
		position: absolute;
		inset: 0;
		background: radial-gradient(ellipse 70% 60% at 75% 25%, oklch(0.55 0.22 25 / 15%) 0%, transparent 60%);
		z-index: 0;
	}

	.blob {
		position: absolute;
		border-radius: 9999px;
		filter: blur(100px);
		z-index: 1;
	}
	.b1 { width: 500px; height: 500px; top: -5%; right: 10%; background: oklch(0.55 0.22 25 / 8%); }
	.b2 { width: 400px; height: 400px; bottom: 10%; left: 5%; background: oklch(0.55 0.22 25 / 6%); }

	.grid-overlay {
		position: absolute;
		inset: 0;
		opacity: 0.02;
		background-image: linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px);
		background-size: 50px 50px;
		z-index: 0;
	}

	.hero-container {
		position: relative;
		z-index: 10;
		max-width: 1200px;
		margin: 0 auto;
		width: 100%;
		padding: 2rem 1.5rem;
	}

	.breadcrumb {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 2rem;
		font-size: 0.813rem;
		font-weight: 500;
	}
	.bc-link { color: rgba(255,255,255,0.4); text-decoration: none; transition: color 0.2s; }
	.bc-link:hover { color: var(--primary); }
	.bc-sep { color: rgba(255,255,255,0.2); }
	.bc-current { color: var(--primary); }

	.hero-content {
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
		align-items: center;
	}
	@media (min-width: 1024px) {
		.hero-content { grid-template-columns: 1.2fr 0.8fr; gap: 4rem; }
	}

	.hero-text-wrapper {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.625rem;
		padding: 0.5rem 1rem;
		border-radius: 9999px;
		background: rgba(255,255,255,0.05);
		border: 1px solid rgba(255,255,255,0.1);
		width: fit-content;
	}
	.badge-dot {
		width: 8px; height: 8px; border-radius: 50%; background: var(--primary);
		animation: pulse 2s infinite;
	}
	.badge-label {
		font-size: 0.7rem; font-weight: 600; letter-spacing: 0.15em; color: rgba(255,255,255,0.7);
	}

	.hero-title {
		font-family: var(--font-display), 'Bebas Neue', sans-serif;
		font-size: clamp(4rem, 8vw, 6.5rem);
		line-height: 0.95;
		margin: 0;
		text-transform: uppercase;
	}

	.hero-subtitle {
		font-size: 1.5rem; color: rgba(255,255,255,0.7); font-style: italic; margin: 0;
	}

	.hero-desc {
		font-size: 1.1rem; line-height: 1.6; color: rgba(255,255,255,0.5); max-width: 500px; margin: 0;
	}

	.hero-actions {
		display: flex; gap: 1rem; margin-top: 1rem; flex-wrap: wrap;
	}
	.btn-primary {
		display: inline-flex; align-items: center; gap: 0.5rem;
		padding: 0.875rem 1.5rem; background: var(--primary); color: white;
		border-radius: 9999px; font-weight: 600; text-decoration: none;
		transition: all 0.3s;
	}
	.btn-primary:hover {
		transform: translateY(-2px); box-shadow: 0 10px 25px oklch(0.55 0.22 25 / 40%);
	}
	.btn-arrow {
		display: flex; align-items: center; justify-content: center;
		width: 24px; height: 24px; background: rgba(255,255,255,0.2); border-radius: 50%;
		transition: transform 0.3s;
	}
	.btn-primary:hover .btn-arrow { transform: translateX(3px); }

	.btn-secondary {
		display: inline-flex; align-items: center; padding: 0.875rem 1.5rem;
		border: 1px solid rgba(255,255,255,0.2); border-radius: 9999px;
		color: rgba(255,255,255,0.8); font-weight: 600; text-decoration: none;
		transition: all 0.3s;
	}
	.btn-secondary:hover {
		background: rgba(255,255,255,0.05); border-color: var(--primary); color: white;
	}

	/* Dummy Tech Card Visual */
	.tech-card {
		position: relative; width: 100%; max-width: 380px; margin: 0 auto;
		border-radius: 1.5rem; padding: 1.5rem;
		background: rgba(20,20,20,0.5); border: 1px solid rgba(255,255,255,0.1);
		backdrop-filter: blur(10px);
	}
	.tc-bg {
		position: absolute; inset: 0; border-radius: inherit;
		background: linear-gradient(135deg, rgba(220,38,38,0.1) 0%, transparent 100%);
		z-index: 0; pointer-events: none;
	}
	.tc-inner { position: relative; z-index: 1; }
	.tc-header { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; }
	.tc-dot { width: 12px; height: 12px; border-radius: 50%; }
	.red { background: #ff5f56; } .yellow { background: #ffbd2e; } .green { background: #27c93f; }
	.tc-body { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem; }
	.tc-line { height: 16px; border-radius: 8px; background: rgba(255,255,255,0.1); }
	.placeholder-title { width: 60%; height: 24px; background: var(--primary); opacity: 0.8; }
	.placeholder-text { width: 100%; }
	.short { width: 80%; }
	.tc-footer {
		display: flex; justify-content: space-between; border-top: 1px solid rgba(255,255,255,0.1);
		padding-top: 1rem;
	}
	.tc-stat { display: flex; flex-direction: column; }
	.tc-stat-val { font-size: 1.5rem; font-weight: 700; color: white; }
	.tc-stat-lbl { font-size: 0.75rem; color: rgba(255,255,255,0.5); text-transform: uppercase; }

	.fade-bottom {
		position: absolute; bottom: 0; left: 0; right: 0; height: 100px;
		background: linear-gradient(to top, var(--background), transparent); z-index: 2; pointer-events: none;
	}

	/* ── Services Section ── */
	.services-section {
		padding: 6rem 1.5rem; position: relative;
	}
	.services-container {
		max-width: 1200px; margin: 0 auto;
	}
	.section-header {
		text-align: center; margin-bottom: 4rem; opacity: 0; transform: translateY(20px);
		transition: all 0.6s;
	}
	.section-header.visible { opacity: 1; transform: translateY(0); }
	.section-label {
		font-size: 0.8rem; font-weight: 600; color: var(--primary); letter-spacing: 0.2em;
		margin-bottom: 1rem;
	}
	.section-title {
		font-family: var(--font-display), sans-serif; font-size: 3rem; margin: 0 0 1rem; text-transform: uppercase;
	}
	.section-desc {
		color: rgba(255,255,255,0.6); max-width: 600px; margin: 0 auto; line-height: 1.6;
	}

	.services-grid {
		display: grid; grid-template-columns: 1fr; gap: 2rem;
	}
	@media (min-width: 768px) {
		.services-grid { grid-template-columns: repeat(3, 1fr); }
	}

	.service-card {
		position: relative; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);
		border-radius: 1.5rem; padding: 2.5rem 2rem; text-align: center;
		opacity: 0; transform: translateY(30px); transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) var(--delay);
		overflow: hidden;
	}
	.service-card.visible { opacity: 1; transform: translateY(0); }
	.service-card:hover {
		background: rgba(255,255,255,0.05); border-color: rgba(220,38,38,0.3);
		transform: translateY(-5px);
	}
	.sc-glow {
		position: absolute; inset: 0;
		background: radial-gradient(circle at 50% 0%, oklch(0.55 0.22 25 / 10%) 0%, transparent 60%);
		opacity: 0; transition: opacity 0.3s; pointer-events: none;
	}
	.service-card:hover .sc-glow { opacity: 1; }
	.sc-icon {
		display: inline-flex; align-items: center; justify-content: center;
		width: 64px; height: 64px; border-radius: 1rem; background: rgba(220,38,38,0.1);
		color: var(--primary); margin-bottom: 1.5rem; border: 1px solid rgba(220,38,38,0.2);
	}
	.sc-title { font-size: 1.5rem; font-weight: 600; margin: 0 0 1rem; }
	.sc-desc { color: rgba(255,255,255,0.6); font-size: 1rem; line-height: 1.6; margin: 0; }

	/* ── Process Section ── */
	.process-section {
		padding: 6rem 1.5rem; position: relative; background: rgba(0,0,0,0.2);
	}
	.process-container { max-width: 1000px; margin: 0 auto; }
	.process-header { text-align: center; margin-bottom: 4rem; opacity: 0; transform: translateY(20px); transition: all 0.6s; }
	.process-header.visible { opacity: 1; transform: translateY(0); }

	.process-timeline {
		display: flex; flex-direction: column; gap: 2rem; position: relative;
	}
	@media (min-width: 768px) {
		.process-timeline { flex-direction: row; gap: 1rem; }
	}

	.process-step {
		position: relative; flex: 1; text-align: left;
		opacity: 0; transform: translateY(20px); transition: all 0.6s var(--delay);
	}
	.process-step.visible { opacity: 1; transform: translateY(0); }
	
	.step-num {
		font-family: var(--font-display), sans-serif; font-size: 3.5rem;
		color: rgba(255,255,255,0.1); margin-bottom: 1rem; line-height: 1;
		transition: color 0.3s;
	}
	.process-step:hover .step-num { color: var(--primary); }
	
	.step-content { padding-right: 1.5rem; }
	.step-title { font-size: 1.25rem; font-weight: 600; margin: 0 0 0.5rem; }
	.step-desc { font-size: 0.95rem; color: rgba(255,255,255,0.5); line-height: 1.5; margin: 0; }
	
	.step-line {
		display: none;
	}
	@media (min-width: 768px) {
		.step-line {
			display: block; position: absolute; top: 1.75rem; right: -50%;
			width: 100%; height: 2px;
			background: linear-gradient(90deg, rgba(220,38,38,0.3) 0%, transparent 100%);
			z-index: -1;
		}
	}

	/* ── CTA Section ── */
	.cta-section {
		padding: 6rem 1.5rem;
		position: relative;
	}
	.cta-bg {
		position: absolute; inset: 0;
		background: radial-gradient(ellipse at center, rgba(220,38,38,0.1) 0%, transparent 70%);
		z-index: 0; pointer-events: none;
	}
	.cta-container {
		max-width: 800px; margin: 0 auto; text-align: center; position: relative; z-index: 1;
		background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
		border-radius: 2rem; padding: 4rem 2rem; backdrop-filter: blur(10px);
		opacity: 0; transform: scale(0.95); transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
	}
	.cta-container.visible { opacity: 1; transform: scale(1); }
	
	.cta-title {
		font-family: var(--font-display), sans-serif; font-size: clamp(2rem, 5vw, 3rem);
		margin: 0 0 1rem; line-height: 1.2; text-transform: uppercase;
	}
	.cta-desc {
		font-size: 1.1rem; color: rgba(255,255,255,0.6); margin: 0 auto 2rem; max-width: 500px;
	}
	.cta-btn {
		display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
		padding: 1rem 2rem; background: var(--primary); color: white;
		border-radius: 9999px; font-weight: 600; text-decoration: none; font-size: 1.1rem;
		transition: all 0.3s; box-shadow: 0 10px 30px rgba(220,38,38,0.3);
	}
	.cta-btn:hover {
		transform: translateY(-3px); box-shadow: 0 15px 40px rgba(220,38,38,0.4);
	}

	/* ── Gallery Section ── */
	.gallery-section {
		padding: 6rem 1.5rem; position: relative;
	}
	.gallery-container {
		max-width: 1200px; margin: 0 auto;
	}
	.masonry-grid {
		columns: 1;
		column-gap: 1.5rem;
	}
	@media (min-width: 640px) {
		.masonry-grid { columns: 2; }
	}
	@media (min-width: 1024px) {
		.masonry-grid { columns: 3; }
	}

	.masonry-item {
		break-inside: avoid;
		margin-bottom: 1.5rem;
		position: relative;
		border-radius: 1rem;
		overflow: hidden;
		opacity: 0; transform: translateY(20px); transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) var(--delay);
		border: 1px solid rgba(255,255,255,0.05);
	}
	.masonry-item.visible { opacity: 1; transform: translateY(0); }
	
	.masonry-item img {
		width: 100%;
		display: block;
		transition: transform 0.6s;
	}
	
	.mi-overlay {
		position: absolute; inset: 0; z-index: 1;
		background: linear-gradient(to top, rgba(220,38,38,0.4) 0%, transparent 50%);
		opacity: 0; transition: opacity 0.3s; pointer-events: none;
	}
	.masonry-item:hover .mi-overlay { opacity: 1; }
	.masonry-item:hover img { transform: scale(1.05); }

	.mi-caption {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 2;
		margin: 0;
		padding: 0.75rem 1rem 0.85rem;
		font-size: 0.8125rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		color: #fff;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
		background: linear-gradient(to top, rgba(0, 0, 0, 0.72), transparent);
		pointer-events: none;
	}

</style>
