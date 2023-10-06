"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _swaggerOutput = _interopRequireDefault(require("../swagger-output.json"));
var _DepartmentRoute = _interopRequireDefault(require("./DepartmentRoute"));
var _CompanyRoute = _interopRequireDefault(require("./CompanyRoute"));
var _UnitRoute = _interopRequireDefault(require("./UnitRoute"));
var _SupplierRoute = _interopRequireDefault(require("./SupplierRoute"));
var _OriginRoute = _interopRequireDefault(require("./OriginRoute"));
var _GroupProductRoute = _interopRequireDefault(require("./GroupProductRoute"));
var _ProductRoute = _interopRequireDefault(require("./ProductRoute"));
var _DocumentRoute = _interopRequireDefault(require("./DocumentRoute"));
var _AuthRoute = _interopRequireDefault(require("./AuthRoute"));
var _handle_error = require("../http/middlewares/handle_error");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var initRoutes = function initRoutes(app) {
  app.use("/api/v1/auth", _AuthRoute["default"]);
  app.use("/api/v1/department", _DepartmentRoute["default"]);
  app.use("/api/v1/company", _CompanyRoute["default"]);
  app.use("/api/v1/unit", _UnitRoute["default"]);
  app.use("/api/v1/supplier", _SupplierRoute["default"]);
  app.use("/api/v1/origin", _OriginRoute["default"]);
  app.use("/api/v1/group-product", _GroupProductRoute["default"]);
  app.use("/api/v1/product", _ProductRoute["default"]);
  app.use("/api/v1/document", _DocumentRoute["default"]);
  app.use("/api-docs", _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swaggerOutput["default"]));
  return app.use(_handle_error.notFound);
};
var _default = initRoutes;
exports["default"] = _default;