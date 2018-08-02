'use strict';

const babelConfig = require('./src/babel/preset');

require('@babel/register')(babelConfig());
