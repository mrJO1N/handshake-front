import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import boundaries from 'eslint-plugin-boundaries';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  // игнорируем то, что не наш код
  { ignores: ['dist', 'node_modules', 'coverage', '*.config.*'] },

  // база: JS + TS рекомендованные правила
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      boundaries,
    },
    settings: {
      // описываем слои FSD: тип = имя слоя, pattern = где он лежит
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app/*' },
        { type: 'pages', pattern: 'src/pages/*' },
        { type: 'widgets', pattern: 'src/widgets/*' },
        { type: 'features', pattern: 'src/features/*' },
        { type: 'entities', pattern: 'src/entities/*' },
        { type: 'shared', pattern: 'src/shared/*' },
      ],
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': 'warn',

      // ГЛАВНОЕ ПРАВИЛО FSD: слой может импортить только слои НИЖЕ себя
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: 'app',      allow: ['pages', 'widgets', 'features', 'entities', 'shared'] },
            { from: 'pages',    allow: ['widgets', 'features', 'entities', 'shared'] },
            { from: 'widgets',  allow: ['features', 'entities', 'shared'] },
            { from: 'features', allow: ['entities', 'shared'] },
            { from: 'entities', allow: ['shared'] },
            { from: 'shared',   allow: ['shared'] },
          ],
        },
      ],
    },
  },

  // prettier ПОСЛЕДНИМ — гасит конфликтующие правила форматирования
  prettier,
);