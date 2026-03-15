<script lang="ts">
	import { onMount } from 'svelte';

	import anisa from '$lib/assets/team/anisanurul.png';
	import fadil from '$lib/assets/team/fadilmuitawakil.png';
	import irfan from '$lib/assets/team/irfanfandi.png';
	import tryb from '$lib/assets/team/trybuannaputra.png';

	const members = [
		{
			name: 'Irfan Fandi',
			designation: 'Owner / Executive Director',
			image: irfan,
			initials: 'IF'
		},
		{
			name: 'Fadil Muitawakil',
			designation: 'Visual Designer',
			image: fadil,
			initials: 'FM'
		},
		{
			name: 'Try Buanna Putra',
			designation: 'Head Production',
			image: tryb,
			initials: 'TB'
		},
		{
			name: 'Anisa Nurul',
			designation: 'Legal & Administration',
			image: anisa,
			initials: 'AN'
		}
	];

	let sectionEl: HTMLElement;
	let visible = $state(false);
	let hoveredIndex = $state<number | null>(null);

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					visible = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.1 }
		);
		if (sectionEl) observer.observe(sectionEl);
		return () => observer.disconnect();
	});
</script>

<section class="team-section" bind:this={sectionEl}>
	<!-- Background decorative elements -->
	<div class="bg-grid"></div>
	<div class="bg-orb"></div>

	<!-- Section header -->
	<div class="section-header" class:animate-in={visible}>
		<h2 class="section-title">
			Meet <em>Our Team</em>
		</h2>
		<p class="section-subtitle">
			Kami mempunyai tim yang professional dan berpengalaman di bidangnya.
		</p>
	</div>

	<!-- Cards grid -->
	<div class="cards-grid">
		{#each members as member, i}
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="card"
				role="group"
				aria-label="Team member {member.name}"
				class:animate-in={visible}
				class:hovered={hoveredIndex === i}
				style="--delay: {i * 120}ms"
				onmouseenter={() => (hoveredIndex = i)}
				onmouseleave={() => (hoveredIndex = null)}
			>
				<!-- Watermark "Directors" text -->
				<span class="watermark" aria-hidden="true">Directors</span>

				<!-- Photo area -->
				<div class="photo-wrap">
					<img
						src={member.image}
						alt={member.name}
						class="photo"
						onerror={(e) => {
							const target = e.currentTarget as HTMLImageElement;
							target.style.display = 'none';
							if (target.nextElementSibling) {
								(target.nextElementSibling as HTMLElement).style.display = 'flex';
							}
						}}
					/>
					<!-- Fallback initials avatar -->
					<div class="avatar-fallback" style="display:none">
						{member.initials}
					</div>
					<!-- Shine sweep on hover -->
					<div class="photo-shine"></div>
				</div>

				<!-- Info bar -->
				<div class="info">
					<div class="info-inner">
						<h3 class="member-name">{member.name}</h3>
						<p class="member-designation">{member.designation}</p>
					</div>
				</div>

				<!-- Corner accent -->
				<div class="corner-accent"></div>
			</div>
		{/each}
	</div>

	<!-- Bottom rule -->
	<div class="bottom-rule" class:animate-in={visible}></div>
</section>

<style>
	/* ── Tokens ───────────────────────────── */
	:root {
		--red: #d0222a;
		--red-dk: #a81820;
		--red-lt: #e84850;
		--cream: #ffffff;
		--ink: #000000;
		--muted: #7a706a;
		--card-r: 4rem; /* big top-left radius matching ref */
	}

	/* ── Section shell ───────────────────── */
	.team-section {
		position: relative;
		overflow: hidden;
		background: var(--cream);
		padding: clamp(5rem, 10vw, 9rem) clamp(1.25rem, 5vw, 5rem);
		font-family: 'Inter', sans-serif;
	}

	/* ── BG decorations ──────────────────── */
	.bg-grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(208, 34, 42, 0.04) 1px, transparent 1px),
			linear-gradient(90deg, rgba(208, 34, 42, 0.04) 1px, transparent 1px);
		background-size: 48px 48px;
		pointer-events: none;
	}
	.bg-orb {
		position: absolute;
		top: -20%;
		right: -10%;
		width: 55vw;
		height: 55vw;
		max-width: 700px;
		max-height: 700px;
		background: radial-gradient(circle, rgba(208, 34, 42, 0.07) 0%, transparent 65%);
		border-radius: 50%;
		pointer-events: none;
	}

	/* ── Header ──────────────────────────── */
	.section-header {
		position: relative;
		max-width: 680px;
		margin: 0 auto 4rem;
		text-align: center;
		opacity: 0;
		transform: translateY(32px);
		transition:
			opacity 0.7s ease,
			transform 0.7s ease;
	}
	.section-header.animate-in {
		opacity: 1;
		transform: none;
	}

	.eyebrow {
		display: inline-block;
		font-family: 'Helvetica Neue', Arial, sans-serif;
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.25em;
		text-transform: uppercase;
		color: var(--red);
		margin-bottom: 1rem;
		position: relative;
		padding: 0 1.5rem;
	}
	.eyebrow::before,
	.eyebrow::after {
		content: '';
		position: absolute;
		top: 50%;
		width: 1.2rem;
		height: 1px;
		background: var(--red);
	}
	.eyebrow::before {
		right: 100%;
		margin-right: -1.2rem;
	}
	.eyebrow::after {
		left: 100%;
		margin-left: -1.2rem;
	}

	.section-title {
		font-size: clamp(2.4rem, 5vw, 3.8rem);
		font-weight: 400;
		color: var(--ink);
		line-height: 1.1;
		margin: 0 0 1.2rem;
		letter-spacing: -0.02em;
	}
	.section-title em {
		font-style: italic;
		color: var(--red);
	}

	.section-subtitle {
		font-family: 'Helvetica Neue', Arial, sans-serif;
		font-size: 1rem;
		line-height: 1.7;
		color: var(--muted);
		margin: 0;
	}

	/* ── Grid ────────────────────────────── */
	.cards-grid {
		position: relative;
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
		max-width: 1200px;
		margin: 0 auto;
	}
	@media (min-width: 640px) {
		.cards-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (min-width: 1024px) {
		.cards-grid {
			grid-template-columns: repeat(4, 1fr);
			gap: 1.25rem;
		}
	}

	/* ── Card ────────────────────────────── */
	.card {
		position: relative;
		background: var(--red);
		border-radius: var(--card-r) 0.75rem 0.75rem 0.75rem;
		overflow: hidden;
		cursor: pointer;
		aspect-ratio: 3 / 4;
		opacity: 0;
		transform: translateY(48px) scale(0.96);
		transition:
			opacity 0.65s ease var(--delay, 0ms),
			transform 0.65s cubic-bezier(0.22, 0.68, 0, 1.2) var(--delay, 0ms),
			box-shadow 0.3s ease;
	}
	.card.animate-in {
		opacity: 1;
		transform: none;
	}
	.card:hover,
	.card.hovered {
		box-shadow: 0 32px 64px rgba(208, 34, 42, 0.35);
		z-index: 2;
	}

	/* Gradient overlay — bottom dark fade */
	.card::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to bottom,
			rgba(168, 24, 32, 0.15) 0%,
			transparent 35%,
			rgba(10, 5, 5, 0.75) 100%
		);
		z-index: 2;
		transition: opacity 0.3s;
	}
	.card:hover::before {
		opacity: 0.85;
	}

	/* ── Watermark ───────────────────────── */
	.watermark {
		position: absolute;
		top: 50%;
		left: -0.4em;
		transform: translateY(-50%) rotate(-90deg);
		transform-origin: center center;
		font-family: 'Georgia', serif;
		font-size: clamp(3rem, 6vw, 4.5rem);
		font-weight: 700;
		font-style: italic;
		letter-spacing: 0.04em;
		color: transparent;
		-webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.18);
		white-space: nowrap;
		pointer-events: none;
		user-select: none;
		z-index: 1;
		transition: -webkit-text-stroke-color 0.3s;
	}
	.card:hover .watermark {
		-webkit-text-stroke-color: rgba(255, 255, 255, 0.3);
	}

	/* ── Photo ───────────────────────────── */
	.photo-wrap {
		position: absolute;
		inset: 0;
		z-index: 1;
		overflow: hidden;
	}
	.photo {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top center;
		display: block;
		transition: transform 0.55s cubic-bezier(0.22, 0.68, 0, 1.1);
		mix-blend-mode: luminosity;
		opacity: 0.88;
	}
	.card:hover .photo {
		transform: scale(1.06) translateY(-2%);
		mix-blend-mode: normal;
		opacity: 1;
	}

	/* Fallback avatar */
	.avatar-fallback {
		position: absolute;
		inset: 0;
		align-items: center;
		justify-content: center;
		font-family: 'Helvetica Neue', Arial, sans-serif;
		font-size: clamp(2.5rem, 6vw, 4rem);
		font-weight: 700;
		color: rgba(255, 255, 255, 0.55);
		background: var(--red-dk);
	}

	/* Shine sweep */
	.photo-shine {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			110deg,
			transparent 30%,
			rgba(255, 255, 255, 0.12) 50%,
			transparent 70%
		);
		transform: translateX(-100%);
		transition: transform 0.6s ease;
		pointer-events: none;
		z-index: 3;
	}
	.card:hover .photo-shine {
		transform: translateX(100%);
	}

	/* ── Info bar ────────────────────────── */
	.info {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 4;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		padding: 1.4rem 1.2rem 1.4rem 1.4rem;
		gap: 0.5rem;
		transform: translateY(6px);
		transition: transform 0.3s ease;
	}
	.card:hover .info {
		transform: none;
	}

	.info-inner {
		flex: 1;
		min-width: 0;
	}

	.member-designation {
		font-family: 'Inter', sans-serif;
		font-size: 0.8rem;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.9);
		margin: 0;
	}

	.member-name {
		font-size: 1.5rem;
		font-weight: 800;
		color: #fff;
		margin: 0;
		line-height: 1.1;
	}

	.arrow-icon {
		flex-shrink: 0;
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.12);
		border: 1px solid rgba(255, 255, 255, 0.25);
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		backdrop-filter: blur(6px);
		transition:
			background 0.25s,
			transform 0.25s;
	}
	.card:hover .arrow-icon {
		background: #fff;
		color: var(--red);
		transform: translateX(3px);
	}

	/* ── Corner accent ───────────────────── */
	.corner-accent {
		position: absolute;
		top: 0;
		left: 0;
		width: var(--card-r);
		height: var(--card-r);
		background: var(--cream);
		border-bottom-right-radius: var(--card-r);
		z-index: 5;
		transition: opacity 0.3s;
	}
	.card:hover .corner-accent {
		opacity: 0.8;
	}

	/* ── Bottom rule ─────────────────────── */
	.bottom-rule {
		max-width: 1200px;
		margin: 4rem auto 0;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--red), transparent);
		opacity: 0;
		transform: scaleX(0.4);
		transition:
			opacity 0.8s ease 0.5s,
			transform 0.8s ease 0.5s;
	}
	.bottom-rule.animate-in {
		opacity: 0.4;
		transform: scaleX(1);
	}
</style>
