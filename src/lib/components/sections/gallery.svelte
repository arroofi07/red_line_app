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
	let featuredItem = $derived(items[0]);
	let sideItems = $derived(items.slice(1, 3));
	let gridItems = $derived(items.slice(3));

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

<section id="gallery" class="relative isolate overflow-hidden py-24 md:py-28">
	<div class="pointer-events-none absolute inset-0 -z-10">
		<div class="absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/25 blur-3xl"></div>
		<div class="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl"></div>
		<div class="absolute right-0 top-1/3 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl"></div>
	</div>

	<div class="container mx-auto px-4 md:px-6">
		<div class="space-y-10 md:space-y-14">
			<div class="flex flex-col items-center gap-4 text-center">
				{#if mounted}
					<p
						in:fade={{ duration: 700 }}
						class="rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.24em] text-white/80"
					>
						Trusted by Industry Leaders
					</p>
					<h2
						in:fly={{ y: 18, duration: 900 }}
						class="max-w-3xl font-display text-4xl leading-tight tracking-tight text-white md:text-6xl"
					>
						Crafted Experiences for
						<span class="bg-linear-to-r from-primary via-cyan-300 to-purple-300 bg-clip-text text-transparent">
							World-Class Events
						</span>
					</h2>
				{/if}
			</div>

			<div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
				{#if mounted && featuredItem}
					<article
						in:fade={{ duration: 900 }}
						class="group relative overflow-hidden rounded-[32px] border border-white/15 bg-white/5 shadow-[0_24px_80px_-30px_rgba(0,0,0,0.7)] backdrop-blur-sm lg:col-span-8"
					>
						<img
							src={featuredItem.image}
							alt={featuredItem.title}
							class="h-80 w-full object-cover object-center transition-transform duration-700 group-hover:scale-105 md:h-[30rem]"
						/>
						<div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/15 to-transparent"></div>
						<div class="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
							<div>
								<p class="text-xs uppercase tracking-[0.24em] text-white/65">Featured Event</p>
								<h3 class="mt-2 font-display text-2xl text-white md:text-3xl">{featuredItem.title}</h3>
							</div>
							<div class="hidden rounded-full border border-white/30 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/80 md:block">
								Highlights
							</div>
						</div>
					</article>
				{/if}

				<div class="grid grid-cols-1 gap-6 lg:col-span-4">
					{#each sideItems as item, i (item.title)}
						{#if mounted}
							<article
								in:fade={{ duration: 700, delay: 140 + i * 90 }}
								class="group relative overflow-hidden rounded-[28px] border border-white/10 bg-black/30 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:bg-black/45"
							>
								<div class="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/15 blur-2xl transition-opacity duration-500 group-hover:opacity-100"></div>
								<img
									src={item.image}
									alt={item.title}
									class="relative h-64 w-full object-cover object-center transition-transform duration-700 group-hover:scale-105 md:h-60"
								/>
								<div class="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/45 to-transparent p-5">
									<h3 class="font-display text-lg text-white md:text-xl">{item.title}</h3>
								</div>
							</article>
						{/if}
					{/each}
				</div>
			</div>

			{#if gridItems.length > 0}
				<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
					{#each gridItems as item, i (item.title)}
						{#if mounted}
							<article
								in:fade={{ duration: 700, delay: 220 + i * 70 }}
								class="group relative overflow-hidden rounded-[28px] border border-white/10 bg-black/25 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40"
							>
								<img
									src={item.image}
									alt={item.title}
									class="h-64 w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
								/>
								<div class="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/35 to-transparent px-5 pb-5 pt-10">
									<h3 class="font-display text-lg text-white">{item.title}</h3>
								</div>
							</article>
						{/if}
					{/each}
				</div>
			{/if}
		</div>
	</div>
</section>
