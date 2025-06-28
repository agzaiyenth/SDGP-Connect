import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{ts,tsx}"],

    languageOptions: {
      parser: "@typescript-eslint/parser",
      globals: globals.browser,
    },

    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
    },

    rules: {
      "@typescript-eslint/no-unused-vars": "warn", 
    },
  },

  {
    files: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "pages/**/*.{ts,tsx}", "src/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@prisma/client",
              message: "❌ Do not import `@prisma/client` in frontend code. Use `@/prisma/prisma-types` instead.",
            },
          ],
        },
      ],
    },
  },
]);
