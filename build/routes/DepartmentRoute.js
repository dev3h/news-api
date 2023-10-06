"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _DepartmentController = _interopRequireDefault(require("../http/controllers/DepartmentController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get("/", _DepartmentController["default"].getAll);
router.get("/one/:id", _DepartmentController["default"].getOne);
router.post("/", _DepartmentController["default"].create);
router.put("/:id", _DepartmentController["default"].update);
router["delete"]("/:id", _DepartmentController["default"].destroy);
var _default = router;
exports["default"] = _default;