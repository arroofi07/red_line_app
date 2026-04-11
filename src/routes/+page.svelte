<script lang="ts">
	import Hero from '$lib/components/sections/hero.svelte';
	import Event from '$lib/components/sections/event.svelte';
	import Services from '$lib/components/sections/services.svelte';
	import Team from '$lib/components/sections/team.svelte';
	import Mitra from '$lib/components/sections/mitra.svelte';
	import Post from '$lib/components/sections/post.svelte';
	import Gallery from '$lib/components/sections/gallery.svelte';
	import Metaverse from '$lib/components/sections/metaverse.svelte';
	import Seo from '$lib/components/seo/Seo.svelte';
	import { organizationSchema, localBusinessSchema } from '$lib/seo/schemas';
</script>

<Seo
	title="EO Padang - Redline Communication | Event Organizer & Production Padang"
	description="Redline Communication - Event Organizer Padang terbaik. Jasa EO Padang profesional untuk event organizer, event production, MICE, dan supplier equipment. Berpengalaman 12+ tahun."
	jsonLd={[organizationSchema(), localBusinessSchema()]}
/>

<main class="flex flex-col bg-background">
	<Hero />
	<Services />
	<Metaverse/>
	<Event />
	<Team />
	<Mitra />
	<Post />
	<Gallery/>
</main>
