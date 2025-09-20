import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import globals from "globals";

export default [
  { ignores: ["dist/**", "node_modules/**", "coverage/**"] },

  {
    ...js.configs.recommended,
    languageOptions: { globals: { ...globals.node } },
  },

  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsparser,
      parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    },
    plugins: { "@typescript-eslint": tseslint },
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-console": ["warn", { allow: ["log", "error"] }],
      ignoreInFunctionTypes: true,
    },
  },
];
