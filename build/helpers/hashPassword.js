"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var hashPassword = function hashPassword(password) {
  var salt = _bcryptjs["default"].genSaltSync(10);
  var hash = _bcryptjs["default"].hashSync(password, salt);
  return hash;
};
var _default = hashPassword;
exports["default"] = _default;