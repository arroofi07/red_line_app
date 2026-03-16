<script lang="ts">
	import Hero from '$lib/components/sections/hero.svelte';
	import Event from '$lib/components/sections/event.svelte';
	import Services from '$lib/components/sections/services.svelte';
	import Team from '$lib/components/sections/team.svelte';
	import Mitra from '$lib/components/sections/mitra.svelte';
	import Post from '$lib/components/sections/post.svelte';
	import Gallery from '$lib/components/sections/gallery.svelte';
	import Metaverse from '$lib/components/sections/metaverse.svelte';
</script>

<svelte:head>
	<title>REDLINE | Event Organizer & Strategic Communication</title>
	<meta
		name="description"
		content="Redline Communication (EO Padang) — one stop solution for all your event needs. From event organizer, management, production, MICE, and more."
	/>
</svelte:head>

<main class="flex flex-col bg-background">
	<Hero />
	<Metaverse/>
	<Services />
	<Event />
	<Gallery/>
	<Team />
	<Mitra />
	<Post />
</main>
