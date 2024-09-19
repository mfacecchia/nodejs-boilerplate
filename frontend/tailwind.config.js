/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'views/**/*.{ejs,html}',
    'src/*.js',
    'public/script/*.js'
  ],
  // List of pre-declared classes to add in the output stylesheet
  safelist: [
    {
      pattern: /alert-(info|error|success|primary)/
    }
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif']
      }
    }
  },
  daisyui: {
    themes: [ 'dracula' ]
  },
  plugins: [require("daisyui")]
};