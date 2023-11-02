"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _ManagerAuthorController = _interopRequireDefault(require("../../http/controllers/AdminController/ManagerAuthorController"));
var _verifyToken = require("../../http/middlewares/verifyToken");
var _ManagerAuthorRequest = _interopRequireDefault(require("../../http/requests/ManagerAuthorRequest"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.use(_verifyToken.verifyAccessToken);
router.get("", _ManagerAuthorController["default"].getAll);
router.get("/:id/info", _ManagerAuthorController["default"].getOne);
router["delete"]("/:id", _ManagerAuthorController["default"].destroy);
router.use(_ManagerAuthorRequest["default"]);
router.post("/", _ManagerAuthorController["default"].create);
router.put("/:id", _ManagerAuthorController["default"].update);
var _default = exports["default"] = router;