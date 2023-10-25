"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.internalServerError = void 0;
var _httpErrors = _interopRequireDefault(require("http-errors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// 500
var internalServerError = function internalServerError(err, res) {
  var error = _httpErrors["default"].InternalServerError(err);
  return res.status(error.status).json({
    mes: error.message
  });
};
exports.internalServerError = internalServerError;