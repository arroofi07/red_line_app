<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { Button } from '$lib/components/ui/button';
	import ExternalLink from 'lucide-svelte/icons/external-link';

	const projects = [
		{
			title: 'Aura Summit 2024',
			category: 'Corporate Conference',
			image: 'https://images.unsplash.com/photo-1540575861501-7ad060e39fe5?auto=format&fit=crop&w=800&q=80',
			year: '2024'
		},
		{
			title: 'Red Line LIVE',
			category: 'Music Festival',
			image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
			year: '2023'
		},
		{
			title: 'Global Tech Expo',
			category: 'Exhibition',
			image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80',
			year: '2023'
		}
	];
</script>

<section id="projects" class="py-24 sm:py-32">
	<div class="container mx-auto px-4">
		<div class="flex flex-col items-end justify-between gap-6 md:flex-row mb-16">
			<div class="max-w-xl">
				<h2 class="text-sm font-bold tracking-widest text-primary uppercase">Recent Work</h2>
				<p class="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
					Bringing <span class="text-primary">Visions</span> To Life
				</p>
			</div>
			<Button variant="outline" class="group rounded-full border-primary/20 hover:border-primary/50">
				See All Projects
				<ExternalLink class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
			</Button>
		</div>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each projects as project}
				<div class="group cursor-pointer">
					<div class="relative aspect-video overflow-hidden rounded-3xl bg-muted">
						<img
							src={project.image}
							alt={project.title}
							class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
						/>
						<div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80"></div>
						
						<div class="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
							<span class="text-xs font-bold text-primary uppercase tracking-widest">{project.category}</span>
							<h3 class="mt-2 text-2xl font-bold text-white">{project.title}</h3>
						</div>
						
						<div class="absolute top-6 right-6 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
							{project.year}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
