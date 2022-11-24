/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        ph: '501px',
        md2: '1051px',
      },
      colors: {
        twitter: {
          light: '#DEEFFA',
          DEFAULT: '#1D9BF0',
          dark: '#098ae0',
        },
      },
    },
  },
  plugins: [],
};
