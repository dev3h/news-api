"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _swaggerOutput = _interopRequireDefault(require("../swagger-output.json"));
var _AuthRoute = require("./AuthRoute");
var _generateError = require("../helpers/generateError");
var _AdminRoute = _interopRequireDefault(require("./AdminRoute"));
var _UserRoute = _interopRequireDefault(require("./UserRoute"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var initRoutes = function initRoutes(app) {
  (0, _AuthRoute.AdminAuthRoute)(app);
  (0, _AuthRoute.UserAuthRoute)(app);
  (0, _AdminRoute["default"])(app);
  (0, _UserRoute["default"])(app);
  app.use("/api-docs", _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swaggerOutput["default"]));
  return app.use(_generateError.notFoundRoute);
};
var _default = initRoutes;
exports["default"] = _default;