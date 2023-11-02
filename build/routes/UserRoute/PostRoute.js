"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _PostController = _interopRequireDefault(require("../../http/controllers/UserController/PostController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();

// router.use(verifyAccessToken);
router.get("", _PostController["default"].getAll);
router.get("/:slug/detail", _PostController["default"].getOne);
var _default = exports["default"] = router;