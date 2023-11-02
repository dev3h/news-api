"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _CategoryRequest = _interopRequireDefault(require("../../http/requests/CategoryRequest"));
var _CategoryController = _interopRequireDefault(require("../../http/controllers/AdminController/CategoryController"));
var _verifyToken = require("../../http/middlewares/verifyToken");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.use(_verifyToken.verifyAccessToken);
router.get("", _CategoryController["default"].getAll);
router.get("/:id/info", _CategoryController["default"].getOne);
router["delete"]("/:id", _CategoryController["default"].destroy);
router.use(_CategoryRequest["default"]);
router.post("/", _CategoryController["default"].create);
router.put("/:id", _CategoryController["default"].update);
var _default = exports["default"] = router;