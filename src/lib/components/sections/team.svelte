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
			name: 'Anisa Nurul W.',
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
	<div class="bg-orb"></div> 

	<!-- Section header -->
	<div class="section-header" class:animate-in={visible}>
		<h2 class="section-title uppercase">
			Meet Our <span class="text-primary">Team</span>
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
				style="--delay: {i * 120}ms"
				onmouseenter={() => (hoveredIndex = i)}
				onmouseleave={() => (hoveredIndex = null)}
			>
				<!-- Photo area -->
				<div class="photo-wrap">
					<img
						src={member.image}
						alt={member.name}
						class="photo"
					/>
				</div>

				<!-- Info bar -->
				<div class="info">
					<div class="info-inner">
						<p class="member-designation">{member.designation}</p>
						<h3 class="member-name">{member.name}</h3>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<!-- Bottom rule -->
	<div class="bottom-rule" class:animate-in={visible}></div>
</section>

<style>
	.team-section {
		position: relative;
		overflow: hidden;
		background: var(--background);
		padding: clamp(5rem, 10vw, 9rem) 0;
		font-family: inherit;
	}

	.bg-orb {
		position: absolute;
		top: -20%;
		right: -10%;
		width: 55vw;
		height: 55vw;
		background: radial-gradient(circle, var(--primary) 0%, transparent 65%);
		opacity: 0.05;
		pointer-events: none;
	}

	.section-header {
		position: relative;
		max-width: 800px;
		margin: 0 auto 4rem;
		text-align: center;
		padding: 0 1.5rem;
		opacity: 0;
		transform: translateY(32px);
		transition: opacity 0.7s ease, transform 0.7s ease;
	}
	.section-header.animate-in {
		opacity: 1;
		transform: none;
	}

	.section-title {
		font-family: var(--font-display);
		font-size: clamp(3rem, 6vw, 4.5rem);
		color: white;
		line-height: 1;
		margin-bottom: 1.5rem;
		letter-spacing: -0.02em;
	}

	.section-subtitle {
		font-size: 1.125rem;
		color: rgba(255, 255, 255, 0.5);
		max-width: 600px;
		margin: 0 auto;
	}

	.cards-grid {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: 2rem;
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1.5rem;
	}
	@media (min-width: 640px) {
		.cards-grid { grid-template-columns: repeat(2, 1fr); }
	}
	@media (min-width: 1024px) {
		.cards-grid { grid-template-columns: repeat(4, 1fr); }
	}

	.card {
		position: relative;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 2rem;
		overflow: hidden;
		aspect-ratio: 3 / 4;
		opacity: 0;
		transform: translateY(48px);
		transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0ms);
	}
	.card.animate-in {
		opacity: 1;
		transform: none;
	}
	.card:hover {
		border-color: var(--primary);
		box-shadow: 0 20px 40px rgba(220, 38, 38, 0.1);
	}

	.photo-wrap {
		position: absolute;
		inset: 0;
		z-index: 1;
	}
	.photo {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.6s ease;
		filter: grayscale(100%) brightness(0.8);
	}
	.card:hover .photo {
		transform: scale(1.05);
		filter: grayscale(0%) brightness(1);
	}

	.card::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, black 0%, transparent 60%);
		z-index: 2;
		opacity: 0.8;
	}

	.info {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 3;
		padding: 2rem;
	}

	.member-name {
		font-family: var(--font-display);
		font-size: 1.75rem;
		color: white;
		margin: 0;
		line-height: 1;
	}

	.member-designation {
		font-size: 0.875rem;
		color: var(--primary);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-weight: 600;
	}

	.bottom-rule {
		max-width: 1200px;
		margin: 6rem auto 0;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--primary), transparent);
		opacity: 0.2;
	}
</style>
