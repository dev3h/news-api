"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _CompanyController = _interopRequireDefault(require("../http/controllers/CompanyController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get("/", _CompanyController["default"].getAll);
router.get("/one/:id", _CompanyController["default"].getOne);
router.post("/", _CompanyController["default"].create);
router.put("/:id", _CompanyController["default"].update);
router["delete"]("/:id", _CompanyController["default"].destroy);
var _default = router;
exports["default"] = _default;