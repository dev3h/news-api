"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var passwordRule = function passwordRule() {
  var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
  return {
    password: _joi["default"].string().min(8).max(20).required().pattern(passwordPattern).messages({
      "string.empty": "Password là bắt buộc",
      "any.required": "Password là bắt buộc",
      "string.min": "Password phải có ít nhất 8 ký tự",
      "string.max": "Password không được vượt quá 20 ký tự",
      "string.pattern.base": "Password phải bao gồm cả chữ chữ hoa, chữ thường, số và ký tự đặc biệt (@#$%^&+=!)"
    })
  };
};
var _default = exports["default"] = passwordRule;