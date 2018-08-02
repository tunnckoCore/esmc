'use strict';

module.exports = (browsers, cjs) => {
  const targets = browsers
    ? { browsers: '>= 1%, not dead, not IE <= 11, last 1 Opera versions' }
    : { node: '8.9' };

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets,
          modules: cjs ? 'commonjs' : false,
          exclude: ['transform-regenerator', 'transform-async-to-generator'],
        },
      ],
      '@babel/preset-react',
      '@babel/preset-flow',
    ].filter(Boolean),
    plugins: [
      browsers && [
        'module:fast-async',
        {
          spec: true,
        },
      ],

      // Stage 0
      '@babel/plugin-proposal-function-bind',

      // Stage 1
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-logical-assignment-operators',
      ['@babel/plugin-proposal-optional-chaining', { loose: false }],
      ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
      ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: false }],
      '@babel/plugin-proposal-do-expressions',

      // Stage 2
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      '@babel/plugin-proposal-function-sent',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-numeric-separator',
      '@babel/plugin-proposal-throw-expressions',

      // Stage 3
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-syntax-import-meta',
      ['@babel/plugin-proposal-class-properties', { loose: false }],
    ].filter(Boolean),
  };
};
