<script lang="ts">
	import { onMount } from 'svelte';
  import logo from '$lib/assets/logo/logo1.png';

	let footerEl: HTMLElement;
	let hasEntered = $state(false);
	let year = new Date().getFullYear();

	const services = ['Event Organizer', 'Event Production'];
	const company = ['Home', 'About', 'Services', 'Contact'];
	const business = ['Project', 'Our Team'];

	const offices = [
		{
			label: 'Head Office',
			city: 'Padang, Sumatera Barat',
			address:
				'Jl. Prof. Dr. Hamka b depan Basko Grand Mall No.10, Air Tawar Bar., Kec. Padang Utara, Kota Padang, Sumatera Barat',
			icon: '📍'
		},
		{
			label: 'Representation Office',
			city: 'Jakarta / Banten',
			address: 'Jl. Soekarno Hatta Royal Soeta, Blok H No.2, Jakarta / Banten',
			icon: '📍'
		}
	];

	const socials = [
		{
			name: 'Instagram',
			href: '#',
			path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'
		},
		{
			name: 'WhatsApp',
			href: 'https://wa.me/620811663528',
			path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'
		},
		{
			name: 'TikTok',
			href: '#',
			path: 'M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.16 8.16 0 004.77 1.52V6.79a4.85 4.85 0 01-1-.1z'
		},
		{
			name: 'YouTube',
			href: '#',
			path: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'
		}
	];

	onMount(() => {
		const obs = new IntersectionObserver(
			(e) => {
				if (e[0].isIntersecting) hasEntered = true;
			},
			{ threshold: 0.08 }
		);
		obs.observe(footerEl);
		const r = footerEl.getBoundingClientRect();
		if (r.top < window.innerHeight) hasEntered = true;
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

<footer class="ft" bind:this={footerEl}>
	<!-- ── Background layers ── -->
	<div class="ft-bg" aria-hidden="true">
		<div class="ft-bg-orb ft-bg-orb1"></div>
		<div class="ft-bg-orb ft-bg-orb2"></div>
	</div>
	<div class="ft-dots" aria-hidden="true"></div>
	<div class="ft-diagonal" aria-hidden="true"></div>

	<!-- ── Top border ── -->
	<div class="ft-border-top" aria-hidden="true">
		<div class="ft-border-line ft-border-line-l"></div>
		<span class="ft-gem"></span>
		<div class="ft-border-line ft-border-line-r"></div>
	</div>

	<!-- ── BRAND BAND ── -->
	<div class="ft-brand-band" class:entered={hasEntered}>
		<div class="ft-brand-inner">
			<!-- Big wordmark -->
			<div class="ft-wordmark">
				<img src={logo} alt="redlinecommunication" class="w-32" />
			</div>

			<!-- Tagline -->
			<p class="ft-tagline">
				One Stop Solution untuk semua kebutuhan event &amp; strategic communication Anda.
			</p>

			<!-- Social icons -->
			<div class="ft-socials">
				{#each socials as s}
					<a href={s.href} aria-label={s.name} class="ft-social-btn" target="_blank" rel="noopener">
						<svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
							<path d={s.path} />
						</svg>
					</a>
				{/each}
			</div>
		</div>

		<!-- Decorative vertical rule -->
		<div class="ft-vr" aria-hidden="true"></div>

		<!-- Quick contact pill -->
		<div class="ft-contact-pill">
			<div class="ft-contact-pill-row">
				<span class="ft-contact-pill-icon">
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						><path
							d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.02 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14h0z"
						/></svg
					>
				</span>
				<a href="tel:0811663528" class="ft-contact-val">0811-663-528</a>
			</div>
			<div class="ft-contact-pill-row">
				<span class="ft-contact-pill-icon">
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						><path
							d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
						/><polyline points="22,6 12,13 2,6" /></svg
					>
				</span>
				<a href="mailto:irfanredline115@gmail.com" class="ft-contact-val"
					>irfanredline115@gmail.com</a
				>
			</div>
		</div>
	</div>

	<!-- ── MAIN LINKS ROW ── -->
	<div class="ft-main" class:entered={hasEntered}>
		<!-- Services -->
		<div class="ft-col" style="animation-delay:0.1s">
			<h4 class="ft-col-title">
				<span class="ft-col-title-line"></span>
				Services
			</h4>
			<ul class="ft-list">
				{#each services as s}
					<li><a href="#services" class="ft-link">{s}</a></li>
				{/each}
			</ul>
		</div>

		<!-- Company -->
		<div class="ft-col" style="animation-delay:0.2s">
			<h4 class="ft-col-title">
				<span class="ft-col-title-line"></span>
				Company
			</h4>
			<ul class="ft-list">
				{#each company as c}
					<li><a href="#{c.toLowerCase()}" class="ft-link">{c}</a></li>
				{/each}
			</ul>
		</div>

		<!-- Business -->
		<div class="ft-col" style="animation-delay:0.3s">
			<h4 class="ft-col-title">
				<span class="ft-col-title-line"></span>
				Business
			</h4>
			<ul class="ft-list">
				{#each business as b}
					<li><a href="#{b.toLowerCase().replace(' ', '-')}" class="ft-link">{b}</a></li>
				{/each}
			</ul>
		</div>

		<!-- Offices -->
		<div class="ft-col ft-col-offices" style="animation-delay:0.4s">
			<h4 class="ft-col-title">
				<span class="ft-col-title-line"></span>
				Get In Touch
			</h4>

			{#each offices as office, i}
				<div class="ft-office" style="animation-delay:{0.5 + i * 0.12}s">
					<div class="ft-office-header">
						<span class="ft-office-pin">
							<svg width="10" height="13" viewBox="0 0 24 30" fill="#dc2626">
								<path
									d="M12 0C7.589 0 4 3.589 4 8c0 5.5 7.5 17.5 7.5 17.5S19.5 13.5 19.5 8C19.5 3.589 15.911 0 12 0zm0 11a3 3 0 110-6 3 3 0 010 6z"
								/>
							</svg>
						</span>
						<div>
							<span class="ft-office-label">{office.label}</span>
							<span class="ft-office-city">{office.city}</span>
						</div>
					</div>
					<p class="ft-office-addr">{office.address}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- ── BOTTOM BAR ── -->
	<div class="ft-bottom" class:entered={hasEntered}>
		<div class="ft-bottom-inner">
			<!-- Left: copyright -->
			<span class="ft-copy">
				Copyright © {year}
				<span class="ft-copy-brand">Redline Communication</span>
			</span>

			<!-- Center: decorative dots -->
			<div class="ft-bottom-dots" aria-hidden="true">
				{#each [0, 1, 2] as i}
					<span class="ft-bottom-dot" style="animation-delay:{i * 0.3}s"></span>
				{/each}
			</div>

			<!-- Right: powered by -->
			<span class="ft-powered">
				Powered by
				<span class="ft-powered-brand">
					<span class="ft-powered-diamond"></span>
					Redline Communication
				</span>
			</span>
		</div>
	</div>
</footer>

<style>
	/* ── Base ── */
	.ft {
		font-family: 'Outfit', sans-serif;
		position: relative;
		background: transparent;
		overflow: hidden;
	}

	/* ── BG layers ── */
	.ft-bg {
		position: absolute;
		inset: 0;
		z-index: 0;
		pointer-events: none;
	}
	.ft-bg-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(100px);
		pointer-events: none;
	}
	.ft-bg-orb1 {
		width: 60vw;
		height: 60vw;
		top: -30%;
		left: -15%;
		background: radial-gradient(circle, rgba(220, 38, 38, 0.055) 0%, transparent 70%);
		animation: orbDrift 26s ease-in-out infinite;
	}
	.ft-bg-orb2 {
		width: 40vw;
		height: 40vw;
		bottom: -20%;
		right: -10%;
		background: radial-gradient(circle, rgba(185, 28, 28, 0.04) 0%, transparent 70%);
		animation: orbDrift 34s ease-in-out infinite reverse 7s;
	}
	@keyframes orbDrift {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
		}
		40% {
			transform: translate(3%, -4%) scale(1.06);
		}
		70% {
			transform: translate(-2%, 3%) scale(0.95);
		}
	}

	.ft-dots {
		position: absolute;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		background-image: radial-gradient(rgba(220, 38, 38, 0.08) 1px, transparent 1px);
		background-size: 28px 28px;
	}
	.ft-diagonal {
		position: absolute;
		top: 0;
		right: 0;
		width: 50vw;
		height: 100%;
		background: linear-gradient(225deg, rgba(220, 38, 38, 0.025) 0%, transparent 55%);
		z-index: 0;
		pointer-events: none;
	}

	/* ── Top border ── */
	.ft-border-top {
		position: relative;
		z-index: 3;
		display: flex;
		align-items: center;
		height: 3px;
	}
	.ft-border-line {
		flex: 1;
		height: 100%;
	}
	.ft-border-line-l {
		background: linear-gradient(90deg, transparent 0%, #dc2626 100%);
	}
	.ft-border-line-r {
		background: linear-gradient(90deg, #dc2626 0%, transparent 100%);
	}
	.ft-gem {
		flex-shrink: 0;
		width: 11px;
		height: 11px;
		background: #dc2626;
		transform: rotate(45deg);
		box-shadow:
			0 0 20px rgba(220, 38, 38, 0.9),
			0 0 40px rgba(220, 38, 38, 0.5);
		animation: gemPulse 2.5s ease-in-out infinite;
	}
	@keyframes gemPulse {
		0%,
		100% {
			box-shadow:
				0 0 16px rgba(220, 38, 38, 0.9),
				0 0 32px rgba(220, 38, 38, 0.4);
		}
		50% {
			box-shadow:
				0 0 32px rgba(220, 38, 38, 1),
				0 0 64px rgba(220, 38, 38, 0.65);
		}
	}

	/* ── Brand band ── */
	.ft-brand-band {
		position: relative;
		z-index: 2;
		display: flex;
		align-items: center;
		gap: 48px;
		flex-wrap: wrap;
		max-width: 1200px;
		margin: 0 auto;
		padding: 56px 48px 40px;
		opacity: 0;
		transform: translateY(28px);
		transition:
			opacity 0.7s ease 0.05s,
			transform 0.7s ease 0.05s;
	}
	.ft-brand-band.entered {
		opacity: 1;
		transform: translateY(0);
	}

	.ft-brand-inner {
		display: flex;
		flex-direction: column;
		gap: 18px;
	}

	/* Wordmark */
	.ft-wordmark {
		display: flex;
		flex-direction: column;
		line-height: 1;
	}
	.ft-wordmark-main {
		font-family: 'Bebas Neue', sans-serif;
		font-size: clamp(3rem, 5vw, 4.5rem);
		color: #ffffff;
		letter-spacing: 0.04em;
		line-height: 0.9;
		position: relative;
	}
	.ft-wordmark-main::after {
		content: '';
		position: absolute;
		bottom: -4px;
		left: 0;
		width: 100%;
		height: 3px;
		background: linear-gradient(90deg, #dc2626, rgba(220, 38, 38, 0.2));
		box-shadow: 0 0 8px rgba(220, 38, 38, 0.4);
	}
	.ft-wordmark-sub {
		font-family: 'Bebas Neue', sans-serif;
		font-size: clamp(0.9rem, 1.6vw, 1.3rem);
		color: #dc2626;
		letter-spacing: 0.28em;
		margin-top: 8px;
		text-shadow: 0 0 16px rgba(220, 38, 38, 0.3);
	}

	.ft-tagline {
		font-size: 0.83rem;
		font-weight: 300;
		color: rgba(255, 255, 255, 0.6);
		line-height: 1.65;
		max-width: 300px;
		margin: 0;
	}

	/* Socials */
	.ft-socials {
		display: flex;
		gap: 8px;
		margin-top: 4px;
	}
	.ft-social-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 38px;
		height: 38px;
		border-radius: 10px;
		background: rgba(220, 38, 38, 0.06);
		border: 1px solid rgba(220, 38, 38, 0.15);
		color: rgba(255, 255, 255, 0.5);
		text-decoration: none;
		transition: all 0.3s ease;
	}
	.ft-social-btn:hover {
		background: #dc2626;
		border-color: #dc2626;
		color: #ffffff;
		transform: translateY(-3px);
		box-shadow: 0 8px 20px rgba(220, 38, 38, 0.35);
	}

	/* Vertical rule */
	.ft-vr {
		flex-shrink: 0;
		align-self: stretch;
		width: 1px;
		background: linear-gradient(
			to bottom,
			transparent,
			rgba(220, 38, 38, 0.2) 30%,
			rgba(220, 38, 38, 0.2) 70%,
			transparent
		);
	}
	@media (max-width: 768px) {
		.ft-vr {
			display: none;
		}
	}

	/* Contact pill */
	.ft-contact-pill {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.ft-contact-pill-row {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 20px;
		background: rgba(220, 38, 38, 0.04);
		border: 1px solid rgba(220, 38, 38, 0.12);
		border-radius: 14px;
		transition: all 0.3s ease;
	}
	.ft-contact-pill-row:hover {
		background: rgba(220, 38, 38, 0.08);
		border-color: rgba(220, 38, 38, 0.3);
		transform: translateX(4px);
	}
	.ft-contact-pill-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		border-radius: 8px;
		background: #dc2626;
		color: #ffffff;
		flex-shrink: 0;
	}
	.ft-contact-val {
		font-size: 0.85rem;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.7);
		text-decoration: none;
		transition: color 0.2s ease;
	}
	.ft-contact-val:hover {
		color: #dc2626;
	}

	/* ── Main links ── */
	.ft-main {
		position: relative;
		z-index: 2;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 40px;
		max-width: 1200px;
		margin: 0 auto;
		padding: 8px 48px 52px;
		border-top: 1px solid rgba(220, 38, 38, 0.08);
		opacity: 0;
		transform: translateY(24px);
		transition:
			opacity 0.7s ease 0.25s,
			transform 0.7s ease 0.25s;
	}
	.ft-main.entered {
		opacity: 1;
		transform: translateY(0);
	}

	@media (max-width: 1024px) {
		.ft-main {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (max-width: 600px) {
		.ft-main {
			grid-template-columns: 1fr;
			padding: 8px 20px 40px;
		}
		.ft-brand-band {
			padding: 48px 20px 32px;
			gap: 28px;
		}
	}

	.ft-col {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.ft-col-title {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 0.68rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: #ffffff;
		margin: 0 0 4px;
	}
	.ft-col-title-line {
		display: block;
		width: 20px;
		height: 2px;
		background: #dc2626;
		box-shadow: 0 0 6px rgba(220, 38, 38, 0.5);
		border-radius: 2px;
		flex-shrink: 0;
	}

	.ft-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.ft-link {
		font-size: 0.84rem;
		font-weight: 400;
		color: rgba(255, 255, 255, 0.5);
		text-decoration: none;
		position: relative;
		display: inline-block;
		padding-left: 0;
		transition:
			color 0.25s ease,
			padding-left 0.25s ease;
	}
	.ft-link::before {
		content: '';
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 0;
		height: 1.5px;
		background: #dc2626;
		border-radius: 1px;
		transition: width 0.25s ease;
	}
	.ft-link:hover {
		color: #dc2626;
		padding-left: 14px;
	}
	.ft-link:hover::before {
		width: 8px;
	}

	/* Offices column */
	.ft-col-offices {
		gap: 20px;
	}

	.ft-office {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.ft-office-header {
		display: flex;
		gap: 10px;
		align-items: flex-start;
	}
	.ft-office-pin {
		flex-shrink: 0;
		margin-top: 1px;
		animation: pinBounce 3s ease-in-out infinite;
	}
	@keyframes pinBounce {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-3px);
		}
	}
	.ft-office-label {
		display: block;
		font-size: 0.72rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: #dc2626;
	}
	.ft-office-city {
		display: block;
		font-size: 0.78rem;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.65);
		margin-top: 1px;
	}
	.ft-office-addr {
		font-size: 0.76rem;
		font-weight: 300;
		color: rgba(255, 255, 255, 0.42);
		line-height: 1.65;
		margin: 0;
		padding-left: 20px;
		border-left: 1.5px solid rgba(220, 38, 38, 0.15);
	}

	/* ── Bottom bar ── */
	.ft-bottom {
		position: relative;
		z-index: 2;
		border-top: 1px solid rgba(220, 38, 38, 0.1);
		opacity: 0;
		transform: translateY(12px);
		transition:
			opacity 0.6s ease 0.5s,
			transform 0.6s ease 0.5s;
	}
	.ft-bottom.entered {
		opacity: 1;
		transform: translateY(0);
	}

	.ft-bottom-inner {
		max-width: 1200px;
		margin: 0 auto;
		padding: 18px 48px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		flex-wrap: wrap;
	}
	@media (max-width: 600px) {
		.ft-bottom-inner {
			padding: 16px 20px;
			flex-direction: column;
			gap: 10px;
			text-align: center;
		}
	}

	.ft-copy {
		font-size: 0.76rem;
		color: rgba(255, 255, 255, 0.38);
	}
	.ft-copy-brand {
		color: #dc2626;
		font-weight: 600;
	}

	.ft-bottom-dots {
		display: flex;
		gap: 6px;
		align-items: center;
	}
	.ft-bottom-dot {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: rgba(220, 38, 38, 0.3);
		animation: dotFade 2s ease-in-out infinite;
	}
	@keyframes dotFade {
		0%,
		100% {
			background: rgba(220, 38, 38, 0.3);
			transform: scale(1);
		}
		50% {
			background: rgba(220, 38, 38, 0.8);
			transform: scale(1.4);
		}
	}

	.ft-powered {
		font-size: 0.76rem;
		color: rgba(255, 255, 255, 0.35);
		display: flex;
		align-items: center;
		gap: 6px;
	}
	.ft-powered-brand {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		color: rgba(255, 255, 255, 0.55);
		font-weight: 500;
	}
	.ft-powered-diamond {
		width: 6px;
		height: 6px;
		background: #dc2626;
		transform: rotate(45deg);
		box-shadow: 0 0 6px rgba(220, 38, 38, 0.5);
		flex-shrink: 0;
	}
</style>
