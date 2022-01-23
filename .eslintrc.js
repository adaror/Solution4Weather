module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "@typescript-eslint"
  ],
  "rules": {
    "no-return-assign": "error",
    "arrow-parens": "error",
    "default-case": "error",
    "arrow-body-style": "error",
    "no-undef": 2,
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "no-debugger": "warn",
    "@typescript-eslint/no-explicit-any": "off"
  },
  "globals": {
    "React": true,
    "JSX": true
  }
}
