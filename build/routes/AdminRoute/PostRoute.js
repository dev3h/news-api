"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _cloudinaryConfig = _interopRequireDefault(require("../../config/cloudinaryConfig"));
var _PostRequest = _interopRequireDefault(require("../../http/requests/PostRequest"));
var _UploadRequest = _interopRequireDefault(require("../../http/requests/UploadRequest"));
var _PostController = _interopRequireDefault(require("../../http/controllers/AdminController/PostController"));
var _verifyToken = require("../../http/middlewares/verifyToken");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get("/", _PostController["default"].getAll);
router.get("/:id/info", _PostController["default"].getOne);
router.get("/getAllStatus", _PostController["default"].getAllStatus);
// router.get("/export-excel", PostController.exportExcel);
router.use(_verifyToken.verifyAccessToken);
router["delete"]("/:id", _PostController["default"].destroy);
router.post("/upload-photo", [_cloudinaryConfig["default"].single("photo"), _UploadRequest["default"]], _PostController["default"].uploadPhoto);
router.use(_PostRequest["default"]);
router.post("/", _cloudinaryConfig["default"].single("photo"), _PostController["default"].create);
router.put("/:id", _cloudinaryConfig["default"].single("photo"), _PostController["default"].update);
var _default = exports["default"] = router;