"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _PostRoute = _interopRequireDefault(require("./PostRoute"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var UserRoute = function UserRoute(app) {
  app.use("/api/v1/user/post", _PostRoute["default"]);
};
var _default = exports["default"] = UserRoute;