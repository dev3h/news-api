"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _OriginController = _interopRequireDefault(require("../http/controllers/OriginController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get("/", _OriginController["default"].getAll);
router.get("/one/:id", _OriginController["default"].getOne);
router.post("/", _OriginController["default"].create);
router.put("/:id", _OriginController["default"].update);
router["delete"]("/:id", _OriginController["default"].destroy);
var _default = router;
exports["default"] = _default;