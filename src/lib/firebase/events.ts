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

export interface EventItem {
	id: string;
	title: string;
	subtitle: string;
	category: string;
	description: string;
	place: string;
	imageUrl: string;
	order: number;
	createdAt: Timestamp;
	updatedAt: Timestamp;
}

export type EventInput = Omit<EventItem, 'id' | 'createdAt' | 'updatedAt'>;

const COLLECTION = 'events';

function eventSortKey(e: EventItem): number {
	const s = e.createdAt?.seconds;
	return typeof s === 'number' ? s : 0;
}

/** Urutan: terbaru dulu (createdAt), tanpa query orderBy agar tidak bergantung indeks / field order. */
export async function getEvents(): Promise<EventItem[]> {
	if (!isFirebaseConfigured || !db) return [];
	const snap = await getDocs(collection(db, COLLECTION));
	const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as EventItem);
	return list.sort((a, b) => {
		const diff = eventSortKey(b) - eventSortKey(a);
		if (diff !== 0) return diff;
		return b.id.localeCompare(a.id);
	});
}

export async function getEventById(id: string): Promise<EventItem | null> {
	if (!isFirebaseConfigured || !db) return null;
	const ref = doc(db, COLLECTION, id);
	const snap = await getDoc(ref);
	if (!snap.exists()) return null;
	return { id: snap.id, ...snap.data() } as EventItem;
}

export async function createEvent(data: EventInput): Promise<string> {
	if (!isFirebaseConfigured || !db) throw new Error('Firebase is not configured');
	const ref = await addDoc(collection(db, COLLECTION), {
		...data,
		createdAt: serverTimestamp(),
		updatedAt: serverTimestamp()
	});
	return ref.id;
}

export async function updateEvent(id: string, data: Partial<EventInput>): Promise<void> {
	if (!isFirebaseConfigured || !db) throw new Error('Firebase is not configured');
	const ref = doc(db, COLLECTION, id);
	await updateDoc(ref, {
		...data,
		updatedAt: serverTimestamp()
	});
}

export async function deleteEvent(id: string): Promise<void> {
	if (!isFirebaseConfigured || !db) throw new Error('Firebase is not configured');
	await deleteDoc(doc(db, COLLECTION, id));
}
