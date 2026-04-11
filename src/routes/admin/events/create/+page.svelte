<script lang="ts">
	import { goto } from '$app/navigation';
	import { createEvent } from '$lib/firebase/events';
	import { uploadContentImage } from '$lib/firebase/storage';

	let title = $state('');
	let place = $state('');
	let imageFile = $state<File | null>(null);
	let imagePreview = $state('');
	let originalSize = $state(0);

	let saving = $state(false);
	let errors = $state<Record<string, string>>({});
	let successMsg = $state('');

	function handleImageChange(e: Event) {
		const input = e.target as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;
		if (!file.type.startsWith('image/')) {
			errors = { ...errors, image: 'File harus berupa gambar.' };
			return;
		}
		imageFile = file;
		originalSize = file.size;
		errors = { ...errors, image: '' };
		const reader = new FileReader();
		reader.onload = (ev) => {
			imagePreview = ev.target?.result as string;
		};
		reader.readAsDataURL(file);
	}

	function removeImage() {
		imageFile = null;
		imagePreview = '';
		originalSize = 0;
	}

	function validate(): boolean {
		const e: Record<string, string> = {};
		if (!title.trim()) e.title = 'Judul wajib diisi.';
		if (!imageFile) e.image = 'Gambar wajib diupload.';
		errors = e;
		return Object.keys(e).length === 0;
	}

	async function handleSubmit() {
		if (!validate()) return;
		saving = true;
		successMsg = '';
		try {
			let imageUrl = '';
			if (imageFile) {
				imageUrl = await uploadContentImage(imageFile);
			}

			await createEvent({
				title: title.trim(),
				subtitle: '',
				category: '',
				description: '',
				place: place.trim(),
				imageUrl,
				order: 0
			});

			successMsg = 'Event berhasil dibuat! Mengarahkan...';
			setTimeout(() => goto('/admin/events'), 1500);
		} catch {
			errors = { global: 'Terjadi kesalahan. Periksa koneksi dan coba lagi.' };
		} finally {
			saving = false;
		}
	}

	function formatBytes(bytes: number) {
		if (bytes < 1024) return `${bytes} B`;
		if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
		return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
	}
</script>

<svelte:head>
	<title>Tambah Event — Admin Redline</title>
</svelte:head>

