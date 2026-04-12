import { collection, getDocs } from 'firebase/firestore';
import { db } from './config';

export interface CollectionUsage {
	name: string;
	displayName: string;
	icon: string;
	docCount: number;
	estimatedBytes: number;
}

export interface FirestoreUsage {
	collections: CollectionUsage[];
	totalBytes: number;
	totalDocs: number;
	calculatedAt: Date;
}

/** Firebase Spark (Free) Plan limits */
export const SPARK_LIMITS = {
	/** Firestore stored data: 1 GiB */
	firestoreStorageBytes: 1 * 1024 * 1024 * 1024,
	/** Firestore reads per day */
	firestoreReadsPerDay: 50_000,
	/** Firestore writes per day */
	firestoreWritesPerDay: 20_000,
	/** Firestore deletes per day */
	firestoreDeletesPerDay: 10_000
};

const COLLECTIONS = [
	{ name: 'blogs', displayName: 'Blog', icon: '📝' },
	{ name: 'productions', displayName: 'Production', icon: '🎬' },
	{ name: 'events', displayName: 'Events', icon: '🎪' },
	{ name: 'service-images', displayName: 'Galeri Layanan', icon: '🖼️' },
	{ name: 'gallery-items', displayName: 'Galeri Landing', icon: '🎨' }
];

/**
 * Estimate storage bytes of a Firestore document.
 *
 * Firestore billing is based on:
 *  - 32 bytes overhead per document
 *  - size of each field name (UTF-8 bytes)
 *  - size of each field value (UTF-8 for strings, 8 bytes for numbers, etc.)
 *
 * We approximate by measuring the UTF-8 byte length of the JSON representation,
 * which is accurate for Base64 image strings (ASCII only) and text fields.
 */
function estimateDocBytes(data: Record<string, unknown>): number {
	const DOCUMENT_OVERHEAD = 32;
	const json = JSON.stringify(data);
	// TextEncoder gives exact UTF-8 byte count
	const bodyBytes = new TextEncoder().encode(json).length;
	return DOCUMENT_OVERHEAD + bodyBytes;
}

/**
 * Fetch all Firestore collections and calculate estimated storage usage.
 * Note: this itself costs N read operations (one per document across all collections).
 */
export async function getFirestoreUsage(): Promise<FirestoreUsage> {
	if (!db) throw new Error('Firebase tidak dikonfigurasi');

	const results: CollectionUsage[] = [];

	for (const col of COLLECTIONS) {
		const snapshot = await getDocs(collection(db, col.name));
		let estimatedBytes = 0;

		snapshot.forEach((doc) => {
			estimatedBytes += estimateDocBytes(doc.data() as Record<string, unknown>);
		});

		results.push({
			...col,
			docCount: snapshot.size,
			estimatedBytes
		});
	}

	const totalBytes = results.reduce((sum, c) => sum + c.estimatedBytes, 0);
	const totalDocs = results.reduce((sum, c) => sum + c.docCount, 0);

	return { collections: results, totalBytes, totalDocs, calculatedAt: new Date() };
}

/** Format bytes to human-readable string (KB, MB, GB) */
export function formatBytes(bytes: number): string {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
	if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
	const gb = bytes / (1024 * 1024 * 1024);
	return `${gb % 1 === 0 ? gb.toFixed(0) : gb.toFixed(2)} GB`;
}

/** Return usage percentage (0–100) */
export function usagePercent(used: number, limit: number): number {
	return Math.min(100, (used / limit) * 100);
}

/** Color class based on usage percentage */
export function usageStatus(percent: number): 'safe' | 'warning' | 'danger' {
	if (percent >= 90) return 'danger';
	if (percent >= 70) return 'warning';
	return 'safe';
}
