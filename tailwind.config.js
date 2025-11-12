/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'pulse-ring': {
          '0%': { 
            boxShadow: '0 0 20px #00ffff, inset 0 0 20px #00ffff' 
          },
          '100%': { 
            boxShadow: '0 0 35px #00ffff, inset 0 0 35px #00ffff' 
          },
        },
        'fade-in': { /* Used in HeroSection component */
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'glitch-anim': {
            '0%': { clip: 'rect(28px, 9999px, 34px, 0)', transform: 'skew(0.5deg)' },
            '10%': { clip: 'rect(78px, 9999px, 86px, 0)', transform: 'skew(0.2deg)' },
            '20%': { clip: 'rect(61px, 9999px, 73px, 0)', transform: 'skew(-0.5deg)' },
            '30%': { clip: 'rect(10px, 9999px, 20px, 0)', transform: 'skew(0.7deg)' },
            '40%': { clip: 'rect(54px, 9999px, 66px, 0)', transform: 'skew(-0.3deg)' },
            '50%': { clip: 'rect(12px, 9999px, 25px, 0)', transform: 'skew(0.1deg)' },
            '60%': { clip: 'rect(80px, 9999px, 95px, 0)', transform: 'skew(-0.6deg)' },
            '70%': { clip: 'rect(33px, 9999px, 49px, 0)', transform: 'skew(0.4deg)' },
            '80%': { clip: 'rect(66px, 9999px, 79px, 0)', transform: 'skew(-0.2deg)' },
            '90%': { clip: 'rect(40px, 9999px, 55px, 0)', transform: 'skew(0.3deg)' },
            '100%': { clip: 'rect(15px, 9999px, 27px, 0)', transform: 'skew(-0.4deg)' }
        },
        // Kept 'white-flash' for compatibility, though not used in this HeroSection component
        'white-flash': {
          '0%': { 
            opacity: '1', 
          },
          '100%': { 
            opacity: '0',
          },
        },
      },
      animation: {
        'pulse-ring': 'pulse-ring 1s infinite alternate',
        'fade-in': 'fade-in 1s ease-out forwards', /* Mapped new keyframe */
        'glitch': 'glitch-anim 3s infinite linear alternate-reverse',
        'white-flash': 'white-flash 1s ease-out forwards',
      },
      boxShadow: {
        'cyan-glow': '0 0 10px #00ffff, 0 0 20px rgba(0, 255, 255, 0.4)',
      },
      textShadow: {
        'cyberpunk': '0 0 7px #fff, 0 0 10px #fff, 0 0 21px #00ffff, 0 0 42px #00ffff',
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const newUtilities = {
        '.text-shadow-cyberpunk': {
          textShadow: theme('textShadow.cyberpunk'),
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
};