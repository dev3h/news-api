"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notFoundRoute = exports.notAuth = exports.internalServerError = exports.badRequest = void 0;
var _httpErrors = _interopRequireDefault(require("http-errors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// 400
var badRequest = function badRequest(err, res) {
  var error = _httpErrors["default"].BadRequest(err);
  return res.status(error.status).json({
    message: err.message
  });
};

// 401
exports.badRequest = badRequest;
var notAuth = function notAuth(err, res) {
  var error = _httpErrors["default"].Unauthorized(err);
  return res.status(error.status).json({
    message: err.message
  });
};

// 404
exports.notAuth = notAuth;
var notFoundRoute = function notFoundRoute(req, res) {
  var error = _httpErrors["default"].NotFound("Route không tồn tại!");
  return res.status(error.status).json({
    message: error.message
  });
};

// 500
exports.notFoundRoute = notFoundRoute;
var internalServerError = function internalServerError(err, res) {
  var error = _httpErrors["default"].InternalServerError(err);
  return res.status(error.status).json({
    message: err.message
  });
};
exports.internalServerError = internalServerError;