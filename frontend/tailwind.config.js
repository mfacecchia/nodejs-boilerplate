/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'src/views/**/*.{ejs,html}',
    'src/*.js',
    'public/script/*.js'
  ],
  theme: {
    extend: {}
  },
  plugins: [require("daisyui")]
};