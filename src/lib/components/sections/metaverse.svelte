<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import lldikti from '$lib/assets/event-page/lldikti.png';

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});
</script>

<section id="metaverse" class="relative overflow-hidden py-24">
	<div class="container mx-auto px-4 md:px-6">
		<div class="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
			<!-- Visual Content -->
			<div class="order-2 lg:order-1 relative flex items-center justify-center">
				{#if mounted}
					<div in:fade={{ duration: 1500 }} class="relative z-10 w-full rounded-3xl border border-white/10 max-w-xl">
						<img
							src={lldikti}
							alt="LLDIKTI"
							class="h-auto w-full rounded-3xl p-4 object-contain drop-shadow-[0_0_60px_rgba(220,38,38,0.15)]"
						/>
						
						<!-- Decorative Glow -->
						<div class="absolute inset-0 bg-radial from-primary/5 to-transparent blur-3xl"></div>
					</div>
				{/if}
			</div>

			<!-- Text Content -->
			<div class="order-1 lg:order-2 flex flex-col gap-8 text-center lg:text-left">
				{#if mounted}
					<div in:fly={{ x: 50, duration: 1000 }} class="flex flex-col gap-4">
						<h2 class="font-display text-4xl leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
							Kami membangun<br />
							<span class="text-primary">Event Terbaik Untukmu</span>
						</h2>

						<p class="mx-auto max-w-lg text-lg text-foreground/60 lg:mx-0">
								menciptakan pengalaman yang tak terlupakan bagi para tamu undangan
						</p>
					</div>

					<div in:fly={{ x: 30, duration: 1000, delay: 300 }} class="flex justify-center lg:justify-start">
						<button class="group flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">
							Explore Now
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
						</button>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>
