/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'base-black': '#060606',
        'charcoal': '#111111',
        'panel-dark': '#171717',
        'text-white': '#F5F5F5',
        'soft-grey': '#A7A7A7',
        'primary-red': '#D91F26',
        'accent-red': '#FF3B30',
      },
      fontFamily: {
        'sans': ['Sora', 'Inter', 'system-ui', 'sans-serif'],
        'display': ['Space Grotesk', 'Sora', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-in': 'fadeIn 0.7s ease forwards',
        'slow-zoom': 'slowZoom 12s ease-in-out infinite alternate',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.06)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(217, 31, 38, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(217, 31, 38, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
