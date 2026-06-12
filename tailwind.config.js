/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        // Deep navy — headers, footer, dark surfaces
        navy: {
          50: '#f1f5fb',
          100: '#dde7f5',
          200: '#bccfe9',
          300: '#8eaed8',
          400: '#5a84c2',
          500: '#3a64a8',
          600: '#2b4d8a',
          700: '#243f70',
          800: '#1a2e54',
          900: '#111f3d',
          950: '#0a1428',
        },
        // Primary action blue
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Teal / cyan accent
        accent: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
        },
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(16, 31, 61, 0.04), 0 8px 24px -8px rgba(16, 31, 61, 0.12)',
        'card-hover': '0 4px 8px -2px rgba(16, 31, 61, 0.08), 0 24px 48px -12px rgba(16, 31, 61, 0.22)',
        glow: '0 0 0 1px rgba(37, 99, 235, 0.1), 0 18px 50px -12px rgba(37, 99, 235, 0.45)',
        'inner-top': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
      },
      backgroundImage: {
        'grid-light':
          'linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px)',
        'grid-dark':
          'linear-gradient(rgba(125,160,220,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(125,160,220,0.10) 1px, transparent 1px)',
        'hero-glow':
          'radial-gradient(60% 60% at 50% 0%, rgba(37,99,235,0.25) 0%, rgba(10,20,40,0) 70%)',
      },
      backgroundSize: {
        grid: '40px 40px',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(-8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.25s ease-out',
        fadeInUp: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        float: 'float 8s ease-in-out infinite',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
