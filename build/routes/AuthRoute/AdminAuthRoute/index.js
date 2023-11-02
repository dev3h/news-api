"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _authRoute = _interopRequireDefault(require("./authRoute"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var AdminAuthRoute = function AdminAuthRoute(app) {
  app.use("/api/v1/auth/admin", _authRoute["default"]);
};
var _default = exports["default"] = AdminAuthRoute;