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
        display: ['"Bricolage Grotesque"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        // Design tokens (design-direction-v1-DECISION)
        canvas: '#f7f8fa',
        ink: '#111f3d',
        body: '#3a4a66',
        muted: '#8a94a6',
        hairline: '#e3e6eb',
        divider: '#243f70',
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
        // Accent orange — numbers, section labels, node highlights ONLY
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#ff7a1a',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        // Legacy teal accent (pre-redesign) — kept so unrebuilt pages don't shift
        cyan: {
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
      fontSize: {
        'display-hero': ['72px', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        'display-h2': ['44px', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'display-h2-sm': ['36px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-h3': ['24px', { lineHeight: '1.3' }],
        'stat': ['44px', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
      },
      letterSpacing: {
        'mono-label': '0.02em',
      },
      maxWidth: {
        site: '1440px',
      },
      spacing: {
        section: '112px',
        gutter: '64px',
      },
      borderRadius: {
        lg: '8px',
      },
      boxShadow: {
        // Hairlines only — no card shadows in the new direction (kept for legacy).
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
        nodePulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.25' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.25s ease-out',
        fadeInUp: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        float: 'float 8s ease-in-out infinite',
        'node-pulse': 'nodePulse 2.6s ease-in-out infinite',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
