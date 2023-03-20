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
        container: "calc(100vh - 7rem)"
      },
      minHeight: {
        container: "calc(100vh - 7rem)"
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
        background: "#ffffff",
        background_dark: "#f8fafc",
        shadow: "rgba(0,0,0,0.05)",
        mask: "rgba(24,24,27,.85)",
        border: "rgb(24,24,27,.2)",
        divider: "rgba(24,24,27,.15)",
        hover: "rgba(24,24,27,.1)",
        headline: "#404040",
        secondary: "#525252",
        tertiary: "#737373"
      },
      dark: {
        background: "#262626",
        background_dark: "#171717",
        shadow: "rgba(0,0,0,0.2)",
        mask: "rgba(0,0,0,0.5)",
        border: "rgb(244,244,245,.2)",
        divider: "rgba(244,244,245,.15)",
        hover: "rgb(163,163,163,.1)",
        headline: "#e5e5e5",
        secondary: "#d4d4d4",
        tertiary: "#a3a3a3"
      }
    }
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/line-clamp")]
};
