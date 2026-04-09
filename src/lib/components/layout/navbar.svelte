<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';
	import MenuIcon from 'lucide-svelte/icons/menu';
	import Facebook from 'lucide-svelte/icons/facebook';
	import Instagram from 'lucide-svelte/icons/instagram';
	import Youtube from 'lucide-svelte/icons/youtube';
	import logoNav from '$lib/assets/logo/logo1.png';

	let isScrolled = $state(false);
	let isMobileMenuOpen = $state(false);

	const navLinks = [
		{ name: 'Home', href: '/', id: 'home' },
		{ name: 'About', href: '/about-redline-communication', id: 'about' },
		{ name: 'Production', href: '/production-redline', id: 'production' },
		{ name: 'Event', href: '/projects-redline', id: 'event' },
		{ name: 'Services', href: '/services-redline', id: 'services' },
		{ name: 'Contact', href: '/contact-redline', id: 'contact' },
		{ name: 'Blogs', href: '/blogs', id: 'blogs' }
	];

	const socialLinks = [
		{ name: 'Instagram', href: 'https://instagram.com/redline_communication', icon: Instagram },
		{ name: 'Facebook', href: 'https://facebook.com/redline_communication', icon: Facebook },
		{ name: 'YouTube', href: 'https://youtube.com/redline_communication', icon: Youtube }
	];

	// Determine active link based on current pathname
	function isActive(href: string, pathname: string): boolean {
		if (href === '/') return pathname === '/';
		return pathname.startsWith(href);
	}

	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 20;
		};
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	function closeMobileMenu() {
		isMobileMenuOpen = false;
	}
</script>

<header
	class={cn(
		'fixed top-0 z-40 w-full transition-all duration-500 ease-in-out',
		isScrolled ? 'px-2 py-2 sm:px-4 md:px-6' : 'px-0 py-0 md:px-6 md:pt-4'
	)}
>
	<div class="container mx-auto">
		<!-- Top Bar -->
		<div
			class={cn(
				'hidden items-center justify-between gap-6 overflow-hidden px-6 py-2 transition-all duration-500 md:flex',
				isScrolled ? 'h-0 py-0 opacity-0' : 'h-10 opacity-100'
			)}
		>
			<div class="flex items-center gap-4">
				<a
					href="#contact"
					class="text-xs font-bold tracking-wider text-primary transition-colors hover:text-primary/80"
				>
					<span class="uppercase"> Bikin Event </span> #diRedlineAja
				</a>
			</div>
			<div class="flex items-center gap-6">
				{#each socialLinks as social}
					<a
						href={social.href}
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-1.5 text-xs font-semibold text-foreground/50 transition-colors hover:text-primary"
						aria-label={social.name}
					>
						<social.icon class="h-3.5 w-3.5" />
						<span class="hidden sm:inline">{social.name}</span>
					</a>
				{/each}
			</div>
		</div>

		<div
			class={cn(
				'transition-all duration-500 ease-in-out w-full',
				isScrolled
					? 'mx-auto max-w-4xl rounded-full border border-primary/20 bg-background/80 px-4 py-2 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-black/80 md:px-6 md:py-3'
					: 'mx-auto max-w-7xl border-b border-white/10 bg-background/40 px-4 py-3 backdrop-blur-md dark:bg-black/40 sm:rounded-b-3xl md:rounded-3xl md:border md:px-8 md:py-4'
			)}
		>
			<nav class="flex items-center justify-between">
				<!-- Logo -->
				<a href="/" class="z-50 flex items-center outline-hidden">
					<img
						src={logoNav}
						alt="Red Line Logo"
						class={cn(
							'h-9 w-auto object-contain transition-all duration-500 hover:scale-105 hover:brightness-110 sm:h-10 md:h-12',
							isScrolled && 'h-8 sm:h-9 md:h-10'
						)}
					/>
				</a>

				<!-- Desktop Navigation -->
				<ul class="hidden items-center gap-1 lg:flex">
					{#each navLinks as link}
						<li>
							<a
								href={link.href}
								class={cn(
									'relative px-4 py-2 text-sm font-medium transition-all duration-300 focus-visible:outline-hidden',
									isActive(link.href, $page.url.pathname)
										? 'text-primary'
										: 'text-foreground/70 hover:text-primary'
								)}
							>
								{link.name}
								{#if isActive(link.href, $page.url.pathname)}
									<span
										class="absolute inset-x-4 -bottom-1 h-1 rounded-full bg-primary shadow-[0_0_10px_rgba(220,38,38,0.5)]"
										in:fade={{ duration: 200 }}
									></span>
								{/if}
							</a>
						</li>
					{/each}
				</ul>

				<!-- Desktop Action -->
				<div class="hidden items-center lg:flex">
					<Button
						href="#contact"
						variant="default"
						class={cn(
							'rounded-full px-6 shadow-md transition-all hover:scale-105 hover:shadow-primary/20 active:scale-95',
							isScrolled && 'h-9 text-xs'
						)}
					>
						Contact Us
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
									class="relative z-50 rounded-full hover:bg-primary/10"
								>
									<MenuIcon class="h-6 w-6" />
									<span class="sr-only">Toggle Menu</span>
								</Button>
							{/snippet}
						</Sheet.Trigger>
						<Sheet.Content
							side="right"
							class="w-[85vw] max-w-[350px] border-l border-border/20 bg-background/95 p-0 backdrop-blur-xl sm:w-[350px]"
						>
							<div class="flex h-full flex-col gap-6 px-6 py-12">
								<!-- Socials at Top for Mobile -->
								<div class="flex items-center justify-center gap-6 border-b border-border/10 pb-6">
									{#each socialLinks as social}
										<a
											href={social.href}
											target="_blank"
											rel="noopener noreferrer"
											class="text-foreground/60 transition-colors hover:text-primary"
											aria-label={social.name}
										>
											<social.icon class="h-6 w-6" />
										</a>
									{/each}
								</div>

								<div class="flex items-center justify-center py-4">
									<img src={logoNav} alt="Red Line Logo" class="h-14 w-auto drop-shadow-sm" />
								</div>

								<div class="text-center">
									<a
										href="#contact"
										onclick={closeMobileMenu}
										class="text-sm font-bold tracking-widest text-primary uppercase"
									>
										Bikin Event #diRedlineAja
									</a>
								</div>

								<div class="px-2">
									<nav class="flex flex-col gap-2">
										{#each navLinks as link}
											<a
												href={link.href}
												onclick={closeMobileMenu}
												class={cn(
													'flex items-center rounded-lg px-4 py-3 text-lg font-medium transition-all duration-200',
													isActive(link.href, $page.url.pathname)
														? 'bg-primary/10 text-primary'
														: 'text-foreground/70 hover:bg-muted hover:text-foreground'
												)}
											>
												{link.name}
											</a>
										{/each}
									</nav>
								</div>

								<div class="mt-auto px-2 pb-8">
									<Button
										href="#contact"
										onclick={closeMobileMenu}
										class="w-full rounded-2xl py-6 text-lg font-bold shadow-lg shadow-primary/20"
									>
										Contact Us
									</Button>
								</div>
							</div>
						</Sheet.Content>
					</Sheet.Root>
				</div>
			</nav>
		</div>
	</div>
</header>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}

	/* Simple custom focus ring */
	:global(:focus-visible) {
		outline: 2px solid var(--primary);
		outline-offset: 2px;
	}
</style>
