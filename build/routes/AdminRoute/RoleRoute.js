"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _verifyToken = require("../../http/middlewares/verifyToken");
var _RoleController = _interopRequireDefault(require("../../http/controllers/AdminController/RoleController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.use(_verifyToken.verifyAccessToken);
// router.use(checkAdminRole);
router.get("", _RoleController["default"].getAll);
var _default = exports["default"] = router;