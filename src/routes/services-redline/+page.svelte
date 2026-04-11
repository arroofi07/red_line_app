<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import CalendarCheck from 'lucide-svelte/icons/calendar-check';
	import Clapperboard from 'lucide-svelte/icons/clapperboard';
	import Package from 'lucide-svelte/icons/package';
	import Zap from 'lucide-svelte/icons/zap';
	import Mic from 'lucide-svelte/icons/mic';
	import Megaphone from 'lucide-svelte/icons/megaphone';
	import {
		eventOrganizerGallery,
		eventProductionGallery,
		eventEquipmentRentalGallery
	} from '$lib/assets/sevices-page';

	let mounted = $state(false);
	let showcaseVisible = $state(false);
	let moreVisible = $state(false);
	let ctaVisible = $state(false);

	let showcaseEl: HTMLElement;
	let moreEl: HTMLElement;
	let ctaEl: HTMLElement;

	const featuredServices = [
		{
			id: 'eo',
			title: 'Event Organizer',
			subtitle: 'Professional Organizer',
			description:
				'Jasa penyelenggara event yang telah berpengalaman selama lebih dari 12 tahun. Kami telah sukses menyelenggarakan berbagai jenis event, dan selanjutnya adalah event anda!',
			icon: CalendarCheck,
			gallery: eventOrganizerGallery
		},
		{
			id: 'production',
			title: 'Event Production',
			subtitle: 'Idea Reality',
			description:
				'Divisi produksi event dari Redline Communication. Redline Production hadir sebagai jawaban untuk merubah ide anda menjadi nyata.',
			icon: Clapperboard,
			gallery: eventProductionGallery
		},
		{
			id: 'rental',
			title: 'Event Equipment Rental',
			subtitle: 'Small to Large Scale',
			description:
				'Kami juga menyediakan jasa sewa alat/perlengkapan event anda, skala kecil ataupun besar kami siap menyediakannya.',
			icon: Package,
			gallery: eventEquipmentRentalGallery
		}
	];

	const moreServices = [
		{
			id: 'creative',
			title: 'Creative Agency',
			subtitle: 'Branding & Activation',
			description:
				'Divisi kreatif dari Redline Communication, untuk jawaban segala kebutuhan kreatif anda dan program aktivasi brand.',
			icon: Zap
		},
		{
			id: 'management',
			title: 'Show Management',
			subtitle: 'Sit Back & Relax',
			description:
				'Anda hanya perlu menikmati pertunjukan yang kami sediakan. Kami mengelola flow acara dari awal hingga akhir.',
			icon: Mic
		},
		{
			id: 'advertising',
			title: 'Advertising',
			subtitle: 'Business Growth',
			description:
				'Biarkan kami meningkatkan upaya periklanan Anda dan melihat bisnis Anda berkembang pesat melalui media yang tepat.',
			icon: Megaphone
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
			createObserver(showcaseEl, (v) => (showcaseVisible = v)),
			createObserver(moreEl, (v) => (moreVisible = v)),
			createObserver(ctaEl, (v) => (ctaVisible = v))
		];

		return () => cleanups.forEach((fn) => fn());
	});
</script>

<svelte:head>
	<title>Our Services | REDLINE Communication</title>
	<meta name="description" content="Explore the wide range of services offered by Redline Communication, from Event Organizing to Production and Creative Agency." />
</svelte:head>

