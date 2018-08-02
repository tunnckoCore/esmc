'use strict';

module.exports = {
  plugins: ['flowtype'],
  rules: {
    'flowtype/define-flow-type': 'warn',
    'flowtype/require-valid-file-annotation': 'warn',
    'flowtype/use-flow-type': 'warn',
  },
};
