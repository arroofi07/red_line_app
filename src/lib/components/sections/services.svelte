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
			<div class="flex flex-col items-center gap-4 text-center">
				{#if mounted}
					<h2
						in:fly={{ y: 20, duration: 1000 }}
						class="font-display text-4xl leading-tight tracking-tight text-white uppercase md:text-6xl"
					>
						How Can We <span class="text-primary">Help You?</span>
					</h2>
					<p
						in:fly={{ y: 20, duration: 1000, delay: 200 }}
						class="max-w-2xl text-lg text-foreground/70"
					>
						Selain sebagai EO Padang, Redline menyediakan jasa untuk produksi event anda, mulai dari
						skala kecil hingga besar
					</p>
				{/if}
			</div>

			<!-- Features Grid -->				
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each features as feature, i}
					{#if mounted}
						<div
							in:fade={{ duration: 1000, delay: i * 200 }}
							class="group relative flex flex-col items-center rounded-[40px] border border-white/5 bg-black/40 p-8 text-center backdrop-blur-xl transition-all duration-500 hover:border-primary/30 hover:bg-primary/5"
						>
							<!-- Icon Container (Hexagonal) -->
							<div class="relative mb-6 flex h-20 w-20 items-center justify-center">
								<div
									class="absolute inset-0 bg-primary/20 opacity-0 blur-xl transition-opacity group-hover:opacity-100"
								></div>
								<div
									class="relative z-10 flex h-16 w-16 rotate-12 transform items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20 transition-transform group-hover:rotate-0"
								>
									<feature.icon
										class="h-8 w-8 -rotate-12 transition-transform group-hover:rotate-0"
									/>
								</div>
							</div>

							<h3 class="mb-4 font-display text-2xl text-white">{feature.title}</h3>
							<p class="text-sm leading-relaxed text-foreground/70">
								{feature.description}
							</p>
						</div>
					{/if}
				{/each}

				<div
					class="col-span-full flex items-center justify-center"
					in:fade={{ duration: 1000, delay: 600 }}
				>
					<button
						class="cursor-pointer rounded-3xl bg-primary px-4 py-4 text-xs font-bold whitespace-nowrap shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-primary/80 sm:px-8 sm:py-4 sm:text-sm"
					>
						More Details
					</button>
				</div>
			</div>
		</div>
	</div>
</section>
