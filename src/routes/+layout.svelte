<script>
	import Nav from '$lib/components/nav.svelte';
	import Footer from '$lib/components/footer.svelte';
	import '../app.css';
</script>

<div>
	<!-- Navbar -->
	<Nav />

	<slot />

	<!-- Footer -->
	<Footer />
</div>
