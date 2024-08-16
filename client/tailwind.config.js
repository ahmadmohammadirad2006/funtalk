/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./dist/*.html'],
  theme: {
    colors: {
      primary: '#8e44ad',
      white: '#fff',
      black: '#000',
      lightGray: '#D9D9D9',
      skyBlue: '#0984E3',
      gray: '#525252',
      red: '#E74C3C',
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
  },
  plugins: [],
};
