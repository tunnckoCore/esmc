'use strict';

/**
 * @copyright 2018-present, Charlike Mike Reagent (https://tunnckocore.com)
 * @license Apache-2.0
 */

const proc = require('process');
const path = require('path');
const util = require('util');
const babel = require('@babel/core');
const fs = require('fs-extra');

const utils = require('./utils');
const babelPreset = require('./babel/preset');

const transformFile = util.promisify(babel.transformFile);

module.exports = async function build(files, argv) {
  const opts = Object.assign({ dbg: false }, argv);
  proc.env.ESMC_BROWSERS = 'false';
  proc.env.ESMC_CJS = String(!opts.esm);

  return Promise.all(
    utils.arrayify(files).map(createMapper('nodejs', opts)),
  ).then(() => {
    proc.env.ESMC_BROWSERS = 'true';

    return Promise.all(
      utils.arrayify(files).map(createMapper('browsers', opts)),
    );
  });
};

function createMapper(distType, argv) {
  const opts = Object.assign({ dbg: false }, argv);
  const cwd = proc.cwd();
  const dist = path.join(cwd, 'dist');

  const config = distType === 'browsers' ? babelPreset() : babelPreset();

  const dest =
    distType === 'browsers'
      ? path.join(dist, 'browsers')
      : path.join(dist, 'nodejs');

  return async (fp) => {
    if (opts.compile) {
      return transformFile(fp, config).then((result) => {
        console.log(result.code);
        return result;
      });
    }

    const src = path.join(cwd, opts.dbg ? 'example-src' : 'src');
    const distFile = fp.replace(src, dest);

    return transformFile(fp, config).then(async ({ code }) => {
      await fs.mkdirp(path.dirname(distFile));

      return fs.writeFile(distFile, code);
    });
  };
}
