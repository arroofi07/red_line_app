<script lang="ts">
	import { onMount } from 'svelte';

	const mitras = [
		{ name: 'Partner 1', logo: 'https://via.placeholder.com/200x80/1a0000/ef4444?text=PARTNER+1' },
		{ name: 'Partner 2', logo: 'https://via.placeholder.com/200x80/1a0000/ef4444?text=PARTNER+2' },
		{ name: 'Partner 3', logo: 'https://via.placeholder.com/200x80/1a0000/ef4444?text=PARTNER+3' },
		{ name: 'Partner 4', logo: 'https://via.placeholder.com/200x80/1a0000/ef4444?text=PARTNER+4' },
		{ name: 'Partner 5', logo: 'https://via.placeholder.com/200x80/1a0000/ef4444?text=PARTNER+5' },
		{ name: 'Partner 6', logo: 'https://via.placeholder.com/200x80/1a0000/ef4444?text=PARTNER+6' },
		{ name: 'Partner 7', logo: 'https://via.placeholder.com/200x80/1a0000/ef4444?text=PARTNER+7' },
		{ name: 'Partner 8', logo: 'https://via.placeholder.com/200x80/1a0000/ef4444?text=PARTNER+8' }
	];

	const track1 = [...mitras, ...mitras, ...mitras];
	const track2 = [...mitras, ...mitras, ...mitras].reverse();

	let sectionEl: HTMLElement;
	let canvasEl: HTMLCanvasElement;
	let hasEntered = $state(false);

	// Title chars
	const titleLine1 = 'Our'.split('');
	const titleLine2 = 'Beloved Client'.split('');
	let charsVisible = $state(false);

	// 3D tilt on logo cards
	function handleTilt(e: MouseEvent, el: HTMLElement) {
		const rect = el.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const cx = rect.width / 2;
		const cy = rect.height / 2;
		const rotY = ((x - cx) / cx) * 12;
		const rotX = -((y - cy) / cy) * 8;
		el.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.06)`;
	}
	function resetTilt(el: HTMLElement) {
		el.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)';
	}

	// Animated network canvas
	function initCanvas() {
		const ctx = canvasEl.getContext('2d')!;
		const W = (canvasEl.width = sectionEl.offsetWidth);
		const H = (canvasEl.height = sectionEl.offsetHeight);

		type Node = { x: number; y: number; vx: number; vy: number; r: number; pulse: number };
		const nodes: Node[] = Array.from({ length: 28 }, () => ({
			x: Math.random() * W,
			y: Math.random() * H,
			vx: (Math.random() - 0.5) * 0.4,
			vy: (Math.random() - 0.5) * 0.4,
			r: Math.random() * 2.5 + 1,
			pulse: Math.random() * Math.PI * 2
		}));

		let t = 0;
		let animId: number;

		function draw() {
			ctx.clearRect(0, 0, W, H);
			t += 0.012;

			// Move nodes
			for (const n of nodes) {
				n.x += n.vx;
				n.y += n.vy;
				n.pulse += 0.02;
				if (n.x < 0 || n.x > W) n.vx *= -1;
				if (n.y < 0 || n.y > H) n.vy *= -1;
			}

			// Draw connections
			for (let i = 0; i < nodes.length; i++) {
				for (let j = i + 1; j < nodes.length; j++) {
					const dx = nodes[i].x - nodes[j].x;
					const dy = nodes[i].y - nodes[j].y;
					const dist = Math.sqrt(dx * dx + dy * dy);
					if (dist < 160) {
						const alpha = (1 - dist / 160) * 0.12;
						ctx.beginPath();
						ctx.moveTo(nodes[i].x, nodes[i].y);
						ctx.lineTo(nodes[j].x, nodes[j].y);
						ctx.strokeStyle = `rgba(220,38,38,${alpha})`;
						ctx.lineWidth = 0.8;
						ctx.stroke();
					}
				}
			}

			// Draw nodes
			for (const n of nodes) {
				const glow = Math.sin(n.pulse) * 0.5 + 0.5;
				ctx.beginPath();
				ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(220,38,38,${0.15 + glow * 0.25})`;
				ctx.fill();
				// Halo
				ctx.beginPath();
				ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
				const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4);
				grad.addColorStop(0, `rgba(220,38,38,${0.06 * glow})`);
				grad.addColorStop(1, 'transparent');
				ctx.fillStyle = grad;
				ctx.fill();
			}

			animId = requestAnimationFrame(draw);
		}

		draw();
		return () => cancelAnimationFrame(animId);
	}

	// Count-up animation
	function animateCount(target: number, setter: (v: number) => void, duration = 1600) {
		const start = performance.now();
		function step(now: number) {
			const p = Math.min((now - start) / duration, 1);
			const eased = 1 - Math.pow(1 - p, 3);
			setter(Math.round(eased * target));
			if (p < 1) requestAnimationFrame(step);
		}
		requestAnimationFrame(step);
	}

	onMount(() => {
		let cleanup: (() => void) | null = null;

		const obs = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !hasEntered) {
					hasEntered = true;
					charsVisible = true;

					cleanup = initCanvas();
				}
			},
			{ threshold: 0.15 }
		);

		obs.observe(sectionEl);

		// Also init canvas on mount if already visible
		const rect = sectionEl.getBoundingClientRect();
		if (rect.top < window.innerHeight) {
			hasEntered = true;
			charsVisible = true;
			cleanup = initCanvas();
		}

		window.addEventListener('resize', () => {
			if (hasEntered && canvasEl) {
				canvasEl.width = sectionEl.offsetWidth;
				canvasEl.height = sectionEl.offsetHeight;
			}
		});

		return () => {
			obs.disconnect();
			cleanup?.();
		};
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<section class="ps" bind:this={sectionEl}>
	<!-- Network canvas background -->
	<canvas bind:this={canvasEl} class="ps-canvas" aria-hidden="true"></canvas>

	<!-- Red mesh gradient bg -->
	<div class="ps-bg" aria-hidden="true">
		<div class="ps-bg-orb ps-bg-orb1"></div>
		<div class="ps-bg-orb ps-bg-orb2"></div>
		<div class="ps-bg-orb ps-bg-orb3"></div>
	</div>

	<!-- Dot texture -->
	<div class="ps-dots" aria-hidden="true"></div>

	<!-- ── Top border accent ── -->
	<div class="ps-border-top" aria-hidden="true">
		<span class="ps-border-gem"></span>
	</div>

	<!-- ── HEADER ── -->
	<div class="ps-header" class:entered={hasEntered}>
		<!-- Animated title chars -->
		<h2 class="ps-title">
			{#each titleLine1 as char, i}
				<span class="ps-char" class:visible={charsVisible} style="animation-delay: {i * 45}ms"
					>{char === ' ' ? '\u00A0' : char}</span
				>
			{/each}
			<br />
			{#each titleLine2 as char, i}
				<span
					class="ps-char ps-char-red"
					class:visible={charsVisible}
					style="animation-delay: {(titleLine1.length + i) * 45 + 80}ms"
					>{char === ' ' ? '\u00A0' : char}</span
				>
			{/each}
		</h2>

		<!-- Animated underline -->
		<div class="ps-title-line" class:entered={hasEntered}></div>

		<p class="ps-subtitle" class:entered={hasEntered}>
			Selalu menjadi sebuah kehormatan bagi kami, telah dipercayakan untuk <br />
			menjalankan event untuk klien kami yang tercinta.
		</p>
	</div>

	<!-- ── MARQUEE ROW 1 ── -->
	<div class="ps-marquee-wrap" class:entered={hasEntered}>
		<div class="ps-fade ps-fade-l" aria-hidden="true"></div>
		<div class="ps-fade ps-fade-r" aria-hidden="true"></div>

		<div class="ps-marquee-track">
			{#each track1 as mitra, i}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="ps-logo-card"
					on:mousemove={(e) => handleTilt(e, e.currentTarget as HTMLElement)}
					on:mouseleave={(e) => resetTilt(e.currentTarget as HTMLElement)}
				>
					<div class="ps-logo-inner">
						<img src={mitra.logo} alt={mitra.name} class="ps-logo-img" loading="lazy" />
						<div class="ps-logo-shine"></div>
					</div>
					<div class="ps-logo-glow"></div>
					<div class="ps-logo-corner ps-logo-corner-tl"></div>
					<div class="ps-logo-corner ps-logo-corner-tr"></div>
					<div class="ps-logo-corner ps-logo-corner-bl"></div>
					<div class="ps-logo-corner ps-logo-corner-br"></div>
				</div>
			{/each}
		</div>
	</div>

	<!-- ── MARQUEE ROW 2 ── -->
	<div class="ps-marquee-wrap ps-marquee-wrap-2" class:entered={hasEntered}>
		<div class="ps-fade ps-fade-l" aria-hidden="true"></div>
		<div class="ps-fade ps-fade-r" aria-hidden="true"></div>

		<div class="ps-marquee-track ps-marquee-track-rev">
			{#each track2 as mitra, i}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="ps-logo-card ps-logo-card-sm"
					on:mousemove={(e) => handleTilt(e, e.currentTarget as HTMLElement)}
					on:mouseleave={(e) => resetTilt(e.currentTarget as HTMLElement)}
				>
					<div class="ps-logo-inner">
						<img src={mitra.logo} alt={mitra.name} class="ps-logo-img" loading="lazy" />
						<div class="ps-logo-shine"></div>
					</div>
					<div class="ps-logo-glow"></div>
					<div class="ps-logo-corner ps-logo-corner-tl"></div>
					<div class="ps-logo-corner ps-logo-corner-tr"></div>
					<div class="ps-logo-corner ps-logo-corner-bl"></div>
					<div class="ps-logo-corner ps-logo-corner-br"></div>
				</div>
			{/each}
		</div>
	</div>

	<!-- ── BOTTOM CTA ── -->
	<div class="ps-cta" class:entered={hasEntered}>
		<div class="ps-cta-line"></div>
		<span class="ps-cta-text">Ingin bergabung sebagai mitra kami?</span>
		<a href="#contact" class="ps-cta-btn">
			<span>Hubungi Kami</span>
			<span class="ps-cta-icon">
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg
				>
			</span>
		</a>
		<div class="ps-cta-line ps-cta-line-r"></div>
	</div>

	<!-- Bottom border -->
	<div class="ps-border-bottom" aria-hidden="true">
		<span class="ps-border-gem"></span>
	</div>
</section>

<style>
	/* ── Root ── */
	.ps {
		font-family: 'Outfit', sans-serif;
		position: relative;
		background: #ffffff;
		overflow: hidden;
		padding: 0 0 0;
	}

	/* ── Canvas ── */
	.ps-canvas {
		position: absolute;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		opacity: 0.6;
	}

	/* ── Background orbs ── */
	.ps-bg {
		position: absolute;
		inset: 0;
		z-index: 0;
		pointer-events: none;
	}
	.ps-bg-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
	}
	.ps-bg-orb1 {
		width: 60vw;
		height: 60vw;
		top: -20%;
		left: -15%;
		background: radial-gradient(circle, rgba(220, 38, 38, 0.06) 0%, transparent 70%);
		animation: orbDrift 22s ease-in-out infinite;
	}
	.ps-bg-orb2 {
		width: 40vw;
		height: 40vw;
		bottom: -10%;
		right: -10%;
		background: radial-gradient(circle, rgba(239, 68, 68, 0.05) 0%, transparent 70%);
		animation: orbDrift 30s ease-in-out infinite reverse;
	}
	.ps-bg-orb3 {
		width: 30vw;
		height: 30vw;
		top: 40%;
		left: 40%;
		background: radial-gradient(circle, rgba(185, 28, 28, 0.04) 0%, transparent 70%);
		animation: orbDrift 38s ease-in-out infinite 8s;
	}
	@keyframes orbDrift {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
		}
		33% {
			transform: translate(4%, -5%) scale(1.08);
		}
		66% {
			transform: translate(-3%, 4%) scale(0.93);
		}
	}

	/* ── Dot texture ── */
	.ps-dots {
		position: absolute;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		background-image: radial-gradient(rgba(220, 38, 38, 0.09) 1px, transparent 1px);
		background-size: 28px 28px;
	}

	/* ── Top / Bottom border gems ── */
	.ps-border-top,
	.ps-border-bottom {
		position: relative;
		z-index: 2;
		height: 3px;
		background: linear-gradient(
			90deg,
			transparent 0%,
			rgba(220, 38, 38, 0.15) 15%,
			#dc2626 50%,
			rgba(220, 38, 38, 0.15) 85%,
			transparent 100%
		);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.ps-border-gem {
		width: 10px;
		height: 10px;
		background: #dc2626;
		transform: rotate(45deg);
		box-shadow:
			0 0 20px rgba(220, 38, 38, 0.8),
			0 0 40px rgba(220, 38, 38, 0.4);
		animation: gemPulse 2.5s ease-in-out infinite;
	}
	@keyframes gemPulse {
		0%,
		100% {
			box-shadow:
				0 0 16px rgba(220, 38, 38, 0.8),
				0 0 32px rgba(220, 38, 38, 0.4);
		}
		50% {
			box-shadow:
				0 0 30px rgba(220, 38, 38, 1),
				0 0 60px rgba(220, 38, 38, 0.6);
		}
	}

	/* ── Header ── */
	.ps-header {
		position: relative;
		z-index: 2;
		text-align: center;
		padding: 80px 24px 0;
	}

	/* Eyebrow */
	.ps-eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 7px 18px;
		background: rgba(220, 38, 38, 0.06);
		border: 1px solid rgba(220, 38, 38, 0.2);
		border-radius: 100px;
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: #dc2626;
		margin-bottom: 28px;
		opacity: 0;
		transform: translateY(16px);
		transition:
			opacity 0.6s ease 0.1s,
			transform 0.6s ease 0.1s;
	}
	.ps-eyebrow.entered {
		opacity: 1;
		transform: translateY(0);
	}
	.ps-eyebrow-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #dc2626;
		box-shadow: 0 0 10px rgba(220, 38, 38, 0.8);
		animation: dotBlink 2s ease-in-out infinite;
	}
	@keyframes dotBlink {
		0%,
		100% {
			opacity: 1;
			box-shadow: 0 0 10px rgba(220, 38, 38, 0.8);
		}
		50% {
			opacity: 0.4;
			box-shadow: 0 0 20px rgba(220, 38, 38, 1);
		}
	}

	/* Animated char title */
	.ps-title {
		font-family: 'Bebas Neue', sans-serif;
		font-size: clamp(2.8rem, 5.5vw, 5rem);
		line-height: 1;
		letter-spacing: 0.04em;
		margin: 0 0 20px;
		display: block;
	}
	.ps-char {
		display: inline-block;
		color: #111111;
		opacity: 0;
		transform: translateY(40px) rotateX(-90deg);
		transform-origin: bottom center;
		transition:
			opacity 0.5s ease,
			transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	.ps-char.visible {
		opacity: 1;
		transform: translateY(0) rotateX(0deg);
	}
	.ps-char-red {
		color: #dc2626;
		text-shadow: 0 0 30px rgba(220, 38, 38, 0.3);
	}

	/* Animated underline */
	.ps-title-line {
		width: 0;
		height: 3px;
		background: linear-gradient(90deg, #dc2626, rgba(220, 38, 38, 0.3));
		margin: 0 auto 24px;
		border-radius: 2px;
		transition: width 1s cubic-bezier(0.4, 0, 0.2, 1) 0.8s;
		box-shadow: 0 0 12px rgba(220, 38, 38, 0.5);
	}
	.ps-title-line.entered {
		width: 200px;
	}

	.ps-subtitle {
		font-size: 16px;
		color: black;
		font-weight: 300;
		line-height: 1.7;
		transform: translateY(12px);
		transition:
			opacity 0.7s ease 1s,
			transform 0.7s ease 1s;
	}
	.ps-header.entered .ps-subtitle {
		opacity: 1;
		transform: translateY(0);
	}

	/* ── Stats ── */
	.ps-stats {
		position: relative;
		z-index: 2;
		display: flex;
		justify-content: center;
		gap: 0;
		max-width: 680px;
		margin: 56px auto 0;
		padding: 0 24px;
		opacity: 0;
		transform: translateY(24px);
		transition:
			opacity 0.7s ease 0.5s,
			transform 0.7s ease 0.5s;
	}
	.ps-stats.entered {
		opacity: 1;
		transform: translateY(0);
	}

	.ps-stat {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		padding: 28px 20px;
		position: relative;
	}
	.ps-stat::before {
		content: '';
		position: absolute;
		top: 20%;
		right: 0;
		width: 1px;
		height: 60%;
		background: linear-gradient(to bottom, transparent, rgba(220, 38, 38, 0.2), transparent);
	}
	.ps-stat:last-child::before {
		display: none;
	}

	.ps-stat-num-wrap {
		position: relative;
		display: flex;
		align-items: center;
	}
	.ps-stat-bg-num {
		position: absolute;
		font-family: 'Bebas Neue', sans-serif;
		font-size: 5rem;
		color: rgba(220, 38, 38, 0.04);
		line-height: 1;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		letter-spacing: 0;
		pointer-events: none;
		white-space: nowrap;
	}
	.ps-stat-num {
		font-family: 'Bebas Neue', sans-serif;
		font-size: 3.2rem;
		color: #dc2626;
		line-height: 1;
		text-shadow: 0 0 24px rgba(220, 38, 38, 0.35);
		position: relative;
		z-index: 1;
	}
	.ps-stat-divider {
		width: 28px;
		height: 2px;
		background: linear-gradient(90deg, transparent, #dc2626, transparent);
		border-radius: 2px;
	}
	.ps-stat-label {
		font-size: 0.68rem;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: rgba(17, 17, 17, 0.4);
		font-weight: 500;
		text-align: center;
	}

	/* ── Marquee ── */
	.ps-marquee-wrap {
		position: relative;
		z-index: 2;
		margin-top: 56px;
		overflow: hidden;
		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 0.8s ease 0.7s,
			transform 0.8s ease 0.7s;
	}
	.ps-marquee-wrap-2 {
		margin-top: 18px;
		transition-delay: 0.9s;
	}
	.ps-marquee-wrap.entered {
		opacity: 1;
		transform: translateY(0);
	}

	.ps-fade {
		position: absolute;
		top: 0;
		bottom: 0;
		z-index: 3;
		width: 180px;
		pointer-events: none;
	}
	.ps-fade-l {
		left: 0;
		background: linear-gradient(90deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
	}
	.ps-fade-r {
		right: 0;
		background: linear-gradient(270deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
	}

	.ps-marquee-track {
		display: flex;
		gap: 18px;
		width: max-content;
		padding: 12px 0;
		animation: scrollFwd 32s linear infinite;
	}
	.ps-marquee-track-rev {
		animation: scrollRev 42s linear infinite;
	}
	.ps-marquee-track:hover,
	.ps-marquee-track-rev:hover {
		animation-play-state: paused;
	}

	@keyframes scrollFwd {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-33.333%);
		}
	}
	@keyframes scrollRev {
		from {
			transform: translateX(-33.333%);
		}
		to {
			transform: translateX(0);
		}
	}

	/* ── Logo cards ── */
	.ps-logo-card {
		flex-shrink: 0;
		position: relative;
		width: 192px;
		height: 88px;
		background: #ffffff;
		border-radius: 16px;
		border: 1px solid rgba(220, 38, 38, 0.1);
		cursor: pointer;
		transition:
			border-color 0.3s ease,
			box-shadow 0.3s ease;
		/* 3D tilt applied via JS */
		transform-style: preserve-3d;
		will-change: transform;
	}
	.ps-logo-card:hover {
		border-color: rgba(220, 38, 38, 0.4);
		box-shadow:
			0 0 0 1px rgba(220, 38, 38, 0.15),
			0 12px 40px rgba(220, 38, 38, 0.14),
			0 4px 12px rgba(0, 0, 0, 0.06);
	}
	.ps-logo-card-sm {
		width: 160px;
		height: 72px;
	}

	.ps-logo-inner {
		width: 100%;
		height: 100%;
		border-radius: 15px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 16px 20px;
		overflow: hidden;
		position: relative;
	}

	.ps-logo-img {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
		filter: grayscale(100%) opacity(0.35);
		transition: filter 0.4s ease;
		position: relative;
		z-index: 1;
	}
	.ps-logo-card:hover .ps-logo-img {
		filter: grayscale(0%) opacity(1);
	}

	/* Shine sweep on hover */
	.ps-logo-shine {
		position: absolute;
		top: 0;
		left: -100%;
		width: 60%;
		height: 100%;
		background: linear-gradient(
			105deg,
			transparent 30%,
			rgba(255, 255, 255, 0.5) 50%,
			transparent 70%
		);
		transform: skewX(-15deg);
		transition: none;
		pointer-events: none;
	}
	.ps-logo-card:hover .ps-logo-shine {
		left: 150%;
		transition: left 0.55s ease;
	}

	/* Glow orb behind each card */
	.ps-logo-glow {
		position: absolute;
		inset: -20px;
		border-radius: 24px;
		background: radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.12), transparent 70%);
		opacity: 0;
		transition: opacity 0.3s ease;
		pointer-events: none;
		z-index: -1;
	}
	.ps-logo-card:hover .ps-logo-glow {
		opacity: 1;
	}

	/* Corner brackets — appear on hover */
	.ps-logo-corner {
		position: absolute;
		width: 10px;
		height: 10px;
		border-color: #dc2626;
		border-style: solid;
		opacity: 0;
		transition:
			opacity 0.3s ease,
			transform 0.3s ease;
	}
	.ps-logo-corner-tl {
		top: 4px;
		left: 4px;
		border-width: 1.5px 0 0 1.5px;
		transform: translate(-2px, -2px);
	}
	.ps-logo-corner-tr {
		top: 4px;
		right: 4px;
		border-width: 1.5px 1.5px 0 0;
		transform: translate(2px, -2px);
	}
	.ps-logo-corner-bl {
		bottom: 4px;
		left: 4px;
		border-width: 0 0 1.5px 1.5px;
		transform: translate(-2px, 2px);
	}
	.ps-logo-corner-br {
		bottom: 4px;
		right: 4px;
		border-width: 0 1.5px 1.5px 0;
		transform: translate(2px, 2px);
	}
	.ps-logo-card:hover .ps-logo-corner {
		opacity: 1;
		transform: translate(0, 0);
	}

	/* ── CTA ── */
	.ps-cta {
		position: relative;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 20px;
		padding: 64px 24px 72px;
		opacity: 0;
		transform: translateY(16px);
		transition:
			opacity 0.7s ease 1s,
			transform 0.7s ease 1s;
	}
	.ps-cta.entered {
		opacity: 1;
		transform: translateY(0);
	}
	.ps-cta-line {
		flex: 1;
		max-width: 120px;
		height: 1px;
		background: linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.25));
	}
	.ps-cta-line-r {
		background: linear-gradient(90deg, rgba(220, 38, 38, 0.25), transparent);
	}
	.ps-cta-text {
		font-size: 0.85rem;
		color: rgba(17, 17, 17, 0.45);
		font-weight: 400;
		white-space: nowrap;
	}
	.ps-cta-btn {
		display: inline-flex;
		align-items: center;
		gap: 0;
		font-size: 0.88rem;
		font-weight: 600;
		color: #ffffff;
		text-decoration: none;
		letter-spacing: 0.04em;
		background: #dc2626;
		border: none;
		border-radius: 100px;
		overflow: hidden;
		position: relative;
		box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.3);
		transition:
			box-shadow 0.3s ease,
			transform 0.3s ease;
	}
	.ps-cta-btn span:first-child {
		padding: 11px 20px 11px 22px;
		position: relative;
		z-index: 1;
	}
	.ps-cta-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 11px 16px;
		background: rgba(0, 0, 0, 0.15);
		position: relative;
		z-index: 1;
		transition: background 0.3s ease;
	}
	.ps-cta-btn::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, #ef4444, #dc2626);
		opacity: 0;
		transition: opacity 0.3s ease;
	}
	.ps-cta-btn:hover {
		transform: translateY(-2px);
		box-shadow:
			0 0 36px rgba(220, 38, 38, 0.45),
			0 8px 24px rgba(220, 38, 38, 0.25);
	}
	.ps-cta-btn:hover::before {
		opacity: 1;
	}
	.ps-cta-btn:hover .ps-cta-icon {
		background: rgba(0, 0, 0, 0.2);
	}

	/* ── Responsive ── */
	@media (max-width: 640px) {
		.ps-header {
			padding: 60px 24px 0;
		}
		.ps-stats {
			gap: 0;
		}
		.ps-stat-num {
			font-size: 2.4rem;
		}
		.ps-cta {
			flex-wrap: wrap;
			gap: 14px;
		}
		.ps-cta-line {
			display: none;
		}
	}
</style>
