<script lang="ts">
	import { page } from '$app/state';
	import { SEO_CONFIG } from '$lib/seo/config';

	interface Props {
		title: string;
		description: string;
		ogImage?: string;
		ogType?: string;
		noindex?: boolean;
		nofollow?: boolean;
		article?: {
			publishedTime?: string;
			modifiedTime?: string;
			author?: string;
			section?: string;
		};
		jsonLd?: Record<string, unknown> | Record<string, unknown>[];
	}

	let {
		title,
		description,
		ogImage = SEO_CONFIG.defaultImage,
		ogType = 'website',
		noindex = false,
		nofollow = false,
		article,
		jsonLd
	}: Props = $props();

	let canonicalUrl = $derived(SEO_CONFIG.siteUrl + page.url.pathname);

	let fullOgImage = $derived(
		ogImage.startsWith('http') ? ogImage : SEO_CONFIG.siteUrl + ogImage
	);

	let robotsContent = $derived(
		[noindex ? 'noindex' : '', nofollow ? 'nofollow' : ''].filter(Boolean).join(', ')
	);

	let jsonLdString = $derived(
		jsonLd
			? JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd])
			: ''
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonicalUrl} />

	{#if robotsContent}
		<meta name="robots" content={robotsContent} />
	{/if}

	<!-- Open Graph -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:type" content={ogType} />
	<meta property="og:site_name" content={SEO_CONFIG.siteName} />
	<meta property="og:locale" content={SEO_CONFIG.defaultLocale} />
	<meta property="og:image" content={fullOgImage} />

	{#if article}
		{#if article.publishedTime}
			<meta property="article:published_time" content={article.publishedTime} />
		{/if}
		{#if article.modifiedTime}
			<meta property="article:modified_time" content={article.modifiedTime} />
		{/if}
		{#if article.author}
			<meta property="article:author" content={article.author} />
		{/if}
		{#if article.section}
			<meta property="article:section" content={article.section} />
		{/if}
	{/if}

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={fullOgImage} />

	<!-- JSON-LD Structured Data -->
	{#if jsonLdString}
		{@html `<script type="application/ld+json">${jsonLdString}</script>`}
	{/if}
</svelte:head>
