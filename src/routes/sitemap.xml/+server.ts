import type { RequestHandler } from './$types';
import { getBlogs } from '$lib/firebase/blogs';
import { SEO_CONFIG } from '$lib/seo/config';

const staticPages = [
	{ path: '/', priority: '1.0', changefreq: 'weekly' },
	{ path: '/about-redline-communication', priority: '0.8', changefreq: 'monthly' },
	{ path: '/services-redline', priority: '0.8', changefreq: 'monthly' },
	{ path: '/contact-redline', priority: '0.7', changefreq: 'monthly' },
	{ path: '/projects-redline', priority: '0.7', changefreq: 'monthly' },
	{ path: '/production-redline', priority: '0.7', changefreq: 'monthly' },
	{ path: '/blogs', priority: '0.8', changefreq: 'daily' }
];

export const GET: RequestHandler = async () => {
	const siteUrl = SEO_CONFIG.siteUrl;

	let blogEntries: { path: string; lastmod: string }[] = [];
	try {
		const blogs = await getBlogs();
		blogEntries = blogs.map((blog) => ({
			path: `/blogs/${blog.slug}`,
			lastmod: blog.updatedAt?.seconds
				? new Date(blog.updatedAt.seconds * 1000).toISOString().split('T')[0]
				: new Date().toISOString().split('T')[0]
		}));
	} catch {
		// Gracefully handle Firebase errors — static pages still get indexed
	}

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
	.map(
		(p) => `  <url>
    <loc>${siteUrl}${p.path}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
	)
	.join('\n')}
${blogEntries
	.map(
		(b) => `  <url>
    <loc>${siteUrl}${b.path}</loc>
    <lastmod>${b.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
};
