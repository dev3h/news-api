"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateToken = exports.generateRefreshToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var generateToken = function generateToken(_ref) {
  var id = _ref.id,
    _ref$role = _ref.role,
    role = _ref$role === void 0 ? null : _ref$role;
  return _jsonwebtoken["default"].sign({
    id: id,
    role: role
  }, process.env.JWT_SECRET, {
    expiresIn: "2d"
  });
};
exports.generateToken = generateToken;
var generateRefreshToken = function generateRefreshToken(id) {
  return _jsonwebtoken["default"].sign({
    id: id
  }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
};
exports.generateRefreshToken = generateRefreshToken;