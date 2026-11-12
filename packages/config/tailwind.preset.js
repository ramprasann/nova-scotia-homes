/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Design System Material/Editorial Tokens
        "primary": "#000814",
        "primary-container": "#12212f",
        "on-primary": "#ffffff",
        "on-primary-container": "#7a899a",
        "primary-fixed": "#d5e4f7",
        "primary-fixed-dim": "#b9c8db",
        "on-primary-fixed": "#0d1d2b",
        "on-primary-fixed-variant": "#3a4858",
        "inverse-primary": "#b9c8db",

        "secondary": "#755a27",
        "secondary-container": "#fdd898",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#785d29",
        "secondary-fixed": "#ffdea7",
        "secondary-fixed-dim": "#e5c184",
        "on-secondary-fixed": "#271900",
        "on-secondary-fixed-variant": "#5b4311",

        "tertiary": "#010910",
        "tertiary-container": "#162129",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#7d8993",
        "tertiary-fixed": "#d8e4f0",
        "tertiary-fixed-dim": "#bdc8d3",
        "on-tertiary-fixed": "#121d25",
        "on-tertiary-fixed-variant": "#3d4851",

        "surface": "#fcf9f3",
        "surface-dim": "#dcdad4",
        "surface-bright": "#fcf9f3",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f6f3ed",
        "surface-container": "#f0eee8",
        "surface-container-high": "#ebe8e2",
        "surface-container-highest": "#e5e2dc",
        "on-surface": "#1c1c18",
        "on-surface-variant": "#44474c",
        "inverse-surface": "#31312d",
        "inverse-on-surface": "#f3f0ea",
        "surface-variant": "#e5e2dc",
        "surface-tint": "#516070",

        "background": "#fcf9f3",
        "on-background": "#1c1c18",

        "outline": "#74777c",
        "outline-variant": "#c4c6cc",

        "error": "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",

        // Authentic Brand Real Estate Aliases
        "editorial-navy": "#12212F",
        "editorial-gold": "#B3935A",
        "editorial-gold-dark": "#9A7E4B",
        "editorial-slate": "#5B6670",
        "editorial-bg": "#F7F4EE",
        "editorial-white": "#FFFFFF",
      },
      borderRadius: {
        DEFAULT: "0.125rem", // 2px
        sm: "0.125rem",
        md: "0.25rem", // 4px
        lg: "0.25rem", // 4px
        xl: "0.5rem", // 8px
        "2xl": "0.75rem", // 12px
        full: "9999px",
      },
      spacing: {
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2.5rem",
        "space-2xl": "4.5rem",
        "section-y": "7.5rem",
        "gutter": "1.5rem",
        "gutter-desktop": "2rem",
        "margin": "1.25rem",
        "margin-tablet": "2.5rem",
        "margin-desktop": "5rem",
      },
      fontFamily: {
        "display-hero": ["EB Garamond", "Cormorant Garamond", "serif"],
        "display-hero-mobile": ["EB Garamond", "Cormorant Garamond", "serif"],
        "headline-section": ["EB Garamond", "Cormorant Garamond", "serif"],
        "headline-section-mobile": ["EB Garamond", "Cormorant Garamond", "serif"],
        "headline-sm": ["EB Garamond", "Cormorant Garamond", "serif"],
        "title-editorial": ["EB Garamond", "Cormorant Garamond", "serif"],
        "body-lg": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "body-sm": ["Inter", "sans-serif"],
        "label-caps": ["Inter", "sans-serif"],
        "label-regular": ["Inter", "sans-serif"],
      },
      fontSize: {
        "display-hero": ["64px", { lineHeight: "72px", letterSpacing: "-0.01em", fontWeight: "400" }],
        "display-hero-mobile": ["40px", { lineHeight: "48px", letterSpacing: "0em", fontWeight: "400" }],
        "headline-section": ["44px", { lineHeight: "52px", letterSpacing: "-0.005em", fontWeight: "400" }],
        "headline-section-mobile": ["32px", { lineHeight: "40px", letterSpacing: "0em", fontWeight: "400" }],
        "headline-sm": ["28px", { lineHeight: "36px", letterSpacing: "0em", fontWeight: "400" }],
        "title-editorial": ["22px", { lineHeight: "30px", letterSpacing: "0.01em", fontWeight: "500" }],
        "body-lg": ["19px", { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "300" }],
        "body-md": ["17px", { lineHeight: "27.2px", letterSpacing: "0em", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "22px", letterSpacing: "0.01em", fontWeight: "400" }],
        "label-caps": ["11px", { lineHeight: "16px", letterSpacing: "0.14em", fontWeight: "600" }],
        "label-regular": ["13px", { lineHeight: "18px", letterSpacing: "0.02em", fontWeight: "500" }],
      },
      boxShadow: {
        "editorial-card": "0 12px 32px -4px rgba(18, 33, 47, 0.06)",
        "editorial-hover": "0 12px 32px -4px rgba(18, 33, 47, 0.08)",
      },
    },
  },
};

