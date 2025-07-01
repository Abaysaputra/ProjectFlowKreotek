// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#2563EB', // blue-600
          dark: '#1E40AF',    // blue-800
          light: '#60A5FA',   // blue-400
        },
        gray: {
          light: '#F3F4F6', // gray-100
          dark: '#1F2937',  // gray-800
        }
      }
    },
  },
  plugins: [],
  darkMode: 'class', // Aktifkan dark mode manual dengan class "dark"
}
