"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _ProductController = _interopRequireDefault(require("../http/controllers/ProductController"));
var _uploadImage = _interopRequireDefault(require("../http/middlewares/upload-image"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get("/", _ProductController["default"].getAll);
router.get("/one/:id", _ProductController["default"].getOne);
router.get("/export-excel", _ProductController["default"].exportExcel);
router.post("/", _uploadImage["default"].single("photo"), _ProductController["default"].create);
router.put("/:id", _ProductController["default"].update);
router["delete"]("/:id", _ProductController["default"].destroy);
var _default = router;
exports["default"] = _default;