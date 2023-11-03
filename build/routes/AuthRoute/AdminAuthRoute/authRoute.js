"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _AdminAuthRequest = _interopRequireDefault(require("../../../http/requests/AdminAuthRequest"));
var _AdminAuthController = _interopRequireDefault(require("../../../http/controllers/AuthController/AdminAuthController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.post("/login", _AdminAuthRequest["default"], _AdminAuthController["default"].login);
router.post("/refresh-token", _AdminAuthController["default"].refreshAccessToken);
router.get("/logout", _AdminAuthController["default"].logout);
var _default = router;
exports["default"] = _default;