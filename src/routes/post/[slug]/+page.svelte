<script>
	import { onMount } from 'svelte';
	import { page } from "$app/stores";
	
	/** @type {import('./$types').PageData} */
	export let data;
	let post;

	onMount(()=>{
		post = data?.props?.post || undefined;
		if (!post) return;
		
		document.getElementById("post-content").innerHTML = post.content.html;

		const codeblocks = document.getElementById("post-content").querySelectorAll("pre");
		codeblocks.forEach((cb)=>{
			const btnWrapper = document.createElement("div");
			btnWrapper.classList.add("buttons");
			btnWrapper.classList.add("flex");

			const redBtn = document.createElement("div");
			redBtn.classList.add("button");
			redBtn.style.backgroundColor = "rgb(239,68,68)";
			redBtn.style.borderRadius = "100%";
			redBtn.style.height = "12px";
			redBtn.style.width = "12px";
			redBtn.style.marginRight = "8px"; 

			const yellowBtn = document.createElement("div");
			yellowBtn.classList.add("button");
			yellowBtn.style.backgroundColor = "rgb(245,158,11)";
			yellowBtn.style.borderRadius = "100%";
			yellowBtn.style.height = "12px";
			yellowBtn.style.width = "12px";
			yellowBtn.style.marginRight = "8px"; 

			const greenBtn = document.createElement("div");
			greenBtn.classList.add("button");
			greenBtn.classList.add("button");
			greenBtn.style.backgroundColor = "rgb(16,185,129)";
			greenBtn.style.borderRadius = "100%";
			greenBtn.style.height = "12px";
			greenBtn.style.width = "12px";

			btnWrapper.appendChild(redBtn);
			btnWrapper.appendChild(yellowBtn);
			btnWrapper.appendChild(greenBtn);

			cb.insertBefore(btnWrapper, cb.firstChild);
		})
	});
</script>

<svelte:head>
	<title>{$page.params.slug}</title>
</svelte:head>

<div id="post-wrapper">
	<div class="px-8 mt-12 max-w-7xl mx-auto">
		{#if post != null && post.coverImage != null}
		<div style="background-image: url({post.coverImage.url}); background-repeat: no-repeat; background-size:cover; background-position: center;" class="w-full block bg-center rounded-lg">
			<br><br><br><br><br><br><br><br><br><br><br><br><br>
		</div>
		{/if}
	</div>
	

	{#if post === undefined || post === null}
	<div class="h-[calc(100vh-15vh-4rem)] relative flex justify-center place-items-center">
		<svg viewBox="25 25 50 50" class="">
		<circle cx="50" cy="50" r="20"></circle>
		</svg>
	</div>
	{:else}
	<div class="max-w-7xl mx-auto px-8 py-12 selection:bg-secondary/20">
		<div class="pb-12">
			<h1 class="text-4xl text-primary-800 py-2">{post.title}</h1>
			<div class="flex place-items-center py-4 text-gray-800 text-base">
				<img class="h-10 w-10 rounded-full mr-2" src="{post.author.picture.url}" alt="headshot of author">
				<span class="mr-2">{post.author.name}</span>
				<time class="mr-2" datetime="{post.date}">
					{post.date}
				</time>
				<span class="mr-2" aria-hidden="true">
					&middot;
				</span>
				<span class="mr-2">
					{(post.content.text.split(' ').length / 200).toFixed(0) + "min read"}
				</span>
			</div>
		</div>
		<div id="post-content"></div>
	</div>
	{/if}

	<div style="margin-bottom:140px;margin-top:20px;" class="max-w-7xl mx-auto px-8 flex justify-center">
		<div style="background-color:#303444;width:100%;padding:20px 0;" class="flex justify-center place-items-center border-2 border-secondary">
			<img height="72px" width="72px" class="border border-transparent rounded-full bg-secondary keanu-coder-cat" src="/img/keanu_headshot.jpg" alt="">
			<h2 id="post-gratitude" class="relative px-4">Thanks for Reading!<span class="author italic text-lg text-left block pl-2 pt-2">-Keanu the Coder Cat</span></h2>	
		</div>
	</div>
	
</div>

<style lang="postcss">
	.keanu-coder-cat{
		height:72px;
		width:72px;
	}
	#post-gratitude{
		font-size:42px;font-weight:200;padding:4px 24px;margin-left:30px;color:white;border-left:2px solid #ffb806;
	}
	@media screen and (max-width: 612px) {
		.keanu-coder-cat{
			height:50px;
			width:50px;
			margin-left:24px;
		}
		#post-gratitude{
			font-size:24px;
		}
		.author {
			font-size:16px;
		}
	}

	svg {
		@apply w-[15vh];
		@apply h-[15vh];
		transform-origin: center;
		animation: rotate 2s linear infinite;
	}

	circle {
		fill: none;
		@apply stroke-secondary;
		stroke-width: 2;
		stroke-dasharray: 1, 200;
		stroke-dashoffset: 0;
		stroke-linecap: round;
		animation: dash 1.5s ease-in-out infinite;
	}

	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes dash {
		0% {
			stroke-dasharray: 1, 200;
			stroke-dashoffset: 0;
		}
		50% {
			stroke-dasharray: 90, 200;
			stroke-dashoffset: -35px;
		}
		100% {
			stroke-dashoffset: -125px;
		}
	}


	:global(#post-wrapper .serif-demonstration) {
        @apply font-garamond;
	}
	:global(#post-wrapper .display-demonstration) {
        @apply font-fatface;
	}
	:global(#post-wrapper .script-demonstration) {
        @apply font-nautigal;
	}


	:global(#post-wrapper a) {
        position: relative;
		font-style: italic; 
		color:#393e50;   
	}
    :global(#post-wrapper a::before) {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        @apply text-primary-800;
        @apply bg-secondary;
        transform-origin: bottom right;
        transform: scaleX(0);
        transition: transform 0.5s ease;
    }
    :global(#post-wrapper a:hover::before) {
        transform-origin: bottom left;
        transform: scaleX(1);
    }

	:global(#post-wrapper h2){ 
		@apply text-3xl text-primary-700 pt-12 pb-2;
	}
	:global(#post-wrapper h3){ 
		@apply text-2xl text-primary-700 font-semibold pt-8 pb-1;
	}
	:global(#post-wrapper h4){ 
		@apply text-xl text-primary-700 font-semibold pt-8 pb-1;
	}

	:global(#post-wrapper p){ 
		color: #222;
		padding-bottom:12px;
	}
	:global(#post-wrapper blockquote){ 
		@apply pl-4 border-gray-400 border-l-4 my-4 text-gray-600;
	}
	:global(#post-wrapper h2 + h3){
		@apply pb-2 pt-1;
	}
	:global(#post-wrapper h3 + h4){
		@apply pb-2 pt-1;
	}
	:global(#post-wrapper h5 + h6){
		@apply pb-2 pt-1;
	}

	:global(#post-wrapper code){ 
		@apply bg-[#e9e2dd5e] border border-gray-300 p-1 rounded-md text-red-700 text-sm font-mono;
	}
	:global(#post-wrapper pre code){ 
		@apply bg-transparent text-white border-none;
	}

	/* Code block */
	:global(#post-wrapper pre){
        @apply text-sm px-4 pt-1 pb-2 mt-3 mb-5 font-mono bg-primary-900 text-white border-2 border-gray-500 rounded-md w-full block;
    }
    :global(#post-wrapper pre){
        @apply mt-1 mb-2;
    }
	:global(#post-wrapper pre .buttons){
        @apply h-[12px] pb-4 pt-1;
    }

</style>