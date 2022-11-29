/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        ph_sm: '401px',
        ph: '501px',
        md2: '1051px',
      },
      colors: {
        twitter: {
          light: '#DEEFFA',
          DEFAULT: '#1D9BF0',
          dark: '#098ae0',
        },
        like: {
          light: '#FCD7E8',
          DEFAULT: '#F91880',
        },
      },
    },
  },
  plugins: [],
};
