<script>
    export let message;
</script>

<div class="min-h-full pt-16 pb-12 flex flex-col bg-white">
    <main class="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex-shrink-0 flex justify-center">
        <a href="/" class="inline-flex">
          <span class="sr-only">Gold Fox Dev</span>
          <img class="h-12 w-auto" src="/img/Gold-Fox-Dev-Logo-Transparent.webp" alt="">
        </a>
      </div>
      <div class="py-16">
        <div class="text-center">
          <p class="text-sm font-semibold text-primary-800 uppercase tracking-wide">Unrecognized Error</p>
          <h1 class="mt-2 text-4xl font-extrabold text-secondary tracking-tight sm:text-5xl">{message}</h1>
          <div class="mt-6">
            <a href="/" class="text-base font-medium text-primary-800">Go back home<span aria-hidden="true"> &rarr;</span></a>
          </div>
        </div>
      </div>
    </main>
  </div>
  