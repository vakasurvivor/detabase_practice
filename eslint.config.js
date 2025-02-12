import { FlatCompat } from "@eslint/eslintrc";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import unicorn from "eslint-plugin-unicorn";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // next/core-web-vitals と next/typescript の従来の設定を反映
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Shareable Configs を利用して読み込んだルールを有効化
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": typescript,
      unicorn: unicorn,
      import: importPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: true,
      },
    },
    rules: {
      ...(typescript.configs?.["recommended-type-checked"]?.rules ?? {}),
      ...(typescript.configs?.["stylistic-type-checked"]?.rules ?? {}),
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: { attributes: false },
        },
      ],
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
        },
      ],
      "func-style": ["error", "declaration", { allowArrowFunctions: false }],
      "prefer-arrow-callback": ["error", { allowNamedFunctions: false }],
      "import/no-default-export": "error",
    },
  },

  // 独自ルールを作成し、それを有効化しています。
  {
    files: [
      "**/page.tsx",
      "**/layout.tsx",
      "next.config.ts",
      "postcss.config.js",
      "tailwind.config.ts",
    ],
    rules: {
      "import/no-default-export": "off",
      "import/prefer-default-export": "error",
    },
  },

  // ESLint の対象外とするパターン
  {
    ignores: ["src/components/ui/*", "*.md", "*.mdx"],
  },
];

export default eslintConfig;
