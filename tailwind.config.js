/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#FDFCFA',
          100: '#FAF7F2',
          200: '#F0E8DA',
          300: '#E2D4BE',
          400: '#C4AA82',
          500: '#A67F4E',
          600: '#8B6939',
          700: '#6B502B',
          800: '#4A371D',
          900: '#2D2112',
        },
        lake: {
          50: '#F0F9FB',
          100: '#D9F0F5',
          200: '#B0DFEA',
          300: '#7BC9DB',
          400: '#3FAEC7',
          500: '#2191A8',
          600: '#1B758A',
          700: '#185E6F',
          800: '#174B59',
          900: '#153D49',
        },
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        body: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
