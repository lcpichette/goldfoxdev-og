<script>
	import { onMount } from 'svelte';
	
	export let data;
	
	let user;
	
	onMount(async () => {
		user = data.props.user;
	});
</script>