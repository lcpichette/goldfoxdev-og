<script>
	import { page } from '$app/stores';
	import { navOpen } from '$lib/stores';
	import { onMount } from 'svelte';

	export let path = '';
	export let section = undefined;
	export let title;

	let randomNum = Math.random() * Date.now();
	let mounted = false;
	let fullPath;

	onMount(() => {
		if (section === undefined) {
			section = '';
		} else {
			section = '#' + section;
		}
		fullPath = path + section;
		if (fullPath.includes('##')) {
			let idx = fullPath.indexOf('#');
			fullPath.slice(idx, idx + 1);
		}

		document.getElementById('nav-' + title + randomNum).classList.remove('active');
		document.getElementById('nav-' + title + randomNum).classList.remove('inactive');
		mounted = true;

		navUpdate();
	});

	const navUpdate = () => {
		if (mounted) {
			if (window.location.href) {
				if ($page.path === path) {
					if (window.location.hash.includes('#')) {
						// Can't be Home '/'
						if (section != '') {
							if (window.location.hash.includes(section)) {
								// correct hash, section, and path. Must be true.
								// Link must be active
								// Our "Contact"
								document
									.getElementById('nav-' + title + randomNum)
									.classList.remove('inactive');
								document
									.getElementById('nav-' + title + randomNum)
									.classList.add('active');
							} else {
								// has hash, but incorrect section. Must be false.
								// inactive
								document
									.getElementById('nav-' + title + randomNum)
									.classList.remove('active');
								document
									.getElementById('nav-' + title + randomNum)
									.classList.add('inactive');
							}
						} else {
							// has hash, but no section is specified
							// inactive
							document
								.getElementById('nav-' + title + randomNum)
								.classList.remove('active');
							document
								.getElementById('nav-' + title + randomNum)
								.classList.add('inactive');
						}
					} else {
						// no hash and correct path
						if (section == '') {
							// Must be home or pricing
							document
								.getElementById('nav-' + title + randomNum)
								.classList.remove('inactive');
							document
								.getElementById('nav-' + title + randomNum)
								.classList.add('active');
						} else {
							// no hash, but desires section
							// inactive
							document
								.getElementById('nav-' + title + randomNum)
								.classList.remove('active');
							document
								.getElementById('nav-' + title + randomNum)
								.classList.add('inactive');
						}
					}
				} else {
					// inactive
					document.getElementById('nav-' + title + randomNum).classList.remove('active');
					document.getElementById('nav-' + title + randomNum).classList.add('inactive');
				}
			} else {
				console.error('???');
			}
		} else {
			//not mounted
		}
	};

	$: $page.path ? navUpdate() : navUpdate();
</script>

<svelte:window on:hashchange={navUpdate} on:popstate={navUpdate} />

<a
	id={'nav-' + title + randomNum}
	href={fullPath}
	on:click={() => navOpen.update((n) => !n)}
	class="relative inactive active z-20 px-3 py-5 rounded-md text-sm">{title}</a
>

<style lang="postcss">
	a {
		z-index: 1;
		position: relative;
		font-size: inherit;
		font-family: inherit;
		padding: 0.5em 1em;
		outline: none;
		border: none;
		@apply text-white;

		overflow: hidden;
		transition-property: color, background-color;
		transition-duration: 0.45s;
		transition-timing-function: ease-in-out;
		max-width: 250px;

		cursor: pointer;
	}
	a.active {
		@apply text-white font-bold pointer-events-none;
	}
	a.inactive {
		@apply text-gray-300 font-normal;
	}
	@media (max-width: 500px) {
		a {
			max-width: 100%;
		}
	}
	a:hover {
		color: #fff;
		background-color: rgba(110, 118, 152, 0.2);
	}
</style>