<main class="services-page">
	<!-- ══ HERO SECTION ══ -->
	<section class="services-hero">
		<div class="hero-bg" aria-hidden="true"></div>
		<div class="blob b1" aria-hidden="true"></div>
		<div class="blob b2" aria-hidden="true"></div>
		<div class="grid-overlay" aria-hidden="true"></div>

		<div class="hero-container">
			{#if mounted}
				<div class="breadcrumb" in:fly={{ y: -20, duration: 700, delay: 100 }}>
					<a href="/" class="bc-link">Home</a>
					<span class="bc-sep">›</span>
					<span class="bc-current">Our Services</span>
				</div>

				<div class="hero-content">
					<div class="hero-text-wrapper" in:fly={{ y: 50, duration: 900, delay: 200 }}>
						<div class="hero-badge">
							<span class="badge-dot"></span>
							<span class="badge-label">WHAT WE DO</span>
						</div>

						<h1 class="hero-title">
							Our <span class="text-primary">Services</span>
						</h1>

						<p class="hero-subtitle">Bikin Event #diRedlineAja</p>

						<p class="hero-desc">
							Apapun kebutuhan anda terkait Event ataupun Produk anda, Redline Communication adalah solusinya. Kami mendampingi anda dari konsep hingga realisasi.
						</p>

						<div class="hero-actions">
							<a href="#services-list" class="btn-primary">
								Explore Services
								<span class="btn-arrow">↓</span>
							</a>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<div class="fade-bottom" aria-hidden="true"></div>
	</section>

	<!-- ══ CORE SERVICES (with imagery) ══ -->
	<section id="services-list" class="services-showcase" bind:this={showcaseEl}>
		<div class="showcase-container">
			<div class="section-header" class:visible={showcaseVisible}>
				<div class="section-label">OUR EXPERTISE</div>
				<h2 class="section-title">
					Pilihan Layanan <span class="text-primary">Yang Luas</span>
				</h2>
				<p class="section-desc">
					Kami menyediakan berbagai layanan komprehensif untuk memastikan setiap detail acara atau kampanye Anda berjalan sesuai rencana dan melampaui harapan.
				</p>
			</div>

			<div class="showcase-list">
				{#each featuredServices as service, i (service.id)}
					<article
						class="showcase-block"
						class:visible={showcaseVisible}
						style="--delay: {i * 120}ms"
					>
						<div class="showcase-intro">
							<div class="showcase-intro-icon" aria-hidden="true">
								<service.icon class="showcase-intro-icon-svg" />
							</div>
							<div class="showcase-copy">
								<span class="showcase-index">0{i + 1}</span>
								<h3 class="showcase-title">{service.title}</h3>
								<p class="showcase-subtitle">{service.subtitle}</p>
								<p class="showcase-desc">{service.description}</p>
							</div>
						</div>
						<div class="showcase-gallery">
							{#each service.gallery as item (item.src)}
								<figure class="showcase-gal-cell">
									<img src={item.src} alt={item.alt} class="showcase-gal-img" loading="lazy" />
								</figure>
							{/each}
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<!-- ══ MORE SERVICES ══ -->
	<section class="services-section services-more" bind:this={moreEl}>
		<div class="services-container">
			<div class="section-header section-header--compact" class:visible={moreVisible}>
				<div class="section-label">ALSO AVAILABLE</div>
				<h2 class="section-title section-title--sm">
					Layanan <span class="text-primary">Pelengkap</span>
				</h2>
			</div>

			<div class="services-grid">
				{#each moreServices as service, i (service.id)}
					<div class="service-card" class:visible={moreVisible} style="--delay: {(i % 3) * 150}ms">
						<div class="sc-content">
							<div class="sc-icon-wrap">
								<service.icon class="sc-icon" />
							</div>
							<div class="sc-number">0{i + 4}</div>
							<h3 class="sc-title">{service.title}</h3>
							<div class="sc-subtitle">{service.subtitle}</div>
							<p class="sc-desc">{service.description}</p>
						</div>
						<div class="sc-glow" aria-hidden="true"></div>
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
					Tunggu apalagi? Ayo <span class="text-primary">Diskusikan</span> <br /> Kebutuhan Event Anda!
				</h2>
				<p class="cta-desc">
					Tim kami siap membantu merealisasikan visi Anda menjadi sebuah pengalaman yang tak terlupakan. Hubungi kami sekarang untuk konsultasi gratis.
				</p>
				<a href="https://wa.me/0811663528" target="_blank" rel="noopener" class="cta-btn">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
						<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
					</svg>
					Chat via WhatsApp
				</a>
			</div>
		</div>
	</section>
</main>

<style>
	/* ── Base ── */
	.services-page {
		background: var(--background);
		min-height: 100vh;
		font-family: 'Outfit', sans-serif;
		overflow-x: hidden;
		color: white;
	}

	.text-primary { color: var(--primary); }

	/* ── Reuse shared aesthetics ── */
	.services-hero {
		position: relative;
		display: flex; flex-direction: column; justify-content: center;
		padding: 180px 1.5rem 80px;
	}

	.hero-bg {
		position: absolute; inset: 0;
		background: radial-gradient(ellipse 70% 60% at 20% 0%, oklch(0.55 0.22 25 / 15%) 0%, transparent 60%);
		z-index: 0;
	}

	.blob {
		position: absolute; border-radius: 9999px; filter: blur(100px); z-index: 1; pointer-events: none;
	}
	.b1 { width: 500px; height: 500px; top: -5%; left: 0; background: oklch(0.55 0.22 25 / 8%); }
	.b2 { width: 400px; height: 400px; bottom: 10%; right: 5%; background: oklch(0.55 0.22 25 / 6%); }

	.grid-overlay {
		position: absolute; inset: 0; opacity: 0.02; z-index: 0;
		background-image: linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px);
		background-size: 50px 50px;
	}

	.hero-container {
		position: relative; z-index: 10; max-width: 1200px; margin: 0 auto; width: 100%;
	}

	.breadcrumb { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 2rem; font-size: 0.813rem; font-weight: 500; }
	.bc-link { color: rgba(255,255,255,0.4); text-decoration: none; transition: color 0.2s; }
	.bc-link:hover { color: var(--primary); }
	.bc-sep { color: rgba(255,255,255,0.2); }
	.bc-current { color: var(--primary); }

	.hero-content {
		display: flex; flex-direction: column; align-items: flex-start; text-align: left;
		position: relative; z-index: 1;
	}
	
	.hero-text-wrapper { display: flex; flex-direction: column; gap: 1.25rem; max-width: 700px; }
	
	.hero-badge {
		display: inline-flex; align-items: center; gap: 0.625rem; padding: 0.5rem 1rem;
		border-radius: 9999px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); width: fit-content;
	}
	.badge-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--primary); animation: pulse 2s infinite; }
	.badge-label { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.15em; color: rgba(255,255,255,0.7); }

	.hero-title {
		font-family: var(--font-display), 'Bebas Neue', sans-serif; font-size: clamp(4rem, 8vw, 6.5rem);
		line-height: 0.95; margin: 0; text-transform: uppercase;
	}
	.hero-subtitle { font-size: 1.5rem; color: rgba(255,255,255,0.7); font-style: italic; margin: 0; }
	.hero-desc { font-size: 1.1rem; line-height: 1.6; color: rgba(255,255,255,0.5); margin: 0; }
	
	.btn-primary {
		display: inline-flex; align-items: center; gap: 0.5rem; margin-top: 1rem;
		padding: 0.875rem 1.5rem; background: var(--primary); color: white;
		border-radius: 9999px; font-weight: 600; text-decoration: none; transition: all 0.3s;
	}
	.btn-primary:hover {
		transform: translateY(-2px); box-shadow: 0 10px 25px oklch(0.55 0.22 25 / 40%);
	}
	.btn-arrow {
		display: flex; align-items: center; justify-content: center;
		width: 24px; height: 24px; background: rgba(255,255,255,0.2); border-radius: 50%;
		transition: transform 0.3s;
	}

	.fade-bottom {
		position: absolute; bottom: 0; left: 0; right: 0; height: 100px;
		background: linear-gradient(to top, var(--background), transparent); z-index: 2; pointer-events: none;
	}

	/* ── Section Defaults ── */
	.section-header { margin-bottom: 4rem; opacity: 0; transform: translateY(20px); transition: all 0.6s; }
	.section-header.visible { opacity: 1; transform: translateY(0); }
	.section-label { font-size: 0.8rem; font-weight: 600; color: var(--primary); letter-spacing: 0.2em; margin-bottom: 1rem; }
	.section-title { font-family: var(--font-display), sans-serif; font-size: 3rem; margin: 0 0 1rem; text-transform: uppercase; line-height: 1.1; }
	.section-desc { color: rgba(255,255,255,0.6); max-width: 600px; margin: 0; line-height: 1.6; }
	.section-header--compact { margin-bottom: 2.5rem; }
	.section-title--sm { font-size: clamp(1.75rem, 4vw, 2.5rem); }

	/* ── Featured services (copy + full gallery) ── */
	.services-showcase {
		padding: 4rem 1.5rem 2rem;
		position: relative;
	}
	.showcase-container {
		max-width: 1200px;
		margin: 0 auto;
	}
	.showcase-list {
		display: flex;
		flex-direction: column;
		gap: clamp(3rem, 6vw, 5rem);
		margin-top: 1rem;
	}
	.showcase-block {
		opacity: 0;
		transform: translateY(28px);
		transition:
			opacity 0.65s cubic-bezier(0.2, 0.8, 0.2, 1) var(--delay),
			transform 0.65s cubic-bezier(0.2, 0.8, 0.2, 1) var(--delay);
		padding-bottom: 0.5rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}
	.showcase-block:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}
	.showcase-block.visible {
		opacity: 1;
		transform: translateY(0);
	}
	.showcase-intro {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
		margin-bottom: 1.5rem;
		align-items: start;
	}
	@media (min-width: 640px) {
		.showcase-intro {
			grid-template-columns: auto 1fr;
			gap: 1.5rem;
			margin-bottom: 1.75rem;
		}
	}
	.showcase-intro-icon {
		width: 3.5rem;
		height: 3.5rem;
		border-radius: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(220, 38, 38, 0.12);
		border: 1px solid rgba(220, 38, 38, 0.25);
		flex-shrink: 0;
	}
	:global(.showcase-intro-icon-svg) {
		width: 1.75rem;
		height: 1.75rem;
		color: var(--primary);
	}
	.showcase-copy {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.5rem;
		padding: 0.25rem 0;
		min-width: 0;
	}
	.showcase-index {
		font-family: var(--font-display), sans-serif;
		font-size: clamp(3rem, 8vw, 4.5rem);
		line-height: 1;
		color: rgba(255, 255, 255, 0.06);
		position: absolute;
		top: -0.5rem;
		left: 0;
		pointer-events: none;
	}
	.showcase-title {
		font-family: var(--font-display), sans-serif;
		font-size: clamp(1.75rem, 3.5vw, 2.35rem);
		margin: 0;
		text-transform: uppercase;
		line-height: 1.1;
		position: relative;
		z-index: 1;
	}
	.showcase-subtitle {
		margin: 0;
		font-size: 0.8rem;
		font-weight: 700;
		color: var(--primary);
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}
	.showcase-desc {
		margin: 0.5rem 0 0;
		font-size: 1.05rem;
		line-height: 1.65;
		color: rgba(255, 255, 255, 0.55);
		max-width: 40rem;
	}
	.showcase-gallery {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.65rem;
	}
	@media (min-width: 520px) {
		.showcase-gallery {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 0.75rem;
		}
	}
	@media (min-width: 900px) {
		.showcase-gallery {
			grid-template-columns: repeat(4, minmax(0, 1fr));
			gap: 1rem;
		}
	}
	.showcase-gal-cell {
		margin: 0;
		position: relative;
		border-radius: 0.75rem;
		overflow: hidden;
		aspect-ratio: 4 / 3;
		background: rgba(0, 0, 0, 0.35);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}
	.showcase-gal-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: transform 0.55s ease;
	}
	.showcase-gal-cell:hover .showcase-gal-img,
	.showcase-gal-cell:focus-within .showcase-gal-img {
		transform: scale(1.04);
	}

	/* ── Services Grid (secondary) ── */
	.services-section { padding: 3rem 1.5rem 6rem; position: relative; }
	.services-more { padding-top: 2rem; }
	.services-container { max-width: 1200px; margin: 0 auto; }

	.services-grid {
		display: grid; grid-template-columns: 1fr; gap: 2rem;
	}
	@media (min-width: 768px) {
		.services-grid { grid-template-columns: repeat(2, 1fr); }
	}
	@media (min-width: 1024px) {
		.services-grid { grid-template-columns: repeat(3, 1fr); }
	}

	.service-card {
		position: relative;
		background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 1.5rem;
		overflow: hidden; opacity: 0; transform: translateY(30px); transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) var(--delay);
		display: flex; flex-direction: column;
		min-height: 100%;
	}
	.service-card.visible { opacity: 1; transform: translateY(0); }
	.service-card:hover {
		border-color: rgba(220,38,38,0.4); background: rgba(255,255,255,0.05); transform: translateY(-5px);
	}

	.sc-content { padding: 2rem; display: flex; flex-direction: column; flex: 1; position: relative; z-index: 2; }
	
	.sc-icon-wrap {
		width: 60px; height: 60px; background: rgba(220,38,38,0.1); border-radius: 1rem;
		display: flex; align-items: center; justify-content: center; margin-bottom: 2rem;
        border: 1px solid rgba(220,38,38,0.2);
        transition: all 0.4s ease;
	}
    .service-card:hover .sc-icon-wrap {
        background: var(--primary); border-color: var(--primary); transform: rotate(3deg) scale(1.05);
        box-shadow: 0 10px 20px rgba(220, 38, 38, 0.3);
    }

	:global(.sc-icon) { width: 30px; height: 30px; color: var(--primary); transition: color 0.4s ease; }
    .service-card:hover :global(.sc-icon) { color: white; }

	.sc-number {
		position: absolute; top: 1.5rem; right: 1.5rem; font-family: var(--font-display), sans-serif;
		font-size: 3rem; color: rgba(255,255,255,0.05); line-height: 1; transition: color 0.4s;
	}
	.service-card:hover .sc-number { color: rgba(220,38,38,0.15); }

	.sc-title { font-size: 1.5rem; font-weight: 600; margin: 0 0 0.25rem; line-height: 1.3; }
	.sc-subtitle { font-size: 0.85rem; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1rem; }
	.sc-desc { font-size: 1rem; color: rgba(255,255,255,0.5); line-height: 1.6; margin: 0; flex: 1; }

	.sc-glow {
		position: absolute; inset: 0; background: radial-gradient(circle at 50% 100%, oklch(0.55 0.22 25 / 15%) 0%, transparent 70%);
		opacity: 0; transition: opacity 0.5s ease; pointer-events: none; z-index: 1;
	}
	.service-card:hover .sc-glow { opacity: 1; }

	/* ── CTA Section ── */
	.cta-section { padding: 6rem 1.5rem; position: relative; }
	.cta-bg {
		position: absolute; inset: 0; background: radial-gradient(ellipse at center, rgba(220,38,38,0.1) 0%, transparent 70%);
		z-index: 0; pointer-events: none;
	}
	.cta-container {
		max-width: 800px; margin: 0 auto; text-align: center; position: relative; z-index: 1;
		background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
		border-radius: 2rem; padding: 4rem 2rem; backdrop-filter: blur(10px);
		opacity: 0; transform: scale(0.95); transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
	}
	.cta-container.visible { opacity: 1; transform: scale(1); }
	
	.cta-title { font-family: var(--font-display), sans-serif; font-size: clamp(2rem, 4vw, 2.75rem); margin: 0 0 1rem; line-height: 1.2; text-transform: uppercase; }
	.cta-desc { font-size: 1.1rem; color: rgba(255,255,255,0.6); margin: 0 auto 2rem; max-width: 500px; }
	.cta-btn {
		display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
		padding: 1rem 2rem; background: var(--primary); color: white;
		border-radius: 9999px; font-weight: 600; text-decoration: none; font-size: 1.1rem;
		transition: all 0.3s; box-shadow: 0 10px 30px rgba(220,38,38,0.3);
	}
	.cta-btn:hover { transform: translateY(-3px); box-shadow: 0 15px 40px rgba(220,38,38,0.4); }

    @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(220,38,38,0.4); }
        70% { box-shadow: 0 0 0 6px rgba(220,38,38,0); }
        100% { box-shadow: 0 0 0 0 rgba(220,38,38,0); }
    }
</style>
