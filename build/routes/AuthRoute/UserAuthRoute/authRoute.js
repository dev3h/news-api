"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _UserAuthController = _interopRequireDefault(require("../../../http/controllers/AuthController/UserAuthController"));
var _UserAuthRequest = _interopRequireDefault(require("../../../http/requests/UserAuthRequest"));
var _verifyToken = require("../../../http/middlewares/verifyToken");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
// VERIFY REGISTER
router.put("/final-register/:token", _UserAuthController["default"].verifyRegister);
router.get("/forgot-password", _UserAuthController["default"].forgotPassword);
router.put("/reset-password", _UserAuthController["default"].resetPassword);
router.get("/logout", _UserAuthController["default"].logout);
router.get("/current", _verifyToken.verifyAccessToken, _UserAuthController["default"].getCurrent);
router.post("/refresh-token", _UserAuthController["default"].refreshAccessToken);
router.use(_UserAuthRequest["default"]);
router.post("/register", _UserAuthController["default"].register);
router.post("/login", _UserAuthController["default"].login);
var _default = exports["default"] = router;