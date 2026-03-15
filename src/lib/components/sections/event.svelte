<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	let activeIndex = $state(0);
	let startX = 0;
	let isDragging = false;
	let isAnimating = $state(false);

	const projects = [
		{
			title: 'Aura Summit',
			subtitle: '2024',
			category: 'Corporate Conference',
			description:
				'An immersive experience for global leaders to connect and innovate in the heart of the tech world.',
			image:
				'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=90',
			accent: '#C9A96E',
			tag: '01'
		},
		{
			title: 'Red Line',
			subtitle: 'LIVE',
			category: 'Music Festival',
			description:
				'The ultimate music festival experience, featuring top international artists and cutting-edge stage production.',
			image:
				'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=90',
			accent: '#E05C5C',
			tag: '02'
		},
		{
			title: 'Global Tech',
			subtitle: 'Expo',
			category: 'Exhibition',
			description:
				'Showcasing the future of technology, from AI and robotics to sustainable energy solutions.',
			image:
				'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=90',
			accent: '#6EA8C9',
			tag: '03'
		}
	];

	function goTo(index: number) {
		if (isAnimating || index === activeIndex) return;
		isAnimating = true;
		activeIndex = index;
		setTimeout(() => (isAnimating = false), 700);
	}

	function next() {
		goTo((activeIndex + 1) % projects.length);
	}

	function prev() {
		goTo((activeIndex - 1 + projects.length) % projects.length);
	}

	$effect(() => {
		const interval = setInterval(next, 5000);
		return () => clearInterval(interval);
	});

	function handleTouchStart(e: TouchEvent) {
		startX = e.touches[0].clientX;
		isDragging = true;
	}

	function handleTouchMove(e: TouchEvent) {
		if (!isDragging) return;
		const diff = startX - e.touches[0].clientX;
		if (Math.abs(diff) > 50) {
			if (diff > 0) next();
			else prev();
			isDragging = false;
		}
	}

	function handleMouseDown(e: MouseEvent) {
		startX = e.clientX;
		isDragging = true;
	}

	function handleMouseMove(e: MouseEvent) {
		if (!isDragging) return;
		const diff = startX - e.clientX;
		if (Math.abs(diff) > 50) {
			if (diff > 0) next();
			else prev();
			isDragging = false;
		}
	}

	function handleMouseUp() {
		isDragging = false;
	}
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<section id="projects" class="projects-section">
	<!-- Grain overlay -->
	<div class="grain-overlay"></div>

	<!-- Ambient blobs -->
	<div class="ambient-blob blob-1"></div>
	<div class="ambient-blob blob-2"></div>

	<div class="section-inner">
		<!-- Top row: label + counter -->
		<div class="section-header">
			<h2 class="section-title">
				Latest <em>Event</em>
			</h2>
		</div>
		<!-- Main grid -->
		<div class="main-grid">
			<!-- Left: Text content -->
			<div class="content-left">
				<div class="title-block">
					<h3 class="title-main">{projects[activeIndex].title}</h3>
					<h3 class="title-sub">{projects[activeIndex].subtitle}</h3>
				</div>

				<div class="meta-row">
					<span class="category-badge">
						{projects[activeIndex].category}
					</span>
				</div>

				<p class="description">{projects[activeIndex].description}</p>

				<div class="actions">
					<button class="cta-btn">
						<span>More Event</span>
					</button>

					<!-- Progress dots -->
					<div class="dot-nav">
						{#each projects as _, i}
							<button
								class="dot {i === activeIndex ? 'dot-active' : ''}"
								onclick={() => goTo(i)}
								aria-label="Go to project {i + 1}"
							></button>
						{/each}
					</div>
				</div>
			</div>

			<!-- Right: Cards slider -->
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<div
				class="slider-viewport"
				role="region"
				aria-label="Project slider"
				tabindex="0"
				ontouchstart={handleTouchStart}
				ontouchmove={handleTouchMove}
				onmousedown={handleMouseDown}
				onmousemove={handleMouseMove}
				onmouseup={handleMouseUp}
				onmouseleave={handleMouseUp}
			>
				<div
					class="cards-track"
					style="transform: translateX(calc(-{activeIndex} * var(--slide-width, 304px)))"
				>
					{#each projects as project, i}
						{@const isActive = i === activeIndex}
						<div
							class="card {isActive ? 'card-active' : 'card-inactive'}"
							onclick={() => goTo(i)}
							role="button"
							tabindex={i}
							onkeydown={(e) => e.key === 'Enter' && goTo(i)}
						>
							<div class="card-img-wrap">
								<img src={project.image} alt={project.title} class="card-img" />
								<div class="card-gradient"></div>

								<!-- Active card: overlay info -->
								{#if isActive}
									<div class="card-overlay-info">
										<span class="overlay-category">{project.category}</span>
										<div class="overlay-title-row">
											<h4 class="overlay-title">{project.title} {project.subtitle}</h4>
											<div class="overlay-arrow">
												<svg
													width="16"
													height="16"
													viewBox="0 0 24 24"
													fill="none"
													stroke="white"
													stroke-width="2.5"
												>
													<path d="M5 12h14M12 5l7 7-7 7" />
												</svg>
											</div>
										</div>
										<!-- Progress bar -->
										<div class="progress-bar-track">
											<div class="progress-bar-fill"></div>
										</div>
									</div>
								{/if}
							</div>
						</div>
					{/each}
				</div>

				<!-- Nav arrows -->
				<div class="arrow-nav">
					<button class="arrow-btn" onclick={prev} aria-label="Previous">
						<svg
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path d="M19 12H5M12 19l-7-7 7-7" />
						</svg>
					</button>
					<button class="arrow-btn" onclick={next} aria-label="Next">
						<svg
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path d="M5 12h14M12 5l7 7-7 7" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* ─── Base ─── */
	.projects-section {
		position: relative;
		padding: 6rem 0 7rem;
		margin-top: -px;
		background: #ffffff;
		overflow: hidden;
		font-family: 'DM Sans', sans-serif;
		color: #111111;
	}

	/* ─── Grain ─── */
	.grain-overlay {
		position: absolute;
		inset: 0;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
		background-size: 200px 200px;
		pointer-events: none;
		z-index: 1;
		opacity: 0.5;
	}

	/* ─── Ambient blobs ─── */
	.ambient-blob {
		position: absolute;
		border-radius: 50%;
		filter: blur(120px);
		pointer-events: none;
	}
	.blob-1 {
		width: 600px;
		height: 600px;
		top: -100px;
		right: -100px;
		z-index: 0;
		background: hsl(var(--primary) / 0.07);
	}
	.blob-2 {
		width: 400px;
		height: 400px;
		bottom: -80px;
		left: 5%;
		z-index: 0;
		background: hsl(var(--primary) / 0.04);
	}

	/* ─── Layout ─── */
	.section-inner {
		position: relative;
		z-index: 2;
		max-width: 1280px;
		margin: 0 auto;
		padding: 0 2.5rem;
	}

	/* ─── Top bar ─── */
	.top-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 4rem;
		border-bottom: 1px solid rgba(0, 0, 0, 0.08);
		padding-bottom: 1.5rem;
	}
	.section-label {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	.label-line {
		display: block;
		width: 40px;
		height: 1px;
		background: hsl(var(--primary));
	}
	.label-text {
		font-size: 0.7rem;
		font-weight: 500;
		letter-spacing: 0.3em;
		text-transform: uppercase;
		color: rgba(0, 0, 0, 0.38);
	}
	.counter {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		font-size: 0.85rem;
		font-weight: 300;
		color: red;
	}
	.counter-current {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.6rem;
		font-weight: 400;
		line-height: 1;
		color: hsl(var(--primary));
	}
	.counter-sep {
		color: rgba(0, 0, 0, 0.18);
	}
	.counter-total {
		color: rgba(0, 0, 0, 0.28);
		font-size: 0.8rem;
	}

	/* ─── Main grid ─── */
	.main-grid {
		display: grid;
		grid-template-columns: 1fr 1.4fr;
		gap: 4rem;
		align-items: center;
	}

	/* ─── Left content ─── */
	.content-left {
		display: flex;
		flex-direction: column;
		gap: 1.8rem;
	}
	.title-block {
		display: flex;
		flex-direction: column;
	}
	.title-main {
		font-family: 'Cormorant Garamond', serif;
		font-size: clamp(3.5rem, 6vw, 5.5rem);
		font-weight: 600;
		line-height: 0.95;
		letter-spacing: -0.02em;
		color: red;
		margin: 0;
	}
	.title-sub {
		font-family: 'Cormorant Garamond', serif;
		font-size: clamp(3.5rem, 6vw, 5.5rem);
		font-weight: 300;
		font-style: italic;
		line-height: 0.95;
		letter-spacing: -0.02em;
		color: black;
		margin: 0;
	}
	.meta-row {
		display: flex;
		align-items: center;
	}
	.category-badge {
		font-size: 0.68rem;
		font-weight: 500;
		letter-spacing: 0.25em;
		text-transform: uppercase;
		padding: 0.4rem 0.9rem;
		border: 1px solid hsl(var(--primary) / 0.3);
		border-radius: 999px;
		color: hsl(var(--primary));
	}
	.description {
		font-size: 1rem;
		font-weight: 300;
		line-height: 1.75;
		color: rgba(0, 0, 0, 0.48);
		max-width: 360px;
		margin: 0;
	}
	.actions {
		display: flex;
		align-items: center;
		gap: 2rem;
		margin-top: 0.5rem;
	}

	/* ─── CTA Button ─── */
	.cta-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
		font-weight: bold;
		background: hsl(var(--primary));
		color: hsl(var(--primary-foreground));
		border: none;
		padding: 0.9rem 2rem;
		border-radius: 6px;
		font-family: 'DM Sans', sans-serif;
		font-size: 0.85rem;
		font-weight: 500;
		letter-spacing: 0.05em;
		cursor: pointer;
		background-color: red;
		color: white;
		transition:
			opacity 0.2s ease,
			transform 0.2s ease;
		box-shadow: 0 8px 30px -8px hsl(var(--primary) / 0.4);
	}
	.cta-btn:hover {
		opacity: 0.85;
		transform: translateY(-1px);
	}
	.cta-btn:active {
		transform: scale(0.97);
	}
	.cta-btn svg {
		transition: transform 0.2s ease;
	}
	.cta-btn:hover svg {
		transform: translateX(3px);
	}

	/* ─── Dot nav ─── */
	.dot-nav {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}
	.dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: black;
		border: none;
		cursor: pointer;
		transition:
			background 0.4s ease,
			width 0.3s ease;
	}
	.dot-active {
		width: 24px;
		border-radius: 3px;
		background: red;
	}

	/* ─── Slider viewport ─── */
	.slider-viewport {
		position: relative;
		overflow: hidden;
		height: 540px;
		cursor: grab;
	}
	.slider-viewport:active {
		cursor: grabbing;
	}

	.cards-track {
		display: flex;
		gap: 24px;
		align-items: center;
		height: 100%;
		padding-left: 16px;
		transition: transform 0.7s cubic-bezier(0.77, 0, 0.18, 1);
	}

	/* ─── Cards ─── */
	.card {
		flex-shrink: 0;
		border-radius: 24px;
		overflow: hidden;
		transition: all 0.7s cubic-bezier(0.77, 0, 0.18, 1);
		cursor: pointer;
	}
	.card-active {
		width: 380px;
		height: 500px;
		opacity: 1;
		transform: scale(1);
		box-shadow: 0 30px 70px -15px rgba(0, 0, 0, 0.18);
	}
	.card-inactive {
		width: 280px;
		height: 400px;
		opacity: 0.38;
		transform: scale(0.97);
		filter: blur(1px);
	}
	.card-img-wrap {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.card-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 1.2s ease;
		display: block;
	}
	.card-active .card-img {
		transform: scale(1.05);
	}
	.card-gradient {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to top,
			rgba(0, 0, 0, 0.78) 0%,
			rgba(0, 0, 0, 0.22) 45%,
			transparent 70%
		);
	}

	/* ─── Card overlay info ─── */
	.card-overlay-info {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 1.8rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.overlay-category {
		font-size: 0.65rem;
		font-weight: 500;
		letter-spacing: 0.25em;
		text-transform: uppercase;
		color: hsl(var(--primary));
	}
	.overlay-title-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}
	.overlay-title {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.6rem;
		font-weight: 600;
		color: white;
		margin: 0;
		line-height: 1.1;
	}
	.overlay-arrow {
		flex-shrink: 0;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: hsl(var(--primary));
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* ─── Progress bar ─── */
	.progress-bar-track {
		height: 2px;
		background: rgba(255, 255, 255, 0.18);
		border-radius: 999px;
		margin-top: 0.8rem;
		overflow: hidden;
	}
	.progress-bar-fill {
		height: 100%;
		border-radius: 999px;
		background: hsl(var(--primary));
		animation: progress 5s linear infinite;
	}
	@keyframes progress {
		from {
			width: 0%;
		}
		to {
			width: 100%;
		}
	}

	/* ─── Arrow nav ─── */
	.arrow-nav {
		position: absolute;
		bottom: 0;
		right: 0;
		display: flex;
		gap: 0.5rem;
	}
	.arrow-btn {
		width: 44px;
		height: 44px;
		border-radius: 50%;
		border: 1px solid rgba(0, 0, 0, 0.1);
		background: rgba(0, 0, 0, 0.04);
		color: rgba(0, 0, 0, 0.55);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s ease;
	}
	.arrow-btn:hover {
		background: hsl(var(--primary));
		border-color: hsl(var(--primary));
		color: hsl(var(--primary-foreground));
	}
	.arrow-btn:active {
		transform: scale(0.95);
	}

	/* ════════════════════════════════════════
	   RESPONSIVE — hanya ubah posisi/ukuran,
	   tidak ada perubahan warna/font/style lain
	   ════════════════════════════════════════ */

	/* Tablet: slider atas, content bawah */
	@media (max-width: 1024px) {
		.main-grid {
			grid-template-columns: 1fr;
			gap: 3rem;
		}
		.slider-viewport {
			order: -1;
			height: 420px;
		}
		.content-left {
			order: 1;
		}
		.card-active {
			width: 300px;
			height: 400px;
		}
		.card-inactive {
			width: 220px;
			height: 320px;
		}
		:global(.cards-track) {
			--slide-width: 244px;
		}
	}

	/* Mobile: slider full-width atas, content teks bawah */
	@media (max-width: 640px) {
		.section-inner {
			padding: 0 1.5rem;
		}
		.top-bar {
			margin-bottom: 2.5rem;
		}
		.title-main,
		.title-sub {
			font-size: 3rem;
		}

		/* Slider keluar dari padding container agar terasa full-width */
		.slider-viewport {
			order: -1;
			height: 320px;
			margin-left: -1.5rem;
			margin-right: -1.5rem;
		}
		.cards-track {
			padding-left: 1.5rem;
			gap: 12px;
		}
		:global(.cards-track) {
			--slide-width: 196px;
		}
		.card-active {
			width: 240px;
			height: 310px;
			border-radius: 20px;
		}
		.card-inactive {
			width: 184px;
			height: 255px;
			border-radius: 20px;
		}

		/* Content di bawah slider */
		.content-left {
			order: 1;
		}
		.description {
			max-width: 100%;
		}
		.actions {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}
		.cta-btn {
			width: 100%;
			justify-content: center;
		}
		.dot-nav {
			width: 100%;
			justify-content: center;
		}

		/* Arrow: pindah ke kanan tengah di dalam slider */
		.arrow-nav {
			bottom: auto;
			top: 50%;
			transform: translateY(-50%);
			right: 0.6rem;
			flex-direction: column;
			gap: 0.4rem;
		}
		.arrow-btn {
			width: 36px;
			height: 36px;
			background: rgba(255, 255, 255, 0.82);
			border-color: rgba(255, 255, 255, 0.5);
			color: #111;
			backdrop-filter: blur(6px);
		}
	}

	.section-header {
		max-width: 680px;
		margin: 0 auto 4rem;
		text-align: center;
		transform: translateY(32px);
		transition:
			opacity 0.7s ease,
			transform 0.7s ease;
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
</style>
