<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { cn } from '$lib/utils';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';
	import MenuIcon from 'lucide-svelte/icons/menu';
	import Instagram from 'lucide-svelte/icons/instagram';
	import Facebook from 'lucide-svelte/icons/facebook';
	import Youtube from 'lucide-svelte/icons/youtube';
	import logoNav from '$lib/assets/logo/logo redline asset 28@300x.png';

	let isScrolled = $state(false);
	let isMobileMenuOpen = $state(false);

	const navLinks = [
		{ name: 'Home', href: '/', id: 'home' },
		{ name: 'About', href: '#about', id: 'about' },
		{ name: 'Production', href: '#production', id: 'production' },
		{ name: 'Event', href: '#event', id: 'event' },
		{ name: 'Services', href: '#services', id: 'services' },
		{ name: 'Contact', href: '#contact', id: 'contact' },
		{ name: 'Blogs', href: '#blogs', id: 'blogs' }
	];

	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 20;
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function closeMobileMenu() {
		isMobileMenuOpen = false;
	}
</script>

<!-- Top Bar -->
<div class="fixed top-0 z-60 w-full border-b border-white/5 bg-black/60 py-2 backdrop-blur-md">
	<div class="container mx-auto flex items-center justify-between px-4 md:px-6">
		<div class="text-[10px] font-bold tracking-wider text-primary sm:text-xs md:text-sm">
			BIKIN EVENT <span class="text-white">#diRedlineAja</span>
		</div>
		<div class="flex items-center gap-3 text-white/40 sm:gap-4 md:gap-6">
			<a href="https://instagram.com" class="group flex items-center gap-2 transition-colors hover:text-primary">
				<Instagram class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
				<span class="hidden text-[10px] font-bold uppercase tracking-widest md:block">Instagram</span>
			</a>
			<a href="https://facebook.com" class="group flex items-center gap-2 transition-colors hover:text-primary">
				<Facebook class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
				<span class="hidden text-[10px] font-bold uppercase tracking-widest md:block">Facebook</span>
			</a>
			<a href="https://youtube.com" class="group flex items-center gap-2 transition-colors hover:text-primary">
				<Youtube class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
				<span class="hidden text-[10px] font-bold uppercase tracking-widest md:block">YouTube</span>
			</a>
		</div>
	</div>
</div>

<header
	class={cn('fixed top-8 sm:top-10 z-50 w-full transition-all duration-500', isScrolled ? 'py-1.5 sm:py-2' : 'py-3 sm:py-4')}
>
	<div class="container mx-auto px-3 sm:px-4 md:px-6">
		<nav
			class={cn(
				'relative flex items-center justify-between rounded-full border border-white/10 bg-black/40 px-4 py-1.5 sm:px-6 sm:py-2 shadow-2xl backdrop-blur-xl transition-all duration-500',
				isScrolled && 'border-primary/20 bg-black/60 shadow-primary/5'
			)}
		>
			<!-- Logo Left -->
			<a href="/" class="flex items-center gap-2 transition-all duration-300 hover:scale-105">
				<img
					src={logoNav}
					alt="Red Line Logo"
					class="h-7 w-auto object-contain sm:h-8 md:h-9"
				/>
			</a>

			<!-- Nav Links Center (Desktop) -->
			<ul class="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
				{#each navLinks as link}
					<li>
						<a
							href={link.href}
							class="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-foreground/50 transition-all hover:text-primary"
						>
							{link.name}
						</a>
					</li>
				{/each}
			</ul>

			<!-- Actions Right -->
			<div class="flex items-center gap-4">
				<div class="hidden lg:block">
					<Button
						href="#contact"
						variant="default"
						class="group relative overflow-hidden rounded-full bg-primary px-6 py-4 shadow-[0_0_15px_rgba(220,38,38,0.2)] transition-all hover:scale-105 hover:bg-primary/90"
					>
						<span class="relative z-10 flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-widest">
							Contact Us
						</span>
					</Button>
				</div>

				<!-- Mobile Menu Toggle -->
				<div class="flex items-center lg:hidden">
					<Sheet.Root bind:open={isMobileMenuOpen}>
						<Sheet.Trigger asChild>
							{#snippet children({ props } = { props: {} } as any)}
								<Button
									variant="ghost"
									size="icon"
									{...props}
									class="rounded-full text-foreground hover:bg-primary/10"
								>
									<MenuIcon class="h-6 w-6" />
									<span class="sr-only">Toggle Menu</span>
								</Button>
							{/snippet}
						</Sheet.Trigger>
						<Sheet.Content
							side="right"
							class="w-full border-l border-white/10 bg-black/98 p-0 backdrop-blur-2xl md:w-[400px]"
						>
							<div class="flex h-full flex-col gap-6 sm:gap-8 px-6 py-8 sm:px-8 sm:py-12 overflow-y-auto">
								<div class="flex items-center justify-between shrink-0">
									<img src={logoNav} alt="Red Line Logo" class="h-8 sm:h-10 w-auto" />
									<Sheet.Close class="text-white/40 hover:text-white">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
									</Sheet.Close>
								</div>

								<div class="mt-4 sm:mt-8 flex flex-col gap-2 shrink-0">
									<div class="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Menu</div>
									<nav class="flex flex-col gap-0.5 sm:gap-1">
										{#each navLinks as link}
											<a
												href={link.href}
												onclick={closeMobileMenu}
												class="group flex items-center justify-between py-3 sm:py-4 text-xl sm:text-2xl font-bold text-white/60 transition-all hover:text-white"
											>
												{link.name}
												<span class="h-px w-0 bg-primary transition-all group-hover:w-8"></span>
											</a>
										{/each}
									</nav>
								</div>

								<div class="mt-auto flex flex-col gap-5 sm:gap-6 pb-4 sm:pb-8 shrink-0">
									<div class="h-px w-full bg-white/10"></div>
									<div class="flex items-center justify-between">
										<div class="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/40 max-w-[100px] leading-relaxed sm:max-w-none">Ready to start?</div>
										<Button
											href="#contact"
											onclick={closeMobileMenu}
											class="rounded-full bg-primary px-6 py-5 sm:px-8 sm:py-6 text-xs sm:text-sm font-bold shadow-lg shadow-primary/20 whitespace-nowrap"
										>
											Contact Us
										</Button>
									</div>
								</div>
							</div>
						</Sheet.Content>
					</Sheet.Root>
				</div>
			</div>
		</nav>
	</div>
</header>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
