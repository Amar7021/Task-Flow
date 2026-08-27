import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import prettier from "eslint-config-prettier"


export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  rules: {
            "local/jsx-extension-rule": "error",
            "no-var": "error",
            "no-debugger": "error",
              "no-unused-vars": [
                "warn",
                {
                    varsIgnorePattern: "^[A-Z_]",
                    argsIgnorePattern: "^_",
                },
            ],
            "no-console": ["error", { allow: ["warn", "error"] }],
  },
    prettier
])
