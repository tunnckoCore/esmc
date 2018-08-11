"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports.sub = sub;

var _baz = _interopRequireDefault(require("./baz"));

var _hah = _interopRequireDefault(require("./qux/hah"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function add(foo, bar) {
  return foo + bar;
}

function sub(a, b) {
  const fo = add(1, 24423);
  console.log((0, _baz.default)('sasa'), fo, _hah.default);
  return a - b;
}