/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'views/**/*.{ejs,html}',
    'src/**/*.js',
    'public/script/**/*.js'
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
      },
      animation: {
        'disappear': 'disappearAnim 3s ease-in-out forwards'
      },
      keyframes: {
        'disappearAnim': {
          '90%': {
            opacity: 1
          },
          '100%': {
            opacity: 0,
          }
        }
      },
    }
  },
  daisyui: {
    themes: [ 'dracula' ]
  },
  plugins: [require("daisyui")]
};