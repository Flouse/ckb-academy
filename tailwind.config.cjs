/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      width: {
        window: "1024px"
      },
      height: {
        window: "768px",
        container: "calc(100vh - 6rem)"
      },
      minWidth: {
        10: "2.5rem",
        20: "5rem",
        24: "6rem",
        28: "7rem",
        96: "24rem"
      },
      minHeight: {
        container: "calc(100vh - 6rem)"
      },
      boxShadow: {
        dropdown: "0 0 20px 5px"
      }
    },
    colors: {
      transparent: "rgba(0,0,0,0)",
      white: "#ffffff",
      black: "#000000",
      primary: "#06b6d4",
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#ef4444",
      light: {
        background: "#f8fafc",
        background_dark: "#ffffff",
        shadow: "rgba(15,23,42,.2)",
        mask: "rgba(15,23,42,0.9)",
        border: "rgba(203,213,225,0.9)",
        divider: "rgba(203,213,225,0.7)",
        hover: "rgba(226,232,240,0.6)",
        headline: "#0f172a",
        secondary: "#334155",
        tertiary: "#64748b"
      },
      dark: {
        background: "#262626",
        background_dark: "#171717",
        shadow: "rgba(0,0,0,0.2)",
        mask: "rgba(0,0,0,0.9)",
        border: "rgb(244,244,245,.2)",
        divider: "rgba(244,244,245,.15)",
        hover: "rgb(163,163,163,.1)",
        headline: "#fafafa",
        secondary: "#e5e5e5",
        tertiary: "#a3a3a3"
      }
    }
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/line-clamp")]
};
