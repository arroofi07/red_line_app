<script lang="ts">
	const mitras = [
		{ name: 'Partner 1', logo: 'https://via.placeholder.com/200x80/000000/FFFFFF?text=PARTNER+1' },
		{ name: 'Partner 2', logo: 'https://via.placeholder.com/200x80/000000/FFFFFF?text=PARTNER+2' },
		{ name: 'Partner 3', logo: 'https://via.placeholder.com/200x80/000000/FFFFFF?text=PARTNER+3' },
		{ name: 'Partner 4', logo: 'https://via.placeholder.com/200x80/000000/FFFFFF?text=PARTNER+4' },
		{ name: 'Partner 5', logo: 'https://via.placeholder.com/200x80/000000/FFFFFF?text=PARTNER+5' },
		{ name: 'Partner 6', logo: 'https://via.placeholder.com/200x80/000000/FFFFFF?text=PARTNER+6' }
	];
</script>

<section class="py-16 border-y border-white/5 bg-white/2 dark:bg-black/10">
	<div class="container mx-auto px-4">
		<p class="mb-10 text-center text-sm font-bold tracking-widest text-muted-foreground uppercase">
			Trusted by Industry Leaders
		</p>
		
		<div class="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale transition-all hover:grayscale-0 hover:opacity-100">
			{#each mitras as mitra}
				<div class="flex h-12 w-32 items-center justify-center">
					<span class="text-xl font-bold tracking-tighter opacity-70">{mitra.name}</span>
				</div>
			{/each}
		</div>
	</div>
</section>
