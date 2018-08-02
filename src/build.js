'use strict';

const proc = require('process');
const path = require('path');
const util = require('util');
const babel = require('@babel/core');
const fs = require('fs-extra');

const babelPreset = require('./babel/preset');

const transformFile = util.promisify(babel.transformFile);

module.exports = async (files, debug = false) =>
  Promise.all(files.map(createMapper('nodejs', debug))).then(() =>
    Promise.all(files.map(createMapper('browsers', debug))),
  );

function createMapper(distType, debug = false) {
  const cwd = proc.cwd();
  const dist = path.join(cwd, 'dist');

  const config = distType === 'browsers' ? babelPreset(true) : babelPreset();
  const dest =
    distType === 'browsers'
      ? path.join(dist, 'browsers')
      : path.join(dist, 'nodejs');

  return async (fp) => {
    const src = debug ? 'examples' : 'src';
    const relativePath = path.relative(path.join(cwd, src), fp);
    const distFilepath = path.join(dest, relativePath);

    return transformFile(fp, config).then(async ({ code }) => {
      await fs.mkdirp(path.dirname(distFilepath));

      return fs.writeFile(distFilepath, code);
    });
  };
}
