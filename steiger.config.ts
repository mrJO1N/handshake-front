import { defineConfig } from 'steiger';
import fsd from '@feature-sliced/steiger-plugin';

export default defineConfig([
  ...fsd.configs.recommended,
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    rules: {
      'fsd/forbidden-imports': 'off',
      'fsd/no-public-api-sidestep': 'off',
    },
  },
  {
    files: ['src/widgets/post-list/**'],
    rules: {
      'fsd/insignificant-slice': 'off',
    },
  },
]);