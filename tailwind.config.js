/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef3fa',
          100: '#d9e3f3',
          200: '#b3c6e6',
          300: '#7f9dd0',
          400: '#4d6fb0',
          500: '#2d4f8f',
          600: '#1f3b70',
          700: '#162c56',
          800: '#0f2043',
          900: '#0b1836',
          950: '#060f22',
        },
        amber: {
          50: '#fff8eb',
          100: '#ffedc6',
          200: '#ffd98d',
          300: '#ffc154',
          400: '#ffa61a',
          500: '#f59304',
          600: '#d17203',
          700: '#a85107',
          800: '#873f0c',
          900: '#71340e',
        },
        ink: '#181c26',
        paper: '#ffffff',
        mist: '#f5f7fa',
        haze: '#e9edf3',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 24px -6px rgb(11 24 54 / 0.10)',
        'card-hover': '0 16px 40px -12px rgb(11 24 54 / 0.20)',
        header: '0 2px 16px -4px rgb(11 24 54 / 0.12)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      spacing: {
        container: '80rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both',
        marquee: 'marquee 40s linear infinite',
        'marquee-slow': 'marquee 70s linear infinite',
      },
    },
  },
  plugins: [],
};
