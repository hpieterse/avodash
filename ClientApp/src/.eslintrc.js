module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  plugins: [
    "react",
    "@typescript-eslint",
  ],
  rules: {
    "react/jsx-filename-extension": [2, {
      extensions: [
        ".tsx",
      ],
    }],
    "import/no-unresolved": 0,
    "prefer-arrow-callback": 1,
    quotes: [2, "double", "avoid-escape"],
    "jsx-quotes": [2, "prefer-double"],
    indent: ["error", 2, { SwitchCase: 1 }],
    "react/jsx-fragments": [2, "element"],
    "comma-dangle": [
      2,
      {
        arrays: "always-multiline",
        exports: "always-multiline",
        functions: "never",
        imports: "always-multiline",
        objects: "always-multiline",
      },
    ],
    "linebreak-style": 0,
    "import/extensions": 0,
    "sx-a11y/label-has-associated-control": 0,
    "react/require-default-props": 0,
    "no-unused-expressions": 0,
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
  },
};
