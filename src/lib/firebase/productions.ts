import {
	collection,
	doc,
	getDocs,
	getDoc,
	addDoc,
	updateDoc,
	deleteDoc,
	serverTimestamp,
	type Timestamp
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';

export interface Production {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
	order: number;
	createdAt: Timestamp;
	updatedAt: Timestamp;
}

export type ProductionInput = Omit<Production, 'id' | 'createdAt' | 'updatedAt'>;

const COLLECTION = 'productions';

function sortKey(p: Production): number {
	const s = p.createdAt?.seconds;
	return typeof s === 'number' ? s : 0;
}

/** Terbaru dulu; tanpa orderBy di Firestore agar tidak bergantung indeks / field order. */
export async function getProductions(): Promise<Production[]> {
	if (!isFirebaseConfigured || !db) return [];
	const snap = await getDocs(collection(db, COLLECTION));
	const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Production);
	return list.sort((a, b) => {
		const diff = sortKey(b) - sortKey(a);
		if (diff !== 0) return diff;
		return b.id.localeCompare(a.id);
	});
}

export async function getProductionById(id: string): Promise<Production | null> {
	if (!isFirebaseConfigured || !db) return null;
	const ref = doc(db, COLLECTION, id);
	const snap = await getDoc(ref);
	if (!snap.exists()) return null;
	return { id: snap.id, ...snap.data() } as Production;
}

export async function createProduction(data: ProductionInput): Promise<string> {
	if (!isFirebaseConfigured || !db) throw new Error('Firebase is not configured');
	const ref = await addDoc(collection(db, COLLECTION), {
		...data,
		createdAt: serverTimestamp(),
		updatedAt: serverTimestamp()
	});
	return ref.id;
}

export async function updateProduction(id: string, data: Partial<ProductionInput>): Promise<void> {
	if (!isFirebaseConfigured || !db) throw new Error('Firebase is not configured');
	const ref = doc(db, COLLECTION, id);
	await updateDoc(ref, {
		...data,
		updatedAt: serverTimestamp()
	});
}

export async function deleteProduction(id: string): Promise<void> {
	if (!isFirebaseConfigured || !db) throw new Error('Firebase is not configured');
	await deleteDoc(doc(db, COLLECTION, id));
}
