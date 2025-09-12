/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}", // ví dụ cho React
    "./public/index.html"               // ví dụ cho HTML
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: '#FA5130',
        primaryRatingColor: '#FFFBF8',
        primaryBorderRating: '#FFC7B3',
        primaryTextColor: '#ee4d2d',
        grayTextColor: '#888888',
        moregrayTextColor: '#777777',
        hoverTextColorHeader: '#00b9c7',
      }
    },
  },
  plugins: [],
}

