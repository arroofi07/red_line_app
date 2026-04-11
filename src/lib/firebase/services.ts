import {
	collection,
	doc,
	getDocs,
	addDoc,
	deleteDoc,
	query,
	where,
	serverTimestamp,
	type Timestamp
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';

/** Kunci galeri untuk tiga layanan utama di halaman Services (sama dengan id di UI publik). */
export const FEATURED_SERVICE_SLUGS = ['eo', 'production', 'rental'] as const;
export type FeaturedServiceSlug = (typeof FEATURED_SERVICE_SLUGS)[number];

export function isFeaturedServiceSlug(id: string): id is FeaturedServiceSlug {
	return (FEATURED_SERVICE_SLUGS as readonly string[]).includes(id);
}

/** Teks layanan di situs; hanya galeri yang dikelola dari admin. */
export const FEATURED_SERVICES_STATIC: Record<
	FeaturedServiceSlug,
	{ title: string; subtitle: string; description: string }
> = {
	eo: {
		title: 'Event Organizer',
		subtitle: 'Professional Organizer',
		description:
			'Jasa penyelenggara event yang telah berpengalaman selama lebih dari 12 tahun. Kami telah sukses menyelenggarakan berbagai jenis event, dan selanjutnya adalah event anda!'
	},
	production: {
		title: 'Event Production',
		subtitle: 'Idea Reality',
		description:
			'Divisi produksi event dari Redline Communication. Redline Production hadir sebagai jawaban untuk merubah ide anda menjadi nyata.'
	},
	rental: {
		title: 'Event Equipment Rental',
		subtitle: 'Small to Large Scale',
		description:
			'Kami juga menyediakan jasa sewa alat/perlengkapan event anda, skala kecil ataupun besar kami siap menyediakannya.'
	}
};

// ── Service Images (serviceId = slug eo | production | rental) ──

export interface ServiceImage {
	id: string;
	serviceId: string;
	imageUrl: string;
	alt: string;
	order: number;
	createdAt: Timestamp;
}

export type ServiceImageInput = Omit<ServiceImage, 'id' | 'createdAt'>;

const IMAGES_COL = 'service-images';

export async function getServiceImages(serviceId: string): Promise<ServiceImage[]> {
	if (!isFirebaseConfigured || !db) return [];
	// Hanya equality pada serviceId — urutkan di klien agar tidak perlu indeks komposit
	// (where + orderBy pada field berbeda memicu failed-precondition tanpa index).
	const q = query(collection(db, IMAGES_COL), where('serviceId', '==', serviceId));
	const snap = await getDocs(q);
	const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as ServiceImage);
	return list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function addServiceImage(data: ServiceImageInput): Promise<string> {
	if (!isFirebaseConfigured || !db) throw new Error('Firebase is not configured');
	const ref = await addDoc(collection(db, IMAGES_COL), {
		...data,
		createdAt: serverTimestamp()
	});
	return ref.id;
}

export async function deleteServiceImage(imageId: string): Promise<void> {
	if (!isFirebaseConfigured || !db) throw new Error('Firebase is not configured');
	await deleteDoc(doc(db, IMAGES_COL, imageId));
}
