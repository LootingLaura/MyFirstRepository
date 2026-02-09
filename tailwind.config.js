/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./docs/**/*.{vue,md,js,ts}", "./src/**/*.vue"],
  theme: {
    extend: {
      colors: {
        offwhite: "#f5f5f5", // Farbdefinition
      },
      // your custom theme here
    },
  },
  plugins: [],
};