<div class="page">
	<div class="page-header">
		<div>
			<a href="/admin/events" class="back-link">← Kembali ke Daftar Event</a>
			<h1 class="page-title">Tambah Event Baru</h1>
		</div>
	</div>

	{#if errors.global}
		<div class="alert-error">{errors.global}</div>
	{/if}
	{#if successMsg}
		<div class="alert-success">{successMsg}</div>
	{/if}

	<form class="form-grid" onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
		<div class="form-col-main">
			<div class="field" class:has-error={errors.title}>
				<label class="label" for="title">Judul <span class="required">*</span></label>
				<input id="title" type="text" bind:value={title} placeholder="Nama event..." class="input" />
				{#if errors.title}<span class="field-error">{errors.title}</span>{/if}
			</div>

			<div class="field">
				<label class="label" for="place">Lokasi</label>
				<input id="place" type="text" bind:value={place} placeholder="Lokasi event..." class="input" />
			</div>
		</div>

		<div class="form-col-side">
			<div class="side-card">
				<h3 class="side-card-title">Simpan</h3>
				<button type="submit" class="submit-btn" disabled={saving}>
					{saving ? '⏳ Menyimpan...' : 'Simpan Event'}
				</button>
				<a href="/admin/events" class="cancel-link">Batalkan</a>
			</div>

			<div class="side-card">
				<h3 class="side-card-title">Gambar <span class="required">*</span></h3>
				{#if imagePreview}
					<div class="image-preview-wrap">
						<img src={imagePreview} alt="Preview" class="image-preview" />
						<button type="button" class="remove-image" onclick={removeImage}>✕ Hapus</button>
					</div>
					<p class="image-info">
						Ukuran asli: {formatBytes(originalSize)}<br />
						<span class="compress-note">Akan dikompres otomatis ke ~30-60KB (WebP 600px)</span>
					</p>
				{:else}
					<label class="image-upload-zone" for="image-input">
						<span class="upload-icon">📷</span>
						<span class="upload-text">Klik untuk upload gambar</span>
						<span class="upload-hint">JPG, PNG, WEBP</span>
						<span class="upload-hint compress-note">Dikompres otomatis ke 600px WebP</span>
					</label>
				{/if}
				<input id="image-input" type="file" accept="image/*" onchange={handleImageChange} class="sr-only" />
				{#if errors.image}<span class="field-error">{errors.image}</span>{/if}
			</div>
		</div>
	</form>
</div>

<style>
	.page { display: flex; flex-direction: column; gap: 1.5rem; }
	.back-link { font-size: 0.8rem; color: rgba(255,255,255,0.4); text-decoration: none; display: inline-block; margin-bottom: 0.5rem; transition: color 0.2s; }
	.back-link:hover { color: #f87171; }
	.page-title { font-family: 'Bebas Neue', sans-serif; font-size: 2.25rem; color: white; margin: 0; letter-spacing: 0.04em; }

	.form-grid { display: grid; grid-template-columns: 1fr 300px; gap: 1.5rem; align-items: start; }
	@media (max-width: 900px) { .form-grid { grid-template-columns: 1fr; } .form-col-side { order: -1; } }
	.form-col-main { display: flex; flex-direction: column; gap: 1.25rem; }
	.form-col-side { display: flex; flex-direction: column; gap: 1rem; }

	.side-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 0.875rem; padding: 1.125rem; display: flex; flex-direction: column; gap: 0.875rem; }
	.side-card-title { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(255,255,255,0.5); margin: 0; }

	.field { display: flex; flex-direction: column; gap: 0.375rem; }
	.field.has-error .input { border-color: rgba(220,38,38,0.5); }
	.label { font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; color: rgba(255,255,255,0.5); }
	.required { color: #f87171; }
	.input { width: 100%; padding: 0.7rem 0.875rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 0.625rem; color: white; font-size: 0.9rem; font-family: inherit; outline: none; transition: border-color 0.2s; resize: none; }
	.input:focus { border-color: rgba(220,38,38,0.5); }
	.field-error { font-size: 0.75rem; color: #f87171; }

	.image-upload-zone { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; padding: 1.5rem 1rem; border: 2px dashed rgba(255,255,255,0.12); border-radius: 0.75rem; cursor: pointer; transition: all 0.2s; text-align: center; }
	.image-upload-zone:hover { border-color: rgba(220,38,38,0.4); background: rgba(220,38,38,0.05); }
	.upload-icon { font-size: 2rem; }
	.upload-text { font-size: 0.875rem; font-weight: 600; color: rgba(255,255,255,0.6); }
	.upload-hint { font-size: 0.72rem; color: rgba(255,255,255,0.3); }
	.compress-note { color: rgba(220,180,38,0.7); }
	.image-preview-wrap { position: relative; }
	.image-preview { width: 100%; aspect-ratio: 16/9; object-fit: cover; border-radius: 0.625rem; }
	.remove-image { position: absolute; top: 0.5rem; right: 0.5rem; background: rgba(0,0,0,0.7); color: white; border: none; border-radius: 0.375rem; padding: 0.2rem 0.5rem; font-size: 0.7rem; cursor: pointer; }
	.remove-image:hover { background: rgba(220,38,38,0.8); }
	.image-info { font-size: 0.75rem; color: rgba(255,255,255,0.35); line-height: 1.6; }

	.submit-btn { width: 100%; padding: 0.8rem; background: #dc2626; color: white; border: none; border-radius: 0.625rem; font-size: 0.95rem; font-weight: 700; font-family: inherit; cursor: pointer; transition: all 0.2s; }
	.submit-btn:hover:not(:disabled) { background: #b91c1c; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(220,38,38,0.3); }
	.submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
	.cancel-link { text-align: center; font-size: 0.8rem; color: rgba(255,255,255,0.35); text-decoration: none; }
	.cancel-link:hover { color: rgba(255,255,255,0.6); }

	.alert-error { padding: 0.875rem 1rem; background: rgba(220,38,38,0.12); border: 1px solid rgba(220,38,38,0.25); border-radius: 0.75rem; color: #f87171; font-size: 0.875rem; }
	.alert-success { padding: 0.875rem 1rem; background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.25); border-radius: 0.75rem; color: #86efac; font-size: 0.875rem; }
	.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }
</style>
