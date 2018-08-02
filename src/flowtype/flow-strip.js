'use strict';

/**
 * @copyright 2018-present, Charlike Mike Reagent (https://tunnckocore.com)
 * @license Apache-2.0
 */

const path = require('path');
const proc = require('process');
const fs = require('fs-extra');

const flowRemoveTypes = require('flow-remove-types');

const utils = require('../utils');

module.exports = async function flowStrip(input, { filter }, dbg) {
  const files = utils.arrayify(input).filter(filter);
  const cwd = proc.cwd();

  return Promise.all(
    files.map(async (fp) => {
      const content = await fs.readFile(fp, 'utf8');

      const src = path.join(cwd, dbg ? 'example-src' : 'src');
      const distFile = fp.replace(src, path.join('dist', 'nodejs'));
      const output = flowRemoveTypes(content, { pretty: true });

      return fs.writeFile(distFile, output);
    }),
  );
};
