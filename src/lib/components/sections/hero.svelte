<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';

	let visible = $state(false);

	onMount(() => {
		visible = true;
	});
</script>

<section class="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
	<!-- Dynamic Background -->
	<div class="absolute inset-0 -z-10 bg-background">
		<div
			class="absolute top-[-10%] left-[-10%] h-[50%] w-[50%] rounded-full bg-primary/10 blur-[120px]"
		></div>
		<div
			class="absolute bottom-[-10%] right-[-10%] h-[50%] w-[50%] rounded-full bg-primary/5 blur-[120px]"
		></div>
		<div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
	</div>

	<div class="container relative z-10 px-4 text-center">
		{#if visible}
			<div in:fly={{ y: 30, duration: 1000, delay: 200 }}>
				<h1 class="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl md:text-8xl">
					Connecting <span class="text-primary italic">Every</span>
					<span class="relative">
						Line
						<svg class="absolute -bottom-2 left-0 h-3 w-full text-primary/30" viewBox="0 0 100 10">
							<path d="M0,5 Q25,0 50,5 T100,5" fill="none" stroke="currentColor" stroke-width="4" />
						</svg>
					</span>
				</h1>
			</div>

			<div in:fly={{ y: 20, duration: 800, delay: 400 }} class="mt-8">
				<p class="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
					Premium production and event services tailored for your unique vision. We bring 
					unmatched quality and creativity to every communication line.
				</p>
			</div>

			<div
				in:fly={{ y: 20, duration: 800, delay: 600 }}
				class="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
			>
				<Button size="lg" class="h-14 rounded-full px-8 text-lg font-semibold shadow-lg shadow-primary/20 transition-all hover:scale-105">
					Explore Our Services
				</Button>
				<Button variant="outline" size="lg" class="h-14 rounded-full px-8 text-lg font-semibold backdrop-blur-sm transition-all hover:bg-primary/5">
					View Our Work
				</Button>
			</div>
		{/if}
	</div>
	
	<!-- Bottom Gradient Fade -->
	<div class="absolute bottom-0 h-32 w-full bg-linear-to-t from-background to-transparent"></div>
</section>

<style>
	h1 {
		line-height: 1.1;
	}
</style>