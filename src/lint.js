'use strict';

/**
 * @copyright 2018-present, Charlike Mike Reagent (https://tunnckocore.com)
 * @license Apache-2.0
 */

const eslint = require('eslint');
const lintFiles = require('./eslint/index');

module.exports = function lint(files, argv) {
  return lintFiles(files, argv).then((report) => {
    if (report.errorCount === 0 && report.warningCount === 0) {
      return null;
    }
    const output = argv.warnings
      ? report.format(report.results)
      : report.format(eslint.CLIEngine.getErrorResults(report.results));

    if (output.length > 0) {
      console.error(`\n${output}`);
    }

    if (report.errorCount > 0) {
      throw new Error(output);
    }

    return report;
  });
};
