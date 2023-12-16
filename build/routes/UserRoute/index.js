"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _PostRoute = _interopRequireDefault(require("./PostRoute"));
var _GroupRoute = _interopRequireDefault(require("./GroupRoute"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var UserRoute = function UserRoute(app) {
  app.use("/api/v1/user/post", _PostRoute["default"]);
  app.use("/api/v1/user/group", _GroupRoute["default"]);
};
var _default = exports["default"] = UserRoute;