/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        // dark: {
        //   primary: "#38bdf8",
        //   secondary: "#818CF8",
        //   accent: "#F471B5",
        //   neutral: "#1E293B",
        //   "neutral-focus": "#273449",
        //   "base-100": "#0A0F1C",
        //   info: "#0CA5E9",
        //   success: "#2DD4BF",
        //   warning: "#F4BF50",
        //   error: "#FB7085",
        // },
      },
      // {
      //   light: {
      //     primary: "#38bdf8",
      //     secondary: "#818CF8",
      //     accent: "#F471B5",
      //     neutral: "#021431",
      //     "base-100": "#ffffff",
      //     "base-200": "#F2F7FF",
      //     "base-300": "#E3E9F4",
      //     "base-content": "#394E6A",
      //     info: "#0CA5E9",
      //     success: "#2DD4BF",
      //     warning: "#F4BF50",
      //     error: "#FB7085",
      //   },
      // },
      {
        light: {
          primary: "#DAB898",
          secondary: "#818CF8",
          accent: "#F471B5",
          neutral: "#311402",
          "base-100": "#ffffff",
          "base-200": "#FFF4E7",
          "base-300": "#f4eae3",
          "base-content": "#6B4B3A",
          info: "#D9F4FF",
          success: "#2DD4BF",
          warning: "#ffdc9a",
          error: "#FF9AA2",
        },
      },
    ],
  },
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        "3xl": "1800px",
        md2: "1530px",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
