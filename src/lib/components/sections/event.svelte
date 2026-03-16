<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import event1 from '$lib/assets/event_1.png';
	import event2 from '$lib/assets/event_2.png';
	import event3 from '$lib/assets/event_3.png';

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});

	const events = [
		{
			id: 1,
			image:
				'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=90',
			title: 'Aura Summit',
			category: 'Corporate Conference'
		},
		{
			id: 2,
			image:
				'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=90',
			title: 'Red Line LIVE',
			category: 'Music Festival'
		},
		{
			id: 1,
			image:
				'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=90',
			title: 'Aura Summit',
			category: 'Corporate Conference'
		},
		{
			id: 2,
			image:
				'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=90',
			title: 'Red Line LIVE',
			category: 'Music Festival'
		},
		{
			id: 3,
			image:
				'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=90',
			title: 'Global Tech Expo',
			category: 'Exhibition'
		}
	];
</script>

<section id="event" class="relative overflow-hidden py-24">
	<!-- Background Glow -->
	<div
		class="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]"
	></div>

	<div class="container mx-auto px-4 md:px-6">
		<div class="flex flex-col gap-12">
			<!-- Header -->
			<div class="flex flex-col items-center gap-4 text-center">
				{#if mounted}
					<h2
						in:fly={{ y: 20, duration: 1000 }}
						class="font-display text-4xl leading-tight tracking-tight text-white uppercase md:text-6xl"
					>
						Latest <span class="text-primary">Event</span>
					</h2>
				{/if}
			</div>

			<!-- Cards Slider -->
			<div class="group relative">
				<div
					class="no-scrollbar -mx-4 flex gap-6 overflow-x-auto px-4 pb-12 transition-all lg:mx-0 lg:px-0"
				>
					{#each events as event, i}
						{#if mounted}
							<div
								in:fade={{ duration: 1000, delay: i * 200 }}
								class="group/card relative aspect-4/5 w-[300px] flex-none overflow-hidden rounded-[32px] border border-white/10 bg-black/40 shadow-2xl transition-all duration-500 hover:border-primary/50 md:w-[400px]"
							>
								<img
									src={event.image}
									alt={event.title}
									class="h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-110"
								/>
								<!-- Card Overlay -->
								<div
									class="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-60 transition-opacity group-hover/card:opacity-80"
								></div>

								<!-- Neon Border Glow (bottom) -->
								<div
									class="absolute inset-x-0 bottom-0 h-1 bg-primary opacity-0 blur-xs transition-opacity group-hover/card:opacity-100"
								></div>
							</div>
						{/if}
					{/each}
				</div>

				<!-- Navigation Arrows (Floating) -->
				<div class="absolute top-1/2 left-4 z-10 hidden -translate-y-1/2 lg:flex">
					<button
						aria-label="Previous Event"
						class="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10 active:scale-95"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"
							stroke-linecap="round"
							stroke-linejoin="round"><path d="m15 18-6-6 6-6" /></svg
						>
					</button>
				</div>
				<div class="absolute top-1/2 right-4 z-10 hidden -translate-y-1/2 lg:flex">
					<button
						aria-label="Next Event"
						class="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10 active:scale-95"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"
							stroke-linecap="round"
							stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg
						>
					</button>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}
	.no-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
