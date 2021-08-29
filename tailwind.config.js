module.exports = {
  purge: [
    './public/**/*.html',
    './src/**/*.vue',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        '2xs': '.625rem'
      },
      width: {
        '25': '6.25rem',
      },
      height:{
        '25': '6.25rem',
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      } 
    },
  },
  variants: {
    extend: {
      margin: ['last'],
      borderWidth: ['hover', 'focus'],
    },
  },
  plugins: [],
}