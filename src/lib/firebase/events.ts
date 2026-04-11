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

export async function getEvents(): Promise<EventItem[]> {
	if (!isFirebaseConfigured || !db) return [];
	const q = query(collection(db, COLLECTION), orderBy('order', 'asc'));
	const snap = await getDocs(q);
	return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as EventItem);
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
