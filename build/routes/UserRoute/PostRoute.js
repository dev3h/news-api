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
router.get("/post-of-group", _PostController["default"].getPostOfGroup);
router.get("/group-category", _PostController["default"].getGroupCategory);
router.get("/:slug/detail", _PostController["default"].getOne);
router.post("/:slug/increase-view", _PostController["default"].increaseViewOfPost);
router.use(_verifyToken.verifyAccessToken);
router.put("/:slug/like", _PostController["default"].toggleLike);
router.post("/:slug/comment", _PostController["default"].createComment);
var _default = exports["default"] = router;