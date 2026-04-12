import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';

/**
 * Seksi landing page yang item-nya bisa dikonfigurasi dari admin.
 * - 'event-gallery'  → grid galeri di bawah halaman utama
 * - 'latest-events'  → slider "Latest Event" di halaman utama
 * - 'insight-posts'  → seksi "Insight & Post" di halaman utama
 */
export type LandingSection = 'event-gallery' | 'latest-events' | 'insight-posts';

const COL = 'landing-config';

/**
 * Ambil array event ID yang dipilih untuk seksi tertentu.
 * Urutan array = urutan tampil di landing page.
 */
export async function getLandingEventIds(section: LandingSection): Promise<string[]> {
	if (!isFirebaseConfigured || !db) return [];
	const snap = await getDoc(doc(db, COL, section));
	if (!snap.exists()) return [];
	return (snap.data().eventIds as string[]) ?? [];
}

/**
 * Simpan array event ID untuk seksi tertentu.
 * Overwrite total — kirim array lengkap setiap kali save.
 */
export async function setLandingEventIds(
	section: LandingSection,
	eventIds: string[]
): Promise<void> {
	if (!isFirebaseConfigured || !db) throw new Error('Firebase is not configured');
	await setDoc(doc(db, COL, section), { eventIds, updatedAt: serverTimestamp() });
}
