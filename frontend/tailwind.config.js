import flowbite from "flowbite-react/tailwind";
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],
  theme: {
    extend: {
      backgroundColor: {
        "custom-purple": "#E9D5FF",
        "custom-purple1": "#D8B4FE",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
