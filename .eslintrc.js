module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  ignorePatterns: ['**/reportWebVitals.js'],
  rules: {
    'max-len': ['error', { code: 150 }],
    'import/no-named-as-default-member': 0,
    'import/no-named-as-default': 0,
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prefer-stateless-function': [0, { ignorePureComponents: false }],
    'react/destructuring-assignment': [0, 'always'],
    'react/no-access-state-in-setstate': 0,
    'react/no-array-index-key': 0,
    'react/button-has-type': 0,
    'react/no-unused-state': 0,
    'no-underscore-dangle': 0,
    'jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions': 0,
    'no-plusplus': 'off',
  },
};
