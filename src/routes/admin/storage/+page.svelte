<script lang="ts">
	import { onMount } from 'svelte';
	import {
		getFirestoreUsage,
		formatBytes,
		usagePercent,
		usageStatus,
		SPARK_LIMITS,
		type FirestoreUsage
	} from '$lib/firebase/usage';

	let usage = $state<FirestoreUsage | null>(null);
	let loading = $state(true);
	let error = $state('');
	let refreshing = $state(false);

	async function loadUsage() {
		try {
			usage = await getFirestoreUsage();
			error = '';
		} catch (e) {
			error = 'Gagal memuat data. Coba refresh halaman ini.';
		}
	}

	onMount(async () => {
		await loadUsage();
		loading = false;
	});

	async function refresh() {
		refreshing = true;
		await loadUsage();
		refreshing = false;
	}

	let totalPercent = $derived(
		usage ? usagePercent(usage.totalBytes, SPARK_LIMITS.firestoreStorageBytes) : 0
	);
	let totalStatus = $derived(usageStatus(totalPercent));

	function barColor(status: 'safe' | 'warning' | 'danger') {
		if (status === 'danger') return '#dc2626';
		if (status === 'warning') return '#f59e0b';
		return '#22c55e';
	}

	function badgeClass(status: 'safe' | 'warning' | 'danger') {
		if (status === 'danger') return 'badge-danger';
		if (status === 'warning') return 'badge-warning';
		return 'badge-safe';
	}

	function statusLabel(status: 'safe' | 'warning' | 'danger') {
		if (status === 'danger') return 'Hampir Penuh';
		if (status === 'warning') return 'Perlu Perhatian';
		return 'Aman';
	}
</script>

<svelte:head>
	<title>Kapasitas Penyimpanan — Admin Redline</title>
</svelte:head>

