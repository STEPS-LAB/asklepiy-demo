import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Medical Architecture 2026 Color Palette
      colors: {
        // Primary - Deep Medical Blue
        'medical-primary': {
          DEFAULT: '#0A3D62',
          50: '#E8F1F5',
          100: '#D1E3ED',
          200: '#A5C7DB',
          300: '#7AABCA',
          400: '#4E8FB8',
          500: '#2273A7',
          600: '#1A5A85',
          700: '#134163',
          800: '#0F334E',
          900: '#0A3D62',
          950: '#051F33',
        },
        // Accent - Light Blue
        'medical-accent': {
          DEFAULT: '#5DB8E8',
          50: '#EAF8FD',
          100: '#D5F1FB',
          200: '#ADE3F7',
          300: '#85D5F3',
          400: '#5DC7EF',
          500: '#35B9EB',
          600: '#5DB8E8',
          700: '#2FA3D4',
          800: '#2580A8',
          900: '#1C5D7C',
          950: '#113A4F',
        },
        // Surface - Pure White & Neutrals
        'medical-surface': {
          DEFAULT: '#FFFFFF',
          50: '#FAFBFC',
          100: '#F5F7F9',
          200: '#EBEFF2',
          300: '#E1E6EB',
          400: '#D7DDE4',
          500: '#CDD4DC',
        },
        // Text Colors
        'medical-text': {
          primary: '#0A3D62',
          secondary: '#4A5568',
          tertiary: '#718096',
          inverse: '#FFFFFF',
        },
        // Status Colors
        'medical-status': {
          success: '#00A86B',
          warning: '#F59E0B',
          error: '#DC2626',
          info: '#5DB8E8',
        },
      },
      
      // Typography - Inter & Montserrat
      fontFamily: {
        primary: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        secondary: ['var(--font-montserrat)', 'Montserrat', 'system-ui', 'sans-serif'],
      },
      
      // Font Weights - Light weights for premium feel
      fontWeight: {
        light: '300',
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      
      // Spacing - Luxury Whitespace
      spacing: {
        'luxury-sm': '2rem',
        'luxury-md': '4rem',
        'luxury-lg': '6rem',
        'luxury-xl': '8rem',
        'luxury-2xl': '12rem',
      },
      
      // Border Radius - Sharp corners, minimal rounding
      borderRadius: {
        'sm': '6px',
        'md': '8px',
        'lg': '10px',
        'xl': '12px',
        '2xl': '16px',
      },
      
      // Animation - Framer Motion friendly
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
        'slide-in-left': 'slideInLeft 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      
      // Backdrop Blur for Glassmorphism
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
      },
      
      // Box Shadow - Subtle depth
      boxShadow: {
        'medical-sm': '0 1px 2px 0 rgba(10, 61, 98, 0.05)',
        'medical-md': '0 4px 6px -1px rgba(10, 61, 98, 0.1), 0 2px 4px -1px rgba(10, 61, 98, 0.06)',
        'medical-lg': '0 10px 15px -3px rgba(10, 61, 98, 0.1), 0 4px 6px -2px rgba(10, 61, 98, 0.05)',
        'medical-xl': '0 20px 25px -5px rgba(10, 61, 98, 0.1), 0 10px 10px -5px rgba(10, 61, 98, 0.04)',
        'medical-glow': '0 0 20px rgba(93, 184, 232, 0.3)',
        'medical-glow-lg': '0 0 40px rgba(93, 184, 232, 0.4)',
      },
      
      // Transition - Smooth interactions
      transitionDuration: {
        '400': '400ms',
        '500': '500ms',
        '600': '600ms',
        '700': '700ms',
      },
      
      // Scale - Micro interactions
      scale: {
        '102': '1.02',
        '103': '1.03',
        '105': '1.05',
      },
      
      // zIndex layers
      zIndex: {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        'overlay': '40',
        'modal-backdrop': '9998',
        'modal': '9999',
        'toast': '10000',
        'tooltip': '10001',
      },
    },
  },
  plugins: [],
};

export default config;
