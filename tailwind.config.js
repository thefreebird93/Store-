/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#d63384',
        secondary: '#6f42c1',
        accent: '#20c997',
        light: '#f8f9fa',
        dark: '#212529',
        muted: '#6c757d'
      },
      fontFamily: {
        arabic: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
      boxShadow: {
        'custom': '0 4px 12px rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
}