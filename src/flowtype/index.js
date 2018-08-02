'use strict';

/**
 * @copyright 2018-present, Charlike Mike Reagent (https://tunnckocore.com)
 * @license Apache-2.0
 */

const path = require('path');
const proc = require('process');
const spawn = require('cross-spawn');
const flowCopySource = require('flow-copy-source');

const flowReporter = require('./flow-reporter');
const { DEFAULT_IGNORE } = require('../utils');

/* eslint-disable no-param-reassign */

module.exports = async function flowtype(files, debug = false) {
  const promise = new Promise((resolve, reject) => {
    const cp = spawn('flow', ['check', '--json', '--json-version', '2']);

    cp.stdout.on('data', async (buf) => {
      flowReporter(buf)
        .then(resolve)
        .catch(reject);
    });
  });

  const source = debug ? 'example-src' : 'src';
  const dist = path.join(proc.cwd(), 'dist', 'nodejs');
  return promise.then(() =>
    flowCopySource([source], dist, { ignore: DEFAULT_IGNORE }),
  );
};
