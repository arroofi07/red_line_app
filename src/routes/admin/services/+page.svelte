<script lang="ts">
	import { onMount } from 'svelte';
	import {
		FEATURED_SERVICE_SLUGS,
		FEATURED_SERVICES_STATIC,
		getServiceImages,
		type FeaturedServiceSlug
	} from '$lib/firebase/services';

	type Row = { slug: FeaturedServiceSlug; imageCount: number };

	let rows = $state<Row[]>([]);
	let loading = $state(true);
	let error = $state('');

	onMount(async () => {
		await loadData();
	});

	async function loadData() {
		loading = true;
		error = '';
		try {
			rows = await Promise.all(
				FEATURED_SERVICE_SLUGS.map(async (slug) => {
					const images = await getServiceImages(slug);
					return { slug, imageCount: images.length };
				})
			);
		} catch {
			error = 'Gagal memuat data galeri.';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Galeri Layanan — Admin Redline</title>
</svelte:head>

<div class="page">
	<div class="page-header">
		<div>
			<h1 class="page-title">Galeri layanan</h1>
			<p class="page-sub">
				Kelola foto untuk tiga layanan utama di halaman Services. Judul dan teks layanan tetap di situs;
				di sini hanya galeri.
			</p>
		</div>
	</div>

	{#if error}
		<div class="alert-error">{error}</div>
	{/if}

	{#if loading}
		<div class="skeleton-list">
			{#each [0, 1, 2] as i (i)}
				<div class="skeleton-row"></div>
			{/each}
		</div>
	{:else}
		<div class="table-wrap">
			<table class="data-table">
				<thead>
					<tr>
						<th>Layanan</th>
						<th>Galeri</th>
						<th>Aksi</th>
					</tr>
				</thead>
				<tbody>
					{#each rows as { slug, imageCount } (slug)}
						{@const meta = FEATURED_SERVICES_STATIC[slug]}
						<tr>
							<td>
								<div class="cell-info-only">
									<div class="cell-title">{meta.title}</div>
									<div class="cell-sub">{meta.subtitle}</div>
								</div>
							</td>
							<td><span class="badge-gallery">{imageCount} foto</span></td>
							<td>
								<a href="/admin/services/{slug}/edit" class="action-btn edit">Kelola foto</a>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
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
		max-width: 42rem;
		line-height: 1.5;
	}

	.table-wrap {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-radius: 1rem;
		overflow: hidden;
	}
	.data-table {
		width: 100%;
		border-collapse: collapse;
	}
	.data-table thead tr {
		border-bottom: 1px solid rgba(255, 255, 255, 0.07);
	}
	.data-table th {
		padding: 0.875rem 1rem;
		text-align: left;
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: rgba(255, 255, 255, 0.35);
		font-weight: 700;
	}
	.data-table td {
		padding: 0.875rem 1rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.04);
		vertical-align: middle;
	}
	.data-table tbody tr:last-child td {
		border-bottom: none;
	}
	.data-table tbody tr:hover td {
		background: rgba(255, 255, 255, 0.02);
	}

	.cell-info-only {
		min-width: 0;
	}
	.cell-title {
		font-size: 0.875rem;
		font-weight: 600;
		color: white;
	}
	.cell-sub {
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.35);
		margin-top: 2px;
	}

	.badge-gallery {
		display: inline-block;
		padding: 0.2rem 0.6rem;
		border-radius: 100px;
		background: rgba(59, 130, 246, 0.15);
		color: #93c5fd;
		font-size: 0.72rem;
		font-weight: 700;
		white-space: nowrap;
	}

	.action-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		padding: 0.3rem 0.7rem;
		border-radius: 0.4rem;
		font-size: 0.75rem;
		font-weight: 600;
		cursor: pointer;
		text-decoration: none;
		border: 1px solid transparent;
		font-family: inherit;
		transition: all 0.15s;
	}
	.action-btn.edit {
		background: rgba(220, 38, 38, 0.12);
		color: #f87171;
		border-color: rgba(220, 38, 38, 0.2);
	}
	.action-btn.edit:hover {
		background: rgba(220, 38, 38, 0.22);
	}

	.skeleton-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
	.skeleton-row {
		height: 70px;
		border-radius: 0.75rem;
		background: linear-gradient(
			90deg,
			rgba(255, 255, 255, 0.04) 25%,
			rgba(255, 255, 255, 0.07) 50%,
			rgba(255, 255, 255, 0.04) 75%
		);
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite;
	}
	@keyframes shimmer {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}

	.alert-error {
		padding: 0.875rem 1rem;
		background: rgba(220, 38, 38, 0.12);
		border: 1px solid rgba(220, 38, 38, 0.25);
		border-radius: 0.75rem;
		color: #f87171;
		font-size: 0.875rem;
	}
</style>
