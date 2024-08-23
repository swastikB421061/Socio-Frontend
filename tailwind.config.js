import daisyui from "daisyui";
import daisyUIThemes from "daisyui/src/theming/themes";
/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [daisyui],

	daisyui: {
		themes: [
			
			{
				black: {
					...daisyUIThemes["dark"],
					primary: "rgb(17,85,163)",
					secondary: "rgb(17,85,163)",
				},
			},
		],
	},
};
