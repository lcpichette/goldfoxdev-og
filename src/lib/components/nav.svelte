<script>
	import { onMount } from 'svelte';
	import { navOpen } from '$lib/stores';
	import NavButton from './nav/navButton.svelte';

	let mounted = false;
	let mobileOpen = false;

	onMount(() => {
		mounted = true;
	});

	function toggleMobileNav() {
		if (mounted) {
			let mm = document.getElementById('mobile-menu');
			// If we're opening it (originally closed)
			if (mobileOpen) {
				mm.style.overflow = 'none';
				mm.style.height = '220px';
			} else {
				// If we're closing it (originally open)
				mm.style.overflow = 'hidden';
				mm.style.height = '1px';
			}
		}
	}

	navOpen.subscribe((value) => {
		mobileOpen = value;
		toggleMobileNav();
	});
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<div class="h-[4.5rem]" />
<nav class="gradient-nav backdrop-blur-sm fixed top-0 w-full z-50 shadow-primary-900/50">
	<div class="relative overflow-clip">
		<div class="max-w-7xl mx-auto px-8">
			<div class="relative flex items-center justify-between h-[4.5rem]">
				<!-- Mobile -->
				<div class="absolute inset-y-0 left-0 items-center flex md:hidden w-full">
					<div class="flex relative justify-between place-items-center w-full">
						<!-- Mobile menu button-->
						<div class="relative">
							<img
								class="h-6 w-6"
								src="/img/Gold-Fox-Dev-Icon-Transparent.webp"
								alt="Gold Fox Dev Icon"
							/>
						</div>
						<button
							on:click={() => navOpen.update((n) => !n)}
							type="button"
							class="inline-flex items-center justify-center p-2 rounded-md text-primary-800 hover:text-primary-950 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-800"
							aria-controls="mobile-menu"
							aria-expanded="false"
						>
							<span class="sr-only">Open main menu</span>

							{#if !mobileOpen}
								<svg
									id="openMobileNavIcon"
									class="h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							{:else}
								<svg
									id="closedMobileNavIcon"
									class="h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							{/if}
						</button>
					</div>
				</div>

				<!-- Desktop -->
				<div
					class="flex-1 flex items-center justify-center md:items-stretch md:justify-start"
				>
					<div class="flex-shrink-0 flex items-center">
						<div class="hidden md:flex lg:hidden place-items-center">
							<img
								class="h-8 w-auto text-white"
								src="https://goldfoxdev-artifacts.s3.us-west-2.amazonaws.com/Gold-Fox-Dev-Icon-Transparent.webp"
								alt="Gold Fox Dev"
							/>
						</div>
						<div class="hidden lg:flex place-items-center">
							<img
								class="h-8 w-auto text-white"
								src="https://goldfoxdev-artifacts.s3.us-west-2.amazonaws.com/Gold-Fox-Dev-Logo-White-Transparent.webp"
								alt="Gold Fox Dev"
							/>
						</div>
					</div>
					<div class="hidden md:block sm:ml-6">
						<div class="flex space-x-4">
							<NavButton path="/" title="Home" />
							<!--TODO
						<NavButton path="/blog" title="Blog" />
						-->
							<!--
							<NavButton path="/pricing" title="Pricing" />
							-->
							<NavButton
								path="https://portal.goldfoxdev.com"
								section=""
								title="Client Portal"
							/>
							<NavButton path="/" section="about" title="Learn More" />
							<NavButton path="/" section="contact" title="Contact Us" />
							<div>
								<link
									href="https://assets.calendly.com/assets/external/widget.css"
									rel="stylesheet"
								/>
								<script
									src="https://assets.calendly.com/assets/external/widget.js"
									type="text/javascript"
									async
								></script>
								<script type="text/javascript">
									window.onload = function () {
										Calendly.initBadgeWidget({
											url: 'https://calendly.com/goldfoxdev/introductions-w-corporate-liaison',
											text: "Let's Connect",
											color: '#ffb806',
											textColor: '#272b38',
											branding: false
										});
									};
								</script>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Mobile menu, show/hide based on menu state. -->
		<div
			style="height:1px;overflow:hidden;"
			class="block md:hidden transition-all ease-in-out duration-300"
			id="mobile-menu"
		>
			<div class="relative pt-2 pb-2 space-y-1 flex md:hidden flex-col gap-2 px-8 z-10">
				<NavButton path="/" title="Home" />
				<!--TODO
			<NavButton path="/blog" title="Blog" />
			-->
				<!--
				<NavButton path="/pricing" title="Pricing" />
				-->
				<NavButton path="https://portal.goldfoxdev.com" section="" title="Client Portal" />
				<NavButton path="/" section="about" title="Learn More" />
				<NavButton path="/" section="contact" title="Contact Us" />
			</div>
		</div>
	</div>
</nav>

<style>
	.gradient-nav {
		background: linear-gradient(
			to right,
			rgba(31, 34, 48, 1) 15%,
			rgba(31, 34, 48, 0.95) 30%,
			rgba(31, 34, 48, 0.65) 65%,
			rgba(255, 184, 6, 0.2)
		);
		@media screen and (min-width: 800px) {
			background: linear-gradient(
				to right,
				rgba(31, 34, 48, 1) 15%,
				rgba(31, 34, 48, 0.85) 60%,
				rgba(31, 34, 48, 0.65) 80%,
				rgba(255, 184, 6, 0.2)
			);
		}
	}
</style>