<div class="page">
	<!-- Header -->
	<div class="page-header">
		<div>
			<h1 class="page-title">Kapasitas Penyimpanan</h1>
			<p class="page-sub">Pantau ruang penyimpanan yang digunakan website Anda</p>
		</div>
		<button class="btn-refresh" onclick={refresh} disabled={refreshing}>
			<span class:spin={refreshing}>↻</span>
			{refreshing ? 'Memuat...' : 'Perbarui Data'}
		</button>
	</div>

	{#if loading}
		<div class="skeleton-wrap">
			{#each [1, 2, 3] as _}
				<div class="skeleton"></div>
			{/each}
		</div>
	{:else if error}
		<div class="alert-danger">
			<span>⚠️</span> {error}
		</div>
	{:else if usage}
		<!-- Alert banner -->
		{#if totalStatus === 'danger'}
			<div class="alert-danger">
				<span>🚨</span>
				<div>
					<strong>Penyimpanan hampir penuh!</strong> Sudah
					<strong>{totalPercent.toFixed(0)}%</strong> terpakai. Segera hapus konten lama (blog, foto, atau event) yang sudah tidak diperlukan agar website tetap berjalan normal.
				</div>
			</div>
		{:else if totalStatus === 'warning'}
			<div class="alert-warning">
				<span>⚠️</span>
				<div>
					<strong>Penyimpanan mulai penuh.</strong> Sudah {totalPercent.toFixed(0)}% terpakai. Pertimbangkan untuk menghapus konten lama sebelum menambah konten baru.
				</div>
			</div>
		{/if}

		<!-- Overview Card -->
		<div class="overview-card">
			<div class="overview-top">
				<div class="overview-left">
					<div class="overview-label">Penyimpanan Terpakai</div>
					<div class="overview-value">{formatBytes(usage.totalBytes)}</div>
					<div class="overview-limit">dari total {formatBytes(SPARK_LIMITS.firestoreStorageBytes)} yang tersedia</div>
				</div>
				<div class="overview-right">
					<div class="big-percent" style="color: {barColor(totalStatus)}">
						{totalPercent.toFixed(0)}%
					</div>
					<span class="badge {badgeClass(totalStatus)}">{statusLabel(totalStatus)}</span>
				</div>
			</div>

			<div class="progress-track">
				<div
					class="progress-fill"
					style="width: {totalPercent}%; background: {barColor(totalStatus)}; box-shadow: 0 0 10px {barColor(totalStatus)}55"
				></div>
			</div>

			<div class="progress-legend">
				<span>Kosong</span>
				<span style="color:{barColor(totalStatus)}">{formatBytes(usage.totalBytes)} terpakai</span>
				<span>Penuh (1 GB)</span>
			</div>
		</div>

		<!-- Quick Stats -->
		<div class="quick-stats">
			<div class="qs-card">
				<div class="qs-icon">📦</div>
				<div class="qs-body">
					<div class="qs-value">{formatBytes(SPARK_LIMITS.firestoreStorageBytes - usage.totalBytes)}</div>
					<div class="qs-label">Sisa Ruang</div>
				</div>
			</div>
			<div class="qs-card">
				<div class="qs-icon">🗂️</div>
				<div class="qs-body">
					<div class="qs-value">{usage.totalDocs}</div>
					<div class="qs-label">Total Konten</div>
				</div>
			</div>
			<div class="qs-card">
				<div class="qs-icon">📅</div>
				<div class="qs-body">
					<div class="qs-value">
						{usage.calculatedAt.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
					</div>
					<div class="qs-label">Diperbarui pukul</div>
				</div>
			</div>
		</div>

		<!-- Breakdown per kategori -->
		<div class="section-card">
			<div class="section-header">
				<h2 class="section-title">Rincian per Kategori</h2>
				<span class="section-sub">Konten mana yang paling banyak menggunakan ruang</span>
			</div>
			<div class="collection-list">
				{#each usage.collections as col}
					{@const colPctOfTotal = usage.totalBytes > 0 ? (col.estimatedBytes / usage.totalBytes) * 100 : 0}
					<div class="col-item">
						<div class="col-top">
							<div class="col-identity">
								<span class="col-icon">{col.icon}</span>
								<div>
									<div class="col-name">{col.displayName}</div>
									<div class="col-docs">{col.docCount} item tersimpan</div>
								</div>
							</div>
							<div class="col-size-wrap">
								<div class="col-size">{formatBytes(col.estimatedBytes)}</div>
								<div class="col-pct-label">{colPctOfTotal.toFixed(0)}% dari total</div>
							</div>
						</div>
						<div class="col-bar-track">
							<div
								class="col-bar-fill"
								style="width: {colPctOfTotal}%"
							></div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Tips -->
		<div class="tips-card">
			<div class="tips-header">
				<span>💡</span>
				<h3 class="tips-title">Tips Menghemat Penyimpanan</h3>
			</div>
			<div class="tips-list">
				<div class="tip-item">
					<span class="tip-num">1</span>
					<div>
						<strong>Hapus konten yang sudah tidak dipakai</strong>
						<p>Blog, event, atau produksi lama yang sudah tidak relevan bisa dihapus untuk membebaskan ruang.</p>
					</div>
				</div>
				<div class="tip-item">
					<span class="tip-num">2</span>
					<div>
						<strong>Gunakan foto yang sudah dikompresi</strong>
						<p>Saat mengunggah foto, pastikan ukuran file tidak terlalu besar. Foto yang lebih kecil = penyimpanan lebih hemat.</p>
					</div>
				</div>
				<div class="tip-item">
					<span class="tip-num">3</span>
					<div>
						<strong>Perbarui halaman ini sebelum menambah konten baru</strong>
						<p>Klik tombol "Perbarui Data" untuk melihat kondisi terkini, terutama jika penyimpanan sudah di atas 70%.</p>
					</div>
				</div>
				<div class="tip-item">
					<span class="tip-num">4</span>
					<div>
						<strong>Hubungi developer jika sudah di atas 90%</strong>
						<p>Jika indikator sudah merah, segera hubungi developer untuk penanganan lebih lanjut.</p>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
	}

	/* Header */
	.page-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.page-title {
		font-family: 'Bebas Neue', sans-serif;
		font-size: 2.25rem;
		color: white;
		margin: 0 0 0.25rem;
		letter-spacing: 0.04em;
	}
	.page-sub {
		color: rgba(255, 255, 255, 0.4);
		font-size: 0.9rem;
		margin: 0;
	}
	.btn-refresh {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.65rem 1.25rem;
		background: rgba(255, 255, 255, 0.06);
		color: rgba(255, 255, 255, 0.7);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 0.75rem;
		font-size: 0.9rem;
		font-family: inherit;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s;
	}
	.btn-refresh:hover:not(:disabled) {
		background: rgba(255, 255, 255, 0.1);
		color: white;
	}
	.btn-refresh:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	.spin {
		display: inline-block;
		animation: spin 0.8s linear infinite;
	}
	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	/* Skeleton */
	.skeleton-wrap { display: flex; flex-direction: column; gap: 1rem; }
	.skeleton {
		height: 120px;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 1rem;
		animation: shimmer 1.5s ease-in-out infinite;
	}
	@keyframes shimmer {
		0%, 100% { opacity: 0.4; }
		50% { opacity: 0.8; }
	}

	/* Alerts */
	.alert-danger, .alert-warning {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		padding: 1rem 1.25rem;
		border-radius: 0.875rem;
		font-size: 0.9rem;
		line-height: 1.5;
	}
	.alert-danger {
		background: rgba(220, 38, 38, 0.12);
		border: 1px solid rgba(220, 38, 38, 0.3);
		color: #fca5a5;
	}
	.alert-warning {
		background: rgba(245, 158, 11, 0.1);
		border: 1px solid rgba(245, 158, 11, 0.3);
		color: #fcd34d;
	}
	.alert-danger strong, .alert-warning strong { color: white; }

	/* Overview Card */
	.overview-card {
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.09);
		border-radius: 1.25rem;
		padding: 1.75rem;
	}
	.overview-top {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 1.25rem;
		flex-wrap: wrap;
	}
	.overview-label {
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: rgba(255, 255, 255, 0.4);
		margin-bottom: 0.35rem;
	}
	.overview-value {
		font-family: 'Bebas Neue', sans-serif;
		font-size: 2.5rem;
		color: white;
		line-height: 1;
	}
	.overview-limit {
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.3);
		margin-top: 0.25rem;
	}
	.overview-right {
		text-align: right;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.5rem;
	}
	.big-percent {
		font-family: 'Bebas Neue', sans-serif;
		font-size: 3rem;
		line-height: 1;
	}
	.badge {
		display: inline-block;
		padding: 0.2rem 0.7rem;
		border-radius: 999px;
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}
	.badge-safe {
		background: rgba(34, 197, 94, 0.15);
		color: #86efac;
		border: 1px solid rgba(34, 197, 94, 0.25);
	}
	.badge-warning {
		background: rgba(245, 158, 11, 0.15);
		color: #fcd34d;
		border: 1px solid rgba(245, 158, 11, 0.3);
	}
	.badge-danger {
		background: rgba(220, 38, 38, 0.2);
		color: #fca5a5;
		border: 1px solid rgba(220, 38, 38, 0.35);
	}
	.progress-track {
		height: 12px;
		background: rgba(255, 255, 255, 0.07);
		border-radius: 999px;
		overflow: hidden;
	}
	.progress-fill {
		height: 100%;
		border-radius: 999px;
		transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
		min-width: 2px;
	}
	.progress-legend {
		display: flex;
		justify-content: space-between;
		font-size: 0.72rem;
		color: rgba(255, 255, 255, 0.3);
		margin-top: 0.5rem;
	}

	/* Quick Stats */
	.quick-stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 1rem;
	}
	.qs-card {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-radius: 1rem;
		padding: 1.1rem 1.25rem;
		display: flex;
		align-items: center;
		gap: 0.875rem;
	}
	.qs-icon { font-size: 1.5rem; }
	.qs-value {
		font-family: 'Bebas Neue', sans-serif;
		font-size: 1.4rem;
		color: #dc2626;
		line-height: 1;
	}
	.qs-label {
		font-size: 0.7rem;
		color: rgba(255, 255, 255, 0.35);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		margin-top: 2px;
	}

	/* Section Card */
	.section-card {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-radius: 1rem;
		overflow: hidden;
	}
	.section-header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.5rem;
		padding: 1.25rem 1.5rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}
	.section-title {
		font-size: 1rem;
		font-weight: 700;
		color: white;
		margin: 0;
	}
	.section-sub {
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.3);
	}

	/* Collection List */
	.collection-list { display: flex; flex-direction: column; }
	.col-item {
		padding: 1.1rem 1.5rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
		transition: background 0.15s;
	}
	.col-item:last-child { border-bottom: none; }
	.col-item:hover { background: rgba(255, 255, 255, 0.02); }
	.col-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 0.75rem;
		flex-wrap: wrap;
	}
	.col-identity { display: flex; align-items: center; gap: 0.75rem; }
	.col-icon { font-size: 1.4rem; }
	.col-name { font-size: 0.95rem; font-weight: 600; color: white; }
	.col-docs { font-size: 0.72rem; color: rgba(255, 255, 255, 0.35); margin-top: 1px; }
	.col-size-wrap { text-align: right; }
	.col-size { font-size: 0.95rem; font-weight: 700; color: rgba(255, 255, 255, 0.85); }
	.col-pct-label { font-size: 0.7rem; color: rgba(255, 255, 255, 0.3); margin-top: 1px; }
	.col-bar-track {
		height: 6px;
		background: rgba(255, 255, 255, 0.06);
		border-radius: 999px;
		overflow: hidden;
	}
	.col-bar-fill {
		height: 100%;
		border-radius: 999px;
		background: #dc2626;
		opacity: 0.7;
		transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
		min-width: 2px;
	}

	/* Tips */
	.tips-card {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-radius: 1rem;
		padding: 1.5rem;
	}
	.tips-header {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		margin-bottom: 1.25rem;
	}
	.tips-header span { font-size: 1.25rem; }
	.tips-title { font-size: 1rem; font-weight: 700; color: white; margin: 0; }
	.tips-list { display: flex; flex-direction: column; gap: 1rem; }
	.tip-item {
		display: flex;
		align-items: flex-start;
		gap: 0.875rem;
	}
	.tip-num {
		flex-shrink: 0;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: rgba(220, 38, 38, 0.2);
		border: 1px solid rgba(220, 38, 38, 0.3);
		color: #f87171;
		font-size: 0.75rem;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 1px;
	}
	.tip-item strong {
		display: block;
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.9);
		margin-bottom: 0.2rem;
	}
	.tip-item p {
		margin: 0;
		font-size: 0.82rem;
		color: rgba(255, 255, 255, 0.45);
		line-height: 1.5;
	}
</style>
