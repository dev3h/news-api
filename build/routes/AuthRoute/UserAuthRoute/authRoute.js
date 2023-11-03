"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _UserAuthController = _interopRequireDefault(require("../../../http/controllers/AuthController/UserAuthController"));
var _UserAuthRequest = _interopRequireDefault(require("../../../http/requests/UserAuthRequest"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
// VERIFY REGISTER
router.put("/final-register/:token", _UserAuthController["default"].verifyRegister);
router.get("/forgot-password", _UserAuthController["default"].forgotPassword);
router.put("/reset-password", _UserAuthController["default"].resetPassword);
router.use(_UserAuthRequest["default"]);
router.post("/register", _UserAuthController["default"].register);
router.post("/login", _UserAuthController["default"].login);
router.post("/refresh-token", _UserAuthController["default"].refreshAccessToken);
router.get("/logout", _UserAuthController["default"].logout);
var _default = router;
exports["default"] = _default;