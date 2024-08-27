/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'views/**/*.{ejs,html}',
    'src/*.js',
    'public/script/*.js'
  ],
  theme: {
    extend: {}
  },
  daisyui: {
    themes: [ 'dracula' ]
  },
  plugins: [require("daisyui")]
};