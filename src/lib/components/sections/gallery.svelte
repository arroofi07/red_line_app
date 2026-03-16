<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import gallery1 from '$lib/assets/gallery_1.png';
	import gallery2 from '$lib/assets/gallery_2.png';
	import gallery3 from '$lib/assets/gallery_3.png';
	import gallery4 from '$lib/assets/gallery_4.png';

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});

	const items = [
		{ image: gallery1, title: 'VR Reality', class: 'col-span-2 row-span-2' },
		{ image: gallery2, title: 'Virtual Meeting', class: 'col-span-1 row-span-1' },
		{ image: gallery3, title: 'Hologram Show', class: 'col-span-1 row-span-1' },
		{ image: gallery4, title: 'Digital Festival', class: 'col-span-2 row-span-1' }
	];
</script>

<section id="gallery" class="relative overflow-hidden py-24">
	<div class="container mx-auto px-4 md:px-6">
		<div class="flex flex-col gap-12">
			<!-- Header -->
			<div class="flex flex-col items-center text-center gap-4">
				{#if mounted}
					<h2 in:fly={{ y: 20, duration: 1000 }} class="font-display text-4xl leading-tight tracking-tight text-white md:text-6xl">
						Event <span class="text-primary">Gallery</span>
					</h2>
				{/if}
			</div>

			<!-- Masonry-style Grid -->
			<div class="grid grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[200px] md:auto-rows-[300px]">
				{#each items as item, i}
					{#if mounted}
						<div 
							in:fade={{ duration: 1000, delay: i * 150 }} 
							class={cn(
								"relative rounded-[32px] overflow-hidden group border border-white/10 bg-black/40 shadow-2xl transition-all duration-500 hover:border-primary/50",
								item.class
							)}
						>
							<img
								src={item.image}
								alt={item.title}
								class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
							/>
							<!-- Overlay -->
							<div class="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
								<h3 class="font-display text-2xl text-white">{item.title}</h3>
							</div>
							
							<!-- Glowing border -->
							<div class="absolute inset-0 rounded-[32px] border border-white/0 group-hover:border-primary/30 transition-colors pointer-events-none"></div>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</section>

<script module>
	import { cn } from '$lib/utils';
</script>
