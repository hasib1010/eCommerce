/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fire-flame': 'fire-flame 1s infinite',
        'fire-glow': 'fire-glow 1s infinite',
        'moving-border': 'moving-border 1s infinite'
      },
      keyframes: {
        'fire-flame': {
          '0%': { opacity: '0.6', transform: 'translateY(0)' },
          '25%': { opacity: '0.9', transform: 'translateY(-5px)' },
          '50%': { opacity: '1', transform: 'translateY(-10px)' },
          '75%': { opacity: '0.9', transform: 'translateY(-5px)' },
          '100%': { opacity: '0.6', transform: 'translateY(0)' }
        },
        'fire-glow': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(255, 165, 0, 0.8), 0 0 20px rgba(255, 100, 0, 0.6)' },
          '50%': { boxShadow: '0 0 20px rgba(255, 165, 0, 1), 0 0 30px rgba(255, 200, 0, 0.8)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 165, 0, 1), 0 0 30px rgba(255, 200, 0, 0.3)' }
        },
        'moving-border': {
          '0%': { borderColor: 'transparent' }, 
          '100%': { borderColor: 'transparent' }
        }
      }
    }
  },
  plugins: [],
}

