"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _GroupCategoryController = _interopRequireDefault(require("../http/controllers/GroupCategoryController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get("", _GroupCategoryController["default"].getAll);
router.get("/:id", _GroupCategoryController["default"].getOne);
router.post("/", _GroupCategoryController["default"].create);
router.put("/:id", _GroupCategoryController["default"].update);
router["delete"]("/:id", _GroupCategoryController["default"].destroy);
var _default = router;
exports["default"] = _default;