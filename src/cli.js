#!/usr/bin/env node

'use strict';

const proc = require('process');
const path = require('path');
const mri = require('mri');
const ora = require('ora');
const fs = require('fs-extra');

const { getFiles } = require('./utils');
const bridge = require('./bridge');
const build = require('./build');
const lint = require('./lint');
const flow = require('./flow');

const utils = require('./utils');

const argv = mri(proc.argv.slice(2), { boolean: ['warnings'] });
const dbg = false;

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

  const promise = input.length > 0 ? build(input, dbg) : Promise.resolve();
  return promise.then(() => spinner.succeed()).catch((err) => {
    console.error(utils.fixBabelErrors(err));
    throw err;
  });
}
function runBridge(input) {
  spinner = ora('Creating bridge file...').start();

  const promise = input.length > 0 ? bridge() : Promise.resolve();
  return promise.then(() => spinner.succeed());
}

getFiles(dbg)
  .then(async ({ files, cacheFile, monitor }) => {
    if (argv.flow) {
      await runFlow(files);
    }
    await runLint(files);
    await runBuild(files);
    await runBridge(files);

    monitor.write(cacheFile);

    return true;
  })
  .catch(() => {
    spinner.fail();
    proc.exit(1);
  });
