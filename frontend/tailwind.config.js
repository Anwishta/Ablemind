/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',  // ✅ Enable dark mode using the 'class' strategy
  theme: {
    extend: {
      colors: {
        lightText: "#000", // White text in light mode
      },
    },
  },
  plugins: [],
}
