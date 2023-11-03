"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _PostController = _interopRequireDefault(require("../../http/controllers/UserController/PostController"));
var _verifyToken = require("../../http/middlewares/verifyToken");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get("", _PostController["default"].getAll);
router.get("/:slug/detail", _PostController["default"].getOne);
router.use(_verifyToken.verifyAccessToken);
router.put("/:slug/like", _PostController["default"].toggleLike);
router.post("/:slug/comment", _PostController["default"].createComment);
var _default = router;
exports["default"] = _default;