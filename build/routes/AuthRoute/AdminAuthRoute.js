"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _AuthController = _interopRequireDefault(require("../../http/controllers/AdminController/AuthController"));
var _AdminAuthRequest = _interopRequireDefault(require("../../http/requests/AdminAuthRequest"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.use(_AdminAuthRequest["default"]);
router.post("/login", _AuthController["default"].login);
router.post("/refresh-token", _AuthController["default"].refreshAccessToken);
router.get("/logout", _AuthController["default"].logout);
var _default = router;
exports["default"] = _default;