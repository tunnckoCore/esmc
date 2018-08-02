#!/usr/bin/env node

'use strict';

/**
 * @copyright 2018-present, Charlike Mike Reagent (https://tunnckocore.com)
 * @license Apache-2.0
 */

const proc = require('process');
const path = require('path');
const mri = require('mri');
const ora = require('ora');
const fs = require('fs-extra');

const { getFiles } = require('./src/utils');
const bridge = require('./src/bridge');
const build = require('./src/build');
const lint = require('./src/lint');
const flow = require('./src/flow');

const utils = require('./src/utils');

const argv = mri(proc.argv.slice(2), {
  default: { esm: true, 'internal-debug': false },
  boolean: ['warnings'],
});
const dbg = argv['internal-debug'];

if (argv.force) {
  fs.removeSync(utils.getCacheFile(dbg));
  fs.removeSync(path.join(proc.cwd(), 'dist'));
}

let spinner = null;

function runFlow(input) {
  spinner = ora('Code type checking...').start();

  const promise = input.length > 0 ? flow() : Promise.resolve();
  return promise.then(() => spinner.succeed());
}
function runLint(input) {
  spinner = ora('Code style linting...').start();

  const promise = input.length > 0 ? lint(input, argv, dbg) : Promise.resolve();
  return promise.then(() => spinner.succeed());
}
function runBuild(input) {
  spinner = ora('Source files compiling...').start();

  const prom = input.length > 0 ? build(input, argv, dbg) : Promise.resolve();
  return prom.then(() => spinner.succeed()).catch((err) => {
    console.error(utils.fixBabelErrors(err));
    throw err;
  });
}
function runBridge(input) {
  spinner = ora('Creating bridge file...').start();

  const promise = input.length > 0 ? bridge() : Promise.resolve();
  return promise.then(() => spinner.succeed());
}

const onfail = () => {
  spinner.fail();
  proc.exit(1);
};

const cmd = argv._[0];

if (cmd === 'compile') {
  /**
   * Compile a file and print to stdout
   */
  build(argv._.slice(1), { ...argv, compile: true }, dbg)
    .catch((err) => {
      console.error(utils.fixBabelErrors(err));
      throw err;
    })
    .catch(onfail);
} else if (cmd === 'lint') {
  /**
   * Only lint the source files
   */
  getFiles(dbg)
    .then(async ({ files, cacheFile, monitor }) => {
      await runLint(files);
      monitor.write(cacheFile);
      return true;
    })
    .catch(onfail);
} else if (cmd === 'build') {
  /**
   * Only build/compile all the source files
   */
  getFiles(dbg)
    .then(async ({ files, cacheFile, monitor }) => {
      await runBuild(files);
      monitor.write(cacheFile);
      return true;
    })
    .catch(onfail);
} else {
  /**
   * Type check, lint check, building/compiling all files
   */
  getFiles(dbg)
    .then(async ({ files, cacheFile, monitor }) => {
      if (argv.flow) {
        await runFlow(files);
      }
      await runLint(files);
      await runBuild(files);
      if (argv.esm) {
        await runBridge(files);
      }

      monitor.write(cacheFile);

      return true;
    })
    .catch(onfail);
}
