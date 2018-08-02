'use strict';

/**
 * @copyright 2018-present, Charlike Mike Reagent (https://tunnckocore.com)
 * @license Apache-2.0
 */

const os = require('os');
const test = require('asia');
const utils = require('../src/utils');

test('utils.getCacheFile() includes homepath', (t) => {
  t.ok(utils.getCacheFile().includes(os.homedir()));
});
