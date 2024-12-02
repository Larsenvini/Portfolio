/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'loreal': {
          primary: '#8B0000',     // Deep Burgundy Red
          secondary: '#C0392B',   // Rich Crimson
          accent: '#F1C40F',      // Elegant Gold
          background: '#F8F4F1',  // Soft Off-White
          'text-primary': '#2C3E50', // Deep Charcoal Gray
          'text-secondary': '#7F8C8D' // Soft Gray
        }
      },
      fontFamily: {
        'sans': ['Helvetica Neue', 'Arial', 'sans-serif']
      },
      transitionTimingFunction: {
        'elegant': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }
    },
  },
  plugins: [],
}