<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import Seo from '$lib/components/seo/Seo.svelte';
	import { breadcrumbSchema, localBusinessSchema } from '$lib/seo/schemas';

	let mounted = $state(false);
	let heroVisible = $state(false);
	let infoVisible = $state(false);
	let formVisible = $state(false);

	let heroEl: HTMLElement;
	let infoEl: HTMLElement;
	let formEl: HTMLElement;

	onMount(() => {
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
			createObserver(infoEl, (v) => (infoVisible = v)),
			createObserver(formEl, (v) => (formVisible = v))
		];

		return () => cleanups.forEach((fn) => fn());
	});

    const contactInfo = [
        {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,
            title: 'Phone',
            desc: '0811-663-528',
            link: 'https://wa.me/0811663528',
            action: 'Call Us Now'
        },
        {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
            title: 'Email',
            desc: 'info@redlinecomunication.com',
            link: 'mailto:info@redlinecomunication.com',
            action: 'Send an Email'
        },
        {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
            title: 'Head Office',
            desc: 'Padang, Sumatera Barat',
            link: 'https://www.google.com/maps?q=-0.9016313485700724,100.35053495646629',
            action: 'View on Map'
        }
    ];

	const handleSubmit = (e: Event) => {
		e.preventDefault();
		// Simulate submission
		alert('Thank you for reaching out! We will get back to you soon.');
	};
</script>

<Seo
	title="Hubungi EO Padang - Redline Communication | Konsultasi Event Gratis"
	description="Hubungi Redline Communication untuk konsultasi event gratis. EO Padang profesional siap membantu kebutuhan event Anda. WhatsApp: 0811-663-528. Kantor: Padang, Sumatera Barat."
	jsonLd={[breadcrumbSchema([{ name: 'Home', url: 'https://redlinecomunication.com' }, { name: 'Contact', url: 'https://redlinecomunication.com/contact-redline' }]), localBusinessSchema()]}
/>

