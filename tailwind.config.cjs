/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography'), require("@tailwindcss/aspect-ratio")],
	theme: {
		extend: {
			fontFamily: {
				garamond: ['garamond', 'serif'],
				fatface: ['fatface', 'display'],
				nautigal: ['nautigal', 'script']
			},
			colors: {
				primary: {
					100: 'rgb(185,189, 206)',
					200: 'rgb(163, 169, 190)',
					300: 'rgb(139, 145, 173)',
					400: 'rgb(110, 118, 152)',
					500: 'rgb(89, 96, 125)',
					600: 'rgb(71, 77, 101)',
					700: 'rgb(57, 62, 80)',
					800: 'rgb(48, 52, 68)',
					900: 'rgb(39, 43, 56)',
					950: 'rgb(31, 34, 48)'
				},
				secondary: '#ffb806',
				error: '#b32918'
			}
		}
	}
};
