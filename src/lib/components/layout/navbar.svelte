<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { cn } from '$lib/utils';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import MenuIcon from 'lucide-svelte/icons/menu';
	import logoNav from '$lib/assets/logo_nav.png';

	let isScrolled = $state(false);
	let isMobileMenuOpen = $state(false);
	let activeSection = $state('home');

	const navLinks = [
		{ name: 'Home', href: '/', id: 'home' },
		{ name: 'About', href: 'about-redline-communication', id: 'about' },
		{ name: 'Production', href: 'production-redline', id: 'production' },
		{ name: 'Event', href: 'projects-redline', id: 'event' },
		{ name: 'Services', href: 'services-redline', id: 'services' },
		{ name: 'Contact', href: 'contact-redline', id: 'contact' },
		{ name: 'Blogs', href: 'blogs', id: 'blogs' }
	];

	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 20;
		};
		window.addEventListener('scroll', handleScroll);

		// Intersection Observer for active sections
		const observerOptions = {
			root: null,
			rootMargin: '-20% 0px -70% 0px',
			threshold: 0
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					activeSection = entry.target.id;
				}
			});
		}, observerOptions);

		// Observe sections, handle home separately if needed
		const observeSections = async () => {
			await tick();
			navLinks.forEach((link) => {
				if (link.id !== 'home') {
					const element = document.getElementById(link.id);
					if (element) observer.observe(element);
				}
			});
		};

		observeSections();

		return () => {
			window.removeEventListener('scroll', handleScroll);
			observer.disconnect();
		};
	});

	function closeMobileMenu() {
		isMobileMenuOpen = false;
	}
</script>

<header
	class={cn(
		'fixed top-0 z-40 w-full px-4 py-4 transition-all duration-500 ease-in-out md:px-6',
		isScrolled ? 'top-2' : 'top-0'
	)}
>
	<div
		class={cn(
			'container mx-auto transition-all duration-500 ease-in-out',
			isScrolled
				? 'max-w-5xl rounded-full border border-border/20 bg-background/60 px-6 py-2 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] backdrop-blur-xl'
				: 'max-w-7xl px-0 py-2'
		)}
	>
		<nav class="flex items-center justify-between">
			<!-- Logo -->
			<a href="/" class="z-50 flex items-center outline-hidden">
				<img
					src={logoNav}
					alt="Red Line Logo"
					class={cn(
						'h-10 w-auto object-contain transition-all duration-500 hover:scale-105 hover:brightness-110 md:h-12',
						isScrolled && 'h-8 md:h-10'
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
								activeSection === link.id ? 'text-primary' : 'text-foreground/70 hover:text-primary'
							)}
						>
							{link.name}
							{#if activeSection === link.id}
								<span
									layoutId="active-nav"
									class="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-primary"
									in:fade={{ duration: 200 }}
								></span>
							{/if}
						</a>
					</li>
				{/each}
			</ul>

			<!-- Desktop Action Button -->
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
						class="w-[300px] border-l border-border/20 bg-background/95 backdrop-blur-lg sm:w-[350px]"
					>
						<div class="flex h-full flex-col gap-8 px-2 py-10">
							<div class="flex items-center justify-center py-4">
								<img src={logoNav} alt="Red Line Logo" class="h-14 w-auto drop-shadow-sm" />
							</div>

							<div class="px-2">
								<nav class="flex flex-col gap-2">
									{#each navLinks as link}
										<a
											href={link.href}
											onclick={closeMobileMenu}
											class={cn(
												'flex items-center rounded-lg px-4 py-3 text-lg font-medium transition-all duration-200',
												activeSection === link.id
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
									class="w-full rounded-2xl py-6 text-lg shadow-lg shadow-primary/20"
								>
									Get Started
								</Button>
							</div>
						</div>
					</Sheet.Content>
				</Sheet.Root>
			</div>
		</nav>
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
