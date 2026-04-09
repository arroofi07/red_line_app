<script lang="ts">
	import { goto } from '$app/navigation';
	import { createBlog, generateSlug } from '$lib/firebase/blogs';
	import { uploadBlogImage } from '$lib/firebase/storage';

	// ── Form state ──
	let title = $state('');
	let slug = $state('');
	let slugEdited = $state(false);
	let category = $state('');
	let tag = $state('');
	let excerpt = $state('');
	let content = $state('');
	let author = $state('Tim Redline');
	let readTime = $state('');
	let imageFile = $state<File | null>(null);
	let imagePreview = $state('');
	let originalSize = $state(0);

	// ── UI state ──
	let saving = $state(false);
	let errors = $state<Record<string, string>>({});
	let successMsg = $state('');

	const CATEGORIES = ['Event Organizer', 'MICE', 'Production', 'Branding', 'Tips & Trik'];
	const TAGS = ['Featured', 'Tips', 'Insight', 'Case Study', 'News'];

	// Auto-generate slug dari title
	$effect(() => {
		if (!slugEdited && title) {
			slug = generateSlug(title);
		}
	});

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
		if (!category) e.category = 'Kategori wajib dipilih.';
		if (!excerpt.trim()) e.excerpt = 'Ringkasan wajib diisi.';
		if (!content.trim()) e.content = 'Konten wajib diisi.';
		errors = e;
		return Object.keys(e).length === 0;
	}

	async function handleSubmit() {
		if (!validate()) return;
		saving = true;
		successMsg = '';
		try {
			// Upload gambar jika ada (kompresi otomatis di dalam fungsi)
			let imageUrl = '';
			let imagePath = '';
			if (imageFile) {
				const tempId = `${Date.now()}`;
				const result = await uploadBlogImage(imageFile, tempId);
				imageUrl = result.imageUrl;
				imagePath = result.imagePath;
			}

			await createBlog({
				title: title.trim(),
				slug,
				category,
				tag,
				excerpt: excerpt.trim(),
				content: content.trim(),
				imageUrl,
				imagePath,
				author: author.trim() || 'Tim Redline',
				readTime: readTime.trim() || `${Math.ceil(content.split(' ').length / 200)} min read`
			});

			successMsg = 'Blog berhasil dibuat! Mengarahkan...';
			setTimeout(() => goto('/admin/blogs'), 1500);
		} catch (err) {
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
	<title>Buat Blog Baru — Admin Redline</title>
</svelte:head>

<div class="page">
	<div class="page-header">
		<div>
			<a href="/admin/blogs" class="back-link">← Kembali ke Daftar Blog</a>
			<h1 class="page-title">Buat Blog Baru</h1>
		</div>
	</div>

	{#if errors.global}
		<div class="alert-error">{errors.global}</div>
	{/if}
	{#if successMsg}
		<div class="alert-success">✅ {successMsg}</div>
	{/if}

	<form class="form-grid" onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
		<!-- Kolom Kiri -->
		<div class="form-col-main">
			<!-- Title -->
			<div class="field" class:has-error={errors.title}>
				<label class="label" for="title">Judul <span class="required">*</span></label>
				<input id="title" type="text" bind:value={title} placeholder="Judul artikel..." class="input" />
				{#if errors.title}<span class="field-error">{errors.title}</span>{/if}
			</div>

			<!-- Slug -->
			<div class="field">
				<label class="label" for="slug">
					Slug URL
					<span class="label-hint">(auto-generate dari judul)</span>
				</label>
				<div class="slug-wrap">
					<span class="slug-prefix">/blogs/</span>
					<input
						id="slug"
						type="text"
						bind:value={slug}
						oninput={() => (slugEdited = true)}
						placeholder="slug-url-artikel"
						class="input slug-input"
					/>
				</div>
			</div>

			<!-- Excerpt -->
			<div class="field" class:has-error={errors.excerpt}>
				<label class="label" for="excerpt">Ringkasan <span class="required">*</span></label>
				<textarea
					id="excerpt"
					bind:value={excerpt}
					rows="3"
					placeholder="Deskripsi singkat artikel (tampil di card)..."
					class="input textarea"
				></textarea>
				<span class="char-count">{excerpt.length}/250</span>
				{#if errors.excerpt}<span class="field-error">{errors.excerpt}</span>{/if}
			</div>

			<!-- Content -->
			<div class="field" class:has-error={errors.content}>
				<label class="label" for="content">
					Konten Artikel <span class="required">*</span>
					<span class="label-hint">(pisahkan paragraf dengan baris kosong)</span>
				</label>
				<textarea
					id="content"
					bind:value={content}
					rows="16"
					placeholder="Tulis konten artikel di sini...

Pisahkan antar paragraf dengan baris kosong.

Untuk subjudul, tulis teks biasa sebagai pembuka paragraf baru."
					class="input textarea content-area"
				></textarea>
				<div class="content-meta">
					<span class="char-count">{content.split(' ').filter(Boolean).length} kata</span>
					<span>· ~{Math.ceil(content.split(' ').filter(Boolean).length / 200)} min read</span>
				</div>
				{#if errors.content}<span class="field-error">{errors.content}</span>{/if}
			</div>
		</div>

		<!-- Kolom Kanan -->
		<div class="form-col-side">
			<!-- Publish -->
			<div class="side-card">
				<h3 class="side-card-title">Publikasi</h3>
				<button type="submit" class="submit-btn" disabled={saving}>
					{saving ? '⏳ Menyimpan...' : '🚀 Terbitkan Blog'}
				</button>
				<a href="/admin/blogs" class="cancel-link">Batalkan</a>
			</div>

			<!-- Gambar -->
			<div class="side-card">
				<h3 class="side-card-title">Gambar Sampul</h3>
				{#if imagePreview}
					<div class="image-preview-wrap">
						<img src={imagePreview} alt="Preview" class="image-preview" />
						<button type="button" class="remove-image" onclick={removeImage}>✕ Hapus</button>
					</div>
					<p class="image-info">
						📦 Ukuran asli: {formatBytes(originalSize)}
						<br />
						<span class="compress-note">🗜️ Akan dikompres otomatis ke ~200-400KB</span>
					</p>
				{:else}
					<label class="image-upload-zone" for="image-input">
						<span class="upload-icon">📷</span>
						<span class="upload-text">Klik untuk upload gambar</span>
						<span class="upload-hint">JPG, PNG, WEBP · Maks. 10MB</span>
						<span class="upload-hint compress-note">🗜️ Dikompres otomatis ke 800px</span>
					</label>
				{/if}
				<input
					id="image-input"
					type="file"
					accept="image/*"
					onchange={handleImageChange}
					class="sr-only"
				/>
				{#if errors.image}
					<span class="field-error">{errors.image}</span>
				{/if}
			</div>

			<!-- Kategori & Tag -->
			<div class="side-card">
				<h3 class="side-card-title">Klasifikasi</h3>

				<div class="field" class:has-error={errors.category}>
					<label class="label" for="category">Kategori <span class="required">*</span></label>
					<select id="category" bind:value={category} class="input select">
						<option value="">— Pilih Kategori —</option>
						{#each CATEGORIES as cat}
							<option value={cat}>{cat}</option>
						{/each}
					</select>
					{#if errors.category}<span class="field-error">{errors.category}</span>{/if}
				</div>

				<div class="field">
					<label class="label" for="tag">Tag Badge</label>
					<select id="tag" bind:value={tag} class="input select">
						<option value="">— Pilih Tag —</option>
						{#each TAGS as t}
							<option value={t}>{t}</option>
						{/each}
					</select>
				</div>
			</div>

			<!-- Author & Read Time -->
			<div class="side-card">
				<h3 class="side-card-title">Detail Penulis</h3>

				<div class="field">
					<label class="label" for="author">Penulis</label>
					<input id="author" type="text" bind:value={author} placeholder="Nama penulis" class="input" />
				</div>

				<div class="field">
					<label class="label" for="readtime">Estimasi Baca</label>
					<input
						id="readtime"
						type="text"
						bind:value={readTime}
						placeholder="Kosongkan = auto (misal: 5 min read)"
						class="input"
					/>
				</div>
			</div>
		</div>
	</form>
</div>

<style>
	.page { display: flex; flex-direction: column; gap: 1.5rem; }
	.back-link {
		font-size: 0.8rem; color: rgba(255,255,255,0.4); text-decoration: none;
		display: inline-block; margin-bottom: 0.5rem; transition: color 0.2s;
	}
	.back-link:hover { color: #f87171; }
	.page-title {
		font-family: 'Bebas Neue', sans-serif; font-size: 2.25rem;
		color: white; margin: 0; letter-spacing: 0.04em;
	}

	/* Form grid */
	.form-grid {
		display: grid;
		grid-template-columns: 1fr 300px;
		gap: 1.5rem;
		align-items: start;
	}
	@media (max-width: 900px) {
		.form-grid { grid-template-columns: 1fr; }
		.form-col-side { order: -1; }
	}

	.form-col-main { display: flex; flex-direction: column; gap: 1.25rem; }
	.form-col-side { display: flex; flex-direction: column; gap: 1rem; }

	/* Side card */
	.side-card {
		background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
		border-radius: 0.875rem; padding: 1.125rem;
		display: flex; flex-direction: column; gap: 0.875rem;
	}
	.side-card-title {
		font-size: 0.8rem; font-weight: 700; text-transform: uppercase;
		letter-spacing: 0.08em; color: rgba(255,255,255,0.5); margin: 0;
	}

	/* Fields */
	.field { display: flex; flex-direction: column; gap: 0.375rem; }
	.field.has-error .input { border-color: rgba(220,38,38,0.5); }
	.label {
		font-size: 0.78rem; font-weight: 700; text-transform: uppercase;
		letter-spacing: 0.07em; color: rgba(255,255,255,0.5);
	}
	.label-hint { font-weight: 400; text-transform: none; letter-spacing: 0; color: rgba(255,255,255,0.3); }
	.required { color: #f87171; }
	.input {
		width: 100%; padding: 0.7rem 0.875rem;
		background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
		border-radius: 0.625rem; color: white; font-size: 0.9rem; font-family: inherit;
		outline: none; transition: border-color 0.2s; resize: none;
	}
	.input:focus { border-color: rgba(220,38,38,0.5); }
	.textarea { resize: vertical; line-height: 1.6; }
	.content-area { min-height: 320px; }
	.select {
		cursor: pointer; appearance: none;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
		background-repeat: no-repeat; background-position: right 0.75rem center;
		padding-right: 2rem;
	}
	.select option { background: #1a1a1a; }
	.field-error { font-size: 0.75rem; color: #f87171; }
	.char-count { font-size: 0.72rem; color: rgba(255,255,255,0.3); text-align: right; }
	.content-meta { display: flex; gap: 0.5rem; font-size: 0.72rem; color: rgba(255,255,255,0.3); }

	/* Slug */
	.slug-wrap { display: flex; align-items: center; gap: 0; }
	.slug-prefix {
		padding: 0.7rem 0.625rem; background: rgba(255,255,255,0.03);
		border: 1px solid rgba(255,255,255,0.1); border-right: none;
		border-radius: 0.625rem 0 0 0.625rem; font-size: 0.8rem;
		color: rgba(255,255,255,0.3); white-space: nowrap; flex-shrink: 0;
	}
	.slug-input { border-radius: 0 0.625rem 0.625rem 0; flex: 1; }

	/* Image upload */
	.image-upload-zone {
		display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
		padding: 1.5rem 1rem; border: 2px dashed rgba(255,255,255,0.12);
		border-radius: 0.75rem; cursor: pointer; transition: all 0.2s; text-align: center;
	}
	.image-upload-zone:hover { border-color: rgba(220,38,38,0.4); background: rgba(220,38,38,0.05); }
	.upload-icon { font-size: 2rem; }
	.upload-text { font-size: 0.875rem; font-weight: 600; color: rgba(255,255,255,0.6); }
	.upload-hint { font-size: 0.72rem; color: rgba(255,255,255,0.3); }
	.compress-note { color: rgba(220,180,38,0.7); }
	.image-preview-wrap { position: relative; }
	.image-preview {
		width: 100%; aspect-ratio: 16/9; object-fit: cover; border-radius: 0.625rem;
	}
	.remove-image {
		position: absolute; top: 0.5rem; right: 0.5rem;
		background: rgba(0,0,0,0.7); color: white; border: none;
		border-radius: 0.375rem; padding: 0.2rem 0.5rem; font-size: 0.7rem;
		cursor: pointer; transition: all 0.15s;
	}
	.remove-image:hover { background: rgba(220,38,38,0.8); }
	.image-info { font-size: 0.75rem; color: rgba(255,255,255,0.35); line-height: 1.6; }

	/* Submit */
	.submit-btn {
		width: 100%; padding: 0.8rem; background: #dc2626; color: white;
		border: none; border-radius: 0.625rem; font-size: 0.95rem;
		font-weight: 700; font-family: inherit; cursor: pointer; transition: all 0.2s;
	}
	.submit-btn:hover:not(:disabled) { background: #b91c1c; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(220,38,38,0.3); }
	.submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
	.cancel-link {
		text-align: center; font-size: 0.8rem; color: rgba(255,255,255,0.35);
		text-decoration: none; transition: color 0.2s;
	}
	.cancel-link:hover { color: rgba(255,255,255,0.6); }

	/* Alerts */
	.alert-error {
		padding: 0.875rem 1rem; background: rgba(220,38,38,0.12);
		border: 1px solid rgba(220,38,38,0.25); border-radius: 0.75rem;
		color: #f87171; font-size: 0.875rem;
	}
	.alert-success {
		padding: 0.875rem 1rem; background: rgba(34,197,94,0.1);
		border: 1px solid rgba(34,197,94,0.25); border-radius: 0.75rem;
		color: #86efac; font-size: 0.875rem;
	}
	.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }
</style>
