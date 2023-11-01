module.exports = {
    parser: 'babel-eslint',
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    plugins: ['react'],
    rules: {
      // Agrega reglas personalizadas si es necesario
    },
  };