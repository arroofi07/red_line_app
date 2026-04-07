<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { Button } from '$lib/components/ui/button';

	let mounted = $state(false);
	let rotation = $state(0);
	let descExpanded = $state(false);

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

</script>

<section id="home" class="hero-section relative flex min-h-screen flex-col overflow-hidden">
	<!-- Background deep gradient -->
	<div class="bg-hero-gradient absolute inset-0 z-0"></div>

	<!-- Ambient glow blobs -->
	<div class="blob blob-1"></div>
	<div class="blob blob-2"></div>
	<div class="blob blob-3"></div>

	<!-- Subtle grid overlay -->
	<div class="grid-overlay absolute inset-0 z-0 opacity-[0.04]"></div>

	<!-- Main content -->
	<div class="relative z-10 flex flex-1 flex-col">
		<!-- Hero body: two columns -->
		<div class="container mx-auto flex flex-1 items-center px-4 pt-24 pb-6 sm:px-6 sm:pt-28 md:px-10 md:pt-32">
			<div
				class="grid w-full grid-cols-1 items-center gap-6 sm:gap-8 md:gap-10 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px]"
			>
				<!-- LEFT: Text content -->
				{#if mounted}
					<div class="flex flex-col gap-4 sm:gap-6 mt-4 sm:mt-0" in:fly={{ y: 60, duration: 900, delay: 100 }}>
						<!-- Badge pill -->
						<div
							class="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 sm:px-4 backdrop-blur-sm"
						>
							<span class="inline-block h-2 w-2 animate-pulse rounded-full bg-primary"></span>
							<span class="text-[10px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] text-white/60 uppercase"
								>EO PADANG. dari 2010 · Padang, Sumatera Barat, Indonesia</span
							>
						</div>

						<!-- Main heading -->
						<h1
							class="hero-heading font-display leading-[0.92] tracking-tight text-white uppercase"
						>
							<span class="block"> EVENT ORGANIZER & </span>
							<span class="block text-primary italic">STRATEGIC</span>
							<span class="block">COMMUNICATION</span>
						</h1>

						<!-- Decorative arrow + description -->
						<div class="flex items-start gap-4 pt-2">
							<div class="scribble-arrow mt-1 hidden flex-shrink-0 sm:flex">
								<svg
									width="80"
									height="36"
									viewBox="0 0 80 36"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
								>
									<path
										d="M4 28 C10 8, 30 4, 50 12 C62 17, 70 10, 74 6"
										stroke="white"
										stroke-width="1.5"
										stroke-linecap="round"
										fill="none"
										opacity="0.5"
									/>
									<path
										d="M68 4 L76 7 L70 13"
										stroke="white"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
										fill="none"
										opacity="0.5"
									/>
								</svg>
							</div>
							<div class="desc-wrapper w-full max-w-md" class:expanded={descExpanded}>
								<p class="desc-text text-base leading-relaxed text-white/50 md:text-lg">
									Redline Communication (EO Padang) – one stop solution untuk semua kebutuhan event
									anda dari event organizer, event management, product launching, event production,
									rental event equipment , MICE ( meeting, exhibition,conference,exhibition ) dll.
									Berpusat di kota Padang tetapi kami dapat juga membantu anda melaksanakan event di
									kota – kota lain selain Padang seperti pekanbaru,jambi,medan.
									Lampung,palembang,surabaya , jogja maupun Jakarta.
								</p>
								{#if !descExpanded}
									<div class="desc-fade"></div>
								{/if}
							</div>
							<button
								class="desc-toggle mt-2 flex items-center gap-1.5 text-sm font-semibold text-primary transition-opacity hover:opacity-80"
								onclick={() => (descExpanded = !descExpanded)}
								aria-expanded={descExpanded}
							>
								{descExpanded ? 'Lihat Lebih Sedikit' : 'Lihat Selengkapnya'}
								<svg
									class="chevron"
									class:rotated={descExpanded}
									width="14"
									height="14"
									viewBox="0 0 14 14"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M2 5 L7 10 L12 5"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</button>
						</div>

						<!-- CTA row -->
						<div class="flex flex-wrap items-center gap-3 sm:gap-6 pt-3 sm:pt-4" in:fly={{ y: 30, duration: 800, delay: 400 }}>
							<a
								href="#contact"
								class="cta-btn group shadow-glow inline-flex items-center gap-2 sm:gap-3 rounded-full bg-primary px-5 py-3 sm:px-8 sm:py-4 text-[13px] sm:text-base font-bold text-white transition-all hover:scale-105 hover:bg-primary/90"
							>
								Explore Now
								<span
									class="cta-arrow inline-flex h-5 w-5 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1"
								>
									&rarr;
								</span>
							</a>

							<div class="flex items-center gap-2 sm:gap-3">
								<div class="h-6 sm:h-10 w-px bg-white/15"></div>
								<div class="flex flex-col">
									<span class="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.3em] text-primary uppercase"
										>Contact</span
									>
									<span class="text-[11px] sm:text-sm font-medium text-white/40">+62 xxx-xxxx-xxxx</span>
								</div>
							</div>
						</div>
					</div>
				{/if}

				<!-- RIGHT: Visual card + rotating badge -->
				{#if mounted}
					<div
						class="relative flex items-center justify-center"
						in:fly={{ x: 60, duration: 900, delay: 300 }}
					>
						<!-- Glow behind card -->
						<div class="absolute inset-0 rounded-3xl bg-primary/20 blur-[60px]"></div>

						<!-- Visual card (image placeholder / stylized panel) -->
						<div
							class="visual-card relative w-full max-w-xs overflow-hidden rounded-3xl border border-white/10 sm:max-w-sm lg:max-w-none"
						>
							<!-- Inner gradient atmosphere -->
							<div class="bg-card-gradient absolute inset-0 z-0"></div>

							<!-- VR Person Illustration -->
							<div class="relative z-10 h-[260px] w-full overflow-hidden sm:h-[360px] md:h-[420px] lg:h-[500px]">
								<!-- Ambient light glow behind figure -->
								<div class="figure-glow-red"></div>
								<div class="figure-glow-red-secondary"></div>

								<!-- Hero Illustration -->
								<img
									src="/src/lib/assets/hero_illustration.png"
									alt="Professional Event Organizer Illustration"
									class="hero-character absolute bottom-0 left-1/2 z-10 h-full w-full -translate-x-1/2 object-contain py-2"
								/>
							</div>

							<!-- Bottom gradient overlay on card -->
							<div
								class="absolute right-0 bottom-0 left-0 z-20 h-24 bg-gradient-to-t from-[#060B18] to-transparent"
							></div>
						</div>

						<!-- Rotating circular badge -->
						<div class="badge-ring absolute -top-4 -right-4 sm:-top-6 sm:-right-6 lg:-top-8 lg:-right-8">
							<div class="badge-inner" style="transform: rotate({rotation}deg)">
								<svg viewBox="0 0 120 120" width="120" height="120">
									<defs>
										<path
											id="circle-path"
											d="M 60,60 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
										/>
									</defs>
									<text
										class="badge-text"
										fill="white"
										opacity="0.6"
										font-size="10.5"
										font-family="monospace"
										letter-spacing="4"
										font-weight="600"
									>
										<textPath href="#circle-path">EVENT · ORGANIZER · REDLINE · </textPath>
									</text>
								</svg>
							</div>
							<!-- Arrow in center -->
							<div class="badge-arrow">
								<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
									<path
										d="M7 21 L21 7 M21 7 H11 M21 7 V17"
										stroke="white"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- Bottom fade -->
	<div
		class="pointer-events-none absolute bottom-0 left-0 z-20 h-20 w-full bg-gradient-to-t from-background to-transparent"
	></div>
</section>

<style>
	/* ── Fonts ── */
	@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,600;1,400&display=swap');

	/* ── CSS vars ── */
	:root {
		--bg-deep: #060b18;
	}

	/* ── Section base ── */
	.hero-section {
		background: var(--bg-deep);
		font-family: 'Barlow', sans-serif;
	}

	/* ── Background gradient ── */
	.bg-hero-gradient {
		background:
			radial-gradient(ellipse 80% 60% at 60% 20%, oklch(0.15 0.05 25 / 30%) 0%, #060b18 60%),
			radial-gradient(ellipse 50% 50% at 20% 80%, oklch(0.15 0.05 25 / 15%) 0%, transparent 70%);
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
		width: 500px;
		height: 500px;
		top: -10%;
		left: 10%;
		background: oklch(0.55 0.22 25.26 / 8%);
	}
	.blob-2 {
		width: 600px;
		height: 400px;
		bottom: 10%;
		right: -5%;
		background: oklch(0.55 0.22 25.26 / 12%);
	}
	.blob-3 {
		width: 300px;
		height: 300px;
		top: 40%;
		left: 40%;
		background: oklch(0.55 0.22 25.26 / 5%);
	}

	/* ── Grid overlay ── */
	.grid-overlay {
		background-image:
			linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px);
		background-size: 60px 60px;
	}

	/* ── Hero heading ── */
	.hero-heading {
		font-family: 'Bebas Neue', 'Impact', sans-serif;
		font-size: clamp(2.2rem, 11vw, 7rem);
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
	.text-primary {
		color: var(--primary);
	}
	.bg-primary {
		background-color: var(--primary);
	}

	/* ── CTA glow shadow ── */
	.shadow-glow {
		box-shadow:
			0 0 30px oklch(0.55 0.22 25.26 / 40%),
			0 8px 24px oklch(0.55 0.22 25.26 / 20%);
	}

	/* ── Visual card ── */
	.visual-card {
		background: rgba(255, 255, 255, 0.02);
		backdrop-filter: blur(10px);
	}
	.bg-card-gradient {
		background: radial-gradient(
			ellipse at 50% 30%,
			oklch(0.15 0.05 25 / 50%) 0%,
			rgba(6, 11, 24, 0.8) 70%
		);
	}

	/* ── Hero Character Illustration ── */
	.hero-character {
		width: 100%;
		height: 100%;
		object-fit: contain;
		display: block;
	}
	.figure-glow-red {
		position: absolute;
		left: -10%;
		top: 20%;
		width: 55%;
		height: 60%;
		border-radius: 9999px;
		background: radial-gradient(circle, oklch(0.55 0.22 25.26 / 30%) 0%, transparent 70%);
		filter: blur(40px);
		z-index: 1;
		pointer-events: none;
	}
	.figure-glow-red-secondary {
		position: absolute;
		right: -5%;
		top: 10%;
		width: 60%;
		height: 70%;
		border-radius: 9999px;
		background: radial-gradient(circle, oklch(0.55 0.22 25.26 / 20%) 0%, transparent 70%);
		filter: blur(50px);
		z-index: 1;
		pointer-events: none;
	}

	/* ── Floating chips ── */
	.float-chip {
		position: absolute;
		display: flex;
		flex-direction: column;
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(8px);
		border-radius: 12px;
		padding: 6px 10px;
		z-index: 20;
	}
	@media (min-width: 640px) {
		.float-chip {
			border-radius: 14px;
			padding: 10px 16px;
		}
	}
	.chip-a {
		top: 10%;
		right: 4%;
		animation: float-a 4s ease-in-out infinite;
	}
	.chip-b {
		bottom: 12%;
		left: 4%;
		animation: float-b 4.5s ease-in-out infinite;
	}
	@media (min-width: 640px) {
		.chip-a {
			top: 15%;
			right: 8%;
		}
		.chip-b {
			bottom: 20%;
			left: 6%;
		}
	}
	@keyframes float-a {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-8px);
		}
	}
	@keyframes float-b {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(8px);
		}
	}
	.chip-value {
		font-family: 'Bebas Neue', sans-serif;
		font-size: 1.4rem;
		color: var(--primary);
		line-height: 1;
	}
	@media (min-width: 640px) {
		.chip-value {
			font-size: 1.6rem;
		}
	}
	.chip-label {
		font-size: 0.6rem;
		color: rgba(255, 255, 255, 0.5);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-weight: 600;
	}
	@media (min-width: 640px) {
		.chip-label {
			font-size: 0.65rem;
		}
	}

	/* ── Rotating badge ── */
	.badge-ring {
		width: 90px;
		height: 90px;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 9999px;
		background: rgba(255, 255, 255, 0.04);
		backdrop-filter: blur(6px);
		z-index: 30;
	}
	@media (min-width: 640px) {
		.badge-ring {
			width: 120px;
			height: 120px;
		}
	}
	.badge-inner {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.badge-arrow {
		position: relative;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* ── Description dropdown ── */
	.desc-wrapper {
		position: relative;
		max-height: 3.2em; /* ~2 lines mobile */
		overflow: hidden;
		transition: max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1);
	}
	@media (min-width: 640px) {
		.desc-wrapper {
			max-height: 3.6em;
		}
	}
	.desc-wrapper.expanded {
		max-height: 20em;
	}
	.desc-fade {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 2em;
		background: linear-gradient(to bottom, transparent, oklch(0.09 0.03 25 / 90%));
		pointer-events: none;
	}
	.desc-toggle {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		color: var(--primary);
		letter-spacing: 0.02em;
		-webkit-tap-highlight-color: transparent;
		min-height: 44px; /* accessible tap target */
		display: flex;
		align-items: center;
		gap: 0.375rem;
	}
	.chevron {
		transition: transform 0.3s ease;
		flex-shrink: 0;
	}
	.chevron.rotated {
		transform: rotate(180deg);
	}

	/* ── Stats bar ── */
	.stat-value {
		font-family: 'Bebas Neue', sans-serif;
		color: var(--primary);
	}
	.stats-bar {
		background: rgba(255, 255, 255, 0.01);
		backdrop-filter: blur(4px);
	}

	/* ── Pulse dot ── */
	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
			transform: scale(1);
		}
		50% {
			opacity: 0.5;
			transform: scale(1.4);
		}
	}
	.animate-pulse {
		animation: pulse 2s ease-in-out infinite;
	}
</style>
