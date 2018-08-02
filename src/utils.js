'use strict';

/**
 * @copyright 2018-present, Charlike Mike Reagent (https://tunnckocore.com)
 * @license Apache-2.0
 */

const os = require('os');
const fs = require('fs');
const proc = require('process');
const path = require('path');
const fastGlob = require('fast-glob');
const micromatch = require('micromatch');
const ansi = require('ansi-colors');
const isCI = require('is-ci');
const isColors = require('supports-color').stdout;

const { FileMonitor, SmartState } = require('file-state-monitor');

ansi.enabled = isCI === true ? false : isColors.level;
const colors = ansi;

const DEFAULT_IGNORE = [
  '**/node_modules/**',
  '**/bower_components/**',
  'flow-typed/**',
  'coverage/**',
  '{tmp,temp}/**',
  'vendor/**',
  'dist/**',
  '**/__tests__/**',
  '**/__snapshots__/**',
  '**/_*',
  '**/bundle.js',
  '**/*.min.js',
  '**/*.spec.js',
  '**/*.test.js',
];

function createIsIgnored() {
  return micromatch.matcher(DEFAULT_IGNORE);
}

function getCacheFile(debug = false) {
  return debug ? '.esmc-cache-js' : path.join(os.homedir(), '.esmc-cache-js');
}

async function getFiles(debug = false) {
  const cacheFile = getCacheFile(debug);
  const ignore = DEFAULT_IGNORE;
  const monitor = new FileMonitor(SmartState);
  const src = path.resolve(debug ? 'example-src' : 'src');

  monitor.load(cacheFile);
  monitor.monitorPath(src);

  if (!fs.existsSync(cacheFile)) {
    const source = debug ? 'example-src/**/*' : 'src/**/*';
    return fastGlob(source, { ignore, absolute: true }).then((files) => ({
      monitor,
      cacheFile,
      files,
    }));
  }

  const changedFiles = monitor.getChangedFiles();
  const isIgnored = createIsIgnored();

  const files = [...changedFiles]
    .map(([filepath, state]) => {
      if (state === 'changed' || state === 'created') {
        return isIgnored(filepath) ? null : filepath;
      }
      // if file is in "deleted" state, then we don't care
      return null;
    })
    .filter(Boolean);

  return {
    monitor,
    cacheFile,
    files,
  };
}

function arrayify(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  return [val];
}

function fixBabelErrors(err) {
  const errLines = err.message.split('\n');
  const firstAtLine = errLines.find((line) => line.startsWith('    at '));

  const startIndex = errLines.indexOf(firstAtLine);
  const lines = errLines.slice(0, startIndex);
  const endIndex = lines.slice(2).indexOf('');

  const goodLines = lines
    .map((line, idx) => {
      if (idx !== 0) {
        return line;
      }
      const cwd = proc.cwd();
      const lx = line.slice(line.indexOf(cwd) + cwd.length + 1);
      const m = /(.+:) (.+) \((.+)\):/.exec(lx);

      if (m) {
        return [
          `${colors.red('error')}:`,
          colors.bold(m[2]),
          colors.dim('(null)'),
          'at',
          `${colors.green(m[1] + m[3])}:`,
        ].join(' ');
      }

      return lx;
    })
    .slice(0, endIndex + 2);

  const message = goodLines
    .map((x, idx) => (idx === 1 ? null : x))
    .filter(Boolean)
    .reduce((acc, x, idx) => {
      // console.log(idx);
      if (idx === goodLines.length - 2) {
        return acc.concat('', '', colors.bold.red('1 error found.'));
      }
      return acc.concat(x);
    }, [])
    .join('\n');

  // console.log(`\n${err.message}`);
  // rethrow with fixed error message
  return message;
}

module.exports = {
  arrayify,
  fixBabelErrors,
  getFiles,
  getCacheFile,
  colors,
  DEFAULT_IGNORE,
  createIsIgnored,
};
