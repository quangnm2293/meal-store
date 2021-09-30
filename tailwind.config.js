module.exports = {
	mode: 'jit',
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			animation: {
				scaleIn: 'scaleIn 0.3s ease-in-out forwards',
				scaleOut: 'scaleOut 0.3s ease-in-out forwards',
			},
			keyframes: {
				scaleIn: {
					'0%': { transform: 'scale(0)' },
					'100%': { transform: 'scale(1)' },
				},
				scaleOut: {
					'0%': { transform: 'scale(1)' },
					'100%': { transform: 'scale(0)' },
				},
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
