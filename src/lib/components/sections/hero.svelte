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
		<div
			class="container mx-auto flex flex-1 items-center px-4 pt-24 pb-6 sm:px-6 sm:pt-28 md:px-10 md:pt-32"
		>
			<div
				class="grid w-full grid-cols-1 items-center gap-6 sm:gap-8 md:gap-10 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px]"
			>
				<!-- LEFT: Text content -->
				{#if mounted}
					<div
						class="mt-4 flex flex-col gap-4 sm:mt-0 sm:gap-6"
						in:fly={{ y: 60, duration: 900, delay: 100 }}
					>
						<!-- Badge pill -->
						<div
							class="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm sm:px-4"
						>
							<span class="inline-block h-2 w-2 animate-pulse rounded-full bg-primary"></span>
							<span
								class="text-[10px] font-semibold tracking-[0.2em] text-white/60 uppercase sm:text-xs sm:tracking-[0.25em]"
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
						<div
							class="flex flex-wrap items-center gap-3 pt-3 sm:gap-6 sm:pt-4"
							in:fly={{ y: 30, duration: 800, delay: 400 }}
						>
							<a
								href="/services-redline"
								class="cta-btn group shadow-glow inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-[13px] font-bold text-white transition-all hover:scale-105 hover:bg-primary/90 sm:gap-3 sm:px-8 sm:py-4 sm:text-base"
							>
								Explore Now
								<span
									class="cta-arrow inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1 sm:h-7 sm:w-7"
								>
									&rarr;
								</span>
							</a>

							<div class="flex items-center gap-2 sm:gap-3">
								<div class="h-6 w-px bg-white/15 sm:h-10"></div>
								<div class="flex flex-col">
									<span
										class="text-[9px] font-bold tracking-[0.2em] text-primary uppercase sm:text-[10px] sm:tracking-[0.3em]"
										>Contact</span
									>
									<span class="text-[11px] font-medium text-white/40 sm:text-sm"
										>+62 811 663 528</span
									>
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
							<div
								class="relative z-10 h-[260px] w-full overflow-hidden sm:h-[360px] md:h-[420px] lg:h-[500px]"
							>
								<!-- Ambient light glow behind figure -->
								<div class="figure-glow-red"></div>
								<div class="figure-glow-red-secondary"></div>

								<!-- Hero Illustration: Concert Stage (Audience POV) -->
								<svg
									viewBox="0 0 400 500"
									width="100%"
									height="100%"
									preserveAspectRatio="xMidYMid slice"
									xmlns="http://www.w3.org/2000/svg"
									aria-label="Concert Event Stage Illustration"
									role="img"
									class="absolute inset-0 z-10"
								>
									<defs>
										<!-- Deep background -->
										<radialGradient id="h-bg" cx="50%" cy="55%" r="65%" gradientUnits="objectBoundingBox">
											<stop offset="0%" stop-color="#150604"/>
											<stop offset="100%" stop-color="#060b18"/>
										</radialGradient>
										<!-- Screen glow emission -->
										<radialGradient id="h-scr-emit" cx="50%" cy="50%" r="50%" gradientUnits="objectBoundingBox">
											<stop offset="0%" stop-color="#C8391C" stop-opacity="0.22"/>
											<stop offset="100%" stop-color="#C8391C" stop-opacity="0"/>
										</radialGradient>
										<!-- Screen inner content bg -->
										<linearGradient id="h-scr-bg" x1="0" y1="0" x2="0" y2="1">
											<stop offset="0%" stop-color="#0c1628"/>
											<stop offset="100%" stop-color="#060b18"/>
										</linearGradient>
										<!-- Truss metal bar -->
										<linearGradient id="h-metal" x1="0" y1="0" x2="0" y2="1">
											<stop offset="0%" stop-color="rgba(255,255,255,0.18)"/>
											<stop offset="50%" stop-color="rgba(255,255,255,0.1)"/>
											<stop offset="100%" stop-color="rgba(255,255,255,0.04)"/>
										</linearGradient>
										<!-- Truss columns -->
										<linearGradient id="h-col" x1="0" y1="0" x2="0" y2="1">
											<stop offset="0%" stop-color="rgba(255,255,255,0.13)"/>
											<stop offset="100%" stop-color="rgba(255,255,255,0.03)"/>
										</linearGradient>
										<!-- Beam white (from source to transparent) -->
										<linearGradient id="h-bm-w" x1="0" y1="0" x2="0" y2="1">
											<stop offset="0%" stop-color="#ffffff" stop-opacity="0.3"/>
											<stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
										</linearGradient>
										<!-- Beam red -->
										<linearGradient id="h-bm-r" x1="0" y1="0" x2="0" y2="1">
											<stop offset="0%" stop-color="#C8391C" stop-opacity="0.38"/>
											<stop offset="100%" stop-color="#C8391C" stop-opacity="0"/>
										</linearGradient>
										<!-- Stage surface -->
										<linearGradient id="h-stage" x1="0" y1="0" x2="0" y2="1">
											<stop offset="0%" stop-color="#1a0d0a"/>
											<stop offset="100%" stop-color="#080808"/>
										</linearGradient>
										<!-- Stage front LED strip -->
										<linearGradient id="h-led" x1="0" y1="0" x2="1" y2="0">
											<stop offset="0%"   stop-color="#C8391C" stop-opacity="0.7"/>
											<stop offset="28%"  stop-color="#ff7a3d" stop-opacity="0.9"/>
											<stop offset="55%"  stop-color="#ffffff" stop-opacity="0.85"/>
											<stop offset="80%"  stop-color="#ff7a3d" stop-opacity="0.9"/>
											<stop offset="100%" stop-color="#C8391C" stop-opacity="0.7"/>
										</linearGradient>
										<!-- Stage glow (warm uplight on crowd) -->
										<radialGradient id="h-stage-glow" cx="50%" cy="0%" r="80%" gradientUnits="objectBoundingBox">
											<stop offset="0%" stop-color="#C8391C" stop-opacity="0.35"/>
											<stop offset="100%" stop-color="#C8391C" stop-opacity="0"/>
										</radialGradient>
										<!-- Speaker cabinet -->
										<linearGradient id="h-spkr" x1="0" y1="0" x2="0" y2="1">
											<stop offset="0%" stop-color="#111120"/>
											<stop offset="100%" stop-color="#08080f"/>
										</linearGradient>
										<!-- LIVE badge -->
										<linearGradient id="h-live" x1="0" y1="0" x2="1" y2="0">
											<stop offset="0%" stop-color="#C8391C"/>
											<stop offset="100%" stop-color="#9c1e08"/>
										</linearGradient>
										<!-- Fog -->
										<radialGradient id="h-fog" cx="50%" cy="50%" r="50%" gradientUnits="objectBoundingBox">
											<stop offset="0%" stop-color="#C8391C" stop-opacity="0.12"/>
											<stop offset="50%" stop-color="#ffffff" stop-opacity="0.04"/>
											<stop offset="100%" stop-color="transparent" stop-opacity="0"/>
										</radialGradient>
										<!-- Screen clip -->
										<clipPath id="h-scr-clip">
											<rect x="72" y="52" width="256" height="190" rx="3"/>
										</clipPath>
										<!-- Beam blur -->
										<filter id="h-blur-beam" x="-25%" y="-5%" width="150%" height="110%">
											<feGaussianBlur stdDeviation="7"/>
										</filter>
										<!-- Soft glow for lights/LEDs -->
										<filter id="h-glow" x="-60%" y="-60%" width="220%" height="220%">
											<feGaussianBlur stdDeviation="3" result="b"/>
											<feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
										</filter>
										<!-- Screen bloom -->
										<filter id="h-screen-bloom" x="-20%" y="-20%" width="140%" height="140%">
											<feGaussianBlur stdDeviation="14"/>
										</filter>
									</defs>

									<style>
										/* Beams — 3 staggered groups */
										.hb1{animation:hbeam 3s ease-in-out infinite;animation-delay:0s}
										.hb2{animation:hbeam 3s ease-in-out infinite;animation-delay:1s}
										.hb3{animation:hbeam 3s ease-in-out infinite;animation-delay:2s}
										@keyframes hbeam{0%,100%{opacity:.12}50%{opacity:.3}}
										/* Screen pulse */
										.hscr{animation:hscr 3.5s ease-in-out infinite}
										@keyframes hscr{0%,100%{opacity:.55}50%{opacity:1}}
										/* LED strip chase */
										.hled{animation:hled 2s ease-in-out infinite}
										@keyframes hled{0%,100%{opacity:.65}50%{opacity:1}}
										/* Stage fog breathe */
										.hfog{animation:hfog 5s ease-in-out infinite}
										@keyframes hfog{0%,100%{opacity:.5}50%{opacity:.85}}
										/* Lamp flicker */
										.hlamp{animation:hlamp 3s ease-in-out infinite}
										.hlamp2{animation:hlamp 3s ease-in-out infinite;animation-delay:1.5s}
										@keyframes hlamp{0%,100%{opacity:.95}40%{opacity:.4}55%{opacity:.75}}
										/* LIVE dot blink */
										.hlivdot{animation:hlivdot 1.2s ease-in-out infinite}
										@keyframes hlivdot{0%,100%{opacity:1}50%{opacity:.2}}
										/* Confetti fall */
										.hcfa{animation:hcfa 3.1s linear infinite;animation-delay:-0.2s}
										.hcfb{animation:hcfb 3.6s linear infinite;animation-delay:-1.4s}
										.hcfc{animation:hcfc 2.9s linear infinite;animation-delay:-0.7s}
										.hcfd{animation:hcfd 4s linear infinite;animation-delay:-2.1s}
										.hcfe{animation:hcfe 3.3s linear infinite;animation-delay:-1.8s}
										.hcff{animation:hcff 3.8s linear infinite;animation-delay:-0.9s}
										.hcfg{animation:hcfg 2.7s linear infinite;animation-delay:-1.5s}
										.hcfh{animation:hcfh 3.4s linear infinite;animation-delay:-2.6s}
										@keyframes hcfa{0%{transform:translateY(0) rotate(0deg);opacity:.9}100%{transform:translateY(85px) rotate(175deg);opacity:0}}
										@keyframes hcfb{0%{transform:translateY(0) rotate(25deg);opacity:.8}100%{transform:translateY(95px) rotate(225deg);opacity:0}}
										@keyframes hcfc{0%{transform:translateY(0) rotate(-18deg);opacity:.75}100%{transform:translateY(78px) rotate(145deg);opacity:0}}
										@keyframes hcfd{0%{transform:translateY(0) rotate(10deg);opacity:.9}100%{transform:translateY(100px) rotate(260deg);opacity:0}}
										@keyframes hcfe{0%{transform:translateY(0) rotate(42deg);opacity:.85}100%{transform:translateY(88px) rotate(315deg);opacity:0}}
										@keyframes hcff{0%{transform:translateY(0) rotate(-30deg);opacity:.7}100%{transform:translateY(80px) rotate(195deg);opacity:0}}
										@keyframes hcfg{0%{transform:translateY(0) rotate(15deg);opacity:.9}100%{transform:translateY(92px) rotate(240deg);opacity:0}}
										@keyframes hcfh{0%{transform:translateY(0) rotate(-8deg);opacity:.75}100%{transform:translateY(82px) rotate(185deg);opacity:0}}
										/* Crowd sway */
										.hcrowd{animation:hcrowd 3.5s ease-in-out infinite}
										@keyframes hcrowd{0%,100%{transform:translateY(0)}40%{transform:translateY(-3px)}70%{transform:translateY(-1px)}}
										/* Spark float */
										.hsp{animation:hsp 3.5s ease-in-out infinite}
										.hsp:nth-child(2){animation-delay:.6s}
										.hsp:nth-child(3){animation-delay:1.2s}
										.hsp:nth-child(4){animation-delay:1.8s}
										@keyframes hsp{0%,100%{opacity:.4;transform:translateY(0)}50%{opacity:.85;transform:translateY(-10px)}}
									</style>

									<!-- ── BACKGROUND ── -->
									<rect width="400" height="500" fill="url(#h-bg)"/>

									<!-- ── SCREEN BLOOM (behind screen, blurred) ── -->
									<ellipse class="hscr" cx="200" cy="148" rx="160" ry="115" fill="url(#h-scr-emit)" filter="url(#h-screen-bloom)"/>

									<!-- ── TRUSS TOP BAR ── -->
									<rect x="50" y="38" width="300" height="14" rx="2" fill="url(#h-metal)" stroke="rgba(255,255,255,0.12)" stroke-width="0.5"/>
									<line x1="50" y1="45" x2="350" y2="45" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>

									<!-- ── PAR CAN LIGHTS (7 fixtures on top truss) ── -->
									<!-- Hanging rods -->
									<line x1="85"  y1="38" x2="85"  y2="50" stroke="rgba(255,255,255,0.28)" stroke-width="1"/>
									<line x1="118" y1="38" x2="118" y2="50" stroke="rgba(255,255,255,0.28)" stroke-width="1"/>
									<line x1="152" y1="38" x2="152" y2="50" stroke="rgba(255,255,255,0.28)" stroke-width="1"/>
									<line x1="200" y1="38" x2="200" y2="50" stroke="rgba(255,255,255,0.28)" stroke-width="1"/>
									<line x1="248" y1="38" x2="248" y2="50" stroke="rgba(255,255,255,0.28)" stroke-width="1"/>
									<line x1="282" y1="38" x2="282" y2="50" stroke="rgba(255,255,255,0.28)" stroke-width="1"/>
									<line x1="315" y1="38" x2="315" y2="50" stroke="rgba(255,255,255,0.28)" stroke-width="1"/>
									<!-- Fixture bodies -->
									<rect x="79"  y="49" width="12" height="9" rx="2" fill="#111128" stroke="rgba(255,255,255,0.2)" stroke-width="0.5"/>
									<rect x="112" y="49" width="12" height="9" rx="2" fill="#111128" stroke="rgba(255,255,255,0.2)" stroke-width="0.5"/>
									<rect x="146" y="49" width="12" height="9" rx="2" fill="#111128" stroke="rgba(255,255,255,0.2)" stroke-width="0.5"/>
									<rect x="194" y="49" width="12" height="9" rx="2" fill="#111128" stroke="rgba(255,255,255,0.2)" stroke-width="0.5"/>
									<rect x="242" y="49" width="12" height="9" rx="2" fill="#111128" stroke="rgba(255,255,255,0.2)" stroke-width="0.5"/>
									<rect x="276" y="49" width="12" height="9" rx="2" fill="#111128" stroke="rgba(255,255,255,0.2)" stroke-width="0.5"/>
									<rect x="309" y="49" width="12" height="9" rx="2" fill="#111128" stroke="rgba(255,255,255,0.2)" stroke-width="0.5"/>
									<!-- Lamp apertures (glowing ellipses) -->
									<ellipse class="hlamp"  cx="85"  cy="59" rx="6" ry="2.5" fill="#C8391C" opacity="0.85" filter="url(#h-glow)"/>
									<ellipse class="hlamp2" cx="118" cy="59" rx="6" ry="2.5" fill="#ffffff" opacity="0.7"  filter="url(#h-glow)"/>
									<ellipse class="hlamp"  cx="152" cy="59" rx="6" ry="2.5" fill="#C8391C" opacity="0.9"  filter="url(#h-glow)"/>
									<ellipse class="hlamp2" cx="200" cy="59" rx="6" ry="2.5" fill="#ffffff" opacity="0.8"  filter="url(#h-glow)"/>
									<ellipse class="hlamp"  cx="248" cy="59" rx="6" ry="2.5" fill="#C8391C" opacity="0.9"  filter="url(#h-glow)"/>
									<ellipse class="hlamp2" cx="282" cy="59" rx="6" ry="2.5" fill="#ffffff" opacity="0.7"  filter="url(#h-glow)"/>
									<ellipse class="hlamp"  cx="315" cy="59" rx="6" ry="2.5" fill="#C8391C" opacity="0.85" filter="url(#h-glow)"/>

									<!-- ── LIGHT BEAMS (blurred cones from lamps down into crowd) ── -->
									<g filter="url(#h-blur-beam)">
										<polygon class="hb1" points="85,59  20,390  148,390" fill="url(#h-bm-r)"/>
										<polygon class="hb2" points="118,59 40,390  190,390" fill="url(#h-bm-w)"/>
										<polygon class="hb1" points="152,59 75,390  230,390" fill="url(#h-bm-r)"/>
										<polygon class="hb3" points="200,59 95,390  305,390" fill="url(#h-bm-w)"/>
										<polygon class="hb2" points="248,59 170,390 325,390" fill="url(#h-bm-r)"/>
										<polygon class="hb3" points="282,59 210,390 360,390" fill="url(#h-bm-w)"/>
										<polygon class="hb1" points="315,59 252,390 380,390" fill="url(#h-bm-r)"/>
									</g>

									<!-- ── TRUSS COLUMNS (left & right) ── -->
									<!-- Left column: x=52–68, y=52–248 -->
									<rect x="52" y="52" width="16" height="196" rx="1" fill="url(#h-col)"/>
									<line x1="52" y1="52"  x2="68" y2="92"  stroke="rgba(255,255,255,0.09)" stroke-width="0.8"/>
									<line x1="68" y1="52"  x2="52" y2="92"  stroke="rgba(255,255,255,0.09)" stroke-width="0.8"/>
									<line x1="52" y1="92"  x2="68" y2="132" stroke="rgba(255,255,255,0.09)" stroke-width="0.8"/>
									<line x1="68" y1="92"  x2="52" y2="132" stroke="rgba(255,255,255,0.09)" stroke-width="0.8"/>
									<line x1="52" y1="132" x2="68" y2="172" stroke="rgba(255,255,255,0.09)" stroke-width="0.8"/>
									<line x1="68" y1="132" x2="52" y2="172" stroke="rgba(255,255,255,0.09)" stroke-width="0.8"/>
									<line x1="52" y1="172" x2="68" y2="212" stroke="rgba(255,255,255,0.09)" stroke-width="0.8"/>
									<line x1="68" y1="172" x2="52" y2="212" stroke="rgba(255,255,255,0.09)" stroke-width="0.8"/>
									<!-- Right column: x=332–348 -->
									<rect x="332" y="52" width="16" height="196" rx="1" fill="url(#h-col)"/>
									<line x1="332" y1="52"  x2="348" y2="92"  stroke="rgba(255,255,255,0.09)" stroke-width="0.8"/>
									<line x1="348" y1="52"  x2="332" y2="92"  stroke="rgba(255,255,255,0.09)" stroke-width="0.8"/>
									<line x1="332" y1="92"  x2="348" y2="132" stroke="rgba(255,255,255,0.09)" stroke-width="0.8"/>
									<line x1="348" y1="92"  x2="332" y2="132" stroke="rgba(255,255,255,0.09)" stroke-width="0.8"/>
									<line x1="332" y1="132" x2="348" y2="172" stroke="rgba(255,255,255,0.09)" stroke-width="0.8"/>
									<line x1="348" y1="132" x2="332" y2="172" stroke="rgba(255,255,255,0.09)" stroke-width="0.8"/>
									<line x1="332" y1="172" x2="348" y2="212" stroke="rgba(255,255,255,0.09)" stroke-width="0.8"/>
									<line x1="348" y1="172" x2="332" y2="212" stroke="rgba(255,255,255,0.09)" stroke-width="0.8"/>

									<!-- ── SPEAKER STACKS (outside columns) ── -->
									<rect x="17" y="160" width="32" height="120" rx="3" fill="url(#h-spkr)" stroke="rgba(255,255,255,0.07)" stroke-width="0.8"/>
									<circle cx="33" cy="184" r="11" fill="none" stroke="rgba(255,255,255,0.14)" stroke-width="1"/>
									<circle cx="33" cy="184" r="5"  fill="rgba(255,255,255,0.04)"/>
									<circle cx="33" cy="208" r="9"  fill="none" stroke="rgba(255,255,255,0.1)"  stroke-width="1"/>
									<circle cx="33" cy="208" r="4"  fill="rgba(255,255,255,0.04)"/>
									<circle cx="33" cy="228" r="7"  fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
									<circle cx="33" cy="246" r="5"  fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>

									<rect x="351" y="160" width="32" height="120" rx="3" fill="url(#h-spkr)" stroke="rgba(255,255,255,0.07)" stroke-width="0.8"/>
									<circle cx="367" cy="184" r="11" fill="none" stroke="rgba(255,255,255,0.14)" stroke-width="1"/>
									<circle cx="367" cy="184" r="5"  fill="rgba(255,255,255,0.04)"/>
									<circle cx="367" cy="208" r="9"  fill="none" stroke="rgba(255,255,255,0.1)"  stroke-width="1"/>
									<circle cx="367" cy="208" r="4"  fill="rgba(255,255,255,0.04)"/>
									<circle cx="367" cy="228" r="7"  fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
									<circle cx="367" cy="246" r="5"  fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>

									<!-- ── MAIN LED BACKDROP SCREEN ── -->
									<rect x="72" y="52" width="256" height="190" rx="3" fill="url(#h-scr-bg)"/>
									<g clip-path="url(#h-scr-clip)">
										<!-- Concentric rings (brand mark) -->
										<circle cx="200" cy="147" r="78" fill="none" stroke="rgba(200,57,28,0.18)" stroke-width="1"/>
										<circle cx="200" cy="147" r="58" fill="none" stroke="rgba(200,57,28,0.25)" stroke-width="1"/>
										<circle cx="200" cy="147" r="38" fill="none" stroke="rgba(200,57,28,0.35)" stroke-width="1.5"/>
										<circle cx="200" cy="147" r="18" fill="rgba(200,57,28,0.14)"/>
										<circle cx="200" cy="147" r="7"  fill="rgba(255,255,255,0.18)"/>
										<!-- Brand text -->
										<text x="200" y="153" text-anchor="middle" font-family="'Bebas Neue','Impact',sans-serif" font-size="20" letter-spacing="7" fill="rgba(255,255,255,0.12)">REDLINE</text>
										<!-- Screen EQ bars (left cluster) -->
										<rect x="82"  y="218" width="7" height="16" rx="2" fill="rgba(200,57,28,0.5)"/>
										<rect x="94"  y="210" width="7" height="24" rx="2" fill="rgba(255,255,255,0.28)"/>
										<rect x="106" y="215" width="7" height="19" rx="2" fill="rgba(200,57,28,0.5)"/>
										<rect x="118" y="206" width="7" height="28" rx="2" fill="rgba(255,255,255,0.28)"/>
										<rect x="130" y="212" width="7" height="22" rx="2" fill="rgba(200,57,28,0.5)"/>
										<!-- Screen EQ bars (right cluster) -->
										<rect x="263" y="216" width="7" height="18" rx="2" fill="rgba(200,57,28,0.5)"/>
										<rect x="275" y="209" width="7" height="25" rx="2" fill="rgba(255,255,255,0.28)"/>
										<rect x="287" y="213" width="7" height="21" rx="2" fill="rgba(200,57,28,0.5)"/>
										<rect x="299" y="207" width="7" height="27" rx="2" fill="rgba(255,255,255,0.28)"/>
										<rect x="311" y="214" width="7" height="20" rx="2" fill="rgba(200,57,28,0.5)"/>
										<!-- Wave path at bottom -->
										<path d="M72,228 Q90,218 112,226 Q134,234 156,222 Q178,210 200,220 Q222,230 244,218 Q266,206 288,218 Q310,230 328,220 L328,242 L72,242 Z" fill="rgba(200,57,28,0.1)"/>
										<!-- Status dot + indicator -->
										<circle cx="84" cy="65" r="3" fill="#C8391C" opacity="0.8" filter="url(#h-glow)"/>
										<circle cx="94" cy="65" r="3" fill="#22cc66" opacity="0.6"/>
									</g>
									<!-- Screen bezel -->
									<rect x="72" y="52" width="256" height="190" rx="3" fill="none" stroke="rgba(200,57,28,0.32)" stroke-width="1.5"/>
									<!-- Screen bottom LED strip -->
									<rect class="hled" x="72" y="240" width="256" height="4" rx="2" fill="url(#h-led)"/>

									<!-- ── STAGE PLATFORM ── -->
									<!-- Surface (trapezoid) -->
									<polygon points="38,248 362,248 350,268 50,268" fill="url(#h-stage)"/>
									<line x1="38" y1="248" x2="362" y2="248" stroke="rgba(255,255,255,0.12)" stroke-width="0.8"/>
									<!-- Stage front face -->
									<rect x="50" y="268" width="300" height="15" rx="1" fill="#080810"/>
									<line x1="50" y1="272" x2="350" y2="272" stroke="rgba(200,57,28,0.25)" stroke-width="0.5"/>
									<!-- Front LED strip -->
									<rect class="hled" x="50" y="281" width="300" height="4" rx="2" fill="url(#h-led)" opacity="0.9"/>

									<!-- Stage mic stands -->
									<line x1="153" y1="248" x2="153" y2="215" stroke="rgba(255,255,255,0.28)" stroke-width="1.5"/>
									<line x1="145" y1="248" x2="161" y2="248" stroke="rgba(255,255,255,0.22)" stroke-width="1"/>
									<ellipse cx="153" cy="212" rx="5" ry="6" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.4)" stroke-width="0.8"/>
									<line x1="247" y1="248" x2="247" y2="215" stroke="rgba(255,255,255,0.28)" stroke-width="1.5"/>
									<line x1="239" y1="248" x2="255" y2="248" stroke="rgba(255,255,255,0.22)" stroke-width="1"/>
									<ellipse cx="247" cy="212" rx="5" ry="6" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.4)" stroke-width="0.8"/>
									<!-- Center drum riser -->
									<rect x="172" y="234" width="56" height="14" rx="2" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
									<!-- Floor wedge monitors -->
									<polygon points="88,248 118,248 108,262 78,262"  fill="#0a0a16" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
									<polygon points="282,248 312,248 322,262 292,262" fill="#0a0a16" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>

									<!-- ── STAGE FOG ── -->
									<ellipse class="hfog" cx="200" cy="254" rx="180" ry="28" fill="url(#h-fog)" filter="url(#h-blur-beam)"/>

									<!-- ── CROWD SILHOUETTES ── -->
									<!-- Warm stage glow wash over crowd -->
									<rect x="0" y="295" width="400" height="160" fill="url(#h-stage-glow)" opacity="0.4"/>

									<!-- Row far (y≈300–330): small bumpy heads -->
									<path d="M0,330 Q10,318 22,328 Q34,318 46,328 Q58,318 70,328 Q82,318 94,328 Q106,318 118,328 Q130,318 142,328 Q154,318 166,328 Q178,318 190,328 Q202,318 214,328 Q226,318 238,328 Q250,318 262,328 Q274,318 286,328 Q298,318 310,328 Q322,318 334,328 Q346,318 358,328 Q370,318 382,328 Q394,318 400,326 L400,345 L0,345 Z" fill="#0a0a18"/>

									<!-- Row mid (y≈345–395): medium heads -->
									<path d="M0,390 Q14,374 28,386 Q42,374 58,387 Q72,373 88,386 Q104,373 120,386 Q136,373 152,386 Q168,373 184,386 Q200,373 216,386 Q232,373 248,386 Q264,373 280,386 Q296,373 312,386 Q328,373 344,386 Q360,373 376,386 Q392,373 400,382 L400,410 L0,410 Z" fill="#090912"/>

									<!-- Row near (y≈410–500): large heads + raised arms -->
									<g class="hcrowd">
										<path d="M0,458 Q18,438 36,455 Q54,438 72,455 Q90,438 108,455 Q126,438 144,455 Q162,438 180,455 Q198,438 216,455 Q234,438 252,455 Q270,438 288,455 Q306,438 324,455 Q342,438 360,455 Q378,438 396,455 Q400,450 400,458 L400,500 L0,500 Z" fill="#07070e"/>
										<!-- Raised arms -->
										<path d="M54,438 L50,412 L46,406 L52,410 L57,418 L58,438" fill="#07070e"/>
										<path d="M122,438 L126,410 L130,404 L124,409 L119,418 L118,438" fill="#07070e"/>
										<path d="M194,438 L190,408 L186,402 L192,407 L197,416 L197,438" fill="#07070e"/>
										<path d="M210,438 L214,408 L218,402 L212,407 L207,416 L207,438" fill="#07070e"/>
										<path d="M278,438 L274,412 L270,406 L276,410 L281,419 L282,438" fill="#07070e"/>
										<path d="M346,438 L350,411 L354,405 L348,410 L343,419 L342,438" fill="#07070e"/>
									</g>

									<!-- ── CONFETTI (falling) ── -->
									<rect class="hcfa" x="87"  y="72"  width="7"   height="3"   rx="1" fill="#C8391C"/>
									<rect class="hcfb" x="152" y="60"  width="5.5" height="2.5" rx="1" fill="#ffffff" opacity="0.85"/>
									<rect class="hcfc" x="222" y="68"  width="7"   height="3"   rx="1" fill="#ff8c4a"/>
									<rect class="hcfd" x="292" y="65"  width="5.5" height="2.5" rx="1" fill="#C8391C"/>
									<rect class="hcfe" x="120" y="83"  width="6"   height="3"   rx="1" fill="#ffffff" opacity="0.8"/>
									<rect class="hcff" x="262" y="78"  width="4.5" height="4.5" rx="1" fill="#ffd060" opacity="0.8"/>
									<rect class="hcfg" x="178" y="66"  width="8"   height="2.5" rx="1" fill="#C8391C"/>
									<rect class="hcfh" x="332" y="76"  width="5.5" height="3"   rx="1" fill="#ffffff" opacity="0.75"/>

									<!-- ── SPARKLES ── -->
									<g>
										<circle class="hsp" cx="62"  cy="115" r="1.5" fill="#C8391C" opacity="0.65"/>
										<circle class="hsp" cx="344" cy="105" r="2"   fill="#ffffff"  opacity="0.5"/>
										<circle class="hsp" cx="196" cy="44"  r="1.5" fill="#C8391C" opacity="0.7"/>
										<circle class="hsp" cx="288" cy="128" r="1.5" fill="#ffffff"  opacity="0.45"/>
									</g>

									<!-- ── LIVE BADGE ── -->
									<rect x="20" y="22" width="64" height="24" rx="12" fill="url(#h-live)" opacity="0.92"/>
									<rect x="20" y="22" width="64" height="24" rx="12" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="0.8"/>
									<circle class="hlivdot" cx="33" cy="34" r="4" fill="#ffffff"/>
									<text x="52" y="39" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" font-weight="700" letter-spacing="1.5" fill="#ffffff">LIVE</text>

									<!-- ── STATS BADGE ── -->
									<rect x="300" y="22" width="80" height="24" rx="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" stroke-width="0.8"/>
									<text x="340" y="38" text-anchor="middle" font-family="'Courier New',monospace" font-size="8.5" font-weight="600" letter-spacing="0.5" fill="rgba(255,255,255,0.55)">500+ Events</text>
								</svg>
							</div>

							<!-- Bottom gradient overlay on card -->
							<div
								class="absolute right-0 bottom-0 left-0 z-20 h-24 bg-gradient-to-t from-[#060B18] to-transparent"
							></div>
						</div>

						<!-- Rotating circular badge -->
						<div
							class="badge-ring absolute -top-4 -right-4 sm:-top-6 sm:-right-6 lg:-top-8 lg:-right-8"
						>
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

	/* ── Hero figure glow ── */
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
