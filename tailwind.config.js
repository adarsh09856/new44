/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bhutan: {
          crimson: '#9e1b27',
          'crimson-dark': '#80131d',
          'crimson-light': '#b91c1c',
          gold: '#d97706',
          'gold-light': '#fbbf24',
          'gold-amber': '#f59e0b',
          navy: '#0f172a',
          'navy-dark': '#090d16',
          slate: '#334155',
          cream: '#fcfbf7',
          warm: '#f8f6f0'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.07)',
        'luxury-hover': '0 30px 60px -15px rgba(158, 27, 39, 0.12)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
