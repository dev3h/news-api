"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _authRoute = _interopRequireDefault(require("./authRoute"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var UserAuthRoute = function UserAuthRoute(app) {
  app.use("/api/v1/auth/user", _authRoute["default"]);
};
var _default = exports["default"] = UserAuthRoute;