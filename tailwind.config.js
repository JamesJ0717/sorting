module.exports = {
  future: "all",
  purge: [],
  theme: {
    container: {
      center: true,
      padding: "4rem",
    },
    extend: {
      spacing: {
        112: "28rem",
        128: "32rem",
      },
    },
  },
  plugins: [
    require("@tailwindcss/ui")({
      layout: "sidebar",
    }),
  ],
};
