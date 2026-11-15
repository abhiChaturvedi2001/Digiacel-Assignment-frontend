// Every color comes from a CSS variable defined in src/index.css (:root).
// Change a color there once and the whole app follows, light and dark.
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: v('bg'),
        surface: v('surface'),
        fg: v('fg'),
        muted: v('muted'),
        line: v('line'),
        primary: v('primary'),
        'primary-fg': v('primary-fg'),
        'primary-soft': v('primary-soft'),
        deep: v('deep'),
        track: v('track'),
        danger: v('danger'),
        'danger-soft': v('danger-soft'),
        success: v('success'),
        warning: v('warning'),
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgb(var(--shadow) / 0.05), 0 8px 24px rgb(var(--shadow) / 0.06)',
      },
      keyframes: {
        'sheet-up': { from: { transform: 'translateY(40px)', opacity: 0 }, to: { transform: 'none', opacity: 1 } },
        fade: { from: { opacity: 0 }, to: { opacity: 1 } },
      },
      animation: {
        'sheet-up': 'sheet-up .25s ease-out',
        fade: 'fade .2s ease-out',
      },
    },
  },
  plugins: [],
};
