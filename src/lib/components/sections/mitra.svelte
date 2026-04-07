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

	let sectionEl: HTMLElement;
	let hasEntered = $state(false);

	onMount(() => {
		const obs = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !hasEntered) {
					hasEntered = true;
				}
			},
			{ threshold: 0.1 }
		);
		if (sectionEl) obs.observe(sectionEl);

		return () => obs.disconnect();
	});
</script>

<section id="services-client" class="ps" bind:this={sectionEl}>
	<div class="ps-bg" aria-hidden="true"></div>

	<div class="ps-header" class:entered={hasEntered}>
		<h2 class="ps-title uppercase">
			Our <span class="ps-char-red">Beloved Client</span>
		</h2>

		<p class="ps-subtitle">
			Selalu menjadi sebuah kehormatan bagi kami, telah dipercayakan untuk<br />
			menjalankan event untuk klien kami yang tercinta.
		</p> 
	</div>

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

	<div class="ps-cta" class:entered={hasEntered}>
		<span class="ps-cta-text">Ingin bergabung sebagai mitra kami?</span>
		<a href="#contact" class="ps-cta-btn">
			Hubungi Kami
			<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
				<path d="M5 12h14M12 5l7 7-7 7"/>
			</svg>
		</a>
	</div>
</section>

<style>
	.ps {
		font-family: 'Outfit', sans-serif;
		position: relative;
		background: var(--background);
		overflow: hidden;
		padding: 80px 0;
	}

	.ps-bg {
		position: absolute; inset: 0; z-index: 0; pointer-events: none;
		background:
			radial-gradient(circle at 10% 20%, rgba(220,38,38,0.05) 0%, transparent 50%),
			radial-gradient(circle at 90% 80%, rgba(220,38,38,0.05) 0%, transparent 50%);
	}

	.ps-header {
		position: relative; z-index: 2;
		text-align: center;
		padding: 0 24px;
		opacity: 0; transform: translateY(22px);
		transition: opacity 0.7s ease, transform 0.7s ease;
	}
	.ps-header.entered { opacity: 1; transform: translateY(0); }

	.ps-title {
		font-family: var(--font-display);
		font-size: clamp(3rem, 6vw, 5rem);
		line-height: 1;
		margin: 0 0 24px;
		color: white;
	}
	.ps-char-red {
		color: var(--primary);
	}

	.ps-subtitle {
		font-size: 1.125rem;
		color: rgba(255, 255, 255, 0.5);
		max-width: 600px;
		margin: 0 auto;
	}

	.ps-marquee-wrap {
		position: relative; z-index: 2;
		margin-top: 64px;
		overflow: hidden;
		opacity: 0; transform: translateY(16px);
		transition: opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s;
	}
	.ps-marquee-wrap.entered { opacity: 1; transform: translateY(0); }

	.ps-fade {
		position: absolute; top: 0; bottom: 0; z-index: 3;
		width: 150px; pointer-events: none;
	}
	.ps-fade-l { left: 0;  background: linear-gradient(90deg, var(--background), transparent); }
	.ps-fade-r { right: 0; background: linear-gradient(270deg, var(--background), transparent); }

	.ps-track {
		display: flex;
		gap: 0;
		width: max-content;
		padding: 20px 0;
		animation: scrollFwd 60s linear infinite;
	}

	@keyframes scrollFwd {
		from { transform: translateX(0); }
		to   { transform: translateX(-50%); }
	}

	.ps-logo-item {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 280px;
		height: 140px;
		padding: 0 40px;
	}

	.ps-logo {
		max-width: 100%;
		max-height: 80px;
		object-fit: contain;
		transition: all 0.4s ease;
	}
	.ps-logo-item:hover .ps-logo {
		transform: scale(1.1);
	}

	.ps-cta {
		position: relative; z-index: 2;
		display: flex; align-items: center; justify-content: center;
		gap: 20px; flex-wrap: wrap;
		padding: 64px 24px 0;
		opacity: 0; transform: translateY(12px);
		transition: opacity 0.6s ease 0.6s, transform 0.6s ease 0.6s;
	}
	.ps-cta.entered { opacity: 1; transform: translateY(0); }

	.ps-cta-text {
		font-size: 1rem; color: rgba(255, 255, 255, 0.4);
	}
	.ps-cta-btn {
		display: inline-flex; align-items: center; gap: 8px;
		padding: 12px 28px;
		background: var(--primary); color: white;
		font-size: 0.875rem; font-weight: 600;
		border-radius: 100px;
		transition: all 0.3s ease;
	}
	.ps-cta-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 20px rgba(220, 38, 38, 0.2);
	}
</style>