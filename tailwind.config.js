/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#1B4F72',
          navyDark: '#133B57',
          navyLight: '#C7DCEB',
          sky: '#EDF5F8',
          gold: '#FAD06E',
          goldDark: '#C29A2A',
          goldLight: '#FDE9B8',
          cream: '#FBF5EB',
          charcoal: '#1F1F1F',
          darkGray: '#3A3A3A',
          softGray: '#F2F2F2',
          ghost: '#FAFAFA',
        },
      },
      fontFamily: {
        sans: ['Lora', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}