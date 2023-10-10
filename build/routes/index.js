"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _swaggerOutput = _interopRequireDefault(require("../swagger-output.json"));
var _ProductRoute = _interopRequireDefault(require("./ProductRoute"));
var _GroupCategoryRoute = _interopRequireDefault(require("./GroupCategoryRoute"));
var _AuthRoute = _interopRequireDefault(require("./AuthRoute"));
var _handle_error = require("../http/middlewares/handle_error");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var initRoutes = function initRoutes(app) {
  app.use("/api/v1/auth", _AuthRoute["default"]);
  app.use("/api/v1/group-category", _GroupCategoryRoute["default"]);
  // app.use("/api/v1/product", ProductRoute);

  app.use("/api-docs", _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swaggerOutput["default"]));
  return app.use(_handle_error.notFound);
};
var _default = initRoutes;
exports["default"] = _default;