<script>
	import Missing from '$lib/components/404.svelte';
	import Other from '$lib/components/other.svelte';
	import { page } from '$app/stores';
</script>

{#if $page.status === 404}
	<Missing />
{:else}
	<Other message={$page.error.message} />
{/if}
