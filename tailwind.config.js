/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        sparkle: {
          '0%, 100%': { opacity: '1' }, // 파란색
          '50%': { opacity: '0' }, // 노란색
        },
      },
    },
    animation: {
      sparkle: 'sparkle 1.5s infinite',
    },
  },
  plugins: [],
};
