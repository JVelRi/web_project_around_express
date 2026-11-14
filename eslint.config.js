import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default [
  { ignores: ['dist/', 'node_modules/'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      'no-underscore-dangle': ['error', { allow: ['_id'] }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
];
