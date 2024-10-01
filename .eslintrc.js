module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": [
      "warn",
      {
        singleQuote: true,
        parser: "typescript",
        endOfLine: "auto",
        semi: true,
        trailingComma: "all",
      },
    ],
  },
};
