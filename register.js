'use strict';

/**
 * @copyright 2018-present, Charlike Mike Reagent (https://tunnckocore.com)
 * @license Apache-2.0
 */

const proc = require('process');
const esmPreset = require('babel-preset-esmc');

proc.env.ESMC_CJS = 'true';

require('@babel/register')(esmPreset());
