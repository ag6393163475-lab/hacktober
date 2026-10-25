/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          black: '#0F0F11',
          noir: '#17171B',
          charcoal: '#24242A',
          gold: '#C8A26A',
          goldDark: '#9E7A45',
          goldLight: '#E8DBC3',
          sand: '#F3EFE6',
          linen: '#FAF8F5',
          cream: '#FFFDF9',
          border: '#E8E3D9',
          ruby: '#B91C1C',
          emerald: '#0D9488'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif']
      },
      boxShadow: {
        'aesthetic': '0 10px 30px -5px rgba(0, 0, 0, 0.04), 0 20px 25px -5px rgba(200, 162, 106, 0.05)',
        'aesthetic-hover': '0 20px 40px -10px rgba(0, 0, 0, 0.08), 0 25px 35px -5px rgba(200, 162, 106, 0.12)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.06)'
      }
    },
  },
  plugins: [],
}
