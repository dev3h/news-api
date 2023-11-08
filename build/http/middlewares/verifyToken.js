"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyAccessToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _generateError = require("../../helpers/generateError");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var verifyAccessToken = exports.verifyAccessToken = function verifyAccessToken(req, res, next) {
  var _req$headers;
  var token = req === null || req === void 0 || (_req$headers = req.headers) === null || _req$headers === void 0 ? void 0 : _req$headers.authorization;
  if (token !== null && token !== void 0 && token.startsWith("Bearer")) {
    var accessToken = token.split(" ")[1];
    _jsonwebtoken["default"].verify(accessToken, process.env.JWT_SECRET, function (err, decode) {
      if (err) (0, _generateError.notAuth)(new Error("Access Token không hợp lệ"), res);
      req.user = decode;
      next();
    });
  } else {
    (0, _generateError.notAuth)(new Error("Yêu cầu đăng nhập"), res);
  }
};