<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';
	import heroIllustration from '$lib/assets/hero_illustration.png';

	let visible = $state(false);

	onMount(() => {
		visible = true;
	});
</script>

<section class="relative flex min-h-[90vh] items-center overflow-hidden pt-28 pb-16 md:pt-32">
	<!-- Dynamic Background -->
	<div class="absolute inset-0 -z-10 bg-background">
		<div
			class="absolute top-[-10%] left-[-10%] h-[60%] w-[60%] rounded-full bg-primary/10 blur-[120px]"
		></div>
		<div
			class="absolute right-[-10%] bottom-[-10%] h-[50%] w-[50%] rounded-full bg-primary/5 blur-[120px]"
		></div>
		<div
			class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"
		></div>
	</div>

	<div class="relative z-10 container mx-auto px-6 md:px-12">
		<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
			<!-- Left Content -->
			<div class="text-left">
				{#if visible}
					<div in:fly={{ x: -30, duration: 1000, delay: 200 }}>
						<h1 class="text-5xl leading-none font-extrabold tracking-tight sm:text-7xl lg:text-5xl">
							EVENT ORGANIZER<br />
							<span class="text-primary italic">& STRATEGIC</span>
							<span class="relative">
								COMMUNICATION
								<svg
									class="absolute -bottom-2 left-0 h-3 w-full text-primary/30"
									viewBox="0 0 100 10"
								>
									<path
										d="M0,5 Q25,0 50,5 T100,5"
										fill="none"
										stroke="currentColor"
										stroke-width="4"
									/>
								</svg>
							</span>
						</h1>
					</div>

					<div in:fly={{ x: -20, duration: 800, delay: 400 }} class="mt-8">
						<p class="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-lg">
							Redline Communication (EO Padang) – one stop solution untuk semua kebutuhan event anda.
							Dari <span class="text-primary">event organizer, event management, product launching, event production, rental event equipment, MICE (meeting,exhibition,conference,exhibition ) dll.</span> <br>
              Berpusat di kota Padang tetapi kami dapat juga membantu anda melaksanakan event di kota–kota
							lain seperti <span class="text-primary">pekanbaru, jambi, medan, lampung, palembang, surabaya, jogja maupun jakarta.</span>
						</p>
					</div>

					<div
						in:fly={{ x: -20, duration: 800, delay: 600 }}
						class="mt-12 flex flex-col items-start gap-4 sm:flex-row"
					>
						<Button
							size="lg"
							class="h-14 rounded-full px-8 text-lg font-semibold shadow-lg shadow-primary/20 transition-all hover:scale-105"
						>
							Explore Our Services
						</Button>
						<Button
							variant="outline"
							size="lg"
							class="h-14 rounded-full px-8 text-lg font-semibold backdrop-blur-sm transition-all hover:bg-primary/5"
						>
							View Our Work
						</Button>
					</div>
				{/if}
			</div>

			<!-- Right Illustration -->
			<div class="relative hidden lg:block">
				{#if visible}
					<div in:fade={{ duration: 1500, delay: 400 }} class="relative">
						<!-- Glow behind image -->
						<div
							class="absolute inset-0 scale-75 animate-pulse rounded-full bg-primary/20 blur-[100px]"
						></div>

						<img
							src={heroIllustration}
							alt="Creative Production Illustration"
							class="animate-float relative z-10 w-full max-w-2xl transform transition-all duration-1000 hover:scale-105 hover:rotate-1"
						/>

						<!-- Extra floating elements for depth -->
						<div
							class="animate-bounce-slow absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/20 blur-2xl"
						></div>
						<div
							class="animate-pulse-slow absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
						></div>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- Bottom Gradient Fade -->
	<div class="absolute bottom-0 h-32 w-full bg-linear-to-t from-background to-transparent"></div>
</section>

<style>
	@keyframes float {
		0% {
			transform: translateY(0px) rotate(0deg);
		}
		50% {
			transform: translateY(-20px) rotate(2deg);
		}
		100% {
			transform: translateY(0px) rotate(0deg);
		}
	}

	@keyframes bounce-slow {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-30px);
		}
	}

	@keyframes pulse-slow {
		0%,
		100% {
			opacity: 0.3;
			transform: scale(1);
		}
		50% {
			opacity: 0.6;
			transform: scale(1.1);
		}
	}

	.animate-float {
		animation: float 6s ease-in-out infinite;
	}

	.animate-bounce-slow {
		animation: bounce-slow 8s ease-in-out infinite;
	}

	.animate-pulse-slow {
		animation: pulse-slow 10s ease-in-out infinite;
	}

	h1 {
		line-height: 1.1;
	}
</style>
