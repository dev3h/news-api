"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = _interopRequireDefault(require("joi"));
var _PasswordRule = _interopRequireDefault(require("../../rule/PasswordRule"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var UserAuthRequest = function UserAuthRequest(req, res, next) {
  var _dataToValidate$email, _dataToValidate$passw;
  var commonRules = _objectSpread({
    email: _joi["default"].string().max(50).trim().regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/).required().messages({
      "string.empty": "Email là bắt buộc",
      "any.required": "Email là bắt buộc",
      "string.max": "Email phải có tối đa 50 ký tự",
      "string.pattern.base": "Email không đúng định dạng"
    })
  }, (0, _PasswordRule["default"])());
  var registrationRules = {
    name: _joi["default"].string().max(50).trim().required().messages({
      "string.empty": "Name là bắt buộc",
      "any.required": "Name là bắt buộc",
      "string.max": "Name phải có tối đa 50 ký tự"
    })
  };
  var rules = req.path === "/register" ? _objectSpread(_objectSpread({}, commonRules), registrationRules) : commonRules;
  var dataToValidate = _objectSpread({}, req.body);
  dataToValidate.email = (_dataToValidate$email = dataToValidate.email) === null || _dataToValidate$email === void 0 ? void 0 : _dataToValidate$email.trim();
  dataToValidate.password = (_dataToValidate$passw = dataToValidate.password) === null || _dataToValidate$passw === void 0 ? void 0 : _dataToValidate$passw.trim();
  if (req.path === "/register") {
    var _dataToValidate$name;
    dataToValidate.name = (_dataToValidate$name = dataToValidate.name) === null || _dataToValidate$name === void 0 ? void 0 : _dataToValidate$name.trim();
  }
  var _joi$object$validate = _joi["default"].object(rules).validate(dataToValidate),
    error = _joi$object$validate.error;
  if (error) {
    return res.status(422).json({
      message: error.message
    });
  }
  next();
};
var _default = exports["default"] = UserAuthRequest;