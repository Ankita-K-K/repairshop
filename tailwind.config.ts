/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',  // Next.js default pages folder
    './components/**/*.{js,ts,jsx,tsx}', // Any custom components folder you have
    './app/**/*.{js,ts,jsx,tsx}',  // Add this if you use the new `app` directory (for Next.js 13+)
  ],
  darkMode: 'media', // Enable dark mode based on user's system preference
  theme: {
    extend: {
      backgroundImage: {
        'home-img': "url('/images/home-bg.jpg')",  // Example background image extension
      },
      keyframes: {
        "appear": {
          from: {
            opacity: "0"
          },
          to:{
            opacity: "1",
          }
        },
        "slide" :{ 
          from: {
            "transform": "translateX(100%)",
          },
          to:{
            "transform": "translateX(0%)"
          }
        }
      },
      animation: {
        "appear": "appear 1s ease-in-out",
        "slide": "slide 750ms ease-in-out"
      }
    },
  },
  plugins: [],
};
