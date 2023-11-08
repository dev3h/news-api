"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _GroupCategoryRequest = _interopRequireDefault(require("../../http/requests/GroupCategoryRequest"));
var _GroupCategoryController = _interopRequireDefault(require("../../http/controllers/AdminController/GroupCategoryController"));
var _verifyToken = require("../../http/middlewares/verifyToken");
var _checkRole = require("../../http/middlewares/checkRole");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.use(_verifyToken.verifyAccessToken);
// router.use(checkAdminRole);
router.get("", _GroupCategoryController["default"].getAll);
router.get("/:id/info", _GroupCategoryController["default"].getOne);
router["delete"]("/:id", _GroupCategoryController["default"].destroy);
router.use(_GroupCategoryRequest["default"]);
router.post("/", _GroupCategoryController["default"].create);
router.put("/:id", _GroupCategoryController["default"].update);
var _default = exports["default"] = router;