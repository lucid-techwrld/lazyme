/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Lilita One"', '"Fredoka One"', 'cursive'],
        body:    ['"Nunito"', 'sans-serif'],
      },
      colors: {
        pink:   { DEFAULT: '#f472b6', soft: '#fce7f3', deep: '#be185d' },
        violet: { DEFAULT: '#a78bfa', soft: '#ede9fe' },
        peach:  { DEFAULT: '#fb923c', soft: '#fff7ed' },
        cream:  '#fdf2f8',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { transform: 'scale(1)',    opacity: '0.25' },
          '50%':       { transform: 'scale(1.08)', opacity: '0.45' },
        },
        'pop': {
          '0%':   { transform: 'scale(0.85)', opacity: '0' },
          '60%':  { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)',    opacity: '1' },
        }
      },
      animation: {
        'pulse-glow': 'pulse-glow 1.8s ease-in-out infinite',
        'pop':        'pop 0.35s ease-out both',
      },
    },
  },
  plugins: [],
}
