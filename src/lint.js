'use strict';

const eslint = require('eslint');
const lintFiles = require('./eslint/index');

module.exports = function lint(files, argv, debug = false) {
  return lintFiles(files, argv, debug).then((report) => {
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
