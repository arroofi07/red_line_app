<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import CalendarCheck from 'lucide-svelte/icons/calendar-check';
	import Clapperboard from 'lucide-svelte/icons/clapperboard';
	import Package from 'lucide-svelte/icons/package';
	import Zap from 'lucide-svelte/icons/zap';
	import Mic from 'lucide-svelte/icons/mic';
	import Megaphone from 'lucide-svelte/icons/megaphone';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import MessageCircle from 'lucide-svelte/icons/message-circle';

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});

	const services = [
		{
			id: 'eo',
			title: 'Event Organizer',
			subtitle: 'Professional Organizer',
			description: 'Jasa penyelenggara event yang telah berpengalaman selama lebih dari 12 tahun. Kami telah sukses menyelenggarakan berbagai jenis event, dan selanjutnya adalah event anda!',
			longDescription: 'Dari konsep hingga eksekusi, kami mengelola setiap aspek acara Anda untuk memastikan hasil yang mulus dan tak terlupakan.',
			icon: CalendarCheck,
			image: 'https://redlinecomunication.com/wp-content/uploads/2024/04/299508498_144728874564258_7146119662636100457_n-1-1024x768.png',
			accent: 'from-blue-500/20 to-primary/20'
		},
		{
			id: 'production',
			title: 'Event Production',
			subtitle: 'Idea Reality',
			description: 'Divisi produksi event dari Redline Communication. Redline Production hadir sebagai jawaban untuk merubah ide anda menjadi nyata.',
			longDescription: 'Kami menyediakan dukungan teknis dan panggung yang solid untuk mewujudkan visi kreatif Anda menjadi pertunjukan spektakuler.',
			icon: Clapperboard,
			accent: 'from-primary/20 to-orange-500/20'
		},
		{
			id: 'rental',
			title: 'Equipment Rental',
			subtitle: 'Small to Large Scale',
			description: 'Kami juga menyediakan jasa sewa alat/perlengkapan event anda, skala kecil ataupun besar kami siap menyediakannya.',
			longDescription: 'Mulai dari sound system, lighting, LED screen, hingga rigging panggung dengan kualitas standar industri.',
			icon: Package,
			accent: 'from-orange-500/20 to-yellow-500/20'
		},
		{
			id: 'creative',
			title: 'Creative Agency',
			subtitle: 'Branding & Activation',
			description: 'Divisi kreatif dari Redline Communication, untuk jawaban segala kebutuhan kreatif anda dan program aktivasi brand.',
			longDescription: 'Kami membantu brand Anda terhubung dengan audiens melalui strategi kreatif dan kampanye aktivasi yang berdampak.',
			icon: Zap,
			accent: 'from-yellow-400/20 to-primary/20'
		},
		{
			id: 'management',
			title: 'Show Management',
			subtitle: 'Sit Back & Relax',
			description: 'Anda hanya perlu menikmati pertunjukan yang kami sediakan. Kami mengelola flow acara dari awal hingga akhir.',
			longDescription: 'Manajemen panggung dan pengisi acara yang terstruktur untuk memastikan setiap detik acara berjalan sesuai rencana.',
			icon: Mic,
			accent: 'from-purple-500/20 to-primary/20'
		},
		{
			id: 'advertising',
			title: 'Advertising',
			subtitle: 'Business Growth',
			description: 'Biarkan kami meningkatkan upaya periklanan Anda dan melihat bisnis Anda berkembang pesat melalui media yang tepat.',
			longDescription: 'Strategi penempatan media dan produksi konten iklan yang dirancang untuk memaksimalkan ROI bisnis Anda.',
			icon: Megaphone,
			accent: 'from-primary/20 to-rose-500/20'
		}
	];
</script>

<svelte:head>
	<title>Our Services | REDLINE Communication</title>
	<meta name="description" content="Explore the wide range of services offered by Redline Communication, from Event Organizing to Production and Creative Agency." />
</svelte:head>

