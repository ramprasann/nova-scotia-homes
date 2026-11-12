import tailwindPreset from '@nova/config/tailwind.preset.js';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [tailwindPreset],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        DEFAULT: "0.25rem",
        sm: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
      colors: {
        "editorial-navy": "#12212F",
        "editorial-gold": "#B3935A",
        "editorial-gold-dark": "#9A7E4B",
        "editorial-slate": "#5B6670",
        "editorial-bg": "#F7F4EE",
        "editorial-white": "#FFFFFF",
      },
    },
  },
  plugins: [],
};
