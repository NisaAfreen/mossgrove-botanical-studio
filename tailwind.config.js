/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: '#1E3a2c', 950: '#0f1f17', 900: '#152a20', 800: '#1E3a2c', 700: '#2b4d3b', 600: '#3d6550' },
        sage: { DEFAULT: '#93a88c', 50: '#f1f4ee', 100: '#e3e9de', 200: '#cbd6c3', 300: '#afc0a6', 400: '#93a88c', 500: '#738a6c', 600: '#5a6f54' },
        ivory: { DEFAULT: '#f8f4ec', 50: '#fcfaf5', 100: '#f8f4ec', 200: '#f0e9db' },
        linen: { DEFAULT: '#e8dcc6', 300: '#efe6d6', 400: '#e8dcc6', 500: '#d6c4a4' },
        terracotta: { DEFAULT: '#b25d36', 400: '#c9774f', 500: '#b25d36', 600: '#93472a', 700: '#7a3a22' },
        ink: { DEFAULT: '#1b211d', soft: '#4b544d', mute: '#6f776f' },
      },
      fontFamily: {
        display: ['"Instrument Serif"', '"Iowan Old Style"', 'Georgia', 'serif'],
        sans: ['"Hanken Grotesk"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: { arch: '999px 999px 18px 18px' },
      boxShadow: {
        card: '0 1px 2px rgba(21,42,32,.06), 0 8px 24px -12px rgba(21,42,32,.18)',
        lift: '0 2px 4px rgba(21,42,32,.06), 0 24px 48px -20px rgba(21,42,32,.35)',
      },
      keyframes: {
        rise: { from: { opacity: '0', transform: 'translateY(14px)' }, to: { opacity: '1', transform: 'none' } },
        fade: { from: { opacity: '0' }, to: { opacity: '1' } },
        drawer: { from: { transform: 'translateX(100%)' }, to: { transform: 'none' } },
        pop: { from: { opacity: '0', transform: 'scale(.97) translateY(8px)' }, to: { opacity: '1', transform: 'none' } },
      },
      animation: {
        rise: 'rise .8s cubic-bezier(.2,.7,.2,1) both',
        fade: 'fade .3s ease both',
        drawer: 'drawer .38s cubic-bezier(.2,.7,.2,1) both',
        pop: 'pop .32s cubic-bezier(.2,.7,.2,1) both',
      },
    },
  },
  plugins: [],
};
