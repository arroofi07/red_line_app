<script lang="ts">
	import './layout.css';
	import Navbar from '$lib/components/layout/navbar.svelte';
	import Footer from '$lib/components/layout/footer.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';

	let { children } = $props();
	
	let isAdmin = $derived(page.url.pathname.startsWith('/admin'));
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

{#if !isAdmin}
	<Navbar />
{/if}

{@render children()}

{#if !isAdmin}
	<Footer />
{/if}
