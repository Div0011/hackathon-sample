/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        background: '#0e0e0e',
        surface: '#131313',
        'surface-low': '#1a1919',
        'surface-high': '#262626',
        primary: {
          DEFAULT: '#00e3fd',
          dim: '#00d4ec',
        },
        secondary: '#bc00ff',
        tertiary: '#00ff41',
      },
    },
  },
  plugins: [],
}
