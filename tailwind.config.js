/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './source/**/*.jinja',
  ],
  darkMode: 'class',
  plugins: [require('@tailwindcss/forms')],
}