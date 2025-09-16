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
      },
      backgroundImage: {
        skeletonBackground: 'linear-gradient(90deg, #d1d1d1 20%, #ffffff 35%, #d1d1d1 50%)',
      },
      keyframes: {
        fadeOut: {
          '0%': { opacity: '1' },
          '80%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideInBounce: {
          '0%': { transform: 'translateX(120%)', opacity: '0' },
          '40%': { transform: 'translateX(0%)', opacity: '1' },
          '60%': { transform: 'translateX(5px)' },
          '80%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        'fade-out': 'fadeOut 2s forwards',
        'slide-bounce': 'slideInBounce 1.5s cubic-bezier(0, 0, 0, 1) forwards',
        flip: 'flip 0.5s forwards',
        shimmer: 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
}

