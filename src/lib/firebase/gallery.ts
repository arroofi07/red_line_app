import {
	collection,
	doc,
	getDocs,
	addDoc,
	updateDoc,
	deleteDoc,
	serverTimestamp,
	type Timestamp
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';

export interface GalleryItem {
	id: string;
	imageUrl: string; // Base64
	title: string;
	order: number;
	createdAt: Timestamp;
}

export type GalleryItemInput = Omit<GalleryItem, 'id' | 'createdAt'>;

const COL = 'gallery-items';

export async function getGalleryItems(): Promise<GalleryItem[]> {
	if (!isFirebaseConfigured || !db) return [];
	const snap = await getDocs(collection(db, COL));
	const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as GalleryItem);
	return list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function addGalleryItem(data: GalleryItemInput): Promise<string> {
	if (!isFirebaseConfigured || !db) throw new Error('Firebase is not configured');
	const ref = await addDoc(collection(db, COL), { ...data, createdAt: serverTimestamp() });
	return ref.id;
}

export async function updateGalleryItem(
	id: string,
	data: Partial<Pick<GalleryItem, 'title' | 'order'>>
): Promise<void> {
	if (!isFirebaseConfigured || !db) throw new Error('Firebase is not configured');
	await updateDoc(doc(db, COL, id), data);
}

export async function deleteGalleryItem(id: string): Promise<void> {
	if (!isFirebaseConfigured || !db) throw new Error('Firebase is not configured');
	await deleteDoc(doc(db, COL, id));
}
