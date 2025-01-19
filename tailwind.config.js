/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
          DEFAULT: 'var(--color-primary)',
        },
        background: {
          light: '#ffffff',
          dark: '#1a202c',
          accent: '#edf2f7',
          muted: '#2d3748',
          blue: '#ebf8ff',
          green: '#f0fff4',
          yellow: '#fefcbf',
          red: '#fff5f5',
        },
        text: {
          light: '#2d3748',
          dark: '#e2e8f0',
          accent: '#38bdf8',
          blue: '#2b6cb0',
          green: '#276749',
          yellow: '#b7791f',
          red: '#c53030',
        },
      },
      opacity: {
        '20': '0.2',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-in': 'slideIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  safelist: [
    {
      pattern: /bg-primary-\d+\/\d+/,
      variants: ['dark']
    }
  ],
}