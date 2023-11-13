"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _crypto = _interopRequireDefault(require("crypto"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var generateCodeVerifyEmail = function generateCodeVerifyEmail() {
  // Tạo buffer ngẫu nhiên với độ dài 2 byte
  var buffer = _crypto["default"].randomBytes(2);

  // Chuyển buffer thành số hex và lấy 4 chữ số cuối cùng
  var token = parseInt(buffer.toString("hex"), 16).toString().slice(-4);
  return token;
};
var _default = exports["default"] = generateCodeVerifyEmail;