import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/[object Object].js"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        'mindaro-200': '#CFF27E',
        'mindaro-300': '#C8F06A',
        'mindaro-400': '#C1EE58',
        'mindaro-500': '#BAED45',
        'mindaro-600': '#A3DF16',
        'primary': '#71C171',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config