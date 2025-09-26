/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'google-blue': '#1a73e8',
        'google-green': '#34a853',
        'google-yellow': '#fbbc04',
        'google-red': '#ea4335',
      },
      fontFamily: {
        'google': ['Google Sans', 'Roboto', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'google': '0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)',
        'google-hover': '0 1px 3px 0 rgba(60,64,67,.3), 0 4px 8px 3px rgba(60,64,67,.15)',
      },
    },
  },
  plugins: [],
}