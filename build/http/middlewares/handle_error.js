"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notFound = exports.notAuth = exports.internalServerError = exports.badRequest = void 0;
var _httpErrors = _interopRequireDefault(require("http-errors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// nếu không truyền đoạn text vào trong hàm có sẵn của createError thì nó sẽ lấy mặc định của nó
// badRequest là một hàm trả về lỗi 400
var badRequest = function badRequest(err, res) {
  var error = _httpErrors["default"].BadRequest(err);
  return res.status(error.status).json({
    err: 1,
    mes: error.message
  });
};

// internalServerError là một hàm trả về lỗi 500
exports.badRequest = badRequest;
var internalServerError = function internalServerError(res) {
  var error = _httpErrors["default"].InternalServerError();
  return res.status(error.status).json({
    err: 1,
    mes: error.message
  });
};

// notFound là một hàm trả về lỗi 404
exports.internalServerError = internalServerError;
var notFound = function notFound(req, res) {
  var error = _httpErrors["default"].NotFound("This route does not exist!");
  return res.status(error.status).json({
    err: 1,
    mes: error.message
  });
};

// notAuth là một hàm trả về lỗi 401
exports.notFound = notFound;
var notAuth = function notAuth(err, res, isExpired) {
  var error = _httpErrors["default"].Unauthorized(err);
  return res.status(error.status).json({
    err: isExpired ? 2 : 1,
    mes: error.message
  });
};
exports.notAuth = notAuth;