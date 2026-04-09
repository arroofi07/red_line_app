import {
	collection,
	doc,
	getDocs,
	getDoc,
	addDoc,
	updateDoc,
	deleteDoc,
	query,
	orderBy,
	where,
	limit,
	serverTimestamp,
	type Timestamp
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';

export interface Blog {
	id: string;
	title: string;
	slug: string;
	category: string;
	tag: string;
	excerpt: string;
	content: string;
	imageUrl: string;
	imagePath: string;
	author: string;
	readTime: string;
	publishedAt: Timestamp;
	createdAt: Timestamp;
	updatedAt: Timestamp;
}

export type BlogInput = Omit<Blog, 'id' | 'createdAt' | 'updatedAt' | 'publishedAt'>;

const COLLECTION = 'blogs';

/** Buat slug URL-friendly dari judul */
export function generateSlug(title: string): string {
	return title
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.substring(0, 80);
}

/** Ambil semua blog, diurutkan dari terbaru */
export async function getBlogs(): Promise<Blog[]> {
	if (!isFirebaseConfigured || !db) return [];
	const q = query(collection(db, COLLECTION), orderBy('publishedAt', 'desc'));
	const snap = await getDocs(q);
	return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Blog);
}

/** Ambil N blog terbaru untuk homepage */
export async function getLatestBlogs(n: number = 4): Promise<Blog[]> {
	if (!isFirebaseConfigured || !db) return [];
	const q = query(collection(db, COLLECTION), orderBy('publishedAt', 'desc'), limit(n));
	const snap = await getDocs(q);
	return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Blog);
}

/** Ambil blog berdasarkan slug */
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
	if (!isFirebaseConfigured || !db) return null;
	const q = query(collection(db, COLLECTION), where('slug', '==', slug), limit(1));
	const snap = await getDocs(q);
	if (snap.empty) return null;
	const d = snap.docs[0];
	return { id: d.id, ...d.data() } as Blog;
}

/** Ambil blog berdasarkan ID */
export async function getBlogById(id: string): Promise<Blog | null> {
	if (!isFirebaseConfigured || !db) return null;
	const ref = doc(db, COLLECTION, id);
	const snap = await getDoc(ref);
	if (!snap.exists()) return null;
	return { id: snap.id, ...snap.data() } as Blog;
}

/** Buat blog baru */
export async function createBlog(data: BlogInput): Promise<string> {
	if (!isFirebaseConfigured || !db) throw new Error('Firebase is not configured');
	const ref = await addDoc(collection(db, COLLECTION), {
		...data,
		publishedAt: serverTimestamp(),
		createdAt: serverTimestamp(),
		updatedAt: serverTimestamp()
	});
	return ref.id;
}

/** Update blog yang sudah ada */
export async function updateBlog(id: string, data: Partial<BlogInput>): Promise<void> {
	if (!isFirebaseConfigured || !db) throw new Error('Firebase is not configured');
	const ref = doc(db, COLLECTION, id);
	await updateDoc(ref, {
		...data,
		updatedAt: serverTimestamp()
	});
}

/** Hapus blog (gambar harus dihapus terpisah via storage.ts) */
export async function deleteBlog(id: string): Promise<void> {
	if (!isFirebaseConfigured || !db) throw new Error('Firebase is not configured');
	await deleteDoc(doc(db, COLLECTION, id));
}
