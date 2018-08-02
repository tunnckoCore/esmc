'use strict';

module.exports = {
  extends: ['airbnb', 'prettier', 'prettier/react', 'prettier/flowtype'],
  plugins: ['prettier'],
  parser: 'babel-eslint',
  rules: {
    'prettier/prettier': [
      'error',
      {
        // That actually is enforced by AirBnB Style anyway.
        // Enforce 2 spaces, because JavaScript is always different
        // then the rest of the languages.
        tabWidth: 2,

        // That actually is enforced by AirBnB Style anyway.
        // Explicitness is the most important thing:
        // - Always is visible that this is function (because the parens).
        // - If you first write single param and decide to add new one,
        // then you should also add a parens around the both - that's mess.
        arrowParens: 'always',

        // Enforce single-quotes, because industry standard.
        singleQuote: true,

        // That actually is enforced by AirBnB Style anyway.
        // Always useful. And guaranteed that you won't see boring errors,
        // that eats your time, because of nothing real.
        trailingComma: 'all',

        // That actually is enforced by AirBnB Style anyway.
        // Enforce more clear object literals.
        // As seen in this example https://github.com/airbnb/javascript#objects--rest-spread
        bracketSpacing: true,

        // That actually is enforced by AirBnB Style anyway.
        // Enforcing bracket on the next line makes differentiate
        // where ends the tag and its properties and where starts the content of the tag.
        // https://prettier.io/docs/en/options.html#jsx-brackets
        jsxBracketSameLine: false,
      },
    ],

    strict: 'off',

    // Enforce using named functions when regular function is used,
    // otherwise use arrow functions
    'func-names': ['error', 'always'],

    // Always use parens (for consistency).
    // https://eslint.org/docs/rules/arrow-parens
    'arrow-parens': ['error', 'always', { requireForBlockBody: true }],

    'prefer-arrow-callback': [
      'error',
      { allowNamedFunctions: true, allowUnboundThis: true },
    ],

    // http://eslint.org/docs/rules/max-params
    'max-params': ['error', { max: 5 }],

    // http://eslint.org/docs/rules/max-statements
    'max-statements': ['error', { max: 25 }],

    // http://eslint.org/docs/rules/max-statements-per-line
    'max-statements-per-line': ['error', { max: 1 }],

    // http://eslint.org/docs/rules/max-nested-callbacks
    'max-nested-callbacks': ['error', { max: 5 }],

    // http://eslint.org/docs/rules/max-depth
    'max-depth': ['error', { max: 5 }],

    // enforces no braces where they can be omitted
    // https://eslint.org/docs/rules/arrow-body-style
    // Never enable for object literal.
    'arrow-body-style': [
      'error',
      'as-needed',
      {
        requireReturnForObjectLiteral: false,
      },
    ],

    // Allow functions to be use before define because:
    // 1) they are hoisted,
    // 2) because ensure read flow is from top to bottom
    // 3) logically order of the code.
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
        variables: true,
      },
    ],

    // Same as AirBnB, but adds `opts`, `options` and `err` to exclusions
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    // rule: https://eslint.org/docs/rules/no-param-reassign.html
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'acc', // for reduce accumulators
          'e', // for e.returnvalue
          'err', // for adding to the Error instance
          'ctx', // for Koa routing
          'req', // for Express requests
          'request', // for Express requests
          'res', // for Express responses
          'response', // for Express responses
          '$scope', // for Angular 1 scopes
          'opts', // useful to ensure the params is always obect
          'options', // and when using Object.assign for shallow copy
          'x', // allow violating the rule in specific cases, instead of disabling it
        ],
      },
    ],
  },
};
