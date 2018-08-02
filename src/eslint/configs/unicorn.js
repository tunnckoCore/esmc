'use strict';

module.exports = {
  plugins: ['unicorn'],
  rules: {
    // It is pretty common to name it `err`,
    // and there is almost no reason to be any other.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/catch-error-name.md
    'unicorn/catch-error-name': ['error', { name: 'err' }],

    // Enforce explicitly comparing the length property of a value.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/explicit-length-check.md
    'unicorn/explicit-length-check': 'error',

    // Pretty useful rule, but it depends.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/filename-case.md
    'unicorn/filename-case': 'off',

    // Enforce specifying rules to disable in `eslint-disable` comments.
    // Be explicit and don't just disable everything. If you want to disable
    // everything because of more errors, reconsider your style or disable that rule temporary.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-abusive-eslint-disable.md
    'unicorn/no-abusive-eslint-disable': 'error',

    // Disallow `process.exit`, also related to `node/process-exit-as-throw` rule.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-process-exit.md
    'unicorn/no-process-exit': 'error',

    // Require new when throwing an error. (fixable)
    // Don't throw strigs or some other weird things.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/throw-new-error.md
    'unicorn/throw-new-error': 'error',

    // Enforce lowercase identifier and uppercase value for number literals. (fixable)
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/number-literal-case.md
    'unicorn/number-literal-case': 'error',

    // Require escape sequences to use uppercase values. (fixable)
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/escape-case.md
    'unicorn/escape-case': 'error',

    // Require `Array.isArray()` instead of `instanceof Array`. (fixable)
    // If you need such thing in rare cases, just disable that rule for that
    // specific case and be explicit.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-array-instanceof.md
    'unicorn/no-array-instanceof': 'error',

    // Enforce the use of Buffer.from() and Buffer.alloc() instead of the deprecated ones.
    // Also related to the `node/no-deprecated-api` rule.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-new-buffer.md
    'unicorn/no-new-buffer': 'error',

    // Enforce the use of unicode escapes instead of hexadecimal escapes. (fixable)
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-hex-escape.md
    'unicorn/no-hex-escape': 'error',

    // Enforce proper Error subclassing. (fixable)
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/custom-error-definition.md
    'unicorn/custom-error-definition': 'error',

    // Prefer `String#startsWith` & `String#endsWith` over more complex alternatives.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-starts-ends-with.md
    'unicorn/prefer-starts-ends-with': 'error',

    // Enforce throwing TypeError in type checking conditions. (fixable)
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-type-error.md
    'unicorn/prefer-type-error': 'error',

    // Prevents passing a function reference directly to iterator methods. (fixable)
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-fn-reference-in-iterator.md
    'unicorn/no-fn-reference-in-iterator': 'off',

    // Enforce importing index files with `.` instead of `./index`. (fixable)
    // But we should be explicit. We know it is working without that,
    // but at least it is good for newcomers.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/import-index.md
    'unicorn/import-index': 'off',

    // Enforce the use of new for all builtins, except String, Number and Boolean. (fixable)
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/new-for-builtins.md
    'unicorn/new-for-builtins': 'error',

    // Enforce the use of regex shorthands to improve readability. (fixable)
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/regex-shorthand.md
    'unicorn/regex-shorthand': 'error',

    // Prefer the spread operator over `Array.from()`. (fixable)
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-spread.md
    'unicorn/prefer-spread': 'error',

    // Enforce passing a message value when throwing a built-in error.
    // "Be explicit" is our motto. Makes errors more useful.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/error-message.md
    'unicorn/error-message': 'error',

    // Disallow unsafe regular expressions.
    // Don't allow potential catastrophic crashes,
    // slow behaving and downtimes. You still can disable that
    // and do whatever you want, but that will be explicit and visible.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-unsafe-regex.md
    'unicorn/no-unsafe-regex': 'error',

    // Prefer `addEventListener` over `on`-functions in DOM APIs. (fixable)
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-add-event-listener.md
    'unicorn/prefer-add-event-listener': 'error',
  },
};
