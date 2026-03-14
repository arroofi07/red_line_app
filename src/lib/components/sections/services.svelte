<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { cn } from '$lib/utils';
	import Camera from 'lucide-svelte/icons/camera';
	import Video from 'lucide-svelte/icons/video';
	import Mic from 'lucide-svelte/icons/mic';
	import Megaphone from 'lucide-svelte/icons/megaphone';
	import Monitor from 'lucide-svelte/icons/monitor';
	import PenTool from 'lucide-svelte/icons/pen-tool';

	const services = [
		{
			title: 'Event Production',
			description: 'End-to-end management for premium corporate events and conferences.',
			icon: Video,
			color: 'bg-red-500/10 text-red-500'
		},
		{
			title: 'Broadcasting',
			description: 'High-quality live streaming and broadcast solutions for any scale.',
			icon: Camera,
			color: 'bg-blue-500/10 text-blue-500'
		},
		{
			title: 'Creative Studio',
			description: 'Stunning visual content and branding that tells your unique story.',
			icon: PenTool,
			color: 'bg-purple-500/10 text-purple-500'
		},
		{
			title: 'Audio Systems',
			description: 'Professional sound engineering for crystal clear communication.',
			icon: Mic,
			color: 'bg-orange-500/10 text-orange-500'
		},
		{
			title: 'Digital Marketing',
			description: 'Strategic campaigns that amplify your message across all channels.',
			icon: Megaphone,
			color: 'bg-green-500/10 text-green-500'
		},
		{
			title: 'Visual Display',
			description: 'Interactive LED and projection systems for immersive experiences.',
			icon: Monitor,
			color: 'bg-cyan-500/10 text-cyan-500'
		}
	];
</script>

<section id="services" class="relative py-24 sm:py-32">
	<div class="container mx-auto px-4">
		<div class="mb-16 text-center">
			<h2 class="text-sm font-bold tracking-widest text-primary uppercase">Our Expertise</h2>
			<p class="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
				Comprehensive Solutions for <br class="hidden sm:block" />
				<span class="text-primary">Impactful</span> Communication
			</p>
		</div>

		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each services as service, i}
				<div
					class="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 dark:border-white/5 dark:bg-black/20 dark:hover:bg-black/40"
				>
					<!-- Icon Background Glow -->
					<div
						class={cn(
							'absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20',
							service.color.split(' ')[0]
						)}
					></div>

					<div class={cn('mb-6 inline-flex rounded-2xl p-4', service.color)}>
						<service.icon class="h-8 w-8" />
					</div>

					<h3 class="mb-3 text-2xl font-bold">{service.title}</h3>
					<p class="text-muted-foreground leading-relaxed">
						{service.description}
					</p>

					<div class="mt-6 flex items-center text-sm font-semibold text-primary transition-all group-hover:gap-2">
						Learn More 
						<span class="opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">→</span>
					</div>
				</div>
			{/each}
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
