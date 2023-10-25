"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _swaggerOutput = _interopRequireDefault(require("../swagger-output.json"));
var _GroupCategoryRoute = _interopRequireDefault(require("./GroupCategoryRoute"));
var _CategoryRoute = _interopRequireDefault(require("./CategoryRoute"));
var _PostRoute = _interopRequireDefault(require("./PostRoute"));
var _TagRoute = _interopRequireDefault(require("./TagRoute"));
var _AdminAuthRoute = _interopRequireDefault(require("./AuthRoute/AdminAuthRoute"));
var _handle_error = require("../http/middlewares/handle_error");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var initRoutes = function initRoutes(app) {
  app.use("/api/v1/admin/auth", _AdminAuthRoute["default"]);
  app.use("/api/v1/group-category", _GroupCategoryRoute["default"]);
  app.use("/api/v1/category", _CategoryRoute["default"]);
  app.use("/api/v1/post", _PostRoute["default"]);
  app.use("/api/v1/tag", _TagRoute["default"]);
  app.use("/api-docs", _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swaggerOutput["default"]));
  return app.use(_handle_error.notFound);
};
var _default = initRoutes;
exports["default"] = _default;