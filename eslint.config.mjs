import obsidianmd from 'eslint-plugin-obsidianmd';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ['obsidian-plugin/**/*.ts'],
    plugins: { obsidianmd },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './obsidian-plugin/tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      ...obsidianmd.configs.recommended,
    },
  }
];
