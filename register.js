'use strict';

const proc = require('process');
const esmPreset = require('babel-preset-esmc');

proc.env.ESMC_CJS = 'true';

require('@babel/register')(esmPreset());
