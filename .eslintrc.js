module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index'
        ],
        'newlines-between': 'never',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ],
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false
      }
    ],
    'react/no-unescaped-entities': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', {
      'varsIgnorePattern': '^_',
      'argsIgnorePattern': '^_',
      'vars': 'all',
      'args': 'after-used',
      'ignoreRestSiblings': true
    }],
    '@typescript-eslint/no-explicit-any': ['error', {
      'fixToUnknown': true,
      'ignoreRestArgs': true
    }],
    'react/display-name': 'warn',
    'import/no-unused-modules': 'off'
  },
  overrides: [
    {
      files: ['pages/**/*.tsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off'
      }
    },
    {
      files: ['components/**/*.tsx'],
      rules: {
        'react/display-name': 'off'
      }
    }
  ]
};