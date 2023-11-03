"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "src/public/upload-data");
  },
  filename: function filename(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + _path["default"].extname(file.originalname));
  }
});
var uploadFile = (0, _multer["default"])({
  storage: storage
});
var _default = uploadFile;
exports["default"] = _default;