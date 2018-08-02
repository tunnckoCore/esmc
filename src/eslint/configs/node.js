'use strict';

module.exports = {
  plugins: ['node'],
  rules: {
    // Enforce throwing instead of `process.exit`.
    // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/process-exit-as-throw.md
    'node/process-exit-as-throw': 'error',

    // Ensure we don't import something that is ignored.
    // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/process-exit-as-throw.md
    'node/no-unpublished-import': 'off',

    // Ensure we have the defined bin file.
    // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/process-exit-as-throw.md
    'node/no-unpublished-bin': 'error',

    // Don't use deprecated APIs
    // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-deprecated-api.md
    'node/no-deprecated-api': 'error',
  },
};
