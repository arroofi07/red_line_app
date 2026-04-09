import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage, isFirebaseConfigured } from './config';

/**
 * Kompresi gambar menggunakan Canvas API bawaan browser.
 * - Max width: 800px (auto proportional)
 * - Output: JPEG, kualitas 80%
 * - Estimasi: 3MB → ~200-400KB
 */
export async function compressImage(file: File, maxWidth = 800, quality = 0.8): Promise<Blob> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		const objectUrl = URL.createObjectURL(file);

		img.onload = () => {
			URL.revokeObjectURL(objectUrl);

			let { width, height } = img;

			// Scale down jika lebih lebar dari maxWidth
			if (width > maxWidth) {
				height = Math.round((height * maxWidth) / width);
				width = maxWidth;
			}

			const canvas = document.createElement('canvas');
			canvas.width = width;
			canvas.height = height;

			const ctx = canvas.getContext('2d');
			if (!ctx) {
				reject(new Error('Canvas context tidak tersedia'));
				return;
			}

			ctx.drawImage(img, 0, 0, width, height);

			canvas.toBlob(
				(blob) => {
					if (blob) resolve(blob);
					else reject(new Error('Gagal mengkompresi gambar'));
				},
				'image/jpeg',
				quality
			);
		};

		img.onerror = () => {
			URL.revokeObjectURL(objectUrl);
			reject(new Error('Gagal memuat gambar'));
		};

		img.src = objectUrl;
	});
}

function blobToBase64(blob: Blob): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result as string);
		reader.onerror = reject;
		reader.readAsDataURL(blob);
	});
}

/**
 * Kompresi dan convert ke Base64 (tanpa upload ke Firebase Storage).
 * @returns { imageUrl, imagePath }
 */
export async function uploadBlogImage(
	file: File,
	blogId: string
): Promise<{ imageUrl: string; imagePath: string }> {
	const compressed = await compressImage(file, 800, 0.7); // Kompresi kuat agar muat di Database
	const base64Url = await blobToBase64(compressed);

	return { imageUrl: base64Url, imagePath: '' };
}

/**
 * Hapus gambar dari Firebase Storage berdasarkan path.
 * Aman dipanggil meski path kosong.
 */
export async function deleteBlogImage(imagePath: string): Promise<void> {
	if (!imagePath || !isFirebaseConfigured || !storage) return;
	try {
		const storageRef = ref(storage, imagePath);
		await deleteObject(storageRef);
	} catch {
		// File mungkin sudah tidak ada, abaikan error
	}
}
