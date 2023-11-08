"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _AdminAuthRequest = _interopRequireDefault(require("../../../http/requests/AdminAuthRequest"));
var _AdminAuthController = _interopRequireDefault(require("../../../http/controllers/AuthController/AdminAuthController"));
var _verifyToken = require("../../../http/middlewares/verifyToken");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.post("/login", _AdminAuthRequest["default"], _AdminAuthController["default"].login);
router.post("/refresh-token", _AdminAuthController["default"].refreshAccessToken);
router.get("/current", _verifyToken.verifyAccessToken, _AdminAuthController["default"].getCurrent);
router.get("/logout", _AdminAuthController["default"].logout);
router.use(_verifyToken.verifyAccessToken);
router.get("/check-role", _AdminAuthController["default"].checkRole);
var _default = exports["default"] = router;