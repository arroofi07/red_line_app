<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { Button } from '$lib/components/ui/button';

	let mounted = $state(false);
	let rotation = $state(0);

	onMount(() => {
		mounted = true;

		let animFrame: number;
		const spin = () => {
			rotation += 0.3;
			animFrame = requestAnimationFrame(spin);
		};
		animFrame = requestAnimationFrame(spin);

		return () => cancelAnimationFrame(animFrame);
	});

	const stats = [
		{ value: '200+', label: 'Events Organized' },
		{ value: '14+', label: 'Years Experience' },
		{ value: '50+', label: 'Expert Teams' }
	];
</script>

<section
	id="home"
	class="hero-section relative min-h-screen flex flex-col overflow-hidden"
>
	<!-- Background deep gradient -->
	<div class="absolute inset-0 z-0 bg-hero-gradient"></div>

	<!-- Ambient glow blobs -->
	<div class="blob blob-1"></div>
	<div class="blob blob-2"></div>
	<div class="blob blob-3"></div>

	<!-- Subtle grid overlay -->
	<div class="grid-overlay absolute inset-0 z-0 opacity-[0.04]"></div>

	<!-- Main content -->
	<div class="relative z-10 flex flex-1 flex-col">

		<!-- Hero body: two columns -->
		<div class="container mx-auto px-6 md:px-10 flex flex-1 items-center pt-32 pb-10">
			<div class="grid w-full grid-cols-1 gap-10 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] items-center">

				<!-- LEFT: Text content -->
				{#if mounted}
					<div class="flex flex-col gap-6" in:fly={{ y: 60, duration: 900, delay: 100 }}>

						<!-- Badge pill -->
						<div class="inline-flex items-center gap-2 w-fit rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
							<span class="inline-block h-2 w-2 rounded-full bg-primary animate-pulse"></span>
							<span class="text-xs font-semibold tracking-[0.25em] text-white/60 uppercase">Est. Since 2010 · Padang, Indonesia</span>
						</div>

						<!-- Main heading -->
						<h1 class="hero-heading font-display leading-[0.92] tracking-tight text-white uppercase">
							<span class="block">
								Largest
								<span class="star-icon">
									<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
										<circle cx="20" cy="20" r="20" fill="white"/>
										<path d="M20 6 L21.8 18.2 L34 20 L21.8 21.8 L20 34 L18.2 21.8 L6 20 L18.2 18.2 Z" fill="#FF5C00"/>
									</svg>
								</span>
								Event
							</span>
							<span class="block text-primary italic">Organizer</span>
							<span class="block">
								<span class="text-white/30">&amp; Strategic</span>
							</span>
							<span class="block">Communication</span>
						</h1>

						<!-- Decorative arrow + description -->
						<div class="flex items-start gap-4 pt-2">
							<div class="scribble-arrow mt-1 flex-shrink-0">
								<svg width="80" height="36" viewBox="0 0 80 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
									<path d="M4 28 C10 8, 30 4, 50 12 C62 17, 70 10, 74 6" stroke="white" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.5"/>
									<path d="M68 4 L76 7 L70 13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.5"/>
								</svg>
							</div>
							<p class="max-w-md text-base md:text-lg text-white/50 leading-relaxed">
								<strong class="text-white/90">Redline Communication</strong> — one stop solution untuk semua kebutuhan event anda. Event organizer, management, product launching, MICE &amp; more.
							</p>
						</div>

						<!-- CTA row -->
						<div class="flex items-center gap-6 pt-4" in:fly={{ y: 30, duration: 800, delay: 400 }}>
							<a
								href="#contact"
								class="cta-btn group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-base font-bold text-white shadow-glow transition-all hover:scale-105 hover:bg-primary/90"
							>
								Explore Now
								<span class="cta-arrow inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1">
									→
								</span>
							</a>

							<div class="flex items-center gap-3">
								<div class="h-10 w-px bg-white/15"></div>
								<div class="flex flex-col">
									<span class="text-[10px] font-bold tracking-[0.3em] text-primary uppercase">Contact</span>
									<span class="text-sm font-medium text-white/40">+62 xxx-xxxx-xxxx</span>
								</div>
							</div>
						</div>
					</div>
				{/if}

				<!-- RIGHT: Visual card + rotating badge -->
				{#if mounted}
					<div class="relative flex items-center justify-center" in:fly={{ x: 60, duration: 900, delay: 300 }}>

						<!-- Glow behind card -->
						<div class="absolute inset-0 rounded-3xl bg-primary/20 blur-[60px]"></div>

						<!-- Visual card (image placeholder / stylized panel) -->
						<div class="visual-card relative w-full max-w-sm lg:max-w-none rounded-3xl overflow-hidden border border-white/10">
							<!-- Inner gradient atmosphere -->
							<div class="absolute inset-0 bg-card-gradient z-0"></div>

							<!-- VR Person Illustration -->
							<div class="relative z-10 w-full h-[420px] lg:h-[500px] overflow-hidden">

								<!-- Ambient light glow behind figure -->
								<div class="figure-glow-orange"></div>
								<div class="figure-glow-blue"></div>

								<!-- Hero Illustration -->
								<img
									src="/src/lib/assets/hero_illustration.png"
									alt="Professional Event Organizer Illustration"
									class="hero-character absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full object-contain z-10"
								/>

								<!-- Floating stats chips -->
								<div class="float-chip chip-a">
									<span class="chip-value">200+</span>
									<span class="chip-label">Events</span>
								</div>
								<div class="float-chip chip-b">
									<span class="chip-value">14+</span>
									<span class="chip-label">Years</span>
								</div>
							</div>

							<!-- Bottom gradient overlay on card -->
							<div class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#060B18] to-transparent z-20"></div>
						</div>

						<!-- Rotating circular badge -->
						<div class="badge-ring absolute -top-6 -right-6 lg:-top-8 lg:-right-8">
							<div class="badge-inner" style="transform: rotate({rotation}deg)">
								<svg viewBox="0 0 120 120" width="120" height="120">
									<defs>
										<path id="circle-path" d="M 60,60 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"/>
									</defs>
									<text class="badge-text" fill="white" opacity="0.6" font-size="10.5" font-family="monospace" letter-spacing="4" font-weight="600">
										<textPath href="#circle-path">EVENT · ORGANIZER · REDLINE · </textPath>
									</text>
								</svg>
							</div>
							<!-- Arrow in center -->
							<div class="badge-arrow">
								<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
									<path d="M7 21 L21 7 M21 7 H11 M21 7 V17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
							</div>
						</div>

					</div>
				{/if}
			</div>
		</div>

		<!-- Stats bar -->
		{#if mounted}
			<div class="stats-bar relative z-10 border-t border-white/[0.06]" in:fade={{ duration: 800, delay: 700 }}>
				<div class="container mx-auto px-6 md:px-10">
					<div class="flex items-center divide-x divide-white/[0.06] py-6">
						{#each stats as stat, i}
							<div class="flex flex-col gap-0.5 px-8 first:pl-0 last:pr-0">
								<span class="stat-value text-3xl font-black text-primary leading-none">{stat.value}</span>
								<span class="text-sm text-white/40 font-medium">{stat.label}</span>
							</div>
						{/each}

						<!-- Spacer + tagline -->
						<div class="ml-auto hidden pl-8 md:flex items-center gap-3">
							<div class="h-1 w-1 rounded-full bg-primary/60"></div>
							<span class="text-xs tracking-[0.2em] text-white/30 uppercase font-semibold">Professional Event Solutions</span>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>

	<!-- Bottom fade -->
	<div class="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent pointer-events-none z-20"></div>
</section>

<style>
	/* ── Fonts ── */
	@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,600;1,400&display=swap');

	/* ── CSS vars ── */
	:root {
		--primary: #FF5C00;
		--bg-deep: #060B18;
	}

	/* ── Section base ── */
	.hero-section {
		background: var(--bg-deep);
		font-family: 'Barlow', sans-serif;
	}

	/* ── Background gradient ── */
	.bg-hero-gradient {
		background: radial-gradient(ellipse 80% 60% at 60% 20%, #0D1B3E 0%, #060B18 60%),
		            radial-gradient(ellipse 50% 50% at 20% 80%, #0A1628 0%, transparent 70%);
	}

	/* ── Blobs ── */
	.blob {
		position: absolute;
		border-radius: 9999px;
		filter: blur(100px);
		pointer-events: none;
		z-index: 1;
	}
	.blob-1 {
		width: 500px; height: 500px;
		top: -10%; left: 10%;
		background: rgba(255, 92, 0, 0.06);
	}
	.blob-2 {
		width: 600px; height: 400px;
		bottom: 10%; right: -5%;
		background: rgba(20, 60, 140, 0.25);
	}
	.blob-3 {
		width: 300px; height: 300px;
		top: 40%; left: 40%;
		background: rgba(255, 92, 0, 0.04);
	}

	/* ── Grid overlay ── */
	.grid-overlay {
		background-image:
			linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px);
		background-size: 60px 60px;
	}

	/* ── Hero heading ── */
	.hero-heading {
		font-family: 'Bebas Neue', 'Impact', sans-serif;
		font-size: clamp(3.5rem, 7vw, 7rem);
		line-height: 0.93;
	}

	/* ── Star icon inline ── */
	.star-icon {
		display: inline-flex;
		align-items: center;
		vertical-align: middle;
		width: 0.7em;
		height: 0.7em;
		margin: 0 0.12em;
		position: relative;
		top: -0.08em;
	}
	.star-icon svg {
		width: 100%;
		height: 100%;
	}

	/* ── Primary color util ── */
	.text-primary { color: var(--primary); }
	.bg-primary { background-color: var(--primary); }

	/* ── CTA glow shadow ── */
	.shadow-glow {
		box-shadow: 0 0 30px rgba(255, 92, 0, 0.35), 0 8px 24px rgba(255, 92, 0, 0.2);
	}

	/* ── Visual card ── */
	.visual-card {
		background: rgba(255, 255, 255, 0.02);
		backdrop-filter: blur(10px);
	}
	.bg-card-gradient {
		background: radial-gradient(ellipse at 50% 30%, rgba(13, 40, 100, 0.6) 0%, rgba(6, 11, 24, 0.8) 70%);
	}

	/* ── Hero Character Illustration ── */
	.hero-character {
		width: 100%;
		height: 100%;
		object-fit: contain;
		display: block;
	}
	.figure-glow-orange {
		position: absolute;
		left: -10%; top: 20%;
		width: 55%; height: 60%;
		border-radius: 9999px;
		background: radial-gradient(circle, rgba(255,92,0,0.25) 0%, transparent 70%);
		filter: blur(40px);
		z-index: 1;
		pointer-events: none;
	}
	.figure-glow-blue {
		position: absolute;
		right: -5%; top: 10%;
		width: 60%; height: 70%;
		border-radius: 9999px;
		background: radial-gradient(circle, rgba(26,74,255,0.2) 0%, transparent 70%);
		filter: blur(50px);
		z-index: 1;
		pointer-events: none;
	}

	/* ── Floating chips ── */
	.float-chip {
		position: absolute;
		display: flex; flex-direction: column;
		background: rgba(255,255,255,0.06);
		border: 1px solid rgba(255,255,255,0.1);
		backdrop-filter: blur(8px);
		border-radius: 14px;
		padding: 10px 16px;
		z-index: 20;
	}
	.chip-a { top: 15%; right: 8%; animation: float-a 4s ease-in-out infinite; }
	.chip-b { bottom: 20%; left: 6%; animation: float-b 4.5s ease-in-out infinite; }
	@keyframes float-a {
		0%, 100% { transform: translateY(0); }
		50%       { transform: translateY(-8px); }
	}
	@keyframes float-b {
		0%, 100% { transform: translateY(0); }
		50%       { transform: translateY(8px); }
	}
	.chip-value { font-family: 'Bebas Neue', sans-serif; font-size: 1.6rem; color: var(--primary); line-height: 1; }
	.chip-label { font-size: 0.65rem; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600; }

	/* ── Rotating badge ── */
	.badge-ring {
		width: 120px; height: 120px;
		position: absolute;
		display: flex; align-items: center; justify-content: center;
		border: 1px solid rgba(255,255,255,0.12);
		border-radius: 9999px;
		background: rgba(255,255,255,0.04);
		backdrop-filter: blur(6px);
		z-index: 30;
	}
	.badge-inner {
		position: absolute; inset: 0;
		display: flex; align-items: center; justify-content: center;
	}
	.badge-arrow {
		position: relative; z-index: 2;
		display: flex; align-items: center; justify-content: center;
	}

	/* ── Stats bar ── */
	.stat-value {
		font-family: 'Bebas Neue', sans-serif;
		color: var(--primary);
	}
	.stats-bar {
		background: rgba(255,255,255,0.01);
		backdrop-filter: blur(4px);
	}

	/* ── Pulse dot ── */
	@keyframes pulse {
		0%, 100% { opacity: 1; transform: scale(1); }
		50%       { opacity: 0.5; transform: scale(1.4); }
	}
	.animate-pulse {
		animation: pulse 2s ease-in-out infinite;
	}
</style>