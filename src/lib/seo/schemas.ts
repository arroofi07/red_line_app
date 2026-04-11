import { SEO_CONFIG } from './config';

export function organizationSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Redline Communication',
		url: SEO_CONFIG.siteUrl,
		logo: `${SEO_CONFIG.siteUrl}/og-image.png`,
		description:
			'Perusahaan Full Integrated Marketing Communication yang bergerak di bidang Event Organizer di Padang, Sumatera Barat.',
		contactPoint: {
			'@type': 'ContactPoint',
			telephone: '+62-811-663-528',
			contactType: 'customer service',
			areaServed: 'ID',
			availableLanguage: 'Indonesian'
		},
		sameAs: [
			'https://instagram.com/redline_communication'
		]
	};
}

export function localBusinessSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'EventPlanner',
		name: 'Redline Communication',
		image: `${SEO_CONFIG.siteUrl}/og-image.png`,
		url: SEO_CONFIG.siteUrl,
		telephone: '+62-811-663-528',
		email: 'info@redlinecomunication.com',
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Padang',
			addressRegion: 'Sumatera Barat',
			postalCode: '25171',
			addressCountry: 'ID'
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: -0.908,
			longitude: 100.381
		},
		priceRange: '$$',
		openingHoursSpecification: {
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
			opens: '09:00',
			closes: '17:00'
		},
		areaServed: {
			'@type': 'City',
			name: 'Padang'
		}
	};
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: item.url
		}))
	};
}

export function blogPostingSchema(post: {
	title: string;
	excerpt: string;
	imageUrl?: string;
	author: string;
	publishedAt: { seconds: number };
	slug: string;
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: post.title,
		description: post.excerpt,
		image: post.imageUrl || '',
		author: {
			'@type': 'Person',
			name: post.author
		},
		publisher: {
			'@type': 'Organization',
			name: 'Redline Communication',
			logo: {
				'@type': 'ImageObject',
				url: `${SEO_CONFIG.siteUrl}/og-image.png`
			}
		},
		datePublished: new Date(post.publishedAt.seconds * 1000).toISOString(),
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `${SEO_CONFIG.siteUrl}/blogs/${post.slug}`
		}
	};
}
