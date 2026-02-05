/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './docs/**/*.{vue,md,js,ts}',
    './src/**/*.vue',
  ],
  theme: {
    extend: {
      colors: {
        offwhite: '#f5f5f5', // Hier definierst du deine eigene Farbe
      },
      // your custom theme here
    },
  },
  plugins: [],
};
