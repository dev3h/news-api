"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _GroupCategoryRoute = _interopRequireDefault(require("./GroupCategoryRoute"));
var _CategoryRoute = _interopRequireDefault(require("./CategoryRoute"));
var _PostRoute = _interopRequireDefault(require("./PostRoute"));
var _TagRoute = _interopRequireDefault(require("./TagRoute"));
var _ManagerAuthorRoute = _interopRequireDefault(require("./ManagerAuthorRoute"));
var _RoleRoute = _interopRequireDefault(require("./RoleRoute"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var AdminRoute = function AdminRoute(app) {
  app.use("/api/v1/group-category", _GroupCategoryRoute["default"]);
  app.use("/api/v1/category", _CategoryRoute["default"]);
  app.use("/api/v1/post", _PostRoute["default"]);
  app.use("/api/v1/tag", _TagRoute["default"]);
  app.use("/api/v1/manager-author", _ManagerAuthorRoute["default"]);
  app.use("/api/v1/role", _RoleRoute["default"]);
};
var _default = exports["default"] = AdminRoute;