<main class="min-h-screen bg-background pt-24 pb-20">
	<!-- Hero Section -->
	<section class="relative overflow-hidden py-20 lg:py-32">
		<!-- Background Elements -->
		<div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
			<div class="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] opacity-50"></div>
			<div class="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] opacity-30"></div>
		</div>

		<div class="container relative z-10 mx-auto px-4 md:px-6">
			<div class="flex flex-col items-center text-center max-w-4xl mx-auto">
				{#if mounted}
					<div in:fly={{ y: -20, duration: 800 }}>
						<span class="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-bold tracking-wider uppercase mb-6">
							Bikin Event #diRedlineAja
						</span>
					</div>
					<h1 in:fly={{ y: 20, duration: 800, delay: 200 }} class="font-display text-5xl md:text-7xl lg:text-8xl text-white uppercase leading-none mb-8">
						Kami Menyediakan <br />
						<span class="text-gradient-red">Pilihan Layanan</span> yang Luas
					</h1>
					<p in:fade={{ duration: 1000, delay: 400 }} class="text-lg md:text-xl text-foreground/60 max-w-2xl leading-relaxed">
						Apapun kebutuhan anda terkait Event ataupun Produk anda, Redline Communication adalah solusinya. Kami mendampingi anda dari konsep hingga realisasi.
					</p>
				{/if}
			</div>
		</div>
	</section>

	<!-- Services Grid -->
	<section class="py-20 relative">
		<div class="container mx-auto px-4 md:px-6">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each services as service, i}
					{#if mounted}
						<div 
							in:fly={{ y: 30, duration: 800, delay: 100 * i }}
							class="group relative"
						>
							<div class="absolute inset-0 bg-linear-to-br {service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[3rem] blur-2xl -z-10"></div>
							
							<div class="glass flex flex-col h-full rounded-[3rem] overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:border-primary/30 group-hover:shadow-2xl group-hover:shadow-primary/10">
								{#if service.image}
									<div class="relative h-48 w-full overflow-hidden">
										<img src={service.image} alt={service.title} class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
										<div class="absolute inset-0 bg-linear-to-t from-black/80 to-transparent"></div>
									</div>
								{/if}

								<div class="p-8 md:p-10 flex flex-col grow">
									<div class="flex justify-between items-start mb-8">
										<div class="relative">
											<div class="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
											<div class="relative z-10 w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-lg shadow-primary/20">
												<service.icon class="w-8 h-8" />
											</div>
										</div>
										<span class="text-4xl font-display text-white/5 group-hover:text-primary/10 transition-colors">0{i + 1}</span>
									</div>

									<div class="mb-6">
										<h3 class="font-display text-3xl text-white mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
										<p class="text-primary/60 text-sm font-bold uppercase tracking-widest">{service.subtitle}</p>
									</div>

									<p class="text-foreground/70 leading-relaxed mb-8 grow">
										{service.description}
									</p>

									<div class="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider group/btn cursor-pointer">
										<span class="group-hover/btn:mr-2 transition-all">Details</span>
										<ArrowRight class="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
									</div>
								</div>
							</div>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-20 lg:py-32 overflow-hidden">
		<div class="container mx-auto px-4 md:px-6 text-center">
			<div class="glass relative overflow-hidden rounded-[4rem] p-12 lg:p-24 border-primary/20">
				<!-- Decorative light -->
				<div class="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
				<div class="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"></div>

				<div class="relative z-10 max-w-3xl mx-auto">
					{#if mounted}
						<h2 in:fly={{ y: 20, duration: 800 }} class="font-display text-4xl md:text-6xl text-white uppercase mb-8 leading-tight">
							Tunggu apalagi? Ayo <span class="text-primary">Diskusikan</span> <br /> Kebutuhan Event Anda!
						</h2>
						<p in:fade={{ duration: 1000, delay: 200 }} class="text-lg text-foreground/60 mb-12">
							Tim kami siap membantu merealisasikan visi Anda menjadi sebuah pengalaman yang tak terlupakan. Hubungi kami sekarang untuk konsultasi gratis.
						</p>
						
						<div in:fly={{ y: 20, duration: 800, delay: 400 }} class="flex flex-col sm:flex-row items-center justify-center gap-6">
							<a 
								href="https://wa.me/0811663528" 
								target="_blank"
								class="flex items-center gap-3 bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-full font-bold transition-all shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1"
							>
								<MessageCircle class="w-5 h-5 transition-transform group-hover:scale-110" />
								Chat via WhatsApp
							</a>
							<div class="text-foreground/40 font-mono">OR</div>
							<a 
								href="tel:0811663528" 
								class="text-white hover:text-primary border-b border-white/20 hover:border-primary transition-all pb-1 font-bold"
							>
								0811-663-528
							</a>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</section>
</main>

<style>
	.text-gradient-red {
		background: linear-gradient(to right, #ff3b3b, #ff8c8c);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
