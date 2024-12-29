<script>
	import { onMount } from 'svelte';
	import BlogHeader from '$lib/components/blogHeader.svelte';
	import PostCard from '$lib/components/post-card.svelte';
	export let data;
	let posts;

	onMount(() => {
		mounted = true;
		posts = data?.props?.posts;
	});

	let mounted = false;
	let searchValue = '';
	let visiblePosts = posts.reverse();

	function updateSearch() {
		if (mounted) {
			searchValue = document.getElementById('blog-search').value;
			if (searchValue === '') {
				visiblePosts = posts;
			} else if (searchValue.includes('tag:')) {
				visiblePosts = [];
				posts.forEach((post) => {
					for (const tag of post.tags) {
						if (
							tag
								.toLowerCase()
								.includes(
									searchValue
										.slice('tag:'.length, tag.length + 'tag:'.length)
										.toLowerCase()
								)
						) {
							visiblePosts.push(post);
							break;
						}
					}
				});
			} else {
				visiblePosts = [];
				posts.forEach((post) => {
					if (
						post.title.toLowerCase().includes(searchValue.toLowerCase()) ||
						post.content.text.toLowerCase().includes(searchValue.toLowerCase()) ||
						post.excerpt.toLowerCase().includes(searchValue.toLowerCase())
					) {
						visiblePosts.push(post);
					}
				});
			}
		}
	}
</script>

<svetle:head>
	<title>GFD Blog</title>
</svetle:head>

<!-- This example requires Tailwind CSS v2.0+ -->
<BlogHeader />
<div class="relative bg-gray-50 py-16 px-8 z-10">
	<div class="relative max-w-7xl mx-auto">
		<!-- Search Bar -->
		<div class="justify-center flex">
			<!-- Desktop -->
			<input
				on:change={() => {
					updateSearch();
				}}
				bind:value={searchValue}
				id="blog-search"
				type="text"
				placeholder="Press Enter or Click Icon to Search..."
				class="hidden lg:block rounded-full w-2/3 lg:w-1/3 px-5 focus:border-secondary border-2 outline-none"
			/>
			<!-- Mobile -->
			<input
				on:change={() => {
					updateSearch();
				}}
				bind:value={searchValue}
				id="blog-search"
				type="text"
				placeholder="Search..."
				class="block lg:hidden rounded-full w-2/3 lg:w-1/3 px-5 focus:border-secondary border-2 outline-none"
			/>
			<!-- Search Icon for both -->
			<svg
				on:click={() => updateSearch()}
				class="h-5 w-5 text-gray-500 hover:text-primary-900 cursor-pointer transform -translate-x-9 translate-y-3"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
					clip-rule="evenodd"
				/>
			</svg>
		</div>

		<span
			style="opacity:0;"
			id="search-reminder"
			class="text-center text-red-400 italic text-base pt-1 block"
			>Press Enter or Click the Search Icon to Search</span
		>

		<!-- Posts -->
		<div
			id="post-wrapper"
			class="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none"
		>
			{#each visiblePosts as post}
				<PostCard
					title={post.title}
					description={post.excerpt}
					type={post.tags}
					author={post.author.name}
					publishDate={post.date}
					readTime={(post.content.text.split(' ').length / 200).toFixed(0)}
					authorImgUrl={post.author.picture.url}
					imgUrl={post.coverImage.url}
					postUrl="/post/{post.slug}"
				/>
			{/each}
		</div>
	</div>
</div>
