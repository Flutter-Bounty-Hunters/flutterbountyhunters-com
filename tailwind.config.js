/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './lib/**/*.dart',
    './scripts/**/*.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        // Animates the standalone `translate` property, rather than `transform`, so that
        // this composes with the translate-x/translate-y utilities on the same element.
        float: {
          '0%, 100%': { translate: '0 -2%' },
          '50%': { translate: '0 2%' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
