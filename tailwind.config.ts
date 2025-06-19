import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ["Cinzel", "serif"]
      },
      colors: {
        primaryColor: "var(--primary-color)",
        color: "var(--color)",
        borderColor: "var(--border-color)",
        primaryBackgroundColor: "var(--primary-background-color)",
        secondaryBackgroundColor: "var(--secondary-background-color)",
        socialIconsColor: "var(--social-icons-color)",
        separatorBackgroundColor: "var(--separator-background-color)",
        footerBackgroundColor: "var(--footer-background-color)",
        footerHeaderBackgroundColor: "var(--footer-header-background-color)",
        footerSloganBackgroundColor: "var(--footer-slogan-background-color)",
        footerItemColor: "var(--footer-item-color)",
        footerItemBorderColor: "var(--footer-item-border-color)",
        footerItemBackgroundColor: "var(--footer-item-background-color)",
        headerBackgroundColor: "var(--header-background-color)",
        headerMenuColor: "var(--header-menu-color)",
        headerMenuHoverColor: "var(--header-menu-hover-color)",
        propertyHighlightBorderColor: "var(--property-highlight-border-color)",
        cardBackgroundColor: "var(--card-background-color)",
        bannerColor: "var(--banner-color)",
        bannerPrimaryColor: "var(--banner-primary-color)",
        formColor: "var(--form-color)",
        formBorderColor: "var(--form-border-color)",
        formBackgroundColor: "var(--form-background-color)",
        buttonCtaBackgroundColor: "var(--button-cta-background-color)",
        buttonViewMoreBackgroundColor:
          "var(--button-view-more-background-color)",
        sectionProcessBackgroundColor:
          "var(--section-process-background-color)",
        advancedSearchesBackgroundColor:
          "var(--advanced-searches-background-color)"
      },
      keyframes: {
        hacker: {
          "0%": { opacity: "0", transform: "rotateX(90deg) scale(0.8)" },
          "100%": { opacity: "1", transform: "rotateX(0deg) scale(1)" }
        }
      },
      animation: {
        hacker: "hacker 0.4s ease-out forwards"
      }
    }
  },
  darkMode: "class",
  plugins: []
};
export default config;
