module.exports = {
  root: true,
  extends: ['airbnb-base', 'plugin:react-hooks/recommended', 'plugin:compat/recommended', 'plugin:ecmalist/recommended'],
  settings: { es: { aggressive: true } },
  env: { browser: true, mocha: true },
  parser: '@babel/eslint-parser',
  parserOptions: {
    allowImportExportEverywhere: true,
    sourceType: 'module',
    requireConfigFile: false,
  },
  rules: {
    'chai-friendly/no-unused-expressions': 2,
    'import/extensions': ['error', { js: 'always' }],
    'import/no-cycle': 0,
    'linebreak-style': ['error', 'unix'],
    'no-await-in-loop': 0,
    'no-param-reassign': [2, { props: false }],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
    'no-return-assign': ['error', 'except-parens'],
    'no-unused-expressions': 0,
    'object-curly-newline': ['error', {
      ObjectExpression: { multiline: true, minProperties: 6 },
      ObjectPattern: { multiline: true, minProperties: 6 },
      ImportDeclaration: { multiline: true, minProperties: 6 },
      ExportDeclaration: { multiline: true, minProperties: 6 },
    }],
  },
  overrides: [
    {
      files: ['test/**/*.js'],
      rules: { 'no-console': 0 },
    },
    {
      // Override for nala test
      files: ['nala/**/*.js', 'nala/**/*.test.js'],
      rules: {
        'no-console': 0,
        'import/no-extraneous-dependencies': 0,
        'max-len': 0,
        'chai-friendly/no-unused-expressions': 0,
        'no-plusplus': 0,
      },
    },
  ],
  ignorePatterns: [
    '/libs/deps/*',
    '/libs/features/mas/*',
    '/tools/loc/*',
    '/libs/features/spectrum-web-components/*',
    '/libs/navigation/dist/*',
  ],
  plugins: [
    'chai-friendly',
  ],
};