<main class="contact-page">
	<!-- ══ HERO SECTION ══ -->
	<section class="contact-hero" bind:this={heroEl}>
		<!-- Background layers -->
		<div class="hero-bg" aria-hidden="true"></div>
		<div class="blob b1" aria-hidden="true"></div>
		<div class="blob b2" aria-hidden="true"></div>
		<div class="grid-overlay" aria-hidden="true"></div>

		<div class="hero-container">
			<!-- Breadcrumb -->
			{#if mounted}
				<div class="breadcrumb" in:fly={{ y: -20, duration: 700, delay: 100 }}>
					<a href="/" class="bc-link">Home</a>
					<span class="bc-sep">›</span>
					<span class="bc-current">Contact</span>
				</div>
			{/if}

			<!-- Hero Content -->
			<div class="hero-content">
				{#if mounted}
					<div class="hero-text" in:fly={{ y: 50, duration: 900, delay: 200 }}>
						<div class="hero-badge">
							<span class="badge-dot"></span>
							<span class="badge-label">GET IN TOUCH</span>
						</div>

						<h1 class="hero-title">
							Contact <span class="text-primary">Us</span>
						</h1>

						<p class="hero-subtitle">Let's create something amazing together</p>

						<p class="hero-desc">
							Apakah anda memiliki pertanyaan seputar layanan kami? 
							Atau ingin berkonsultasi mengenai event yang akan anda selenggarakan? 
							Jangan ragu untuk menghubungi tim kami!
						</p>
					</div>
				{/if}
			</div>
		</div>

		<div class="hero-fade-bottom" aria-hidden="true"></div>
	</section>

	<!-- ══ INFO SECTION ══ -->
	<section class="info-section" bind:this={infoEl}>
		<div class="info-container">
			<div class="info-grid">
				{#each contactInfo as info, i}
					<div class="info-card" class:visible={infoVisible} style="--delay: {i * 150}ms">
						<div class="ic-accent" aria-hidden="true"></div>
						<div class="ic-icon-wrap">
							<!-- eslint-disable-next-line svelte/no-at-html-tags -->
							{@html info.icon}
						</div>
						<h3 class="ic-title">{info.title}</h3>
						<p class="ic-desc">{info.desc}</p>
						<a href={info.link} class="ic-link" target={info.link.startsWith('http') ? '_blank' : undefined} rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}>{info.action} <span class="ic-arrow">→</span></a>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ══ FORM & MAP SECTION ══ -->
	<section class="main-contact-section" bind:this={formEl}>
        <div class="contact-bg" aria-hidden="true"></div>
		<div class="contact-container">
            <div class="form-wrapper" class:visible={formVisible}>
                <div class="form-header">
                    <h2>Send Us a <span class="text-primary">Message</span></h2>
                    <p>Isi formulir di bawah ini dan tim kami akan segera menghubungi anda kembali.</p>
                </div>

                <form class="contact-form" onsubmit={handleSubmit}>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="firstName">First Name</label>
                            <input type="text" id="firstName" placeholder="John" required />
                        </div>
                        <div class="form-group">
                            <label for="lastName">Last Name</label>
                            <input type="text" id="lastName" placeholder="Doe" required />
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" placeholder="john@example.com" required />
                    </div>

                    <div class="form-group">
                        <label for="subject">Subject</label>
                        <select id="subject" required>
                            <option value="" disabled selected>Pilih Layanan / Kebutuhan</option>
                            <option value="Event Organizer">Event Organizer</option>
                            <option value="Event Production">Event Production</option>
                            <option value="Rental Equipment">Rental Equipment</option>
                            <option value="Tanya Lainnya">Pertanyaan Lainnya</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea id="message" rows="5" placeholder="Ceritakan detail kebutuhan event anda..." required></textarea>
                    </div>

                    <button type="submit" class="submit-btn" aria-label="Send Message">
                        <span>Send Message</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </button>
                </form>
            </div>

            <div class="map-wrapper" class:visible={formVisible}>
                <div class="map-location-badge">
                    <div class="map-pin-icon" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
                    </div>
                    <div class="map-location-text">
                        <span class="map-location-label">Head Office</span>
                        <span class="map-location-addr">Jl. Prof. Dr. Hamka, Padang Utara, Sumatera Barat</span>
                    </div>
                    <a
                        href="https://www.google.com/maps?q=-0.9016313485700724,100.35053495646629"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="map-open-btn"
                        aria-label="Buka di Google Maps"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        Buka Maps
                    </a>
                </div>
                <div class="map-container glass">
                    <iframe
                        title="Redline Communication Office Map"
                        src="https://maps.google.com/maps?q=-0.9016313485700724,100.35053495646629&z=17&output=embed"
                        width="100%"
                        height="100%"
                        style="border:0;"
                        allowfullscreen={false}
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
		</div>
	</section>
</main>

<style>
	/* ── Page base ── */
	.contact-page {
		background: var(--background);
		min-height: 100vh;
		font-family: 'Outfit', sans-serif;
		overflow-x: hidden;
	}

	.text-primary {
		color: var(--primary);
	}

	/* ══════════════════════════════
	   HERO
	══════════════════════════════ */
	.contact-hero {
		position: relative;
		min-height: 50vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		overflow: hidden;
		padding-top: 100px; /* navbar height + spacing */
		padding-bottom: 4rem;
	}

	.hero-bg {
		position: absolute;
		inset: 0;
		background:
			radial-gradient(ellipse 70% 60% at 50% 20%, oklch(0.15 0.05 25 / 30%) 0%, transparent 60%);
		z-index: 0;
	}

	.blob {
		position: absolute;
		border-radius: 9999px;
		filter: blur(100px);
		pointer-events: none;
		z-index: 1;
	}
	.b1 {
		width: 400px; height: 400px;
		top: -10%; left: 10%;
		background: oklch(0.55 0.22 25.26 / 8%);
	}
	.b2 {
		width: 500px; height: 300px;
		bottom: 10%; right: -5%;
		background: oklch(0.55 0.22 25.26 / 10%);
	}

	.grid-overlay {
		position: absolute;
		inset: 0;
		z-index: 0;
		opacity: 0.03;
		background-image:
			linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px);
		background-size: 60px 60px;
	}

	.hero-container {
		position: relative;
		z-index: 10;
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1.5rem;
		width: 100%;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center; /* Center everything */
		text-align: center;
	}

	/* Breadcrumb */
	.breadcrumb {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		margin-bottom: 2.5rem;
		font-size: 0.813rem;
		font-weight: 500;
		letter-spacing: 0.05em;
	}
	.bc-link {
		color: rgba(255,255,255,0.4);
		text-decoration: none;
		transition: color 0.2s ease;
	}
	.bc-link:hover { color: var(--primary); }
	.bc-sep { color: rgba(255,255,255,0.2); }
	.bc-current { color: var(--primary); }

	/* Hero text styling */
	.hero-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
		max-width: 700px;
	}

	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.625rem;
		padding: 0.5rem 1rem;
		border-radius: 9999px;
		border: 1px solid rgba(255,255,255,0.1);
		background: rgba(255,255,255,0.04);
		width: fit-content;
		margin: 0 auto 1.5rem;
		backdrop-filter: blur(8px);
	}
	.badge-dot {
		width: 8px; height: 8px;
		border-radius: 9999px;
		background: var(--primary);
		animation: pulse 2s ease-in-out infinite;
		flex-shrink: 0;
	}
	.badge-label {
		font-size: 0.688rem;
		font-weight: 600;
		letter-spacing: 0.2em;
		color: rgba(255,255,255,0.55);
		text-transform: uppercase;
	}

	.hero-title {
		font-family: var(--font-display), 'Bebas Neue', sans-serif;
		font-size: clamp(3.5rem, 8vw, 6rem);
		line-height: 0.93;
		color: white;
		text-transform: uppercase;
		letter-spacing: -0.01em;
		margin: 0 0 1rem;
	}

	.hero-subtitle {
		font-size: 1.25rem;
		font-weight: 500;
		color: rgba(255,255,255,0.6);
		font-style: italic;
		margin: 0 0 1rem;
	}

	.hero-desc {
		font-size: 1rem;
		line-height: 1.75;
		color: rgba(255,255,255,0.45);
		margin: 0;
	}

	.hero-fade-bottom {
		position: absolute;
		bottom: 0; left: 0; right: 0;
		height: 4rem;
		background: linear-gradient(to top, var(--background), transparent);
		z-index: 5;
		pointer-events: none;
	}

	/* ══════════════════════════════
	   INFO SECTION
	══════════════════════════════ */
	.info-section {
		padding: 2rem 1.5rem 4rem;
		position: relative;
		z-index: 10;
	}
	.info-container {
		max-width: 1200px;
		margin: 0 auto;
	}
	.info-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}
	@media (min-width: 768px) {
		.info-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.info-card {
		position: relative;
		padding: 2rem;
		border-radius: 1.25rem;
		border: 1px solid rgba(255,255,255,0.06);
		background: rgba(255,255,255,0.02);
		overflow: hidden;
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0ms);
	}
	.info-card.visible {
		opacity: 1;
		transform: none;
	}
	.info-card:hover {
		background: rgba(255,255,255,0.04);
		border-color: rgba(220,38,38,0.2);
	}

	.ic-accent {
		position: absolute;
		top: 0; left: 0;
		width: 100%; height: 2px;
		background: linear-gradient(90deg, transparent, var(--primary), transparent);
		opacity: 0;
		transition: opacity 0.3s ease;
	}
	.info-card:hover .ic-accent { opacity: 1; }

	.ic-icon-wrap {
		width: 50px; height: 50px;
		border-radius: 1rem;
		background: rgba(220,38,38,0.08);
		color: var(--primary);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1.25rem;
		transition: all 0.3s ease;
	}
	.info-card:hover .ic-icon-wrap {
		background: var(--primary);
		color: white;
		transform: scale(1.05);
	}

	.ic-title {
		font-size: 1.125rem;
		font-weight: 600;
		color: white;
		margin: 0 0 0.5rem;
	}

	.ic-desc {
		font-size: 0.938rem;
		color: rgba(255,255,255,0.5);
		margin: 0 0 1.25rem;
	}

	.ic-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--primary);
		text-decoration: none;
		transition: opacity 0.2s ease;
	}
	.ic-link:hover { opacity: 0.8; }
	.ic-arrow {
		transition: transform 0.2s ease;
	}
	.ic-link:hover .ic-arrow { transform: translateX(3px); }


	/* ══════════════════════════════
	   MAIN CONTACT (FORM & MAP)
	══════════════════════════════ */
	.main-contact-section {
		padding: 4rem 1.5rem 8rem;
        position: relative;
	}

    .contact-bg {
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at 100% 50%, oklch(0.55 0.22 25.26 / 5%) 0%, transparent 50%);
        pointer-events: none;
    }

	.contact-container {
		max-width: 1200px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
	}

	@media (min-width: 1024px) {
		.contact-container {
			grid-template-columns: 5fr 4fr;
			gap: 4rem;
		}
	}

	.form-wrapper {
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
	}
    .form-wrapper.visible {
        opacity: 1;
        transform: none;
    }

	.form-header {
		margin-bottom: 2rem;
	}
	.form-header h2 {
		font-family: var(--font-display), 'Bebas Neue', sans-serif;
		font-size: clamp(2.5rem, 5vw, 3.5rem);
		line-height: 1;
		color: white;
		margin: 0 0 1rem;
		text-transform: uppercase;
		letter-spacing: 0.02em;
	}
	.form-header p {
		color: rgba(255,255,255,0.5);
		font-size: 1rem;
		margin: 0;
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}
	@media (min-width: 640px) {
		.form-row {
			grid-template-columns: 1fr 1fr;
		}
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.form-group label {
		font-size: 0.875rem;
		font-weight: 500;
		color: rgba(255,255,255,0.7);
	}

	.form-group input,
	.form-group select,
	.form-group textarea {
		width: 100%;
		padding: 1rem 1.25rem;
		border-radius: 0.75rem;
		border: 1px solid rgba(255,255,255,0.1);
		background: rgba(255,255,255,0.03);
		color: white;
		font-family: inherit;
		font-size: 0.938rem;
		transition: all 0.3s ease;
	}
    .form-group select {
        appearance: none;
        background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
        background-repeat: no-repeat;
        background-position: right 1.2rem top 50%;
        background-size: 0.65rem auto;
    }
    .form-group select option {
        background: #111; /* dark styling for dropdown */
        color: white;
    }

	.form-group input:focus,
	.form-group select:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: var(--primary);
		background: rgba(255,255,255,0.05);
		box-shadow: 0 0 0 2px rgba(220,38,38,0.2);
	}
    
    .form-group input::placeholder,
    .form-group textarea::placeholder {
        color: rgba(255,255,255,0.2);
    }

	.form-group textarea {
		resize: vertical;
		min-height: 120px;
	}

	.submit-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding: 1rem 2rem;
		border-radius: 9999px;
		background: var(--primary);
		color: white;
		font-weight: 600;
		font-size: 1rem;
		border: none;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 4px 15px oklch(0.55 0.22 25.26 / 30%);
		align-self: flex-start;
	}
	.submit-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px oklch(0.55 0.22 25.26 / 40%);
		background: oklch(0.6 0.22 25.26);
	}
	.submit-btn:active {
		transform: translateY(0);
	}

    /* Map side */
    .map-wrapper {
        opacity: 0;
		transform: translateY(30px);
		transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1) 150ms;
        display: flex;
        flex-direction: column;
    }
    .map-wrapper.visible {
        opacity: 1;
        transform: none;
    }

    .map-container {
        flex: 1;
        min-height: 380px;
        border-radius: 1.5rem;
        overflow: hidden;
        border: 1px solid rgba(220, 38, 38, 0.15);
        padding: 0.5rem;
        background: rgba(255,255,255,0.02);
        box-shadow: 0 0 30px rgba(220, 38, 38, 0.06);
    }
    
    .map-container iframe {
        border-radius: 1rem;
        transition: all 0.3s ease;
    }

    /* ── Map location badge ── */
    .map-location-badge {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.875rem 1.125rem;
        margin-bottom: 0.75rem;
        border-radius: 1rem;
        background: rgba(220, 38, 38, 0.06);
        border: 1px solid rgba(220, 38, 38, 0.2);
        flex-wrap: wrap;
    }

    .map-pin-icon {
        flex-shrink: 0;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: var(--primary);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 12px rgba(220, 38, 38, 0.4);
    }

    .map-location-text {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.1rem;
        min-width: 0;
    }

    .map-location-label {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--primary);
    }

    .map-location-addr {
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.6);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .map-open-btn {
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.45rem 0.875rem;
        border-radius: 9999px;
        font-size: 0.75rem;
        font-weight: 600;
        color: white;
        background: var(--primary);
        text-decoration: none;
        transition: all 0.2s ease;
        box-shadow: 0 3px 10px rgba(220, 38, 38, 0.3);
    }

    .map-open-btn:hover {
        background: oklch(0.6 0.22 25.26);
        transform: translateY(-1px);
        box-shadow: 0 6px 16px rgba(220, 38, 38, 0.4);
    }

	@keyframes pulse {
		0%, 100% { opacity: 1; transform: scale(1); }
		50% { opacity: 0.5; transform: scale(1.2); }
	}
</style>
