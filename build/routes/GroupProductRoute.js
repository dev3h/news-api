"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _GroupProductController = _interopRequireDefault(require("../http/controllers/GroupProductController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get("/", _GroupProductController["default"].getAll);
router.get("/one/:id", _GroupProductController["default"].getOne);
router.post("/", _GroupProductController["default"].create);
router.put("/:id", _GroupProductController["default"].update);
router["delete"]("/:id", _GroupProductController["default"].destroy);
var _default = router;
exports["default"] = _default;