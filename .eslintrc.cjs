// .eslintrc.cjs
module.exports = {
    env: {
      browser: true,
      es6: true,
    },
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    globals: {
      window: 'readonly',
      document: 'readonly',
      console: 'readonly',
      tf: 'readonly', 
      JEEFACEFILTERAPI: 'readonly', 
      global: 'readonly', 
      UAParser: 'readonly', 
      heic2any: 'readonly', 
      ZXingWASM: 'readonly', 
      measureBlur: 'readonly', 
      HME: 'readonly', 
      html2canvas: 'readonly', 
    },
    rules: {
      'no-undef': 'error',
      'no-unused-vars': 'off',
    },
  };