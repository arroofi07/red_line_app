<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	let visible = $state(false);
	let canvas: HTMLCanvasElement;
	let mouseX = $state(0);
	let mouseY = $state(0);

	onMount(() => {
		visible = true;

		const ctx = canvas.getContext('2d')!;
		const resize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};
		resize();
		window.addEventListener('resize', resize);

		type Star = {
			x: number; y: number;
			size: number; opacity: number;
			twinkleSpeed: number; twinkleOffset: number;
		};
		type ShootingStar = {
			x: number; y: number;
			angle: number; speed: number;
			opacity: number; active: boolean;
			trail: { x: number; y: number }[];
		};

		const stars: Star[] = Array.from({ length: 200 }, () => ({
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
			size: Math.random() * 2 + 0.3,
			opacity: Math.random() * 0.55 + 0.12,
			twinkleSpeed: Math.random() * 0.025 + 0.005,
			twinkleOffset: Math.random() * Math.PI * 2
		}));

		const shootingStars: ShootingStar[] = Array.from({ length: 7 }, () => ({
			x: 0, y: 0, angle: 0, speed: 0, opacity: 0, active: false, trail: []
		}));

		function spawnShootingStar(s: ShootingStar) {
			s.x = Math.random() * canvas.width * 0.85;
			s.y = Math.random() * canvas.height * 0.45;
			s.angle = Math.PI / 4 + (Math.random() * 0.35 - 0.175);
			s.speed = Math.random() * 16 + 10;
			s.opacity = 1;
			s.active = true;
			s.trail = [];
		}

		shootingStars.forEach((s, i) => {
			setTimeout(() => spawnShootingStar(s), Math.random() * 3500 + i * 700);
		});

		let time = 0;
		let animId: number;

		function draw() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			time += 0.016;

			for (const star of stars) {
				const twinkle = Math.sin(time * star.twinkleSpeed * 60 + star.twinkleOffset) * 0.4 + 0.6;
				const alpha = star.opacity * twinkle;

				ctx.beginPath();
				ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(220,38,38,${alpha})`;
				ctx.fill();

				if (star.size > 1.3) {
					const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 5);
					glow.addColorStop(0, `rgba(239,68,68,${0.22 * twinkle})`);
					glow.addColorStop(0.5, `rgba(220,38,38,${0.07 * twinkle})`);
					glow.addColorStop(1, 'transparent');
					ctx.beginPath();
					ctx.arc(star.x, star.y, star.size * 5, 0, Math.PI * 2);
					ctx.fillStyle = glow;
					ctx.fill();
				}
			}

			for (const s of shootingStars) {
				if (!s.active) continue;

				s.trail.push({ x: s.x, y: s.y });
				if (s.trail.length > 35) s.trail.shift();
				s.x += Math.cos(s.angle) * s.speed;
				s.y += Math.sin(s.angle) * s.speed;
				s.opacity -= 0.011;

				if (s.opacity <= 0 || s.x > canvas.width || s.y > canvas.height) {
					s.active = false;
					setTimeout(() => spawnShootingStar(s), Math.random() * 4500 + 1200);
					continue;
				}

				for (let i = 1; i < s.trail.length; i++) {
					const t = i / s.trail.length;
					const grad = ctx.createLinearGradient(
						s.trail[i-1].x, s.trail[i-1].y,
						s.trail[i].x, s.trail[i].y
					);
					grad.addColorStop(0, `rgba(220,38,38,0)`);
					grad.addColorStop(1, `rgba(255,100,100,${t * s.opacity})`);
					ctx.beginPath();
					ctx.moveTo(s.trail[i-1].x, s.trail[i-1].y);
					ctx.lineTo(s.trail[i].x, s.trail[i].y);
					ctx.strokeStyle = grad;
					ctx.lineWidth = t * 3;
					ctx.stroke();
				}

				const head = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 16);
				head.addColorStop(0,   `rgba(255,255,255,${s.opacity})`);
				head.addColorStop(0.2, `rgba(255,120,120,${s.opacity * 0.8})`);
				head.addColorStop(0.5, `rgba(220,38,38,${s.opacity * 0.4})`);
				head.addColorStop(1,   'transparent');
				ctx.beginPath();
				ctx.arc(s.x, s.y, 16, 0, Math.PI * 2);
				ctx.fillStyle = head;
				ctx.fill();
			}

			animId = requestAnimationFrame(draw);
		}

		draw();
		return () => {
			cancelAnimationFrame(animId);
			window.removeEventListener('resize', resize);
		};
	});

	function handleMouseMove(e: MouseEvent) {
		mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
		mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
	}
</script>

<svelte:window on:mousemove={handleMouseMove} />

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet" />
</svelte:head>

<section class="hero-section">
	<canvas bind:this={canvas} class="stars-canvas" />

	<div class="orbs" aria-hidden="true">
		<div class="orb orb-1"></div>
		<div class="orb orb-2"></div>
		<div class="orb orb-3"></div>
	</div>

	<div class="dot-grid" aria-hidden="true"></div>
	<div class="red-stripe" aria-hidden="true"></div>

	<div class="hero-inner">
		<div class="hero-grid">

			<!-- LEFT CONTENT -->
			<div class="left-col">
				{#if visible}

					<div in:fly={{ x: -30, duration: 900, delay: 250 }}>
						<h1 class="hero-title">
							<span class="block t-solid">EVENT</span>
							<span class="block t-outline">ORGANIZER</span>
							<span class="block t-accent">&amp; STRATEGIC</span>
							<span class="block t-small">COMMUNICATION</span>
						</h1>
					</div>

					<div in:fly={{ x: -20, duration: 700, delay: 450 }} class="divider-row">
						<div class="dline"></div>
						<div class="ddiamond"></div>
						<div class="dline dshort"></div>
					</div>

					<div in:fly={{ x: -20, duration: 700, delay: 550 }}>
						<p class="desc">
							<strong class="hl">Redline Communication</strong> <strong>(EO Padang)</strong> — one stop solution solution untuk semua kebutuhan event anda. Dari event organizer, event management, product launching, 
							event production, rental equipment, MICE (meeting, exhibition, conference, incentive) dll.
						</p>
						<p class="sub-desc">
							Berpusat di kota <span class="city">Padang</span> · tetapi kami juga membantu anda melaksanakan event di kota-kota lainnya. 
							<span class="city">Pekanbaru</span> ·
							<span class="city">Jambi</span> ·
							<span class="city">Medan</span> ·
							<span class="city">Lampung</span> ·
							<span class="city">Palembang</span> ·
							<span class="city">Surabaya</span> ·
							<span class="city">Jogja</span> ·
							<span class="city">Jakarta</span> dan kota lainnya.
						</p>
					</div>

					<div in:fly={{ x: -20, duration: 700, delay: 700 }} class="cta-row">
						<button class="btn-primary">
							<span>Explore Services</span>
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
						</button>
						<button class="btn-ghost">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
							<span>View Our Work</span>
						</button>
					</div>
				{/if}
			</div>

			<!-- RIGHT ILLUSTRATION -->
			<div class="right-col">
				{#if visible}
					<div
						in:fade={{ duration: 1200, delay: 400 }}
						class="illus-wrapper"
						style="transform: translate({mouseX * 0.35}px, {mouseY * 0.35}px); transition: transform 0.12s ease-out;"
					>
						<svg viewBox="0 0 520 560" xmlns="http://www.w3.org/2000/svg" class="main-svg">
							<defs>
								<radialGradient id="rspot1" cx="25%" cy="0%" r="75%">
									<stop offset="0%" stop-color="#dc2626" stop-opacity="0.3" />
									<stop offset="100%" stop-color="#dc2626" stop-opacity="0" />
								</radialGradient>
								<radialGradient id="rspot2" cx="75%" cy="0%" r="75%">
									<stop offset="0%" stop-color="#f87171" stop-opacity="0.22" />
									<stop offset="100%" stop-color="#f87171" stop-opacity="0" />
								</radialGradient>
								<radialGradient id="rspot3" cx="50%" cy="0%" r="65%">
									<stop offset="0%" stop-color="#b91c1c" stop-opacity="0.25" />
									<stop offset="100%" stop-color="#b91c1c" stop-opacity="0" />
								</radialGradient>
								<linearGradient id="stageBg" x1="0%" y1="0%" x2="0%" y2="100%">
									<stop offset="0%" stop-color="#1a0000" />
									<stop offset="100%" stop-color="#0d0000" />
								</linearGradient>
								<linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
									<stop offset="0%" stop-color="#7f1d1d" stop-opacity="0.9" />
									<stop offset="50%" stop-color="#991b1b" stop-opacity="0.8" />
									<stop offset="100%" stop-color="#450a0a" stop-opacity="1" />
								</linearGradient>
								<linearGradient id="micGrad" x1="0%" y1="0%" x2="100%" y2="100%">
									<stop offset="0%" stop-color="#ef4444" />
									<stop offset="100%" stop-color="#dc2626" />
								</linearGradient>
								<radialGradient id="floorRef" cx="50%" cy="0%" r="80%">
									<stop offset="0%" stop-color="#dc2626" stop-opacity="0.2" />
									<stop offset="100%" stop-color="#dc2626" stop-opacity="0" />
								</radialGradient>
								<filter id="rglow" x="-50%" y="-50%" width="200%" height="200%">
									<feGaussianBlur stdDeviation="4" result="blur" />
									<feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
								</filter>
								<filter id="rsoftGlow" x="-100%" y="-100%" width="300%" height="300%">
									<feGaussianBlur stdDeviation="10" result="blur" />
									<feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
								</filter>
								<clipPath id="screenClip">
									<rect x="95" y="145" width="330" height="220" rx="4" />
								</clipPath>
							</defs>

							<!-- Spotlight beams -->
							<polygon points="108,18 55,378 178,378" fill="url(#rspot1)" class="sbeam" />
							<polygon points="260,8 208,378 312,378" fill="url(#rspot3)" class="sbeam sbeam2" />
							<polygon points="404,18 328,378 480,378" fill="url(#rspot2)" class="sbeam sbeam3" />

							<!-- Top rigging bar -->
							<rect x="28" y="4" width="464" height="9" rx="4.5" fill="#1a0000" />
							{#each [55, 108, 160, 210, 260, 310, 358, 404, 452] as x}
								<rect x={x} y="13" width="2.5" height="14" fill="#3b0000" />
							{/each}

							<!-- Spotlight fixtures -->
							{#each [[108,14], [260,8], [404,14]] as [x, y]}
								<rect x={x-20} y={y-12} width="40" height="22" rx="5" fill="#1a0000" stroke="#3b0000" stroke-width="1" />
								<rect x={x-13} y={y+8} width="26" height="9" rx="3" fill="#2d0000" />
								<circle cx={x} cy={y-2} r="7" fill="#dc2626" filter="url(#rglow)" class="lpulse" />
								<circle cx={x} cy={y-2} r="3.5" fill="#fca5a5" class="lpulse" />
							{/each}

							<!-- LED Screen -->
							<rect x="88" y="138" width="344" height="236" rx="7" fill="#0d0000" stroke="#3b0000" stroke-width="2" />
							<rect x="95" y="145" width="330" height="220" rx="4" fill="url(#screenGrad)" opacity="0.5" />
							<!-- Scanlines -->
							<g clip-path="url(#screenClip)" opacity="0.07">
								{#each Array(22) as _, i}
									<line x1="95" y1={145 + i * 10} x2="425" y2={145 + i * 10} stroke="#ffffff" stroke-width="0.8" />
								{/each}
							</g>
							<!-- Waveform bars -->
							{#each Array(12) as _, i}
								<rect
									x={106 + i * 26}
									y={268 - (Math.sin(i * 0.75) * 38 + 38)}
									width="18"
									height={Math.sin(i * 0.75) * 38 + 38}
									rx="3"
									fill="#ef4444"
									opacity={0.35 + (i % 3) * 0.2}
									class="bar-anim"
									style="animation-delay: {i * 0.08}s"
								/>
							{/each}
							<!-- Screen text -->
							<text x="260" y="208" text-anchor="middle" font-family="'Bebas Neue',sans-serif" font-size="32" fill="white" opacity="0.95" filter="url(#rglow)">REDLINE</text>
							<text x="260" y="232" text-anchor="middle" font-family="'Bebas Neue',sans-serif" font-size="13" fill="#fca5a5" opacity="0.85" letter-spacing="7">COMMUNICATION</text>
							<!-- LED strip top/bottom -->
							<rect x="88" y="138" width="344" height="5" rx="2.5" fill="#ef4444" opacity="0.9" filter="url(#rsoftGlow)" />
							<rect x="88" y="369" width="344" height="4" rx="2" fill="#b91c1c" opacity="0.5" />

							<!-- Left speaker -->
							<rect x="26" y="195" width="64" height="184" rx="7" fill="url(#stageBg)" stroke="#3b0000" stroke-width="1.5" />
							{#each [0,1,2,3] as i}
								<ellipse cx="58" cy={216 + i*38} rx="22" ry="15" fill="#0d0000" stroke="#2d0000" stroke-width="1" />
								<ellipse cx="58" cy={216 + i*38} rx="12" ry="8" fill="#1a0000" />
								<ellipse cx="58" cy={216 + i*38} rx="5" ry="3" fill="#3b0000" />
								<circle cx="58" cy={216 + i*38} r="2" fill="#ef4444" opacity="0.4" />
							{/each}

							<!-- Right speaker -->
							<rect x="430" y="195" width="64" height="184" rx="7" fill="url(#stageBg)" stroke="#3b0000" stroke-width="1.5" />
							{#each [0,1,2,3] as i}
								<ellipse cx="462" cy={216 + i*38} rx="22" ry="15" fill="#0d0000" stroke="#2d0000" stroke-width="1" />
								<ellipse cx="462" cy={216 + i*38} rx="12" ry="8" fill="#1a0000" />
								<ellipse cx="462" cy={216 + i*38} rx="5" ry="3" fill="#3b0000" />
								<circle cx="462" cy={216 + i*38} r="2" fill="#ef4444" opacity="0.4" />
							{/each}

							<!-- Stage platform -->
							<rect x="18" y="378" width="484" height="124" rx="9" fill="url(#stageBg)" stroke="#3b0000" stroke-width="1" />
							<rect x="18" y="378" width="484" height="5" rx="2.5" fill="#dc2626" opacity="0.85" filter="url(#rsoftGlow)" />
							<ellipse cx="260" cy="420" rx="210" ry="28" fill="url(#floorRef)" />

							<!-- Mic stand -->
							<line x1="260" y1="374" x2="260" y2="462" stroke="#dc2626" stroke-width="3.5" stroke-linecap="round" />
							<path d="M260 378 Q232 392 222 404" stroke="#b91c1c" stroke-width="3" fill="none" stroke-linecap="round" />
							<ellipse cx="260" cy="466" rx="27" ry="6" fill="#7f1d1d" opacity="0.6" />
							<ellipse cx="260" cy="355" rx="17" ry="23" fill="url(#micGrad)" filter="url(#rglow)" />
							<ellipse cx="260" cy="355" rx="11" ry="15" fill="#fca5a5" opacity="0.2" />
							{#each [-10,-4,2,8] as dy}
								<line x1="244" y1={355+dy} x2="276" y2={355+dy} stroke="#7f1d1d" stroke-width="0.9" opacity="0.7" />
							{/each}
							{#each [-8,-2,4,10] as dx}
								<line x1={260+dx} y1="334" x2={260+dx} y2="375" stroke="#7f1d1d" stroke-width="0.9" opacity="0.7" />
							{/each}

							<!-- Audience silhouettes -->
							{#each [55,95,138,180,222,260,298,340,382,424,466] as x, i}
								<ellipse cx={x} cy={492 + Math.sin(i*0.9)*4} rx="15" ry="24" fill="#1a0000" opacity="0.9" />
								<circle cx={x} cy={468 + Math.sin(i*0.9)*4} r="10" fill="#1a0000" opacity="0.9" />
							{/each}

							<!-- Floor spot lights -->
							{#each [[78,390],[180,392],[340,392],[444,390]] as [x, y]}
								<ellipse cx={x} cy={y} rx="13" ry="7" fill="#ef4444" opacity="0.55" filter="url(#rglow)" />
								<line x1={x} y1={y} x2={x} y2={y-55} stroke="#ef4444" stroke-width="1.5" opacity="0.1" />
							{/each}

							<!-- Confetti dots -->
							{#each [
								[145,95,5,'#ef4444'],[320,75,4,'#fca5a5'],
								[418,118,5,'#dc2626'],[178,58,4,'#f87171'],
								[385,88,4,'#b91c1c'],[238,128,3,'#fecaca'],
								[470,65,3,'#ef4444'],[90,140,3,'#dc2626']
							] as [cx, cy, r, fill]}
								<circle {cx} {cy} {r} {fill} opacity="0.85" class="cfetti" style="animation-delay: {Math.random()*2.5}s" />
							{/each}

							<!-- Side truss left -->
							<line x1="28" y1="18" x2="28" y2="195" stroke="#2d0000" stroke-width="4" stroke-linecap="round" />
							{#each [50, 90, 130, 165] as y}
								<line x1="20" y1={y} x2="36" y2={y} stroke="#2d0000" stroke-width="2" />
							{/each}

							<!-- Side truss right -->
							<line x1="492" y1="18" x2="492" y2="195" stroke="#2d0000" stroke-width="4" stroke-linecap="round" />
							{#each [50, 90, 130, 165] as y}
								<line x1="484" y1={y} x2="500" y2={y} stroke="#2d0000" stroke-width="2" />
							{/each}
						</svg>

						<!-- Floating labels -->
						<div class="fl-badge fl-badge-1" style="transform: translate({mouseX * -0.55}px, {mouseY * -0.4}px)">
							<span class="fl-icon">🎤</span><span>Live Event</span>
						</div>
						<div class="fl-badge fl-badge-2" style="transform: translate({mouseX * 0.45}px, {mouseY * -0.55}px)">
							<span class="fl-icon">🎬</span><span>Production</span>
						</div>
						<div class="fl-badge fl-badge-3" style="transform: translate({mouseX * -0.35}px, {mouseY * 0.45}px)">
							<span class="fl-icon">✨</span><span>MICE</span>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<div class="bottom-fade" aria-hidden="true"></div>

	{#if visible}
		<div in:fade={{ duration: 1000, delay: 1400 }} class="scroll-hint">
			<div class="scroll-mouse"><div class="scroll-wheel"></div></div>
			<span>Scroll</span>
		</div>
	{/if}
</section>

<style>
	.hero-section {
		font-family: 'Outfit', sans-serif;
		position: relative;
		min-height: 100vh;
		margin-top: 2rem;
		display: flex;
		align-items: center;
		overflow: hidden;
		background: #ffffff;
		box-sizing: border-box;
	}

	/* Stars */
	.stars-canvas {
		position: absolute; inset: 0;
		z-index: 0; pointer-events: none;
	}

	/* Orbs */
	.orbs { position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
	.orb { position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none; }
	.orb-1 {
		width: 50vw; height: 50vw; top: -15%; left: -12%;
		background: radial-gradient(circle, rgba(220,38,38,0.1), transparent 70%);
		animation: orbDrift 20s ease-in-out infinite;
	}
	.orb-2 {
		width: 38vw; height: 38vw; bottom: -8%; right: -8%;
		background: radial-gradient(circle, rgba(239,68,68,0.08), transparent 70%);
		animation: orbDrift 26s ease-in-out infinite reverse;
	}
	.orb-3 {
		width: 28vw; height: 28vw; top: 35%; left: 45%;
		background: radial-gradient(circle, rgba(185,28,28,0.05), transparent 70%);
		animation: orbDrift 32s ease-in-out infinite 6s;
	}
	@keyframes orbDrift {
		0%,100% { transform: translate(0,0) scale(1); }
		33%      { transform: translate(3%,-4%) scale(1.06); }
		66%      { transform: translate(-2%,3%) scale(0.95); }
	}

	/* Dot grid */
	.dot-grid {
		position: absolute; inset: 0; z-index: 0; pointer-events: none;
		background-image: radial-gradient(rgba(220,38,38,0.1) 1px, transparent 1px);
		background-size: 32px 32px;
	}

	/* Red diagonal accent */
	.red-stripe {
		position: absolute; top: 0; right: 0;
		width: 55vw; height: 100%;
		background: linear-gradient(135deg, transparent 45%, rgba(220,38,38,0.035) 45%);
		z-index: 0; pointer-events: none;
	}

	/* Layout */
	.hero-inner {
		position: relative; z-index: 10; width: 100%;
		padding: 128px 64px 80px;
		max-width: 1280px; margin: 0 auto;
	}
	.hero-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 64px;
		align-items: center;
	}
	@media (max-width: 1024px) {
		.hero-grid { grid-template-columns: 1fr; }
		.right-col { display: none; }
		.hero-inner { padding: 100px 24px 60px; }
	}
	.left-col { display: flex; flex-direction: column; gap: 26px; }
	.right-col { display: flex; align-items: center; justify-content: center; }

	/* Badge */
	.badge {
		display: inline-flex; align-items: center; gap: 8px;
		padding: 6px 16px;
		background: rgba(220,38,38,0.07);
		border: 1px solid rgba(220,38,38,0.25);
		border-radius: 100px;
		font-size: 0.72rem; font-weight: 600;
		letter-spacing: 0.07em; text-transform: uppercase;
		color: #dc2626;
	}
	.badge-dot {
		width: 7px; height: 7px; border-radius: 50%;
		background: #dc2626; box-shadow: 0 0 8px #dc2626;
		animation: dotPulse 2s ease-in-out infinite;
	}
	@keyframes dotPulse {
		0%,100% { box-shadow: 0 0 8px #dc2626; }
		50%      { box-shadow: 0 0 18px #dc2626; opacity: 0.55; }
	}

	/* Title */
	.hero-title {
		font-family: 'Bebas Neue', sans-serif;
		font-size: clamp(3.5rem, 7vw, 6rem);
		line-height: 0.95; letter-spacing: 0.02em; margin: 0;
	}
	.t-solid   { color: #111111; }
	.t-outline { -webkit-text-stroke: 2.5px rgba(17,17,17,0.22); color: transparent; }
	.t-accent  { color: #dc2626; text-shadow: 0 0 40px rgba(220,38,38,0.3); font-style: italic; }
	.t-small   { color: #111111; font-size: clamp(2rem,4.5vw,4rem); letter-spacing: 0.09em; }

	/* Divider */
	.divider-row { display: flex; align-items: center; gap: 12px; }
	.dline { height: 1.5px; width: 80px; background: linear-gradient(90deg, #dc2626, transparent); }
	.dshort { width: 40px; }
	.ddiamond {
		width: 8px; height: 8px; background: #dc2626;
		transform: rotate(45deg); box-shadow: 0 0 10px rgba(220,38,38,0.6);
	}

	/* Text */
	.desc {
		font-size: 1rem; line-height: 1.75; font-weight: 300;
		color: rgba(17,17,17,0.58); max-width: 480px; margin: 0;
	}
	.hl { color: #dc2626; font-weight: 600; }
	.sub-desc { margin-top: 10px; font-size: 0.85rem; color: rgba(17,17,17,0.38); }
	.city { color: red; font-weight: 500; }

	/* Buttons */
	.cta-row { display: flex; flex-wrap: wrap; gap: 14px; align-items: center; }
	.btn-primary {
		display: inline-flex; align-items: center; gap: 10px;
		padding: 14px 28px; background: #dc2626; color: #ffffff;
		font-family: 'Outfit',sans-serif; font-size: 0.95rem; font-weight: 600;
		border: none; border-radius: 100px; cursor: pointer; letter-spacing: 0.02em;
		box-shadow: 0 0 28px rgba(220,38,38,0.3), 0 8px 24px rgba(220,38,38,0.18);
		transition: all 0.3s ease;
	}
	.btn-primary:hover {
		background: #b91c1c;
		transform: translateY(-2px) scale(1.03);
		box-shadow: 0 0 48px rgba(220,38,38,0.5), 0 12px 32px rgba(220,38,38,0.28);
	}
	.btn-ghost {
		display: inline-flex; align-items: center; gap: 8px;
		padding: 13px 24px; background: transparent; color: rgba(17,17,17,0.65);
		font-family: 'Outfit',sans-serif; font-size: 0.95rem; font-weight: 500;
		border: 1.5px solid rgba(17,17,17,0.18); border-radius: 100px; cursor: pointer;
		transition: all 0.3s ease;
	}
	.btn-ghost:hover { border-color: #dc2626; color: #dc2626; background: rgba(220,38,38,0.04); }

	/* Stats */
	.stats-row { display: flex; gap: 28px; padding-top: 4px; }
	.stat-item { display: flex; flex-direction: column; gap: 2px; }
	.stat-num {
		font-family: 'Bebas Neue',sans-serif; font-size: 2.2rem;
		color: #dc2626; line-height: 1;
		text-shadow: 0 0 20px rgba(220,38,38,0.3);
	}
	.stat-label { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.14em; color: rgba(17,17,17,0.38); }

	/* Illustration */
	.illus-wrapper { position: relative; width: 100%; max-width: 520px; }
	.main-svg {
		width: 100%; height: auto;
		filter: drop-shadow(0 24px 48px rgba(220,38,38,0.18)) drop-shadow(0 8px 16px rgba(0,0,0,0.06));
	}

	/* SVG anims */
	.sbeam { animation: beamFlicker 4s ease-in-out infinite; }
	.sbeam2 { animation-delay: 1.4s; }
	.sbeam3 { animation-delay: 2.8s; }
	@keyframes beamFlicker {
		0%,100%{opacity:1;} 44%{opacity:0.55;} 50%{opacity:0.85;} 56%{opacity:0.45;} 62%{opacity:1;}
	}
	.lpulse { animation: lensGlow 2.2s ease-in-out infinite; }
	@keyframes lensGlow { 0%,100%{opacity:1;} 50%{opacity:0.45;} }
	.bar-anim {
		animation: barBounce 1.4s ease-in-out infinite alternate;
		transform-origin: 50% 100%;
	}
	@keyframes barBounce { from{transform:scaleY(0.35);opacity:0.3;} to{transform:scaleY(1);opacity:0.95;} }
	.cfetti { animation: cfettiFall 3s ease-in-out infinite alternate; }
	@keyframes cfettiFall {
		0%  { transform: translateY(0) rotate(0deg); opacity: 0.85; }
		100%{ transform: translateY(16px) rotate(200deg); opacity: 0.2; }
	}

	/* Floating labels */
	.fl-badge {
		position: absolute; display: flex; align-items: center; gap: 8px;
		padding: 8px 14px;
		background: rgba(255,255,255,0.9);
		border: 1px solid rgba(220,38,38,0.2);
		border-radius: 12px; font-size: 0.78rem; font-weight: 600; color: #111111;
		backdrop-filter: blur(12px);
		box-shadow: 0 4px 20px rgba(220,38,38,0.12);
		pointer-events: none; transition: transform 0.12s ease-out;
	}
	.fl-icon { font-size: 1rem; }
	.fl-badge-1 { top:10%; left:-8%; animation: floatY 5s ease-in-out infinite; }
	.fl-badge-2 { top:5%; right:0%; animation: floatY 6.5s ease-in-out infinite 1s; }
	.fl-badge-3 { bottom:14%; left:-5%; animation: floatY 7s ease-in-out infinite 2s; }
	@keyframes floatY { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-12px);} }

	/* Bottom fade */
	.bottom-fade {
		position: absolute; bottom: 0; left: 0; right: 0; height: 100px;
		background: linear-gradient(to top, #ffffff, transparent);
		z-index: 10; pointer-events: none;
	}

	/* Scroll hint */
	.scroll-hint {
		position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%);
		display: flex; flex-direction: column; align-items: center; gap: 8px;
		color: rgba(17,17,17,0.28); font-size: 0.68rem;
		letter-spacing: 0.15em; text-transform: uppercase; z-index: 20;
	}
	.scroll-mouse {
		width: 22px; height: 36px; border: 1.5px solid rgba(17,17,17,0.18);
		border-radius: 12px; display: flex; justify-content: center; padding-top: 6px;
	}
	.scroll-wheel {
		width: 3px; height: 7px; background: #dc2626; border-radius: 2px;
		animation: scrollAnim 1.8s ease-in-out infinite;
	}
	@keyframes scrollAnim {
		0%  { transform: translateY(0); opacity: 1; }
		80% { transform: translateY(14px); opacity: 0; }
		100%{ transform: translateY(0); opacity: 0; }
	}
</style>