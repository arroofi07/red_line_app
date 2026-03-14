<script lang="ts">
	import Hero from '$lib/components/sections/hero.svelte';
	import Services from '$lib/components/sections/services.svelte';
	import Event from '$lib/components/sections/event.svelte';
	import Mitra from '$lib/components/sections/mitra.svelte';
</script>

<svelte:head>
	<title>Red Line Communication | Connecting Every Line</title>
	<meta name="description" content="Premium production and event services tailored for your unique vision." />
</svelte:head>

<main class="flex flex-col">
	<Hero />
	<Mitra />
	<Services />
	<Event />
</main>

	