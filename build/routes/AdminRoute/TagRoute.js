"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _TagController = _interopRequireDefault(require("../../http/controllers/AdminController/TagController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get("", _TagController["default"].getAll);
var _default = router;
exports["default"] = _default;