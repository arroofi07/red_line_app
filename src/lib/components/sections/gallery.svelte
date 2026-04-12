<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import {
		bankNagari,
		gagNikel,
		kemenkumham,
		mandalaFinance,
		perdami,
		pertamina
	} from '$lib/assets/event-page';
	import { getLandingEventIds } from '$lib/firebase/landing';
	import { getEvents } from '$lib/firebase/events';

	let mounted = $state(false);

	const staticItems = [
		{ image: pertamina, title: 'Pertamina' },
		{ image: bankNagari, title: 'Bank Nagari' },
		{ image: kemenkumham, title: 'Kemenkumham' },
		{ image: perdami, title: 'PERDAMI' },
		{ image: mandalaFinance, title: 'Mandala Finance' },
		{ image: gagNikel, title: 'GAG Nikel' }
	];

	let dynamicItems = $state<{ image: string; title: string }[]>([]);
	let loaded = $state(false);

	let items = $derived(loaded && dynamicItems.length > 0 ? dynamicItems : staticItems);

	onMount(async () => {
		mounted = true;
		try {
			const [selectedIds, allEvents] = await Promise.all([
				getLandingEventIds('event-gallery'),
				getEvents()
			]);
			if (selectedIds.length > 0) {
				const eventMap = new Map(allEvents.map((e) => [e.id, e]));
				const ordered = selectedIds
					.map((id) => eventMap.get(id))
					.filter(Boolean)
					.map((e) => ({ image: e!.imageUrl, title: e!.title }));
				if (ordered.length > 0) dynamicItems = ordered;
			}
		} catch {
			// fallback ke staticItems
		} finally {
			loaded = true;
		}
	});
</script>

<section id="gallery" class="relative overflow-hidden py-24">
	<div class="container mx-auto px-4 md:px-6">
		<div class="flex flex-col gap-12">
			<!-- Header -->
			<div class="flex flex-col items-center text-center gap-4">
				{#if mounted}
					<h2
						in:fly={{ y: 20, duration: 1000 }}
						class="font-display text-4xl leading-tight tracking-tight text-white md:text-6xl"
					>
						Event <span class="text-primary">Gallery</span>
					</h2>
				{/if}
			</div>

			<!-- Grid -->
			<div class="grid grid-cols-2 gap-6 auto-rows-[200px] md:auto-rows-[260px] lg:grid-cols-3">
				{#each items as item, i (item.title + i)}
					{#if mounted}
						<div
							in:fade={{ duration: 1000, delay: i * 150 }}
							class="group relative overflow-hidden rounded-[32px] border border-white/10 bg-black/40 shadow-2xl transition-all duration-500 hover:border-primary/50"
						>
							<img
								src={item.image}
								alt={item.title}
								class="h-full w-full object-contain p-6 md:p-8 transition-transform duration-700 group-hover:scale-105"
							/>
							<div
								class="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8"
							>
								<h3 class="font-display text-2xl text-white">{item.title}</h3>
							</div>
							<div
								class="absolute inset-0 rounded-[32px] border border-white/0 group-hover:border-primary/30 transition-colors pointer-events-none"
							></div>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</section>
