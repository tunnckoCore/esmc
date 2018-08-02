'use strict';

/**
 * @copyright 2018-present, Charlike Mike Reagent (https://tunnckocore.com)
 * @license Apache-2.0
 */

const os = require('os');
const path = require('path');
const eslint = require('eslint');

const config = require('./config');
const utils = require('../utils');

module.exports = async function lintFiles(files, opts, debug = false) {
  const defaultOptions = {
    fix: true,
    cache: true,
    cacheLocation: debug
      ? '.esmc-cache-lint'
      : path.join(os.homedir(), '.esmc-cache-lint'),
    useEslintrc: false,
    baseConfig: config,
  };

  const options = { ...opts, ...defaultOptions };
  options.extensions = utils.arrayify(options.extensions);

  const engine = new eslint.CLIEngine(options);
  const report = engine.executeOnFiles(files);
  report.format = engine.getFormatter('codeframe');

  eslint.CLIEngine.outputFixes(report);

  return report;
};
