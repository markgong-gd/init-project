module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'airbnb',
  rules: {
    'react/jsx-filename-extension': 'off',
    'comma-dangle': ['error', 'never']
  }
};
