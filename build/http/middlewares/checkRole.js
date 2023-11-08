"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkAuthorRole = exports.checkAdminRole = exports.checkAdminOrAuthorRole = void 0;
var _RoleSysEnum = _interopRequireDefault(require("../../enums/RoleSysEnum"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var checkAdminRole = exports.checkAdminRole = function checkAdminRole(req, res, next) {
  var role = req.user.role;
  if (!role || +role !== +_RoleSysEnum["default"].ADMIN) {
    return res.status(401).json({
      mes: "Bạn phải là admin"
    });
  }
  next();
};
var checkAuthorRole = exports.checkAuthorRole = function checkAuthorRole(req, res, next) {
  var role = req.user.role;
  if (!role || role !== _RoleSysEnum["default"].AUTHOR) {
    return res.status(401).json({
      mes: "Bạn phải là tác giả"
    });
  }
  next();
};
var checkAdminOrAuthorRole = exports.checkAdminOrAuthorRole = function checkAdminOrAuthorRole(req, res, next) {
  var role = req.user.role;
  if (!role || role !== _RoleSysEnum["default"].ADMIN && role !== _RoleSysEnum["default"].AUTHOR) {
    return res.status(401).json({
      mes: "Bạn phải là admin hoặc tác giả"
    });
  }
  next();
};