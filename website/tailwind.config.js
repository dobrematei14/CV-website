/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',    // Black main color
        secondary: '#8B5CF6',  // Purple secondary color
        accent: '#FFFFFF',     // White accent color
      },
      animation: {
        'fadeIn': 'fadeIn 1s ease-out',
        'slideInRight': 'slideInRight 0.8s ease-out',
        'bounce': 'bounce 1s infinite',
        'glow': 'glow 1.5s infinite alternate',
        'moveText': 'moveText 0.3s ease-out forwards',
        'truncateText': 'truncateText 0.3s ease-out forwards',
        'sideHighlight': 'sideHighlight 0.3s ease-out forwards',
        'iconOnly': 'iconOnly 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-5%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        glow: {
          '0%': {
            boxShadow: '0 0 5px 0px rgba(139, 92, 246, 0.5)',
            borderColor: 'rgba(139, 92, 246, 0.5)'
          },
          '100%': {
            boxShadow: '0 0 20px 5px rgba(139, 92, 246, 0.7)',
            borderColor: 'rgba(139, 92, 246, 1)'
          },
        },
        moveText: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-25px)' },
        },
        truncateText: {
          '0%': { maxWidth: '100%' },
          '100%': { maxWidth: '70%' },
        },
        sideHighlight: {
          '0%': { borderRadius: '16px' },
          '100%': {
            borderRadius: '16px',
            borderTopRightRadius: '0',
            borderBottomRightRadius: '0'
          },
        },
        iconOnly: {
          '0%': { width: 'auto' },
          '100%': { width: '3rem' },
        },
      },
      boxShadow: {
        'glow': '0 0 15px 2px rgba(139, 92, 246, 0.6)',
      },
    },
  },
  plugins: [],
}