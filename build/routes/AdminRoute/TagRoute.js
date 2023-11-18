"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _TagController = _interopRequireDefault(require("../../http/controllers/AdminController/TagController"));
var _verifyToken = require("../../http/middlewares/verifyToken");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.use(_verifyToken.verifyAccessToken);
router.get("", _TagController["default"].getAll);
router.get("/:id/info", _TagController["default"].getOne);
router["delete"]("/:id", _TagController["default"].destroy);
router.post("/", _TagController["default"].create);
router.put("/:id", _TagController["default"].update);
var _default = exports["default"] = router;