'use strict';

/**
 * @copyright 2018-present, Charlike Mike Reagent (https://tunnckocore.com)
 * @license Apache-2.0
 */

const path = require('path');
const proc = require('process');
const fs = require('fs-extra');

module.exports = async function createBridge() {
  const tpl = `'use strict';

const esmLoader = require('esm');
module.exports = esmLoader(module)('./index.js');
`;

  const dist = path.join(proc.cwd(), 'dist', 'nodejs', '__index.js');

  return fs.writeFile(dist, tpl);
};
