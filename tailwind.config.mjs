/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        saciblue: "#1D2355",
        sacired: `#E01E26`,
        saciblack: "#13151a",
        saciblackCont: "#242526",
        sacilight: "#F0F2F5",
        sacilightCont: "#FFFFFF",
        saciMenu: "#C8DCFF",
      },
    },
  },
  plugins: [],
};
