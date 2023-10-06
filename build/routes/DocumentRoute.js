"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _DocumentController = _interopRequireDefault(require("../http/controllers/DocumentController"));
var _uploadFileData = _interopRequireDefault(require("../http/middlewares/upload-file-data"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get("/", _DocumentController["default"].getAll);
router.get("/one/:id", _DocumentController["default"].getOne);
router.post("/import-excel", _uploadFileData["default"].single("data_excel"), _DocumentController["default"].importExcel);
router.post("/", _DocumentController["default"].create);
router.put("/:id", _DocumentController["default"].update);
router["delete"]("/:id", _DocumentController["default"].destroy);
var _default = router;
exports["default"] = _default;