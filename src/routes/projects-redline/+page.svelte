<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import Seo from '$lib/components/seo/Seo.svelte';
	import { breadcrumbSchema } from '$lib/seo/schemas';
	import { getEvents } from '$lib/firebase/events';
	import { isFirebaseConfigured } from '$lib/firebase/config';
	import {
		aquaElectronic,
		aslabkesda,
		bankNagari,
		kemenkumham,
		lldikti,
		perdami,
		pertamina,
		pertaminaHuluEnergi,
		politeknikAtiPadang
	} from '$lib/assets/event-page';

	let mounted = $state(false);
	let heroVisible = $state(false);
	let projectsVisible = $state(false);
	let historyVisible = $state(false);
	let ctaVisible = $state(false);
	let activeYear = $state(2025);

	let heroEl: HTMLElement;
	let projectsEl: HTMLElement;
	let historyEl: HTMLElement;
	let ctaEl: HTMLElement;

	const fallbackProjects = [
		{ title: 'PERTAMINA DTEC CONNECT 4.0', place: 'The Balcone Hotel Bukittinggi', image: pertamina },
		{ title: 'Bank Nagari Inspiring Leader', place: 'Santika Premiere Hotel Padang', image: bankNagari },
		{ title: 'Symposium PERDAMI', place: 'ZHM Padang', image: perdami },
		{ title: 'PERTAMINA Goes to Campus', place: 'PERTAMINA - UNAND', image: pertaminaHuluEnergi },
		{ title: 'Dealer Gathering', place: 'AQUA ELECTRONICS', image: aquaElectronic },
		{ title: 'Pameran Layanan Hukum', place: 'KEMENKUMHAM - Padang', image: kemenkumham },
		{ title: 'Rakernas 2 & Forum Ilmiah 3', place: 'ASLABKESDA', image: aslabkesda },
		{ title: 'Kampus Merdeka Fair', place: 'LLDIKTI', image: lldikti },
		{ title: 'Anugerah 50th', place: 'Politeknik ATI Padang', image: politeknikAtiPadang }
	];

	let latestProjects = $state(fallbackProjects);

	const historicalHighlights = [
		{
			year: 2025,
			events: [
				{ title: 'Bimtek MTSN 4 Kota Padang', desc: '6 – 8 Mei 2025' },
				{ title: 'Soft Opening Bako City Mall', desc: '29 Mei 2025' },
				{ title: 'Rakernas MBBI', desc: 'Padang, 29 Mei 2025' },
				{ title: 'Gathering PT. BUT (Telkom Group)', desc: 'Sunway Alahan Panjang, 10 – 13 Juni 2025' },
				{ title: 'Festival Kuliner Paliko', desc: 'Dinas Pariwisata Provinsi Sumatera Barat, Kab. 50 Kota, 14 Juni 2025' },
				{ title: 'Bela Negara – KOMDIGI', desc: 'Padang, 15 – 16 Juni 2025' },
				{ title: 'Bela Negara – KOMDIGI', desc: 'Tanjung Pinang Aceh, 20 – 21 Juni 2025' },
				{ title: 'Musyawarah Nasional LABKESDA II', desc: 'Jakarta, 18 – 20 Juni 2025' },
				{ title: 'Tabligh Akbar & Launching Program', desc: 'Pondok Pesantren Arisalah Lubuk Minturun, 21 – 22 Juni 2025' },
				{ title: 'Booth Produksi Bio Farma', desc: 'Hotel ZHM Zuri Padang, 5 – 6 Juli 2025' },
				{ title: 'Booth Produksi Philips', desc: 'Hotel ZHM Zuri Padang, 23 – 26 Juli 2025' },
				{ title: 'Sosialisasi DPR RI Komisi 7', desc: 'DPR RI – 22 – 23 Juli 2025' },
				{ title: 'Rapat Koordinasi BKKBN', desc: 'Istana Gubernur Sumbar, 30 Juli 2025' }
			]
		},
		{
			year: 2024,
			events: [
				{ title: 'Rapat Koordinasi dan Rapat Tinjauan Manajemen PT. GAG Nikel', desc: 'Solo, 8 – 12 Januari 2024' },
				{ title: 'Bussiness Appreciation & Festival', desc: 'Prestasi Junior Indonesia & Mandala Finance – 24 Februari 2024' },
				{ title: 'Anugerah 50 tahun Politeknik ATI Padang', desc: '20 – 23 Mei 2024' },
				{ title: 'Booth Vendor & Dekorasi Kampus Merdeka Fair', desc: 'Padang, 30 Mei 2024' },
				{ title: 'Rakernas 2 & Forum Ilmiah 3 ASLABKESDA', desc: 'Hotel Truntum Padang, 10 – 14 Juli 2024' },
				{ title: 'Pameran Layanan Administrasi Hukum Umum KEMENKUMHAM', desc: 'Plaza Andalas, 3 – 4 Agustus 2024' },
				{ title: 'AQUA Dealer Gathering', desc: 'Santika Hotel – Padang – 14 Agustus 2024' },
				{ title: 'Kilang Pertamina Internasional Goes to Campus', desc: 'UNAND – 29 Agustus 2024' },
				{ title: 'Simposium & Workshop Ophtalindo PERDAMI', desc: 'ZHM Padang – 22 Septembar 2024' },
				{ title: 'Bank Nagari Inspiring Leader', desc: 'Santika Premiere Hotel Padang – 10 November 2024' },
				{ title: 'PERTAMINA DTEC Connect 4.0', desc: 'the Balcone Hotel Bukittinggi – 2 – 6 Desember 2024' }
			]
		},
		{
			year: 2023,
			events: [
				{ title: 'Kumham Goes to Campus', desc: 'Auditorium UNP, 30 Maret 2023' },
				{ title: 'Mitratel KMR Summit', desc: 'Novotel Bukittinggi & the Edge Harau, 23 – 25 Mei 2023' },
				{ title: 'Peringatan Hari Lanjut Usia (HLUN) ke-27', desc: 'Dharmasraya, 29 Mei 2023' },
				{ title: 'Hilirisasi Produk Hasil Tanaman Pangan', desc: 'PENAS Tani Padang, 10 – 15 Juni 2023' },
				{ title: 'Launching BASF Cimegra', desc: 'Juni 2023' },
				{ title: 'Booth Production Dinas Pertanian Jatim & Dirjen BSIP', desc: 'PENAS TANI 2023' },
				{ title: 'Rigging Double Deck booth vendor Harfia', desc: 'PENAS TANI 2023' },
				{ title: 'Payakumbuh Botuang Festival', desc: 'Taman Batang Agam, Payakumbuh 13 – 15 Juli 2023' },
				{ title: 'Gelar Kreativitas dan Inovasi Pelaku Usaha Kriya', desc: 'ISI Padang Panjang, 21-22 Juli 2023' },
				{ title: 'Grand Opening 1st Starbucks', desc: 'Kota Padang, 26 Juli 2023' },
				{ title: 'Rapat Kerja BPKP Se Indonesia', desc: 'Hotel Emersia Batusangkar, 27 Juli 2023' },
				{ title: 'Forum Komunikasi Dewan Komisaris Daerah BPD Seluruh Indonesia', desc: 'Hotel Santika Padang, 15 – 16 Agustus 2023' },
				{ title: 'Penyu Untuk Indonesia Daihatsu', desc: 'Padang, 24 Agustus 2023' },
				{ title: 'Rang Solok Baralek Gadang', desc: 'Solok, 16 – 18 September 2023' },
				{ title: 'Costomer Gathering AXA Mandiri', desc: 'Mercure Hotel Padang, 20 September 2023' },
				{ title: 'Produksi Booth MSD di PIT IKA 2023', desc: '2023' }
			]
		},
		{
			year: 2022,
			events: [
				{ title: 'Telkom Indonesia Forum Marketing', desc: '@Mercure hotel, 21 Januari 2022' },
				{ title: 'Kuliah Umum dan Kajian Buku Pembiayaan UMKM Kemenko Perekonomian', desc: '@UNP, 24 Maret 2022' },
				{ title: 'Production Booth Bangga Buatan Indonesia', desc: '@Bandara Internasional Minangkabau, April 2022' },
				{ title: 'Launching 5th Sumatera Bike Week (SBW)', desc: 'Bukittinggi, 24 Mei 2022' },
				{ title: 'Organize Event & Vendor Booth LED Youth City Changer APEKSI', desc: '@youth center padang, Agustus 2022' },
				{ title: 'Latihan Pestapora Padang', desc: 'Agustus 2022' },
				{ title: 'Support Vendor LED Launching Desa Wisata Agro Sumatera Barat', desc: '@Kubu Gadang, 13 September 2022' },
				{ title: 'Malam Anugerah Pariwisata Sumatera Barat', desc: '@Kantor Gubernur Sumbar, 27 September 2022' },
				{ title: 'Kompetisi Keterampilan Instruktur Nasional', desc: '@BPVP Padang, 2-7 Oktober 2022' },
				{ title: 'Organizing & Vendor Rapat Pimpinan Nasional PATELKI', desc: '@ZHM Premiere, 24 – 27 November 2022' },
				{ title: 'ROADSHOW MILAD 10 HNI', desc: 'ZHM Premier Hotel, Padang, 2 – 4 Desember 2022' },
				{ title: 'Grand Launching Visit Beautiful West Sumatra 2023', desc: '@Jam Gadang Bukittinggi, 24 Desember 2022' }
			]
		},
		{
			year: 2021,
			events: [
				{ title: 'Rakerda DPD ASPERAPI Sumbar', desc: '9 Februari 2021' },
				{ title: 'Sosialisasi CHSE MICE Pelantikan DPD ASPERAPI', desc: '@KEMENPAREKRAF, GrandInna Hotel & Convention, 2 Maret 2021' },
				{ title: 'Diskusi Publik KUUHP KEMENKUMHAM RI', desc: 'Mercure Hotel Padang, 2 April 2021' },
				{ title: 'Bimtek TOT, TAPP, SAKIP PUPR Regional Barat', desc: 'GrandInna Padang & Grand Zuri, 21 – 23 April 2021' },
				{ title: 'Sosialisasi CHSE Wisata Paralayang KEMENPAREKRAF', desc: 'Mercure Hotel Padang, 29 April 2021' },
				{ title: 'Launching Indonesia MAKIN CAKAP DIGITAL KOMINFO', desc: 'Kyriad Hotel Aceh & Novotel Palembang, 20 Mei' },
				{ title: 'Aktivasi Ramadhan & Idul Adha LinkAja', desc: 'Distrik Padang 2021' },
				{ title: 'FMD program KEMENKUMHAM Sumbar', desc: '2021' },
				{ title: 'Aktivasi LinkAja', desc: 'Distrik Belitung & Pangkal Pinang 2021' },
				{ title: 'BOMM Internasional Symposium Mahkamah Konstitusi RI', desc: '2021' },
				{ title: 'Pengukuhan Nagari Konstitusi MK RI', desc: '2021' },
				{ title: 'Webinar IRIO BPS Sumbar', desc: '2021' },
				{ title: 'Festival Bank Indonesia Digitalisasi UMKMM X LinkAja', desc: 'Lhoksumawe Aceh 2021' },
				{ title: 'Explore Belitung Bank Indonesia x LinkAja', desc: '2021' },
				{ title: 'Jasa EO TIK Merajut Nusantara KOMINFO', desc: '2021' },
				{ title: 'Soft Opening Santika Premiere Hotel Padang', desc: '2021' },
				{ title: 'Festival CHSE Dinas Pariwisata Provinsi Sumatera Barat', desc: '17 November 2021' }
			]
		},
		{
			year: 2020,
			events: [
				{ title: 'Kick of Meeting Bank Nagari', desc: '2020' },
				{ title: 'Event & Brand Activation Layanan Syariah LinkAja', desc: 'Bukittinggi, Padang, Palembang' },
				{ title: 'FGD Penyusunan Roadmap Destinasi Wisata Kemeneparekraf', desc: '@ Mercure Hotel' },
				{ title: 'Rakor Nasional BLK Komunitas Tahap 1, Kemnaker RI', desc: '@ Grandzuri Hotel, 3-5 Desember 2020' }
			]
		},
		{
			year: 2019,
			events: [
				{ title: 'DiploFEST 2019', desc: '@ lap. Imam Bonol Padang' },
				{ title: 'MICE & Production Support Seminar Nasional', desc: '@ Bukittinggi, 24 Apr 2019' },
				{ title: 'Forum Group Discussion 57th Bank Nagari \‘Sinergi & Innovasi\’', desc: '@ Kyriad Bumi Minang, 25 Juli 2019' },
				{ title: 'Project Collaboration Gojek Gapura', desc: '2019' },
				{ title: 'Production Booth Telkomsel Umrah Fair', desc: 'November 2019' },
				{ title: 'SumbartPride Vol.7 Soundsations', desc: 'Bukittinggi, Desember 2019' }
			]
		},
		{
			year: 2018,
			events: [
				{ title: 'Grand Opening Dealer Wuling Motor & Launching CORTEZ', desc: '29 Maret 2018' },
				{ title: 'Branding MAKERFEST Empowered by Tokopedia', desc: '21-22 April 2018' },
				{ title: 'Peresmian KERETA API BANDARA INTERNATIONAL MINANGKABAU', desc: 'Bersama Presiden Joko Widodo, 21 Mei 2018' },
				{ title: 'PIT PERDAMI PADANG 43th Annual Scientific Meeting', desc: '29 Agustus – 1 September 2018' }
			]
		},
		{
			year: 2017,
			events: [
				{ title: 'BUMN Seminar Bendungan Besar', desc: '@Grand Inna Muara Hotel, 16-17 Mei 2017' },
				{ title: 'Grand Opening Transmart – Bank Mega & Brand Activation', desc: '@Transmart 2017' },
				{ title: 'VOLCOM Present Raba Cakrawala Tour', desc: '2017' },
				{ title: 'GML, Konferensi Ikatan Dokoter Indonesia', desc: '22-23 September 2017' },
				{ title: 'Grand Opening Whiz Prime Hotel Padang', desc: 'Desember 2017' }
			]
		},
		{
			year: 2016,
			events: [
				{ title: 'Hari Jadi Kabupaten Jember', desc: '2016' },
				{ title: 'Sampoerna Ijo Royo-royo', desc: 'Kabupaten Banyuwangi' },
				{ title: 'A Mild Sampoerna Road To Soundrenaline', desc: '2016' },
				{ title: 'Pameran FRANK CO JEWELERY', desc: 'Basko Grand Mall' },
				{ title: 'Gathering KALSI group (Semen Indonesia Group)', desc: 'Lampung, Palembang, Medan, Padang' },
				{ title: 'Press Conference & Seminar Sosialisasi Lembaga Penjamin (LPS)', desc: 'MNC Group, Sindo News' }
			]
		}
	];

	async function loadFromFirebase() {
		if (!isFirebaseConfigured) return;
		try {
			const evts = await getEvents();
			if (evts.length > 0) {
				latestProjects = evts.map((e) => ({
					title: e.title,
					place: e.place || '',
					image: e.imageUrl
				}));
			}
		} catch {
			// fallback ke data hardcoded
		}
	}

	onMount(() => {
		loadFromFirebase();
		mounted = true;

		const createObserver = (el: HTMLElement, setter: (v: boolean) => void) => {
			const obs = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) {
						setter(true);
						obs.disconnect();
					}
				},
				{ threshold: 0.1 }
			);
			if (el) obs.observe(el);
			return () => obs.disconnect();
		};

		const cleanups = [
			createObserver(heroEl, (v) => (heroVisible = v)),
			createObserver(projectsEl, (v) => (projectsVisible = v)),
			createObserver(historyEl, (v) => (historyVisible = v)),
			createObserver(ctaEl, (v) => (ctaVisible = v))
		];

		return () => cleanups.forEach((fn) => fn());
	});
