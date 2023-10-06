"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _SupplierController = _interopRequireDefault(require("../http/controllers/SupplierController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get("/", _SupplierController["default"].getAll);
router.get("/one/:id", _SupplierController["default"].getOne);
router.post("/", _SupplierController["default"].create);
router.put("/:id", _SupplierController["default"].update);
router["delete"]("/:id", _SupplierController["default"].destroy);
var _default = router;
exports["default"] = _default;