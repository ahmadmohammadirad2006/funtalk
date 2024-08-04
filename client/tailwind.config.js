/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./dist/*.html'],
  theme: {
    extend: {
      backgroundImage: {
        'background-pattern': "url('./src/assets/images/background.jpg')",
      },
    },
    colors: {
      primary: '#8e44ad',
      white: '#fff',
      black: '#000',
      lightGray: '#D9D9D9',
      gray: '#525252',
    },
    fontFamily: {
      nunito: ['Nunito', 'sans-serif'],
    },
  },
  plugins: [],
};
