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
      }
    },
  },
  variants: {
    extend: {
      margin: ['last']
    },
  },
  plugins: [],
}