/** @type {import('tailwindcss').Config} */
module.exports = {

  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "primary": "#6490fa",
        "dark-section": "#1b1f23",
        "sub": "#f2f2f2",
        "dark-second": "#242526"
      }
    },
  },
  plugins: [],
}