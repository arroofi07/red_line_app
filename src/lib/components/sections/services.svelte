<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { cn } from '$lib/utils';
	import CalendarCheck from 'lucide-svelte/icons/calendar-check';
	import Clapperboard from 'lucide-svelte/icons/clapperboard';
	import Package from 'lucide-svelte/icons/package';
	import Zap from 'lucide-svelte/icons/zap';
	import Mic from 'lucide-svelte/icons/mic';
	import Megaphone from 'lucide-svelte/icons/megaphone';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import { Button } from '$lib/components/ui/button';

	const services = [
		{
			title: 'Event Organizer',
			description: 'Jasa event organizer dengan pengalaman lebih dari 12 tahun.',
			icon: CalendarCheck,
			color: 'bg-rose-600 text-white'
		},
		{
			title: 'Event Production',
			description: 'Divisi produksi event dari redline communication,',
			icon: Clapperboard,
			color: 'bg-rose-600 text-white'
		},
		{
			title: 'Equipment Rental',
			description: 'Kami juga menyediakan rental alat dan perlengkuntuk keperluan event anda.',
			icon: Package,
			color: 'bg-rose-600 text-white'
		},
		{
			title: 'Brand Activation',
			description: 'Ayo jangkau target konsumen anda, dengan program aktvasi dari kami.',
			icon: Zap,
			color: 'bg-rose-600 text-white'
		},
		{
			title: 'Show Management',
			description: 'Sit back and relax, anda hanya perlu menikmati pertunjukan yang kami sediakan.',
			icon: Mic,
			color: 'bg-rose-600 text-white'
		},
		{
			title: 'Advertising',
			description:
				'Biarkan kami meningkatkan upaya periklanan Anda dan melihat bisnis Anda berkembang.',
			icon: Megaphone,
			color: 'bg-rose-600 text-white'
		}
	];
</script>

<section id="services" class="relative py-24 sm:py-32">
	<div class="container mx-auto px-4">
		<div class="mb-16 text-center">
			<p class="pb-4 text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
				How Can We Help You?
			</p>
			<h2 class="text-base font-semibold tracking-widest text-black">
				Selain sebagai EO Padang, Redline menyediakan jasa untuk produksi event<br />
				anda, mulai dari skala kecil hingga besar.
			</h2>
		</div>

		<div class="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
			{#each services as service, i}
				<div
					class="group relative overflow-hidden rounded-3xl border border-rose-700 bg-white/5 p-4 transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 sm:p-8 dark:border-white/5 dark:bg-black/20 dark:hover:bg-black/40"
					style="box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);"
				>
					<!-- Icon Background Glow -->
					<div
						class={cn(
							'absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20',
							service.color.split(' ')[0]
						)}
					></div>

					<div class={cn('mb-4 inline-flex rounded-2xl p-3 sm:mb-6 sm:p-4', service.color)}>
						<service.icon class="h-6 w-6 sm:h-8 sm:w-8" />
					</div>

					<h3 class="mb-2 text-lg font-bold sm:mb-3 sm:text-2xl">{service.title}</h3>
					<p class="text-xs leading-relaxed text-muted-foreground sm:text-base">
						{service.description}
					</p>
				</div>
			{/each}
		</div>
		<div class="mt-12 flex justify-center">
			<Button
				variant="outline"
				class="group gap-2 rounded-full border-white bg-primary px-8 py-6 text-lg font-bold transition-all duration-300 text-white hover:text-black "
				style="box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);"
			>
				More Services
			</Button>
		</div>
	</div>
</section>

<style>
	/* Subtle pattern for section depth */
	#services::before {
		content: '';
		position: absolute;
		inset: 0;
		background-image: radial-gradient(circle at 2px 2px, var(--primary) 1px, transparent 0);
		background-size: 40px 40px;
		opacity: 0.05;
		pointer-events: none;
	}
</style>
