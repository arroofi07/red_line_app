<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import CalendarCheck from 'lucide-svelte/icons/calendar-check';
	import Clapperboard from 'lucide-svelte/icons/clapperboard';
	import Package from 'lucide-svelte/icons/package';
	import Zap from 'lucide-svelte/icons/zap';
	import Mic from 'lucide-svelte/icons/mic';
	import Megaphone from 'lucide-svelte/icons/megaphone';

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});

	const features = [
		{
			title: 'Event Organizer',
			description: 'Jasa event organizer dengan pengalaman lebih dari 12 years.',
			icon: CalendarCheck
		},
		{
			title: 'Event Production',
			description: 'Divisi produksi event dari redline communication.',
			icon: Clapperboard
		},
		{
			title: 'Equipment Rental',
			description: 'Kami juga menyediakan rental alat dan perlengkapan untuk keperluan event anda.',
			icon: Package
		},
		{
			title: 'Brand Activation',
			description: 'Ayo jangkau target konsumen anda, dengan program aktivasi dari kami.',
			icon: Zap
		},
		{
			title: 'Show Management',
			description: 'Sit back and relax, anda hanya perlu menikmati pertunjukan yang kami sediakan.',
			icon: Mic
		},
		{
			title: 'Advertising',
			description:
				'Biarkan kami meningkatkan upaya periklanan Anda dan melihat bisnis Anda berkembang.',
			icon: Megaphone
		}
	];
</script>

<section id="services" class="relative overflow-hidden py-24">
	<div class="container mx-auto px-4 md:px-6">
		<div class="flex flex-col gap-16">
			<!-- Header -->
			<div class="flex flex-col items-center text-center gap-4">
				{#if mounted}
					<h2 in:fly={{ y: 20, duration: 1000 }} class="font-display text-4xl leading-tight tracking-tight text-white md:text-6xl uppercase">
						Our <span class="text-primary">Services</span>
					</h2>
					<p in:fly={{ y: 20, duration: 1000, delay: 200 }} class="max-w-2xl text-lg text-foreground/60">
						One stop solution for all your event needs and strategic communication.
					</p>
				{/if}
			</div>

			<!-- Features Grid -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each features as feature, i}
					{#if mounted}
						<div in:fade={{ duration: 1000, delay: i * 200 }} class="group relative flex flex-col items-center text-center p-8 rounded-[40px] border border-white/5 bg-black/40 backdrop-blur-xl transition-all duration-500 hover:border-primary/30 hover:bg-primary/5">
							<!-- Icon Container (Hexagonal) -->
							<div class="relative mb-6 flex h-20 w-20 items-center justify-center">
								<div class="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
								<div class="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20 transform rotate-12 transition-transform group-hover:rotate-0">
									<feature.icon class="h-8 w-8 -rotate-12 transition-transform group-hover:rotate-0" />
								</div>
							</div>

							<h3 class="font-display text-2xl text-white mb-4">{feature.title}</h3>
							<p class="text-foreground/40 text-sm leading-relaxed">
								{feature.description}
							</p>
							
							<!-- Bottom Glow Line -->
							<div class="absolute bottom-10 w-12 h-1 bg-primary rounded-full opacity-30 group-hover:opacity-100 transition-opacity"></div>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</section>
