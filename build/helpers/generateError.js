"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notFoundRoute = exports.notAuth = exports.internalServerError = exports.forbidden = exports.badRequest = void 0;
var _httpErrors = _interopRequireDefault(require("http-errors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// 400
var badRequest = exports.badRequest = function badRequest(err, res) {
  if (res.headersSent) {
    return;
  }
  var error = _httpErrors["default"].BadRequest(err);
  return res.status(error.status).json({
    message: err.message
  });
};

// 401
var notAuth = exports.notAuth = function notAuth(err, res) {
  var authError = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (res.headersSent) {
    return;
  }
  var error = _httpErrors["default"].Unauthorized(err);
  return res.status(error.status).json({
    message: err.message,
    authError: authError
  });
};

// 403
var forbidden = exports.forbidden = function forbidden(err, res) {
  if (res.headersSent) {
    return;
  }
  var error = _httpErrors["default"].Forbidden(err);
  return res.status(error.status).json({
    message: err.message
  });
};

// 404
var notFoundRoute = exports.notFoundRoute = function notFoundRoute(req, res) {
  if (res.headersSent) {
    return;
  }
  var error = _httpErrors["default"].NotFound("Route không tồn tại!");
  return res.status(error.status).json({
    message: error.message
  });
};

// 500
var internalServerError = exports.internalServerError = function internalServerError(err, res) {
  if (res.headersSent) {
    return;
  }
  var error = _httpErrors["default"].InternalServerError(err);
  return res.status(error.status).json({
    message: err.message
  });
};