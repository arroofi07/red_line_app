<script lang="ts">
	let { children } = $props();

	// ── Simple password gate ──
	const ADMIN_PASSWORD = 'redline2025'; // ganti sesuai kebutuhan

	let isAuthenticated = $state(false);
	let password = $state('');
	let error = $state('');
	let showPassword = $state(false);

	import { onMount } from 'svelte';
	import { page } from '$app/state';

	onMount(() => {
		isAuthenticated = sessionStorage.getItem('rl_admin') === 'true';
	});

	function login() {
		if (password === ADMIN_PASSWORD) {
			sessionStorage.setItem('rl_admin', 'true');
			isAuthenticated = true;
			error = '';
		} else {
			error = 'Password salah. Coba lagi.';
		}
	}

	function logout() {
		sessionStorage.removeItem('rl_admin');
		isAuthenticated = false;
		password = '';
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') login();
	}

	const navItems = [
		{ href: '/admin', label: 'Dashboard', icon: '📊' },
		{ href: '/admin/blogs', label: 'Manajemen Blog', icon: '📝' },
		{ href: '/admin/blogs/create', label: 'Buat Blog Baru', icon: '✏️' },
		{ href: '/admin/productions', label: 'Production', icon: '🎬' },
		{ href: '/admin/events', label: 'Events', icon: '🎪' },
		{ href: '/admin/services', label: 'Services', icon: '🖼️' },
		{ href: '/admin/storage', label: 'Storage & Kuota', icon: '💾' },
		{ href: '/', label: '← Kembali ke Site', icon: '🌐' }
	];

	const landingSubItems = [
		{ href: '/admin/landing/event-gallery', label: 'Event Gallery', icon: '🖼️' },
		{ href: '/admin/landing/latest-event', label: 'Latest Event', icon: '🎪' },
		{ href: '/admin/landing/insight-posts', label: 'Insight & Post', icon: '📰' }
	];

	let currentPath = $derived(page.url.pathname);

	// Auto-buka dropdown jika sedang di halaman landing
	let landingOpen = $state(false);
	$effect(() => {
		if (currentPath.startsWith('/admin/landing')) landingOpen = true;
	});
</script>

<svelte:head>
	<title>Admin — Redline Communication</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

