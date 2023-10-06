"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _UnitController = _interopRequireDefault(require("../http/controllers/UnitController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get("/", _UnitController["default"].getAll);
router.get("/one/:id", _UnitController["default"].getOne);
router.post("/", _UnitController["default"].create);
router.put("/:id", _UnitController["default"].update);
router["delete"]("/:id", _UnitController["default"].destroy);
var _default = router;
exports["default"] = _default;