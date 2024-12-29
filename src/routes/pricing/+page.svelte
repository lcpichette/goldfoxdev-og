<script>
	import { onMount } from 'svelte';
	import { gql, GraphQLClient } from 'graphql-request';

	let banner; // data
	let discountBanner; // data
	let currency = 'USD'; // data
	let currencySymbol = '$'; // component param
	let options;
	let prices;
	let paymentPlanMonths; // component param
	let feePerMonth; // component param
	let subscriptionDivisor; // component param
	let servicesLoaded = false; // status
	let queryParams; // data
	let affiliateDiscount, directDiscount; // interim variables
	let discount; // data
	let discountName; // data
	let totalPrice = undefined;
	let rate = 0; // data
	//

	let conversions = {
		data: {
			USD: 1, // base currency
			ARS: undefined,
			AUD: undefined,
			CAD: undefined,
			EUR: undefined,
			JPY: undefined,
			CHF: undefined,
			GBP: undefined
		},
		symbols: {
			USD: '$', // base currency
			ARS: '$',
			AUD: '$',
			CAD: '$',
			EUR: '€',
			JPY: '¥',
			CHF: 'CHF',
			GBP: '£'
		}
	};

	onMount(() => {
		for (const [i, tag] of Object.keys(conversions.symbols).entries()) {
			loadPrice(tag, 1)
				.then((conversionData) => {
					conversions.data[tag] = conversionData.new_amount;
				})
				.catch((err) => console.error(err));
		}

		loadRate();

		queryParams = new Proxy(new URLSearchParams(window.location.search), {
			get: (searchParams, prop) => searchParams.get(prop)
		});
		if (queryParams.discount) {
			checkForDiscount(queryParams.discount).then((discount) => {
				if (discount) {
					directDiscount = discount;
				} else {
					affiliateDiscount = 0;
				}
			});
		}
		if (queryParams.affiliate) {
			checkForAffiliate(queryParams.affiliate).then((discount) => {
				if (discount) {
					affiliateDiscount = discount;
				} else {
					affiliateDiscount = 0;
				}
			});
		}
	});

	function toggleBanner() {
		discountBanner = false;
		setTimeout(() => {
			banner.style.display = 'none';
		}, 600);
	}

	async function checkForDiscount(code) {
		const DATE_SEG = new Date(new Date())
			.toLocaleString()
			.split(',')[0]
			.split('/')
			.map((seg) => seg.padStart(2, '0'));
		const TODAY = `${DATE_SEG[2]}-${DATE_SEG[0]}-${DATE_SEG[1]}`;
		const query = gql`
        query Discounts {
          discounts(
            where: {validUntil_gte: "${TODAY}", queryParamTitle: "${code}", active: true}
          ) {
            validUntil
            percent
          }
        }
        `;
		const hygraph = new GraphQLClient(
			'https://us-west-2.cdn.hygraph.com/content/ckx6em1th5ke501xq4z6t1q05/master',
			{ headers: {} }
		);
		const res = await hygraph.request(query);
		return res.discounts[0]?.percent || 0;
	}

	async function checkForAffiliate(code) {
		const DATE_SEG = new Date(new Date())
			.toLocaleString()
			.split(',')[0]
			.split('/')
			.map((seg) => seg.padStart(2, '0'));
		const TODAY = `${DATE_SEG[2]}-${DATE_SEG[0]}-${DATE_SEG[1]}`;
		const query = gql`
        query Affiliates {
          affiliates(
            where: {validUntil_gte: "${TODAY}", queryParamTitle: "${code}", active: true}
          ) {
            validUntil
            percent
            kickback
          }
        }
        `;
		const hygraph = new GraphQLClient(
			'https://us-west-2.cdn.hygraph.com/content/ckx6em1th5ke501xq4z6t1q05/master',
			{ headers: {} }
		);
		const res = await hygraph.request(query);
		return res.affiliates[0]?.percent || 0;
	}

	async function loadRate() {
		const query = gql`
			query Rates {
				rates {
					hourly
				}
			}
		`;
		const hygraph = new GraphQLClient(
			'https://us-west-2.cdn.hygraph.com/content/ckx6em1th5ke501xq4z6t1q05/master',
			{ headers: {} }
		);
		const res = await hygraph.request(query);
		rate = res.rates[0].hourly;
	}

	async function loadPrice(tag, amount) {
		const url = `https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency?have=USD&want=${tag}&amount=${amount}`;
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': '706136ec32msh717478ab5e5c67ap188ccdjsn427bf120f53b',
				'X-RapidAPI-Host': 'currency-converter-by-api-ninjas.p.rapidapi.com'
			}
		};

		let data;
		await fetch(url, options)
			.then((res) => {
				data = res.json();
				return data;
			})
			.catch((err) => console.error('error:' + err));

		return await data;
	}

	function updateCurrency() {
		for (const o of options) {
			if (o.selected) {
				currency = o.value;
				break;
			}
		}

		prices = document.querySelectorAll('.price');
		for (const price of prices) {
			price.innerText = Math.round(
				parseFloat(price.dataset.usdprice) * conversions.data[currency]
			);
		}

		currencySymbol = conversions.symbols[currency];
	}

	$: {
		discountBanner = true;
		if ((affiliateDiscount || 0) > (directDiscount || 0)) {
			discount = affiliateDiscount;
			discountName = queryParams?.affiliate;
		} else {
			discount = directDiscount;
			discountName = queryParams?.discount;
		}
	}