{#if !isAuthenticated}
	<!-- Password Gate -->
	<div class="auth-gate">
		<div class="auth-bg-orb auth-orb1"></div>
		<div class="auth-bg-orb auth-orb2"></div>
		<div class="auth-card">
			<div class="auth-logo">
				<span class="auth-logo-dot"></span>
				<span class="auth-logo-text">REDLINE <span>ADMIN</span></span>
			</div>
			<h1 class="auth-title">Area Terbatas</h1>
			<p class="auth-subtitle">Masukkan password untuk mengakses panel admin.</p>

			<div class="auth-field">
				<label for="admin-password" class="auth-label">Password</label>
				<div class="auth-input-wrap">
					<input
						id="admin-password"
						type={showPassword ? 'text' : 'password'}
						bind:value={password}
						onkeydown={handleKeydown}
						placeholder="Masukkan password admin"
						class="auth-input"
					/>
					<button class="auth-toggle-eye" onclick={() => (showPassword = !showPassword)}>
						{showPassword ? '🙈' : '👁️'}
					</button>
				</div>
				{#if error}
					<p class="auth-error">{error}</p>
				{/if}
			</div>

			<button class="auth-btn" onclick={login}>Masuk ke Admin</button>
		</div>
	</div>
{:else}
	<!-- Admin Shell -->
	<div class="admin-shell">
		<!-- Sidebar -->
		<aside class="admin-sidebar">
			<div class="admin-brand">
				<span class="admin-brand-dot"></span>
				<div>
					<div class="admin-brand-name">REDLINE</div>
					<div class="admin-brand-sub">Admin Panel</div>
				</div>
			</div>

			<nav class="admin-nav">
				{#each navItems as item}
					<!-- Sisipkan dropdown "Halaman Depan" sebelum Storage -->
					{#if item.href === '/admin/storage'}
						<div class="nav-group">
							<button
								type="button"
								class="admin-nav-item nav-group-toggle"
								class:active={currentPath.startsWith('/admin/landing')}
								onclick={() => (landingOpen = !landingOpen)}
							>
								<span class="admin-nav-icon">🏠</span>
								<span class="nav-group-label">Halaman Depan</span>
								<span class="nav-chevron" class:open={landingOpen}>›</span>
							</button>
							{#if landingOpen}
								<div class="nav-sub">
									{#each landingSubItems as sub}
										<a
											href={sub.href}
											class="admin-nav-item nav-sub-item"
											class:active={currentPath.startsWith(sub.href)}
										>
											<span class="admin-nav-icon">{sub.icon}</span>
											<span>{sub.label}</span>
										</a>
									{/each}
								</div>
							{/if}
						</div>
					{/if}

					<a
						href={item.href}
						class="admin-nav-item"
						class:active={item.href === '/admin'
							? currentPath === '/admin'
							: item.href !== '/' && currentPath.startsWith(item.href)}
					>
						<span class="admin-nav-icon">{item.icon}</span>
						<span>{item.label}</span>
					</a>
				{/each}
			</nav>

			<button class="admin-logout" onclick={logout}>
				<span>🚪</span>
				<span>Keluar</span>
			</button>
		</aside>

		<!-- Main Content -->
		<main class="admin-main">
			{@render children()}
		</main>
	</div>
{/if}

<style>
	:global(*, *::before, *::after) {
		box-sizing: border-box;
	}
	:global(body) {
		margin: 0;
		font-family: 'Outfit', sans-serif;
		background: #050505;
		color: #f0f0f0;
	}

	/* ── Auth Gate ── */
	.auth-gate {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #050505;
		position: relative;
		overflow: hidden;
	}
	.auth-bg-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(120px);
		pointer-events: none;
	}
	.auth-orb1 {
		width: 500px;
		height: 500px;
		background: radial-gradient(circle, rgba(220, 38, 38, 0.12) 0%, transparent 70%);
		top: -10%;
		right: -10%;
	}
	.auth-orb2 {
		width: 400px;
		height: 400px;
		background: radial-gradient(circle, rgba(220, 38, 38, 0.08) 0%, transparent 70%);
		bottom: -10%;
		left: -10%;
	}
	.auth-card {
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(20px);
		border-radius: 1.5rem;
		padding: 2.5rem;
		width: 100%;
		max-width: 400px;
		position: relative;
		z-index: 1;
	}
	.auth-logo {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}
	.auth-logo-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: #dc2626;
		box-shadow: 0 0 12px rgba(220, 38, 38, 0.8);
		animation: pulse 2s ease-in-out infinite;
	}
	.auth-logo-text {
		font-family: 'Bebas Neue', sans-serif;
		font-size: 1.25rem;
		letter-spacing: 0.1em;
		color: white;
	}
	.auth-logo-text span {
		color: #dc2626;
	}
	.auth-title {
		font-family: 'Bebas Neue', sans-serif;
		font-size: 2rem;
		color: white;
		margin: 0 0 0.5rem;
	}
	.auth-subtitle {
		color: rgba(255, 255, 255, 0.45);
		font-size: 0.9rem;
		margin: 0 0 1.75rem;
	}
	.auth-field {
		margin-bottom: 1.25rem;
	}
	.auth-label {
		display: block;
		font-size: 0.8rem;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.6);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		margin-bottom: 0.5rem;
	}
	.auth-input-wrap {
		position: relative;
	}
	.auth-input {
		width: 100%;
		padding: 0.75rem 3rem 0.75rem 1rem;
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 0.75rem;
		color: white;
		font-size: 1rem;
		font-family: inherit;
		outline: none;
		transition: border-color 0.2s;
	}
	.auth-input:focus {
		border-color: rgba(220, 38, 38, 0.6);
	}
	.auth-toggle-eye {
		position: absolute;
		right: 0.75rem;
		top: 50%;
		transform: translateY(-50%);
		background: none;
		border: none;
		cursor: pointer;
		font-size: 1rem;
		padding: 0;
		line-height: 1;
	}
	.auth-error {
		color: #f87171;
		font-size: 0.8rem;
		margin: 0.5rem 0 0;
	}
	.auth-btn {
		width: 100%;
		padding: 0.85rem;
		background: #dc2626;
		color: white;
		border: none;
		border-radius: 0.75rem;
		font-size: 1rem;
		font-weight: 700;
		font-family: inherit;
		cursor: pointer;
		transition: all 0.2s;
	}
	.auth-btn:hover {
		background: #b91c1c;
		transform: translateY(-1px);
		box-shadow: 0 8px 20px rgba(220, 38, 38, 0.3);
	}
	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
			transform: scale(1);
		}
		50% {
			opacity: 0.6;
			transform: scale(1.3);
		}
	}

	/* ── Admin Shell ── */
	.admin-shell {
		display: flex;
		min-height: 100vh;
		background: #050505;
	}

	/* ── Sidebar ── */
	.admin-sidebar {
		width: 240px;
		flex-shrink: 0;
		background: rgba(255, 255, 255, 0.03);
		border-right: 1px solid rgba(255, 255, 255, 0.07);
		display: flex;
		flex-direction: column;
		padding: 1.5rem 1rem;
		position: sticky;
		top: 0;
		height: 100vh;
		overflow-y: auto;
	}
	.admin-brand {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem 0.75rem 1.5rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.07);
		margin-bottom: 1.25rem;
	}
	.admin-brand-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: #dc2626;
		box-shadow: 0 0 10px rgba(220, 38, 38, 0.7);
		flex-shrink: 0;
	}
	.admin-brand-name {
		font-family: 'Bebas Neue', sans-serif;
		font-size: 1.1rem;
		letter-spacing: 0.12em;
		color: white;
		line-height: 1;
	}
	.admin-brand-sub {
		font-size: 0.65rem;
		color: rgba(255, 255, 255, 0.35);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-top: 2px;
	}
	.admin-nav {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		flex: 1;
	}
	.admin-nav-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.65rem 0.875rem;
		border-radius: 0.625rem;
		text-decoration: none;
		color: rgba(255, 255, 255, 0.55);
		font-size: 0.875rem;
		font-weight: 500;
		transition: all 0.2s;
	}
	.admin-nav-item:hover {
		background: rgba(255, 255, 255, 0.06);
		color: white;
	}
	.admin-nav-item.active {
		background: rgba(220, 38, 38, 0.15);
		color: #f87171;
		border: 1px solid rgba(220, 38, 38, 0.2);
	}
	.admin-nav-icon {
		font-size: 1rem;
		width: 20px;
		text-align: center;
	}

	/* ── Dropdown "Halaman Depan" ── */
	.nav-group {
		display: flex;
		flex-direction: column;
	}
	.nav-group-toggle {
		width: 100%;
		background: none;
		border: none;
		cursor: pointer;
		font-family: inherit;
		justify-content: flex-start;
	}
	.nav-group-label {
		flex: 1;
		text-align: left;
	}
	.nav-chevron {
		font-size: 1rem;
		color: rgba(255, 255, 255, 0.3);
		transition: transform 0.25s;
		display: inline-block;
		line-height: 1;
	}
	.nav-chevron.open {
		transform: rotate(90deg);
	}
	.nav-sub {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		padding-left: 0.75rem;
		margin-top: 0.15rem;
	}
	.nav-sub-item {
		padding: 0.5rem 0.75rem;
		font-size: 0.825rem;
	}
	.admin-logout {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.65rem 0.875rem;
		border-radius: 0.625rem;
		background: none;
		border: 1px solid rgba(255, 255, 255, 0.08);
		color: rgba(255, 255, 255, 0.4);
		font-size: 0.875rem;
		font-family: inherit;
		cursor: pointer;
		transition: all 0.2s;
		margin-top: 1rem;
	}
	.admin-logout:hover {
		background: rgba(220, 38, 38, 0.1);
		border-color: rgba(220, 38, 38, 0.3);
		color: #f87171;
	}

	/* ── Main ── */
	.admin-main {
		flex: 1;
		min-width: 0;
		padding: 2rem;
		overflow-y: auto;
	}
</style>
