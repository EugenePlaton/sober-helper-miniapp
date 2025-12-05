/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6',
          light: '#60a5fa',
          dark: '#1d4ed8',
        },
        surface: '#f8fafc',
      },
      boxShadow: {
        subtle: '0 2px 8px rgba(15, 23, 42, 0.08)',
      },
      borderRadius: {
        tele: '12px',
      },
    },
  },
  plugins: [],
}
