<script lang="ts">
	import { onMount } from 'svelte';
	import logo from '$lib/assets/logo/logo redline asset 28@300x.png';
	import Facebook from 'lucide-svelte/icons/facebook';
	import Instagram from 'lucide-svelte/icons/instagram';
	import Youtube from 'lucide-svelte/icons/youtube';
	import Phone from 'lucide-svelte/icons/phone';

	let year = new Date().getFullYear();

	const footerLinks = [
		{
			title: 'Our Events',
			links: [
				{ name: 'Corporate Events', href: '#' },
				{ name: 'Virtual', href: '#' },
				{ name: 'Celebration', href: '#' },
				{ name: 'Wedding', href: '#' },
				{ name: 'Party', href: '#' }
			]
		},
		{
			title: 'Company',
			links: [
				{ name: 'Our Team', href: '#' },
				{ name: 'about us', href: '#' },
				{ name: 'Contact Us', href: '#' },
				{ name: 'Careers', href: '#' }
			]
		},
		{
			title: 'Connect',
			links: [
				{ name: 'irfanredline115@gmail.com', href: 'mailto:irfanredline115@gmail.com' },
				{ name: '0811-663-528', href: 'tel:0811663528' }
			]
		}
	];
</script>

<footer class="relative bg-background pt-24 pb-12 overflow-hidden">
	<!-- Top Border Glow -->
	<div class="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent"></div>

	<div class="container mx-auto px-4 md:px-6">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
			<!-- Logo and Info -->
			<div class="flex flex-col gap-6">
				<img src={logo} alt="Redline Logo" class="h-10 w-auto object-contain flex-start" style="width: fit-content; margin-left: -0.5rem;" />
				<p class="text-foreground/40 text-sm leading-relaxed max-w-xs">
					One Stop Solution untuk semua kebutuhan event & strategic communication Anda. Menciptakan pengalaman yang tak terlupakan.
				</p>
				<div class="flex gap-4">
					<a href="javascript:void(0)" class="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-foreground/60 transition-all hover:bg-primary hover:text-white">
						<Instagram class="h-5 w-5" />
					</a>
					<a href="javascript:void(0)" class="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-foreground/60 transition-all hover:bg-primary hover:text-white">
						<Facebook class="h-5 w-5" />
					</a>
					<a href="javascript:void(0)" class="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-foreground/60 transition-all hover:bg-primary hover:text-white">
						<Youtube class="h-5 w-5" />
					</a>
					<a href="javascript:void(0)" class="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-foreground/60 transition-all hover:bg-primary hover:text-white">
						<Phone class="h-5 w-5" />
					</a>
				</div>
			</div>

			<!-- Dynamic Columns -->
			{#each footerLinks as column}
				<div class="flex flex-col gap-6">
					<h4 class="font-display text-xl text-white tracking-wider uppercase">{column.title}</h4>
					<ul class="flex flex-col gap-3">
						{#each column.links as link}
							<li>
								<a href={link.href === '#' ? 'javascript:void(0)' : link.href} class="text-sm text-foreground/40 hover:text-primary transition-colors">
									{link.name}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<!-- Bottom Bar -->
		<div class="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
			<p class="text-xs text-foreground/20">
				© {year} All Rights Reserved
			</p>
			<div class="flex items-center gap-2">
				<div class="h-1 w-1 rounded-full bg-primary shadow-[0_0_5px_rgba(220,38,38,1)]"></div>
				<span class="text-xs font-bold uppercase tracking-widest text-foreground/40">Redline Communication</span>
			</div>
		</div>
	</div>
</footer>
