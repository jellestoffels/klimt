/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      ink: '#000000',
      paper: '#FFFFFF',
      grey: '#9C9C9C',
      borderSubtle: 'rgba(0,0,0,0.12)',
      borderStrong: 'rgba(0,0,0,0.24)',
      overlayInk: 'rgba(0,0,0,0.92)',
      overlayGrey: 'rgba(156,156,156,0.92)',
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'Helvetica', 'Arial', 'sans-serif'],
    },
    fontSize: {
      // PDF Typography Specs
      root: '16px',
      body: ['16px', { lineHeight: '1.5', fontWeight: '400' }],
      bodyLarge: ['18px', { lineHeight: '1.45', fontWeight: '400' }], // Tablet/Desktop
      smallMeta: ['13px', { lineHeight: '1.45', fontWeight: '400' }],
      nav: ['14px', { lineHeight: '1.2', fontWeight: '500', letterSpacing: '0.01em' }],
      // Headings (Clamps handled in CSS or via arbitrary values, simplified here)
      h1: ['clamp(44px, 5.0vw, 72px)', { lineHeight: '1.02', letterSpacing: '-0.02em', fontWeight: '500' }],
      h2: ['clamp(32px, 3.2vw, 48px)', { lineHeight: '1.08', fontWeight: '500' }],
      h3: ['clamp(22px, 2.2vw, 28px)', { lineHeight: '1.20', letterSpacing: '-0.015em', fontWeight: '500' }],
    },
    spacing: {
      0: '0px',
      s1: '4px',
      s2: '8px',
      s3: '12px',
      s4: '16px',
      s5: '24px',
      s6: '32px',
      s7: '48px',
      s8: '64px',
      s9: '96px',
      s10: '128px',
      // Layout specific
      headerMobile: '56px',
      headerDesktop: '64px',
    },
    borderRadius: {
      small: '8px',
      medium: '14px',
      large: '22px',
    },
    screens: {
      tablet: '768px',
      desktop: '1200px',
    },
    extend: {
      transitionTimingFunction: {
        'klimt-ease': 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      },
      transitionDuration: {
        '700': '700ms',
      },
    },
  },
  plugins: [],
}