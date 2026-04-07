Design Team Section — Implementation Plan
Overview
Implementasi section Board of Directors pada halaman utama, dengan animasi scroll-triggered dan card design kustom mengacu pada referensi visual yang diberikan.

Component
src/lib/components/team.svelte — [MODIFY]

Proposed Changes
1. Data Layer

Buat array members berisi 4 objek dengan properti: name, designation, image (path ke src/lib/assets/team/), dan slug (untuk key unik).
Scan folder src/lib/assets/team terlebih dahulu untuk mencocokkan nama file gambar yang tersedia dengan data array.

2. Card Component Design
Setiap card mereplikasi styling referensi dengan elemen berikut:
ElemenSpesifikasiBackgroundWarna merah solid (#D0222A)Border radiusBesar di sudut kiri atas saja (~2.5rem), sudut lain kecilWatermark textTeks "Directors" vertikal, transparan (outline/stroke), ukuran besar sebagai elemen dekoratifPhotoFoto person di-overlay di atas background, object-fit: cover, posisi top-centerInfo barNama dan label "Designation" di bagian bawah card, di atas fotoCorner accentPotongan putih di sudut kiri atas untuk mempertegas radius signature
3. Animasi (Tambahan dari plan awal)

Gunakan IntersectionObserver untuk memicu animasi hanya saat section masuk viewport.
Header section: fade + slide-up saat scroll masuk.
Cards: muncul dengan staggered delay (setiap card terlambat ~120ms dari sebelumnya) menggunakan CSS transition-delay.
Hover state per card: scale foto, shine sweep effect, arrow icon berubah warna.
Semua animasi harus respek prefers-reduced-motion.

4. Responsivitas
Mobile  (< 640px)  : 1 kolom
Tablet  (≥ 640px)  : 2 kolom
Desktop (≥ 1024px) : 4 kolom

Gunakan CSS Grid dengan grid-template-columns.
Tinggi card menggunakan aspect-ratio: 3/4 agar proporsional di semua breakpoint.

5. Fallback & Aksesibilitas

Jika gambar gagal dimuat, tampilkan avatar inisial dengan background merah gelap.
Setiap <img> wajib memiliki alt berisi nama member.
Pastikan teks watermark memiliki aria-hidden="true".


Acceptance Criteria

 4 kartu tampil dengan data dan foto yang benar
 Radius besar hanya di sudut kiri atas setiap card
 Teks "Directors" vertikal terlihat sebagai elemen dekoratif
 Animasi staggered berjalan saat section pertama kali masuk viewport
 Layout responsif sesuai breakpoint di atas
 Tidak ada error saat foto tidak ditemukan (fallback aktif)
 Lulus audit prefers-reduced-motion