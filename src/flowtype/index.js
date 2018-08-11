'use strict';

/**
 * @copyright 2018-present, Charlike Mike Reagent (https://tunnckocore.com)
 * @license Apache-2.0
 */

const path = require('path');
const proc = require('process');

const fs = require('fs-extra');
const spawn = require('cross-spawn');
const flowCopySource = require('flow-copy-source');

const flowReporter = require('./flow-reporter');
const { DEFAULT_IGNORE } = require('../utils');

/* eslint-disable no-param-reassign */

const flowConfig = path.join(proc.cwd(), '.flowconfig');
const flowContent = `[ignore]
.*/node_modules
.*/dist

[include]

[libs]

[lints]

[options]

[strict]
`;

module.exports = async function flowtype(files, opts) {
  const options = Object.assign({ debug: false }, opts);
  const promise = new Promise(async (resolve, reject) => {
    if (!fs.existsSync(flowConfig)) {
      await fs.writeFile(flowConfig, flowContent);
    }
    const cp = spawn(
      'flow',
      ['focus-check', '--quiet', '--json', '--json-version', '2'].concat(files),
    );

    cp.stdout.on('data', async (buf) => {
      flowReporter(buf, options)
        .then(resolve)
        .catch(reject);
    });
  });

  const source = options.debug ? 'example-src' : 'src';
  const dist = path.join(proc.cwd(), 'dist', 'nodejs');

  // TODO: Consider using `flow gen-flow-files`
  return promise.then(() =>
    flowCopySource([source], dist, { ignore: DEFAULT_IGNORE }),
  );
};