</script>

<svetle:head>
	<title>GFD Pricing</title>
</svetle:head>

<div>
	<div class="bg-primary-700">
		<div
			class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-between"
		>
			<div class="max-w-2xl">
				<h2
					class="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl"
				>
					Pricing
				</h2>
				<p class="mt-5 text-xl text-gray-400">
					You're only billed by the hours our engineers work. Product Management and
					Quality Assurance are baked-in to the hourly rate we charge for our engineering
					superstars. <a
						class="underline text-gray-500 hover:text-gray-400"
						href="/#contact">More info</a
					>
				</p>
			</div>
			<!--
			<div class="mt-10 w-full max-w-xs">
				<label for="currency" class="block text-base font-medium text-gray-300"
					>Currency</label
				>
				<div class="mt-1.5 relative">
					<select
						id="currency"
						name="currency"
						class="appearance-none block w-full bg-none bg-primary-800 border border-transparent rounded-md pl-3 pr-10 py-2 text-base text-white focus:outline-none focus:ring-1 focus:ring-white focus:border-white sm:text-sm"
						on:change={() => {
							updateCurrency();
						}}
					>
						<option value="ARS">Argentina (ARS)</option>
						<option value="AUD">Australia (AUD)</option>
						<option value="USD" selected>United States (USD)</option>
						<option value="CAD">Canada (CAD)</option>
						<option value="EUR">France (EUR)</option>
						<option value="JPY">Japan (JPY)</option>
						<option value="CHF">Switzerland (CHF)</option>
						<option value="GBP">United Kingdom (GBP)</option>
					</select>
					<div
						class="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center"
					>
						<svg
							class="h-4 w-4 text-white"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
				</div>
			</div>
			-->
		</div>
	</div>

	{#if rate}
		<div class="flex flex-col max-w-7xl mx-auto w-full mt-0">
			<div class="w-full">
				<div class="bg-white py-16 sm:py-24">
					<div class="mx-auto max-w-7xl px-6 lg:px-8">
						<div class="mx-auto max-w-2xl sm:text-center">
							<h2
								class="text-slate-700 text-3xl font-bold tracking-tight sm:text-4xl"
							>
								Simple no-tricks pricing
							</h2>
							<p class="mt-4 text-lg leading-6 text-slate-500">
								Contact us for a custom quote, or to <a
									class="underline"
									href="/#contact">see if you're eligible for a discount</a
								>.
							</p>
						</div>
						<div
							class="text-slate-700 mx-auto mt-8 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none"
						>
							<div class="p-8 sm:p-10 lg:flex-auto">
								<h3 class="text-2xl font-bold tracking-tight">Scalable Billing</h3>
								<p class="mt-6 text-base leading-7 text-slate-600">
									Scale up/down our services as you need them, billed prepaid
									monthly.
								</p>
								<div class="mt-10 flex items-center gap-x-4">
									<h4
										class="flex-none text-sm font-semibold leading-6 underline-fancy-static"
									>
										What’s included
									</h4>
									<div class="h-px flex-auto bg-gray-100" />
								</div>
								<ul
									role="list"
									class="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
								>
									<li class="flex gap-x-3">
										<svg
											class="h-6 w-5 flex-none text-secondary"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												fill-rule="evenodd"
												d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
												clip-rule="evenodd"
											/>
										</svg>
										Top Talent
									</li>
									<li class="flex gap-x-3">
										<svg
											class="h-6 w-5 flex-none text-secondary"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												fill-rule="evenodd"
												d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
												clip-rule="evenodd"
											/>
										</svg>
										Quality Assurance
									</li>
									<li class="flex gap-x-3">
										<svg
											class="h-6 w-5 flex-none text-secondary"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												fill-rule="evenodd"
												d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
												clip-rule="evenodd"
											/>
										</svg>
										Corporate Liason
									</li>
									<li class="flex gap-x-3">
										<svg
											class="h-6 w-5 flex-none text-secondary"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												fill-rule="evenodd"
												d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
												clip-rule="evenodd"
											/>
										</svg>
										Granular Control
									</li>
									<li class="flex gap-x-3">
										<svg
											class="h-6 w-5 flex-none text-secondary"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												fill-rule="evenodd"
												d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
												clip-rule="evenodd"
											/>
										</svg>
										Free Product Management
									</li>
									<li class="flex gap-x-3">
										<svg
											class="h-6 w-5 flex-none text-secondary"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												fill-rule="evenodd"
												d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
												clip-rule="evenodd"
											/>
										</svg>
										Partial-Engineers Available
									</li>
								</ul>
							</div>
							<div class="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
								<div
									class="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16"
								>
									<div class="mx-auto max-w-xs px-8">
										<p class="text-base font-semibold text-gray-600">
											Per-hour
										</p>
										<p class="mt-6 flex items-baseline justify-center gap-x-2">
											<span
												class="text-5xl font-bold tracking-tight text-slate-700"
											>
												{#if discount}
													<s class="text-3xl text-slate-500 pr-1"
														>{rate}</s
													>
													<span class="highlight"
														>{currencySymbol}<span class="price"
															>{(1 - discount) * rate}</span
														></span
													>
												{:else}
													<span class="price">{currencySymbol}{rate}</span
													>
												{/if}
											</span>
											<span
												class="text-sm font-semibold leading-6 tracking-wide text-gray-600"
												>USD</span
											>
										</p>
										<a
											href="/#contact"
											class="button w-44 flex justify-center mt-8 mx-auto font-bold rounded-md text-white bg-primary-900"
										>
											<span>Learn More</span>
										</a>
										<p class="mt-6 text-xs leading-5 text-gray-600">
											Invoices provided for all purchases
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<div class="w-full flex justify-center items-center my-24 md:my-40 lg:my-50" role="status">
			<svg
				aria-hidden="true"
				class="w-16 h-16 text-primary-100 animate-spin fill-primary-900"
				viewBox="0 0 100 101"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
					fill="currentColor"
				/>
				<path
					d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
					fill="currentFill"
				/>
			</svg>
			<span class="sr-only">Loading...</span>
		</div>
	{/if}

	{#if discount}
		<div
			class="pointer-events-none fixed inset-x-0 bottom-0 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8 z-[999999] banner"
			class:fadeOut={!discountBanner}
			bind:this={banner}
		>
			<div
				class="pointer-events-auto flex items-center justify-between gap-x-6 bg-primary-900 py-2.5 px-6 sm:rounded-xl sm:py-3 sm:pr-3.5 sm:pl-4"
			>
				<p class="text-sm leading-6 text-[#fff]">
					<strong class="font-semibold text-secondary">{discount * 100}% Savings!</strong>
					<svg
						viewBox="0 0 2 2"
						class="mx-2 inline h-0.5 w-0.5 fill-current"
						aria-hidden="true"
					>
						<circle cx="1" cy="1" r="1" />
					</svg>
					<span
						>Thanks to {discount === affiliateDiscount ? 'affiliate' : 'discount'} code
						<span class="text-secondary">{discountName}</span></span
					>
				</p>
				<button type="button" class="-m-1.5 flex-none p-1.5" on:click={toggleBanner}>
					<span class="sr-only">Dismiss</span>
					<svg
						class="h-5 w-5 text-primary-200"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
						/>
					</svg>
				</button>
			</div>
		</div>
	{/if}
</div>

<style lang="postcss">
	tr:nth-of-type(2n) {
		@apply bg-gray-50;
	}

	th {
		@apply font-bold;
	}

	.banner {
		opacity: 1;
	}

	.fadeOut {
		opacity: 0;
		transition: opacity 0.6s ease-in-out;
	}

	.higlight {
		position: relative;
		z-index: 1;
		@apply font-semibold;
	}

	.higlight::before {
		content: '';
		position: absolute;
		z-index: -1;
		top: 0;
		bottom: 0;
		left: -0.25em;
		right: -0.25em;
		background-color: hsla(59, 97%, 59%, 0.657);
		//transform-origin: center right;
		transform: scaleX(1);
		transform-origin: center left;
		transition: transform 0.2s ease-in-out;
	}

	/*
	.higlight:hover::before {
		transform: scaleX(1);
		transform-origin: center left;
	}
	*/
</style>
