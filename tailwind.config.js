/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
      },
      animation: {
        'bounce-gentle': 'bounce 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'flap': 'flap 0.2s ease-in-out',
        'pipe-slide': 'pipe-slide 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        flap: {
          '0%, 100%': { transform: 'rotate(-10deg) scaleY(1)' },
          '50%': { transform: 'rotate(10deg) scaleY(0.8)' },
        },
        'pipe-slide': {
          '0%': { transform: 'translateX(100px)' },
          '100%': { transform: 'translateX(0px)' },
        }
      },
      colors: {
        'sky-gradient-start': '#87CEEB',
        'sky-gradient-end': '#98FB98',
        'pipe-green': '#228B22',
        'bird-yellow': '#FFD700',
      }
    },
    
  },
  plugins: [],
}
