module.exports = {
  purge: ["./public/**/*.html", "./src/**/*.vue"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        "2xs": ".625rem",
      },
      width: {
        "25": "6.25rem",
      },
      height: {
        "25": "6.25rem",
      },
      maxWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
      },
      animation: {
        shake: "shake .3s",
      },
      keyframes: {
        shake: {
          "0%, 20%, 40%": { transform: "translateX(-5px)" },
          "10%, 30%, 50%": { transform: "translateX(5px)" },
          "60%, 80%": {transform: "translateX(-3px)"},
          "70%, 90%": {transform: "translateX(3px)"},
          "100%": { transform: "translateX(0px)" },
        },
      },
    },
  },
  variants: {
    extend: {
      margin: ["last"],
      borderWidth: ["hover", "focus"],
    },
  },
  plugins: [],
};
