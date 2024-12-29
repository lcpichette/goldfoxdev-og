<script>
	let emailInput, submitButton, firstNameInput;
	function checkValidity(element) {
		if (!element) return false;
		return !element.checkValidity() && element.value !== '';
	}
	const firstNameValidation = '[A-Za-z]{2,}';
	const emailValidation =
		'[a-zA-Z0-9._%+-]+@(?!gmail\\.com|outlook\\.com|hotmail\\.com|aol\\.com|yahoo\\.com)[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}';
</script>

<div
	id="contact"
	class="relative bg-gray-50 py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24 z-10"
>
	<div class="relative max-w-xl mx-auto">
		<svg
			class="absolute left-full transform translate-x-1/2"
			width="404"
			height="404"
			fill="none"
			viewBox="0 0 404 404"
			aria-hidden="true"
		>
			<defs>
				<pattern
					id="85737c0e-0916-41d7-917f-596dc7edfa27"
					x="0"
					y="0"
					width="20"
					height="20"
					patternUnits="userSpaceOnUse"
				>
					<rect
						x="0"
						y="0"
						width="4"
						height="4"
						class="text-gray-200"
						fill="currentColor"
					/>
				</pattern>
			</defs>
			<rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
		</svg>
		<svg
			class="absolute right-full bottom-0 transform -translate-x-1/2"
			width="404"
			height="404"
			fill="none"
			viewBox="0 0 404 404"
			aria-hidden="true"
		>
			<defs>
				<pattern
					id="85737c0e-0916-41d7-917f-596dc7edfa27"
					x="0"
					y="0"
					width="20"
					height="20"
					patternUnits="userSpaceOnUse"
				>
					<rect
						x="0"
						y="0"
						width="4"
						height="4"
						class="text-gray-200"
						fill="currentColor"
					/>
				</pattern>
			</defs>
			<rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
		</svg>
		<div class="text-center">
			<h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">Contact Us</h2>
			<p class="mt-4 text-lg leading-6 text-gray-500">
				Want to <span class="text-primary-800 underline-fancy-static-small">learn more</span
				>, or
				<span class="text-primary-800 underline-fancy-static-small">get started</span>?
				Shoot a quick email our way by filling out this form.
			</p>
		</div>

		<div class="mt-12">
			<form
				action="https://app.99inbound.com/api/e/oa4cFnR6"
				method="POST"
				class="flex flex-col gap-2 lg:grid lg:gap-y-2 lg:grid-cols-2 lg:gap-x-8"
			>
				<div>
					<label for="first-name" class="block text-sm font-medium text-gray-700"
						>First name<sup>*</sup></label
					>
					<div class="mt-1">
						<input
							type="text"
							bind:this={firstNameInput}
							on:change={() => {
								if (firstNameInput.value === '') {
									submitButton.disabled = true;
									firstNameInput.classList.remove('invalid-input');
								} else {
									console.dir(firstNameInput, { depth: null });
									if (!firstNameInput.classList.contains('invalid-input')) {
										firstNameInput.classList.add('invalid-input');
									}
									if (
										emailInput.checkValidity() &&
										firstNameInput.checkValidity()
									) {
										submitButton.disabled = false;
									}
								}
							}}
							pattern={firstNameValidation}
							name="first-name"
							id="first-name"
							class:invalid-input={checkValidity(emailInput)}
							autocomplete="given-name"
							class="input"
							required
						/>
						{#if firstNameInput}
							<span
								class:opacity-100={checkValidity(firstNameInput)}
								class="opacity-0 transition duration-300 ease-in-out text-primary-400 text-xs"
								>How should we address you?</span
							>
						{/if}
					</div>
				</div>
				<div>
					<label for="last-name" class="block text-sm font-medium text-gray-700"
						>Last name</label
					>
					<div class="mt-1">
						<input
							type="text"
							name="last-name"
							id="last-name"
							autocomplete="family-name"
							class="input"
						/>
					</div>
				</div>
				<div class="mb-6 col-span-1 lg:col-span-2">
					<label for="company" class="block text-sm font-medium text-gray-700"
						>Company</label
					>
					<div class="mt-1">
						<input
							type="text"
							name="company"
							id="company"
							autocomplete="organization"
							class="input"
						/>
					</div>
				</div>
				<div class="col-span-1 lg:col-span-2">
					<label for="email" class="block text-sm font-medium text-gray-700"
						>Email<sup>*</sup></label
					>
					<div class="mt-1">
						<input
							id="email"
							name="email"
							type="email"
							bind:this={emailInput}
							on:change={() => {
								if (emailInput.value === '') {
									submitButton.disabled = true;
									emailInput.classList.remove('invalid-input');
								} else {
									console.dir(emailInput, { depth: null });
									if (!emailInput.classList.contains('invalid-input')) {
										emailInput.classList.add('invalid-input');
									}
									if (
										emailInput.checkValidity() &&
										firstNameInput.checkValidity()
									) {
										submitButton.disabled = false;
									}
								}
							}}
							pattern={emailValidation}
							class:invalid-input={checkValidity(emailInput)}
							autocomplete="email"
							class="input"
							required
						/>
						{#if emailInput}
							<span
								class:opacity-100={checkValidity(emailInput)}
								class="opacity-0 transition duration-300 ease-in-out text-primary-400 text-xs"
								>Email must be a work email</span
							>
						{/if}
					</div>
				</div>
				<div class="col-span-1 lg:col-span-2 mb-6">
					<label for="phone-number" class="block text-sm font-medium text-gray-700"
						>Phone Number</label
					>
					<div class="mt-1 relative rounded-md shadow-sm">
						<div class="absolute inset-y-0 left-0 flex items-center">
							<label for="country" class="sr-only">Country</label>
							<select
								id="country"
								name="country"
								class="h-full py-0 pl-4 pr-8 border-transparent bg-transparent text-gray-500 focus:ring-secondary focus:border-secondary rounded-md"
							>
								<option>US</option>
								<option>CA</option>
								<option>EU</option>
							</select>
						</div>
						<input
							type="text"
							name="phone-number"
							id="phone-number"
							autocomplete="tel"
							class="py-3 px-4 block w-full pl-20 focus:ring-secondary focus:border-secondary border-gray-300 rounded-md bg-[#fdfdfd]"
							placeholder="+1 (123) 456-7890"
						/>
					</div>
				</div>
				<div class="col-span-1 lg:col-span-2">
					<label for="message" class="block text-sm font-medium text-gray-700"
						>Message</label
					>
					<div class="mt-1">
						<textarea
							id="message"
							name="message"
							rows="4"
							class="py-3 px-4 block w-full shadow-sm focus:ring-secondary focus:border-secondary border border-gray-300 rounded-md bg-[#fdfdfd]"
						/>
					</div>
				</div>
				<div style="position: absolute; left: -5000px;">
					<input
						type="checkbox"
						name="incredible_grey_cracked_tapir"
						value="1"
						tabindex="-1"
						autocomplete="no"
					/>
				</div>
				<div class="pt-4 col-span-2 w-full">
					<button
						bind:this={submitButton}
						type="submit"
						class="disabled:bg-primary-200 disabled:cursor-default cursor-pointer w-full block mx-auto px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-900"
						disabled
					>
						Let's talk
					</button>
				</div>
			</form>
		</div>
	</div>
</div>

<style lang="postcss">
	sup {
		color: #a22616;
		padding-left: 2px;
		font-weight: bold;
	}
	input {
		@apply z-10;
	}
	.input {
		@apply py-3 px-4 block w-full shadow-sm focus:ring-secondary focus:border-secondary border-gray-300 border-gray-300 rounded-md bg-[#fdfdfd];
	}
	.invalid-input {
		@apply invalid:focus:ring-[#A22616] invalid:focus:border-[#A22616] invalid:border-[#A22616];
	}
</style>
