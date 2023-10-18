module.exports = {
  root: true,
  extends: ['@nuxt/eslint-config'],
  rules: {
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 4,
        },
      },
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
        },
      },
    ],
    'vue/singleline-html-element-content-newline': [
      'error',
      {
        ignores: ['pre', 'textarea', ...INLINE_ELEMENTS, 'h4'],
      },
    ],
  },
};
