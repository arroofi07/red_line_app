<script lang="ts">
	import { onMount } from 'svelte';

	import aqua from '$lib/assets/partner/aqua.png';
	import banknagari from '$lib/assets/partner/banknagari.png';
	import daihatsu from '$lib/assets/partner/daihatsu.png';
	import datamine from '$lib/assets/partner/datamine.png';
	import emp from '$lib/assets/partner/emp.png';
	import emtech from '$lib/assets/partner/emtech.png';
	import essential from '$lib/assets/partner/essential.png';
	import euroclinic from '$lib/assets/partner/euroclinic.png';
	import gagnikel from '$lib/assets/partner/gagnikel.png';
	import gea from '$lib/assets/partner/gea.png';
	import hcm from '$lib/assets/partner/hcm.png';
	import kasoem from '$lib/assets/partner/kasoem.png';
	import mandala from '$lib/assets/partner/mandala.png';
	import merck from '$lib/assets/partner/merck.png';
	import mindray from '$lib/assets/partner/mindray.png';
	import msd from '$lib/assets/partner/msd.png';
	import pertamina from '$lib/assets/partner/pertamina.png';
	import pji from '$lib/assets/partner/pji.png';
	import starbucks from '$lib/assets/partner/starbucks.png';
	import sysmexs from '$lib/assets/partner/sysmexs.png';
	import telkom from '$lib/assets/partner/telkom.png';

	const mitras = [
		{ name: 'Aqua', logo: aqua },
		{ name: 'Bank Nagari', logo: banknagari },
		{ name: 'Daihatsu', logo: daihatsu },
		{ name: 'Datamine', logo: datamine },
		{ name: 'EMP', logo: emp },
		{ name: 'Emtech', logo: emtech },
		{ name: 'Essential', logo: essential },
		{ name: 'Euroclinic', logo: euroclinic },
		{ name: 'Gag Nikel', logo: gagnikel },
		{ name: 'GEA', logo: gea },
		{ name: 'HCM', logo: hcm },
		{ name: 'Kasoem', logo: kasoem },
		{ name: 'Mandala', logo: mandala },
		{ name: 'Merck', logo: merck },
		{ name: 'Mindray', logo: mindray },
		{ name: 'MSD', logo: msd },
		{ name: 'Pertamina', logo: pertamina },
		{ name: 'PJI', logo: pji },
		{ name: 'Starbucks', logo: starbucks },
		{ name: 'Sysmexs', logo: sysmexs },
		{ name: 'Telkom', logo: telkom }
	];

	const track1 = [...mitras, ...mitras];
	const track2 = [...mitras].reverse().concat([...mitras].reverse());

	let sectionEl: HTMLElement;
	let hasEntered = $state(false);

	const titleLine1 = 'Our'.split('');
	const titleLine2 = 'Beloved Client'.split('');
	let charsVisible = $state(false);

	onMount(() => {
		const obs = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !hasEntered) {
					hasEntered = true;
					charsVisible = true;
				}
			},
			{ threshold: 0.1 }
		);
		obs.observe(sectionEl);

		const rect = sectionEl.getBoundingClientRect();
		if (rect.top < window.innerHeight) {
			hasEntered = true;
			charsVisible = true;
		}

		return () => obs.disconnect();
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

	<!-- Subtle background -->
	<div class="ps-bg" aria-hidden="true"></div>
	<div class="ps-dots" aria-hidden="true"></div>

	<!-- Top border gem -->
	<div class="ps-border-top" aria-hidden="true">
		<div class="ps-border-line ps-border-line-l"></div>
		<span class="ps-gem"></span>
		<div class="ps-border-line ps-border-line-r"></div>
	</div>

	<!-- ── HEADER ── -->
	<div class="ps-header" class:entered={hasEntered}>
		<h2 class="ps-title">
			{#each titleLine1 as char, i}
				<span
					class="ps-char"
					class:visible={charsVisible}
					style="animation-delay: {i * 50}ms"
				>{char === ' ' ? '\u00A0' : char}</span>
			{/each}
			<br />
			{#each titleLine2 as char, i}
				<span
					class="ps-char ps-char-red"
					class:visible={charsVisible}
					style="animation-delay: {(titleLine1.length + i) * 50 + 80}ms"
				>{char === ' ' ? '\u00A0' : char}</span>
			{/each}
		</h2>

		<div class="ps-underline" class:entered={hasEntered}></div>

		<p class="ps-subtitle">
			Selalu menjadi sebuah kehormatan bagi kami, telah dipercayakan untuk<br />
			menjalankan event untuk klien kami yang tercinta.
		</p>
	</div>

	<!-- ── MARQUEE ROW 1 ── -->
	<div class="ps-marquee-wrap" class:entered={hasEntered}>
		<div class="ps-fade ps-fade-l" aria-hidden="true"></div>
		<div class="ps-fade ps-fade-r" aria-hidden="true"></div>

		<div class="ps-track">
			{#each track1 as mitra}
				<div class="ps-logo-item">
					<img src={mitra.logo} alt={mitra.name} class="ps-logo" loading="lazy" />
				</div>
			{/each}
		</div>
	</div>



	<!-- ── BOTTOM CTA ── -->
	<div class="ps-cta" class:entered={hasEntered}>
		<span class="ps-cta-text">Ingin bergabung sebagai mitra kami?</span>
		<a href="#contact" class="ps-cta-btn">
			Hubungi Kami
			<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
				<path d="M5 12h14M12 5l7 7-7 7"/>
			</svg>
		</a>
	</div>

	<!-- Bottom border gem -->
	<div class="ps-border-top" aria-hidden="true">
		<div class="ps-border-line ps-border-line-l"></div>
		<span class="ps-gem"></span>
		<div class="ps-border-line ps-border-line-r"></div>
	</div>

</section>

<style>
	.ps {
		font-family: 'Outfit', sans-serif;
		position: relative;
		background: #ffffff;
		overflow: hidden;
	}

	/* subtle red tint top-right */
	.ps-bg {
		position: absolute; inset: 0; z-index: 0; pointer-events: none;
		background:
			radial-gradient(ellipse 60% 50% at 90% 10%, rgba(220,38,38,0.05) 0%, transparent 70%),
			radial-gradient(ellipse 50% 40% at 10% 90%, rgba(220,38,38,0.04) 0%, transparent 70%);
	}
	.ps-dots {
		position: absolute; inset: 0; z-index: 0; pointer-events: none;
		background-image: radial-gradient(rgba(220,38,38,0.07) 1px, transparent 1px);
		background-size: 30px 30px;
	}

	/* ── Border ── */
	.ps-border-top {
		position: relative; z-index: 3;
		display: flex; align-items: center; height: 3px;
	}
	.ps-border-line {
		flex: 1; height: 100%;
	}
	.ps-border-line-l { background: linear-gradient(90deg, transparent, #dc2626); }
	.ps-border-line-r { background: linear-gradient(90deg, #dc2626, transparent); }
	.ps-gem {
		flex-shrink: 0;
		width: 10px; height: 10px;
		background: #dc2626; transform: rotate(45deg);
		box-shadow: 0 0 18px rgba(220,38,38,0.9), 0 0 36px rgba(220,38,38,0.45);
		animation: gemPulse 2.5s ease-in-out infinite;
	}
	@keyframes gemPulse {
		0%,100% { box-shadow: 0 0 14px rgba(220,38,38,0.9), 0 0 28px rgba(220,38,38,0.4); }
		50%      { box-shadow: 0 0 28px rgba(220,38,38,1),   0 0 56px rgba(220,38,38,0.65); }
	}

	/* ── Header ── */
	.ps-header {
		position: relative; z-index: 2;
		text-align: center;
		padding: 72px 24px 0;
		opacity: 0; transform: translateY(22px);
		transition: opacity 0.7s ease, transform 0.7s ease;
	}
	.ps-header.entered { opacity: 1; transform: translateY(0); }

	.ps-eyebrow {
		display: inline-flex; align-items: center; gap: 8px;
		padding: 6px 16px;
		background: rgba(220,38,38,0.06);
		border: 1px solid rgba(220,38,38,0.2);
		border-radius: 100px;
		font-size: 0.7rem; font-weight: 600;
		letter-spacing: 0.12em; text-transform: uppercase;
		color: #dc2626; margin-bottom: 24px;
	}
	.ps-eyebrow-dot {
		width: 6px; height: 6px; border-radius: 50%;
		background: #dc2626; box-shadow: 0 0 8px rgba(220,38,38,0.8);
		animation: dotBlink 2s ease-in-out infinite;
	}
	@keyframes dotBlink {
		0%,100% { opacity:1; } 50% { opacity:0.3; }
	}

	.ps-title {
		font-family: 'Bebas Neue', sans-serif;
		font-size: clamp(2.8rem, 5.5vw, 5rem);
		line-height: 1; letter-spacing: 0.04em;
		margin: 0 0 20px;
	}
	.ps-char {
		display: inline-block;
		color: #111111;
		opacity: 0;
		transform: translateY(36px) rotateX(-80deg);
		transform-origin: bottom center;
		transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1);
	}
	.ps-char.visible { opacity: 1; transform: translateY(0) rotateX(0); }
	.ps-char-red {
		color: #dc2626;
		text-shadow: 0 0 28px rgba(220,38,38,0.25);
	}

	.ps-underline {
		width: 0; height: 3px;
		background: linear-gradient(90deg, #dc2626, rgba(220,38,38,0.25));
		margin: 0 auto 20px; border-radius: 2px;
		box-shadow: 0 0 10px rgba(220,38,38,0.45);
		transition: width 0.9s cubic-bezier(0.4,0,0.2,1) 0.7s;
	}
	.ps-underline.entered { width: 180px; }

	.ps-subtitle {
		font-size: 0.95rem; font-weight: 300;
		color: rgba(17,17,17,0.55); line-height: 1.75;
		margin: 0;
	}

	/* ── Marquee ── */
	.ps-marquee-wrap {
		position: relative; z-index: 2;
		margin-top: 52px;
		overflow: hidden;
		opacity: 0; transform: translateY(16px);
		transition: opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s;
	}
	.ps-marquee-wrap.entered { opacity: 1; transform: translateY(0); }

	.ps-fade {
		position: absolute; top: 0; bottom: 0; z-index: 3;
		width: 140px; pointer-events: none;
	}
	.ps-fade-l { left: 0;  background: linear-gradient(90deg, #ffffff, transparent); }
	.ps-fade-r { right: 0; background: linear-gradient(270deg, #ffffff, transparent); }

	.ps-track {
		display: flex;
		gap: 0;
		width: max-content;
		padding: 16px 0;
		animation: scrollFwd 60s linear infinite;
	}
	.ps-track-rev { animation: scrollRev 45s linear infinite; }
	.ps-track:hover,
	.ps-track-rev:hover { animation-play-state: paused; }

	@keyframes scrollFwd {
		from { transform: translateX(0); }
		to   { transform: translateX(-50%); }
	}
	@keyframes scrollRev {
		from { transform: translateX(-50%); }
		to   { transform: translateX(0); }
	}

	/* ── Logo items — no card, no opacity, just logo ── */
	.ps-logo-item {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 280px;
		height: 130px;
		padding: 0 36px;
		position: relative;
	}
	/* Thin vertical divider between logos */
	.ps-logo-item::after {
		content: '';
		position: absolute;
		right: 0; top: 20%; bottom: 20%;
		width: 1px;
		background: linear-gradient(to bottom, transparent, rgba(220,38,38,0.15), transparent);
	}

	.ps-logo {
		max-width: 100%;
		max-height: 100px;
		width: auto;
		height: auto;
		object-fit: contain;
		display: block;
		transition: transform 0.3s ease;
	}
	.ps-logo-item:hover .ps-logo {
		transform: scale(1.08);
	}

	/* ── Separator ── */
	.ps-sep {
		display: flex; align-items: center;
		gap: 10px;
		max-width: 600px; margin: 32px auto 0;
		padding: 0 24px;
		opacity: 0; transition: opacity 0.6s ease 0.5s;
	}
	.ps-sep.entered { opacity: 1; }
	.ps-sep-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, rgba(220,38,38,0.18), transparent); }
	.ps-sep-dot {
		width: 4px; height: 4px; border-radius: 50%;
		background: rgba(220,38,38,0.35);
		animation: sepPulse 2s ease-in-out infinite;
	}
	@keyframes sepPulse {
		0%,100% { transform: scale(1); opacity: 0.35; }
		50%      { transform: scale(1.6); opacity: 0.8; }
	}

	/* ── CTA ── */
	.ps-cta {
		position: relative; z-index: 2;
		display: flex; align-items: center; justify-content: center;
		gap: 16px; flex-wrap: wrap;
		padding: 52px 24px 64px;
		opacity: 0; transform: translateY(12px);
		transition: opacity 0.6s ease 0.6s, transform 0.6s ease 0.6s;
	}
	.ps-cta.entered { opacity: 1; transform: translateY(0); }

	.ps-cta-text {
		font-size: 0.85rem; color: rgba(17,17,17,0.45); font-weight: 400;
	}
	.ps-cta-btn {
		display: inline-flex; align-items: center; gap: 8px;
		padding: 11px 24px;
		background: #dc2626; color: #ffffff;
		font-size: 0.85rem; font-weight: 600; letter-spacing: 0.04em;
		border-radius: 100px; text-decoration: none;
		box-shadow: 0 0 24px rgba(220,38,38,0.3), 0 6px 16px rgba(220,38,38,0.15);
		transition: all 0.3s ease;
	}
	.ps-cta-btn:hover {
		background: #b91c1c;
		transform: translateY(-2px);
		box-shadow: 0 0 40px rgba(220,38,38,0.5), 0 10px 24px rgba(220,38,38,0.25);
	}
</style>