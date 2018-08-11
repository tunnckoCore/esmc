"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _baz = _interopRequireDefault(require("./baz"));

var _math = require("./math");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
} // const foo = 123;


var _default = () => new Promise((resolve, reject) => {
  let added, subed;
  return Promise.resolve((0, _math.add)(10, 20)).then($await_1 => {
    try {
      added = $await_1;
      subed = (0, _math.sub)(added, 1234);
      (0, _baz.default)('zzzaz'); // some huh yup
      // console.log(import.meta);

      if (subed === 2) {
        console.log('okkk');
      } else {
        (0, _math.sub)(added, 645645);
        console.log('not ok', added);
      }

      return $return();
    } catch ($boundEx) {
      return $error($boundEx);
    }
  }, $error);
});

exports.default = _default;