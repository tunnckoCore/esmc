'use strict';

const path = require('path');

module.exports = () => ({
  extends: ['flowtype', 'base', 'node', 'promise', 'unicorn']
    .filter(Boolean)
    .map((x) => path.join(__dirname, 'configs', `${x}.js`)),
});
