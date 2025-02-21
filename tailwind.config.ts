import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      // Device-specific breakpoints
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px',
      // Feature-specific breakpoints
      'dashboard': '1400px',
      'chat': '800px',
      // Height breakpoints
      'tall': { 'raw': '(min-height: 800px)' },
      'short': { 'raw': '(max-height: 600px)' },
    },
    extend: {
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        "grid-pattern": `url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 800 800%22%3E%3Cg stroke-width=%223.5%22 stroke=%22hsla(0, 0%25, 100%25, 1.00)%22 fill=%22none%22%3E%3Crect width=%22400%22 height=%22400%22 x=%220%22 y=%220%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%220%22 cy=%220%22 fill=%22hsla(0, 0%25, 100%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22400%22 y=%220%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22400%22 cy=%220%22 fill=%22hsla(0, 0%25, 100%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22800%22 y=%220%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22800%22 cy=%220%22 fill=%22hsla(0, 0%25, 100%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%220%22 y=%22400%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%220%22 cy=%22400%22 fill=%22hsla(0, 0%25, 100%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22400%22 y=%22400%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22400%22 cy=%22400%22 fill=%22hsla(0, 0%25, 100%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22800%22 y=%22400%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22800%22 cy=%22400%22 fill=%22hsla(0, 0%25, 100%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%220%22 y=%22800%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%220%22 cy=%22800%22 fill=%22hsla(0, 0%25, 100%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22400%22 y=%22800%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22400%22 cy=%22800%22 fill=%22hsla(0, 0%25, 100%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22800%22 y=%22800%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22800%22 cy=%22800%22 fill=%22hsla(0, 0%25, 100%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3C/g%3E%3C/svg%3E")`,
        "grid-pattern-light": `url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 800 800%22%3E%3Cg stroke-width=%223.5%22 stroke=%22hsla(215, 16%25, 47%25, 1.00)%22 fill=%22none%22%3E%3Crect width=%22400%22 height=%22400%22 x=%220%22 y=%220%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%220%22 cy=%220%22 fill=%22hsla(215, 16%25, 47%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22400%22 y=%220%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22400%22 cy=%220%22 fill=%22hsla(215, 16%25, 47%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22800%22 y=%220%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22800%22 cy=%220%22 fill=%22hsla(215, 16%25, 47%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%220%22 y=%22400%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%220%22 cy=%22400%22 fill=%22hsla(215, 16%25, 47%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22400%22 y=%22400%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22400%22 cy=%22400%22 fill=%22hsla(215, 16%25, 47%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22800%22 y=%22400%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22800%22 cy=%22400%22 fill=%22hsla(215, 16%25, 47%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%220%22 y=%22800%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%220%22 cy=%22800%22 fill=%22hsla(215, 16%25, 47%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22400%22 y=%22800%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22400%22 cy=%22800%22 fill=%22hsla(215, 16%25, 47%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3Crect width=%22400%22 height=%22400%22 x=%22800%22 y=%22800%22 opacity=%220.15%22%3E%3C/rect%3E%3Ccircle r=%2210.85%22 cx=%22800%22 cy=%22800%22 fill=%22hsla(215, 16%25, 47%25, 1.00)%22 stroke=%22none%22%3E%3C/circle%3E%3C/g%3E%3C/svg%3E")`,
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        blue: {
          50: 'hsl(var(--blue-50))',
          100: 'hsl(var(--blue-100))',
          200: 'hsl(var(--blue-200))',
          300: 'hsl(var(--blue-300))',
          400: 'hsl(var(--blue-400))',
          500: 'hsl(var(--blue-500))',
          600: 'hsl(var(--blue-600))',
          700: 'hsl(var(--blue-700))',
          800: 'hsl(var(--blue-800))',
          900: 'hsl(var(--blue-900))',
        },
        'blue-1': {
          50: 'hsl(var(--blue-1-50))',
          100: 'hsl(var(--blue-1-100))',
          200: 'hsl(var(--blue-1-200))',
          300: 'hsl(var(--blue-1-300))',
          400: 'hsl(var(--blue-1-400))',
          500: 'hsl(var(--blue-1-500))',
          600: 'hsl(var(--blue-1-600))',
          700: 'hsl(var(--blue-1-700))',
          800: 'hsl(var(--blue-1-800))',
          900: 'hsl(var(--blue-1-900))',
        },
        'blue-2': {
          50: 'hsl(var(--blue-2-50))',
          100: 'hsl(var(--blue-2-100))',
          200: 'hsl(var(--blue-2-200))',
          300: 'hsl(var(--blue-2-300))',
          400: 'hsl(var(--blue-2-400))',
          500: 'hsl(var(--blue-2-500))',
          600: 'hsl(var(--blue-2-600))',
          700: 'hsl(var(--blue-2-700))',
          800: 'hsl(var(--blue-2-800))',
          900: 'hsl(var(--blue-2-900))',
        },
        success: {
          50: 'hsl(var(--success-50))',
          100: 'hsl(var(--success-100))',
          200: 'hsl(var(--success-200))',
          300: 'hsl(var(--success-300))',
          400: 'hsl(var(--success-400))',
          500: 'hsl(var(--success-500))',
          600: 'hsl(var(--success-600))',
          700: 'hsl(var(--success-700))',
          800: 'hsl(var(--success-800))',
          900: 'hsl(var(--success-900))',
        },
        warning: {
          50: 'hsl(var(--warning-50))',
          100: 'hsl(var(--warning-100))',
          200: 'hsl(var(--warning-200))',
          300: 'hsl(var(--warning-300))',
          400: 'hsl(var(--warning-400))',
          500: 'hsl(var(--warning-500))',
          600: 'hsl(var(--warning-600))',
          700: 'hsl(var(--warning-700))',
          800: 'hsl(var(--warning-800))',
          900: 'hsl(var(--warning-900))',
        },
        error: {
          50: 'hsl(var(--error-50))',
          100: 'hsl(var(--error-100))',
          200: 'hsl(var(--error-200))',
          300: 'hsl(var(--error-300))',
          400: 'hsl(var(--error-400))',
          500: 'hsl(var(--error-500))',
          600: 'hsl(var(--error-600))',
          700: 'hsl(var(--error-700))',
          800: 'hsl(var(--error-800))',
          900: 'hsl(var(--error-900))',
        },
        neutral: {
          50: 'hsl(var(--neutral-50))',
          100: 'hsl(var(--neutral-100))',
          200: 'hsl(var(--neutral-200))',
          300: 'hsl(var(--neutral-300))',
          400: 'hsl(var(--neutral-400))',
          500: 'hsl(var(--neutral-500))',
          600: 'hsl(var(--neutral-600))',
          700: 'hsl(var(--neutral-700))',
          800: 'hsl(var(--neutral-800))',
          900: 'hsl(var(--neutral-900))',
        },
        'purple-vivid': {
          400: 'hsl(var(--purple-vivid-400))',
          500: 'hsl(var(--purple-vivid-500))',
          600: 'hsl(var(--purple-vivid-600))',
        },
        'teal-vivid': {
          400: 'hsl(var(--teal-vivid-400))',
          500: 'hsl(var(--teal-vivid-500))',
          600: 'hsl(var(--teal-vivid-600))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'meteor-effect': 'meteor-effect var(--meteor-duration) linear infinite',
        'rainbow': 'rainbow var(--speed, 2s) infinite linear',
        'shimmer-slide': 'shimmer-slide 3s ease-in-out infinite alternate',
        'spin-around': 'spin-around 6s infinite linear',
        'fadeIn': 'fadeIn 0.2s ease-out',
        'lamp-glow': 'lamp-glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        'spin-around': {
          '0%': { transform: 'translateZ(0) rotate(0)' },
          '15%, 35%': { transform: 'translateZ(0) rotate(90deg)' },
          '65%, 85%': { transform: 'translateZ(0) rotate(270deg)' },
          '100%': { transform: 'translateZ(0) rotate(360deg)' }
        },
        'shimmer-slide': {
          to: { transform: 'translate(calc(100% - 100%), 0)' }
        },
        'fadeIn': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        'rainbow': {
          '0%': { 'background-position': '0%' },
          '100%': { 'background-position': '200%' }
        },
        'meteor': {
          '0%': { transform: 'rotate(215deg) translateX(0)', opacity: '1' },
          '70%': { opacity: '1' },
          '100%': {
            transform: 'rotate(215deg) translateX(-500px)',
            opacity: '0',
          },
        },
        'lamp-glow': {
          '0%': { opacity: '0.5', filter: 'blur(4px)' },
          '100%': { opacity: '1', filter: 'blur(6px)' }
        }
      }
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