</script>

<Seo
	title="Portofolio Event & Project | EO Padang - Redline Communication"
	description="Lihat portofolio event yang telah berhasil diselenggarakan oleh Redline Communication, event organizer Padang. 200+ event sukses dari Pertamina, Bank Nagari, dan lainnya."
	jsonLd={breadcrumbSchema([{ name: 'Home', url: 'https://redlinecomunication.com' }, { name: 'Projects & Events', url: 'https://redlinecomunication.com/projects-redline' }])}
/>

<main class="events-page">
	<!-- ══ HERO SECTION ══ -->
	<section class="events-hero" bind:this={heroEl}>
		<div class="hero-bg" aria-hidden="true"></div>
		<div class="blob b1" aria-hidden="true"></div>
		<div class="blob b2" aria-hidden="true"></div>
		<div class="grid-overlay" aria-hidden="true"></div>

		<div class="hero-container">
			{#if mounted}
				<div class="breadcrumb" in:fly={{ y: -20, duration: 700, delay: 100 }}>
					<a href="/" class="bc-link">Home</a>
					<span class="bc-sep">›</span>
					<span class="bc-current">Past Events</span>
				</div>

				<div class="hero-content">
					<div class="hero-text-wrapper" in:fly={{ y: 50, duration: 900, delay: 200 }}>
						<div class="hero-badge">
							<span class="badge-dot"></span>
							<span class="badge-label">OUR EXPERTISE</span>
						</div>

						<h1 class="hero-title">
							Latest <span class="text-primary">Events</span>
						</h1>

						<p class="hero-subtitle">Melihat Kilas Balik Hasil Karya Kami</p>

						<p class="hero-desc">
							Berkolaborasi bersama berbagai perusahaan dan instansi ternama dalam menyukseskan
							acara-acara spektakuler yang memberikan impact besar untuk mereka.
						</p>

						<div class="hero-actions">
							<a href="#portfolio" class="btn-primary">
								Explore Portfolio
								<span class="btn-arrow">↓</span>
							</a>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<div class="fade-bottom" aria-hidden="true"></div>
	</section>

	<!-- ══ LATEST PROJECTS GRID ══ -->
	<section id="portfolio" class="projects-section" bind:this={projectsEl}>
		<div class="projects-container">
			<div class="section-header" class:visible={projectsVisible}>
				<div class="section-label">FEATURED PROJECTS</div>
				<h2 class="section-title">
					Our <span class="text-primary">Highlights</span>
				</h2>
				<p class="section-desc">
					Pilihan acara andalan kami yang mengekspresikan inovasi, detail, dan eksekusi brilian
					dari proses yang kami lewati bersama klien.
				</p>
			</div>

			<div class="projects-grid">
				{#each latestProjects as project, i}
					<div class="project-card" class:visible={projectsVisible} style="--delay: {(i % 3) * 150}ms">
						<div class="pc-image-wrap">
							<img src={project.image} alt={project.title} loading="lazy" />
						</div>
						<div class="pc-content">
							<h3 class="pc-title">{project.title}</h3>
							<div class="pc-place">
								<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
								{project.place}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ══ HISTORY HIGHLIGHTS ══ -->
	<section class="history-section" bind:this={historyEl}>
		<div class="history-bg" aria-hidden="true"></div>
		<div class="history-container">
			<div class="section-header center" class:visible={historyVisible}>
				<div class="section-label">THE ARCHIVE</div>
				<h2 class="section-title">
					Historical <span class="text-primary">Milestones</span>
				</h2>
			</div>

			<div class="tabs-container" class:visible={historyVisible}>
				<div class="years-scrollbar-wrapper">
					<div class="years-tabs">
						{#each historicalHighlights as block}
							<button 
								class="year-tab {activeYear === block.year ? 'active' : ''}"
								onclick={() => activeYear = block.year}
							>
								{block.year}
							</button>
						{/each}
					</div>
				</div>

				<div class="tab-content">
					{#each historicalHighlights as block}
						{#if activeYear === block.year}
							<div class="tl-content-list" in:fade={{ duration: 300 }}>
								{#each block.events as ev}
									<div class="tl-item">
										<div class="tl-dot"></div>
										<h4 class="tl-item-title">{ev.title}</h4>
										<p class="tl-item-desc">{ev.desc}</p>
									</div>
								{/each}
							</div>
						{/if}
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- ══ CTA SECTION ══ -->
	<section class="cta-section" bind:this={ctaEl}>
		<div class="cta-bg" aria-hidden="true"></div>
		<div class="cta-container" class:visible={ctaVisible}>
			<div class="cta-content">
				<h2 class="cta-title">
					Jadikan acara Anda berikutnya <br>
					sebagai <span class="text-primary">masterpiece</span>
				</h2>
				<p class="cta-desc">
					Diskusikan konsep event impian Anda, dan biarkan kami merancangnya dari hulu ke hilir.
				</p>
				<a href="https://wa.me/0811663528" target="_blank" rel="noopener" class="cta-btn">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
						<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
					</svg>
					Konsultasi Event
				</a>
			</div>
		</div>
	</section>
</main>

<style>
	/* ── Base ── */
	.events-page {
		background: var(--background);
		min-height: 100vh;
		font-family: 'Outfit', sans-serif;
		overflow-x: hidden;
		color: white;
	}

	.text-primary { color: var(--primary); }

	/* ── Reuse shared aesthetics ── */
	.events-hero {
		position: relative;
		display: flex; flex-direction: column; justify-content: center;
		padding: 180px 1.5rem 80px;
	}

	.hero-bg {
		position: absolute; inset: 0;
		background: radial-gradient(ellipse 70% 60% at 20% 0%, oklch(0.55 0.22 25 / 15%) 0%, transparent 60%);
		z-index: 0;
	}

	.blob {
		position: absolute; border-radius: 9999px; filter: blur(100px); z-index: 1; pointer-events: none;
	}
	.b1 { width: 500px; height: 500px; top: -5%; left: 0; background: oklch(0.55 0.22 25 / 8%); }
	.b2 { width: 400px; height: 400px; bottom: 10%; right: 5%; background: oklch(0.55 0.22 25 / 6%); }

	.grid-overlay {
		position: absolute; inset: 0; opacity: 0.02; z-index: 0;
		background-image: linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px);
		background-size: 50px 50px;
	}

	.hero-container {
		position: relative; z-index: 10; max-width: 1200px; margin: 0 auto; width: 100%;
	}

	.breadcrumb { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 2rem; font-size: 0.813rem; font-weight: 500; }
	.bc-link { color: rgba(255,255,255,0.4); text-decoration: none; transition: color 0.2s; }
	.bc-link:hover { color: var(--primary); }
	.bc-sep { color: rgba(255,255,255,0.2); }
	.bc-current { color: var(--primary); }

	.hero-content {
		display: flex; flex-direction: column; align-items: flex-start; text-align: left;
		position: relative; z-index: 1;
	}
	
	.hero-text-wrapper { display: flex; flex-direction: column; gap: 1.25rem; max-width: 700px; }
	
	.hero-badge {
		display: inline-flex; align-items: center; gap: 0.625rem; padding: 0.5rem 1rem;
		border-radius: 9999px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); width: fit-content;
	}
	.badge-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--primary); animation: pulse 2s infinite; }
	.badge-label { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.15em; color: rgba(255,255,255,0.7); }

	.hero-title {
		font-family: var(--font-display), 'Bebas Neue', sans-serif; font-size: clamp(4rem, 8vw, 6.5rem);
		line-height: 0.95; margin: 0; text-transform: uppercase;
	}
	.hero-subtitle { font-size: 1.5rem; color: rgba(255,255,255,0.7); font-style: italic; margin: 0; }
	.hero-desc { font-size: 1.1rem; line-height: 1.6; color: rgba(255,255,255,0.5); margin: 0; }
	
	.btn-primary {
		display: inline-flex; align-items: center; gap: 0.5rem; margin-top: 1rem;
		padding: 0.875rem 1.5rem; background: var(--primary); color: white;
		border-radius: 9999px; font-weight: 600; text-decoration: none; transition: all 0.3s;
	}
	.btn-primary:hover {
		transform: translateY(-2px); box-shadow: 0 10px 25px oklch(0.55 0.22 25 / 40%);
	}
	.btn-arrow {
		display: flex; align-items: center; justify-content: center;
		width: 24px; height: 24px; background: rgba(255,255,255,0.2); border-radius: 50%;
		transition: transform 0.3s;
	}

	.fade-bottom {
		position: absolute; bottom: 0; left: 0; right: 0; height: 100px;
		background: linear-gradient(to top, var(--background), transparent); z-index: 2; pointer-events: none;
	}

	/* ── Section Defaults ── */
	.section-header { margin-bottom: 4rem; opacity: 0; transform: translateY(20px); transition: all 0.6s; }
	.section-header.center { text-align: center; }
	.section-header.visible { opacity: 1; transform: translateY(0); }
	.section-label { font-size: 0.8rem; font-weight: 600; color: var(--primary); letter-spacing: 0.2em; margin-bottom: 1rem; }
	.section-title { font-family: var(--font-display), sans-serif; font-size: 3rem; margin: 0 0 1rem; text-transform: uppercase; line-height: 1.1; }
	.section-desc { color: rgba(255,255,255,0.6); max-width: 600px; margin: 0; line-height: 1.6; }
	.section-header.center .section-desc { margin: 0 auto; }


	/* ── Projects Grid ── */
	.projects-section { padding: 4rem 1.5rem 6rem; position: relative; }
	.projects-container { max-width: 1200px; margin: 0 auto; }

	.projects-grid {
		display: grid; grid-template-columns: 1fr; gap: 2rem;
	}
	@media (min-width: 768px) {
		.projects-grid { grid-template-columns: repeat(2, 1fr); }
	}
	@media (min-width: 1024px) {
		.projects-grid { grid-template-columns: repeat(3, 1fr); }
	}

	.project-card {
		position: relative;
		background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 1.5rem;
		overflow: hidden; opacity: 0; transform: translateY(30px); transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) var(--delay);
		display: flex; flex-direction: column;
	}
	.project-card.visible { opacity: 1; transform: translateY(0); }
	.project-card:hover {
		border-color: rgba(220,38,38,0.4); background: rgba(255,255,255,0.05); transform: translateY(-5px);
	}

	.pc-image-wrap {
		width: 100%; height: 260px; overflow: hidden; position: relative;
	}
	.pc-image-wrap img {
		width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease;
	}
	.project-card:hover .pc-image-wrap img { transform: scale(1.08); }

	.pc-overlay {
		position: absolute; inset: 0; background: rgba(0,0,0,0.4); opacity: 0; transition: opacity 0.3s;
		display: flex; align-items: center; justify-content: center;
	}
	.project-card:hover .pc-overlay { opacity: 1; }
	
	.pc-link-btn {
		background: white; color: black; font-weight: 700; padding: 0.5rem 1.25rem; border-radius: 9999px;
		font-size: 0.9rem; text-decoration: none; pointer-events: auto;
		transform: translateY(10px); transition: transform 0.3s cubic-bezier(0.2,0.8,0.2,1);
	}
	.project-card:hover .pc-link-btn { transform: translateY(0); }

	.pc-content { padding: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; flex: 1; }
	.pc-title { font-size: 1.2rem; font-weight: 600; margin: 0; line-height: 1.4; }
	.pc-place {
		display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: rgba(255,255,255,0.5);
	}


	/* ── History Section ── */
	.history-section {
		padding: 6rem 1.5rem; position: relative; background: rgba(0,0,0,0.3); border-top: 1px solid rgba(255,255,255,0.05);
	}
	.history-container { max-width: 800px; margin: 0 auto; }

	.tabs-container {
		display: flex; flex-direction: column; gap: 2rem;
		opacity: 0; transform: translateY(20px); transition: all 0.6s var(--delay);
	}
	.tabs-container.visible { opacity: 1; transform: translateY(0); }

	.years-scrollbar-wrapper {
		width: 100%; overflow-x: auto; padding-bottom: 0.5rem;
		scrollbar-width: thin; scrollbar-color: var(--primary) rgba(255,255,255,0.05);
	}
	.years-scrollbar-wrapper::-webkit-scrollbar { height: 4px; }
	.years-scrollbar-wrapper::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
	.years-scrollbar-wrapper::-webkit-scrollbar-thumb { background: var(--primary); border-radius: 4px; }

	.years-tabs {
		display: flex; gap: 0.5rem; min-width: max-content; margin: 0 auto;
	}
	.year-tab {
		background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
		color: rgba(255,255,255,0.6); padding: 0.75rem 1.5rem; border-radius: 9999px;
		font-family: var(--font-display), sans-serif; font-size: 1.2rem; font-weight: bold;
		cursor: pointer; transition: all 0.3s;
	}
	.year-tab:hover { background: rgba(255,255,255,0.1); color: white; }
	.year-tab.active { background: var(--primary); color: white; border-color: var(--primary); box-shadow: 0 4px 15px rgba(220,38,38,0.4); }

	.tab-content { position: relative; min-height: 200px; }

	.tl-content-list {
		display: grid; grid-template-columns: 1fr; gap: 1.5rem;
		background: rgba(255,255,255,0.02); padding: 2rem; border-radius: 1.5rem;
		border: 1px solid rgba(255,255,255,0.05); backdrop-filter: blur(8px);
	}
	@media (min-width: 768px) {
		.tl-content-list { grid-template-columns: repeat(2, 1fr); padding: 3rem; gap: 2rem; }
	}

	.tl-item { position: relative; padding-left: 1.5rem; }
	.tl-item::before {
		content: ""; position: absolute; top: 0; bottom: 0; left: 0; width: 2px; background: rgba(255,255,255,0.1);
	}
	.tl-dot {
		position: absolute; left: -4px; top: 6px; width: 10px; height: 10px;
		background: var(--primary); border-radius: 50%; box-shadow: 0 0 10px rgba(220,38,38,0.5);
	}

	.tl-item-title { font-size: 1.1rem; font-weight: 600; margin: 0 0 0.5rem; line-height: 1.4; }
	.tl-item-desc { font-size: 0.9rem; color: rgba(255,255,255,0.5); line-height: 1.5; margin: 0; }


	/* ── CTA Section ── */
	.cta-section { padding: 6rem 1.5rem; position: relative; }
	.cta-bg {
		position: absolute; inset: 0; background: radial-gradient(ellipse at center, rgba(220,38,38,0.1) 0%, transparent 70%);
		z-index: 0; pointer-events: none;
	}
	.cta-container {
		max-width: 800px; margin: 0 auto; text-align: center; position: relative; z-index: 1;
		background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
		border-radius: 2rem; padding: 4rem 2rem; backdrop-filter: blur(10px);
		opacity: 0; transform: scale(0.95); transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
	}
	.cta-container.visible { opacity: 1; transform: scale(1); }
	
	.cta-title { font-family: var(--font-display), sans-serif; font-size: clamp(2rem, 4vw, 2.75rem); margin: 0 0 1rem; line-height: 1.2; text-transform: uppercase; }
	.cta-desc { font-size: 1.1rem; color: rgba(255,255,255,0.6); margin: 0 auto 2rem; max-width: 500px; }
	.cta-btn {
		display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
		padding: 1rem 2rem; background: var(--primary); color: white;
		border-radius: 9999px; font-weight: 600; text-decoration: none; font-size: 1.1rem;
		transition: all 0.3s; box-shadow: 0 10px 30px rgba(220,38,38,0.3);
	}
	.cta-btn:hover { transform: translateY(-3px); box-shadow: 0 15px 40px rgba(220,38,38,0.4); }
</style>
