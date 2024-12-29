<script>
    export let currencySymbol;
    export let totalPrice;
    export let paymentPlanMonths;
    export let feePerMonth;
    export let subscriptionDivisor;
    export let discount = 0;

    $: subscriptionPrice = totalPrice / subscriptionDivisor;
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<div class='flex flex-col max-w-7xl mx-auto w-full mt-12'>
    <div class='mt-10'>
        <div class='pt-12 px-4 sm:px-6 lg:px-8 lg:pt-20'>
            <div class='text-center'>
                <h2 class='text-lg leading-6 font-semibold text-secondary uppercase tracking-wider'>
                    Pricing
                </h2>
                <p class='mt-2 text-3xl font-extrabold text-primary-800 sm:text-4xl lg:text-5xl'>
                    Contact Us to Get Started
                </p>
                <p class='mt-3 max-w-4xl mx-auto text-xl text-gray-500 sm:mt-5 sm:text-2xl'>
                    Reach out to see if you qualify for a discount.
                </p>
            </div>
        </div>

        <div class='mt-16 bg-white pb-12 lg:mt-20 lg:pb-20'>
            <div class='relative z-0'>
                <div class='absolute inset-0 h-5/6 lg:h-2/3' />
                <div class='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div class='relative lg:grid lg:grid-cols-7'>
                        <!-- Subscription -->
                        <div
                            class='mx-auto max-w-md lg:mx-0 lg:max-w-none lg:col-start-1 lg:col-end-3 lg:row-start-2 lg:row-end-3'
                        >
                            <div
                                class='h-full flex flex-col rounded-lg shadow-lg overflow-hidden lg:rounded-none lg:rounded-l-lg'
                            >
                                <div class='flex-1 flex flex-col'>
                                    <div class='bg-white px-6 py-10'>
                                        <div>
                                            <h3
                                                class='text-center text-2xl font-medium text-primary-800'
                                                id='tier-hobby'
                                            >
                                                Subscription
                                            </h3>

                                            {#if discount}
                                                <div
                                                    class='strikethrough mt-4 flex items-center justify-center relative'
                                                >
													<span
                                                        class='px-3 flex items-start text-xl tracking-tight text-primary-500'
                                                    >
														<span class='text-lg font-medium'>
															{currencySymbol}
														</span>
														<span
                                                            class='font-extrabold -mr-[9px]'
                                                            data-usdprice={subscriptionPrice.toFixed(
																0
															)}
                                                        >
															{subscriptionPrice.toFixed(0)}
														</span>
													</span>
                                                    <span class='text-md font-medium text-gray-500'>
														/month
													</span>
                                                </div>
                                            {/if}
                                            <div class='mt-4 flex items-center justify-center'>
												<span
                                                    class='px-3 flex items-start text-6xl tracking-tight text-primary-800'
                                                >
													<span class='mt-2 mr-2 text-4xl font-medium'>
														{currencySymbol}
													</span>
													<span
                                                        class='font-extrabold'
                                                        data-usdprice={Math.floor(
															subscriptionPrice * (1 - discount)
														)}
                                                    >
														{Math.floor(
                                                            subscriptionPrice * (1 - discount)
                                                        )}
													</span>
												</span>
                                                <span class='text-xl font-medium text-gray-500'>
													/month
												</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class='justify-between border-t-2 border-gray-100 p-6 bg-gray-50'
                                    >
                                        <p class='text-gray-700 text-sm'>
                                            Yours, but only when paying for the subscription. Costs
                                            reduced to 1/{subscriptionDivisor} of the total, repeated
                                            payment monthly to stay subscribed.
                                        </p>
                                        <div class='mt-6'>
                                            <div class='rounded-lg shadow-md'>
                                                <a
                                                    href='/#contact'
                                                    class='block w-full text-center rounded-lg border border-transparent bg-white px-6 py-3 text-base font-semibold text-primary-800 hover:bg-gray-50'
                                                    aria-describedby='tier-scale'
                                                >
                                                    Contact Us to Get Started
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Payment Plan -->
                        <div
                            class='mt-10 max-w-lg mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-start-3 lg:col-end-6 lg:row-start-1 lg:row-end-4'
                        >
                            <div class='relative z-10 rounded-lg shadow-xl'>
                                <div
                                    class='pointer-events-none absolute inset-0 rounded-lg border-2 border-secondary'
                                    aria-hidden='true'
                                />
                                <div class='absolute inset-x-0 top-0 transform translate-y-px'>
                                    <div class='flex justify-center transform -translate-y-1/2'>
										<span
                                            class='inline-flex rounded-full bg-secondary px-4 py-1 text-sm font-semibold tracking-wider uppercase text-primary-900'
                                        >
											Most popular
										</span>
                                    </div>
                                </div>
                                <div class='bg-white rounded-t-lg px-6 pt-12 pb-10'>
                                    <div>
                                        <h3
                                            class='text-center text-3xl font-semibold text-primary-800 sm:-mx-6'
                                            id='tier-growth'
                                        >
                                            Payment Plan
                                        </h3>
                                        {#if discount}
                                            <div
                                                class='strikethrough mt-4 flex items-center justify-center relative'
                                            >
												<span
                                                    class='px-3 flex items-start text-xl tracking-tight text-primary-500'
                                                >
													<span class='text-lg font-medium'>
														{currencySymbol}
													</span>
													<span
                                                        class='font-extrabold -mr-[9px]'
                                                        data-usdprice={(
															totalPrice / paymentPlanMonths +
															feePerMonth
														).toFixed(0)}
                                                    >
														{(
                                                            totalPrice / paymentPlanMonths +
                                                            feePerMonth
                                                        ).toFixed(0)}
													</span>
												</span>
                                                <span class='text-md font-medium text-gray-500'>
													/month
												</span>
                                            </div>
                                        {/if}
                                        <div class='mt-4 flex items-center justify-center'>
											<span
                                                class='px-3 flex items-start text-6xl tracking-tight text-primary-800 sm:text-6xl'
                                            >
												<span class='mt-2 mr-2 text-4xl font-medium'>
													{currencySymbol}
												</span>
												<span
                                                    class='font-extrabold'
                                                    data-usdprice={Math.floor(
														(totalPrice / paymentPlanMonths +
															feePerMonth) *
															(1 - discount)
													)}
                                                >
													{Math.floor(
                                                        (totalPrice / paymentPlanMonths +
                                                            feePerMonth) *
                                                        (1 - discount)
                                                    )}
												</span>
											</span>
                                            <span class='text-2xl font-medium text-gray-500'>
												/month
											</span>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class='border-t-2 border-gray-100 rounded-b-lg pt-10 pb-8 px-6 bg-gray-50'
                                >
                                    <p class='text-gray-700 text-sm'>
                                        It's yours forever, but with the payment split into {paymentPlanMonths}
                                        payments, and an additional ${feePerMonth} each month.
                                    </p>
                                    <div class='mt-6'>
                                        <div class='rounded-lg shadow-md'>
                                            <a
                                                href='/#contact'
                                                class='block w-full text-center rounded-lg border border-transparent bg-primary-900 px-6 py-3 text-base font-semibold text-white'
                                                aria-describedby='tier-scale'
                                            >
                                                Contact Us to Get Started
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Traditional -->
                        <div
                            class='mt-10 mx-auto max-w-md lg:m-0 lg:max-w-none lg:col-start-6 lg:col-end-8 lg:row-start-2 lg:row-end-3'
                        >
                            <div
                                class='h-full flex flex-col rounded-lg shadow-lg overflow-hidden lg:rounded-none lg:rounded-r-lg'
                            >
                                <div class='bg-white px-6 py-10'>
                                    <div>
                                        <h3
                                            class='text-center text-2xl font-medium text-primary-800'
                                            id='tier-scale'
                                        >
                                            Traditional
                                        </h3>
                                        {#if discount}
                                            <div
                                                class='strikethrough mt-4 flex items-center justify-center relative'
                                            >
												<span
                                                    class='px-3 flex items-start text-xl tracking-tight text-primary-500'
                                                >
													<span class='text-lg font-medium'>
														{currencySymbol}
													</span>
													<span
                                                        class='font-extrabold -mr-[9px]'
                                                        data-usdprice={totalPrice}
                                                    >
														{Math.floor(
                                                            (totalPrice * (1 - discount)) / 2
                                                        )}
													</span>
												</span>
                                                <span class='text-md font-medium text-gray-500'>
													/payment
												</span>
                                            </div>
                                        {/if}
                                        <div class='mt-4 flex items-center justify-center'>
											<span
                                                class='px-3 flex items-start text-6xl tracking-tight text-primary-800'
                                            >
												<span class='mt-2 mr-2 text-4xl font-medium'>
													{currencySymbol}
												</span>
												<span
                                                    class='font-extrabold'
                                                    data-usdprice={Math.floor(
														totalPrice * (1 - discount)
													)}
                                                >
													{Math.floor((totalPrice * (1 - discount)) / 2)}
												</span>
											</span>
                                            <span class='text-2xl font-medium text-gray-500'>
												/payment
											</span>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class='flex flex-col justify-between border-t-2 border-gray-100 p-6 bg-gray-50 h-full'
                                >
                                    <p class='text-gray-700 text-sm'>
                                        Yours forever. Cost split into two payments; Pay half
                                        upfront, and half when job is done.
                                    </p>
                                    <div class='mt-6'>
                                        <div class='rounded-lg shadow-md'>
                                            <a
                                                href='/#contact'
                                                class='block w-full text-center rounded-lg border border-transparent bg-white px-6 py-3 text-base font-semibold text-primary-800 hover:bg-gray-50'
                                                aria-describedby='tier-scale'
                                            >
                                                Contact Us to Get Started
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style lang='postcss'>
    .strikethrough {
        text-align: center;
        margin: 20px;
        position: relative;
    }

    .strikethrough:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        border-top: 3px solid rgb(255, 184, 6);
        background: black;
        width: 140px;
        transform: translate(-50%, -50%) rotate(-10deg);
    }

    a {
        z-index: 1;
        position: relative;
        font-size: inherit;
        font-family: inherit;
        padding: 0.5em 1em;
        outline: none;
        border: none;

        overflow: hidden;
        transition: color 0.45s ease-in-out;
    }

    a::before {
        content: '';
        z-index: -1;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 1em;
        height: 1em;
        border-radius: 50%;

        @apply bg-secondary;
        transform-origin: center;
        transform: translate3d(-50%, -50%, 0) scale3d(0, 0, 0);
        transition: transform 0.45s ease-in-out;
    }

    a:hover {
        cursor: pointer;
        color: #161616;
    }

    a:hover::before {
        transform: translate3d(-50%, -50%, 0) scale3d(50, 50, 50);
    }
</style>
