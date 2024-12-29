<script>
	export let service;
	export let description;
	export let price;
	export let discount = 0;

	export let price_type = 'price';
	export let currencySymbol = undefined;
	export let selected = undefined;
	export let amount = undefined;

	let displayPrice, discountedDisplayPrice;

	function updatePrices(discount) {
		displayPrice = `
            ${price_type === 'price' ? currencySymbol : ''}
            ${price_type === 'price' ? Math.floor(price) : price * 100}
        `;
		discountedDisplayPrice = `
            ${price_type === 'price' ? currencySymbol : ''}
            ${price_type === 'price' ? Math.floor(price * (1 - discount)) : price * 100}
        `;
	}

	$: updatePrices(discount);
</script>

<tr class="p-3 bg-white relative z-20 max-w-full">
	<td class="px-2 lg:px-6 py-4 text-sm font-medium text-gray-900">
		{service}
	</td>
	<td class="px-2 lg:px-6 py-4 text-sm text-gray-500 lg:col-span-1">
		{description}
	</td>
	<td class="hidden lg:table-cell px-2 lg:px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
		{#if discount}
			<div class="flex flex-wrap">
				<span class="price line-through" data-usdprice={price}>
					{displayPrice}
				</span>
				<span class="price font-bold" data-usdprice={price}>
					{discountedDisplayPrice}
				</span>
			</div>
		{:else}
			<span class="price" data-usdprice={price}>
				{displayPrice}
			</span>
		{/if}
		{#if price_type === 'discount'}
			<span>%</span>
		{/if}
	</td>
	{#if selected != null}
		<td class="hidden lg:table-cell px-0 py-4 text-right text-sm font-medium">
			<div class="w-full h-full flex justify-center align-center">
				<div class="flex justify-center h-5">
					<input
						bind:checked={selected}
						type="checkbox"
						class="focus:ring-secondary h-4 w-4 text-secondary border-gray-300 rounded"
					/>
				</div>
			</div>
		</td>
	{:else}
		<td class="hidden lg:table-cell px-2 py-4 text-sm text-gray-500">
			<div class="w-full h-full flex justify-center align-center">
				<div class="flex justify-center h-5">
					<input
						bind:value={amount}
						placeholder="0"
						type="text"
						pattern="[0-9]+"
						class="focus:ring-secondary active:ring-secondary h-6 w-10 px-2 py-1 border-gray-300 border rounded text-center invalid:text-error invalid:border-error valid:border-gray-300 valid:text-gray-500"
					/>
				</div>
			</div>
		</td>
	{/if}
</tr>

<!-- Mobile -->
{#if selected != null}
	<tr class="border-gray-200 border-b table-row lg:hidden w-full">
		<td class="px-2 py-1 pb-2 h-9 text-sm text-gray-500 whitespace-nowrap">
			<div class="flex w-full h-full items-center">
				{#if discount}
					<div class="flex flex-wrap gap-1">
						<span class="price line-through" data-usdprice={price}>
							{displayPrice}
						</span>
						<span class="price font-bold" data-usdprice={price}>
							{discountedDisplayPrice}
						</span>
					</div>
				{:else}
					<span class="price" data-usdprice={price}>
						{displayPrice}
					</span>
				{/if}
				{#if price_type === 'discount'}
					<span>%</span>
				{/if}
			</div>
		</td>
		<td class="px-2 py-4 text-sm text-gray-500">
			<div class="flex justify-center">
				<input
					bind:checked={selected}
					type="checkbox"
					class="focus:ring-secondary h-9 w-full lg:w-9 text-secondary border-gray-300 rounded-lg"
				/>
			</div>
		</td>
	</tr>
{:else}
	<tr class="border-gray-200 border-b table-row lg:hidden">
		<td class="px-2 py-1 pb-2 align-top text-sm align text-gray-500 whitespace-nowrap">
			{#if discount}
				<div class="flex flex-wrap gap-1">
					<span class="price line-through" data-usdprice={price}>
						{displayPrice}
					</span>
					<span class="price font-bold" data-usdprice={price}>
						{discountedDisplayPrice}
					</span>
				</div>
			{:else}
				<span class="price" data-usdprice={price}>
					{displayPrice}
				</span>
			{/if}
			{#if price_type === 'discount'}
				<span>%</span>
			{/if}
		</td>
		<td class="px-2 py-4 text-sm text-gray-500">
			<div class="h-5 w-full max-w-full lg:w-20 flex justify-center items-center">
				<input
					bind:value={amount}
					placeholder="0"
					type="text"
					pattern="[0-9]+"
					class="mb-4 focus:ring-secondary active:ring-secondary h-8 w-full lg:w-20 px-2 py-2 border-gray-300 border rounded text-center invalid:ring-error invalid:text-error invalid:border-error invalid:text-error valid:border-gray-300 valid:text-gray-500"
				/>
			</div>
		</td>
	</tr>
{/if}
