"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = _interopRequireDefault(require("joi"));
var _models = _interopRequireDefault(require("../../models"));
var _PostStatusEnum = _interopRequireDefault(require("../../enums/PostStatusEnum"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var cloudinary = require("cloudinary").v2;
var PostRequest = function PostRequest(req, res, next) {
  var _req$body, _fileData$response;
  var fileData = req === null || req === void 0 || (_req$body = req.body) === null || _req$body === void 0 || (_req$body = _req$body.photo) === null || _req$body === void 0 ? void 0 : _req$body.file;
  var rules = {
    title: _joi["default"].string().required().messages({
      "string.base": "Tên bài viết phải là chuỗi",
      "string.empty": "Tên bài viết không được để trống",
      "any.required": "Tên bài viết là bắt buộc"
    }),
    content: _joi["default"].string().required().messages({
      "string.base": "Nội dung bài viết phải là chuỗi",
      "string.empty": "Nội dung bài viết không được để trống",
      "any.required": "Nội dung bài viết là bắt buộc"
    }),
    status: _joi["default"].required().custom(function (value, helper) {
      if (!Object.values(_PostStatusEnum["default"]).includes(+value)) return helper.message("Trạng thái không hợp lệ");
      return true;
    }).messages({
      "any.required": "Trạng thái là bắt buộc"
    }),
    category_id: _joi["default"].required().custom(function (value, helper) {
      if (!_models["default"].Category.findByPk(+value)) return helper.message("ID danh mục không tồn tại");
      return true;
    }).messages({
      "number.empty": "ID danh mục không được để trống",
      "any.required": "ID danh mục là bắt buộc"
    })
  };
  if (fileData) {
    rules.photo = _joi["default"].string().pattern(/\.jpg$|\.png$|\.jpeg$/).messages({
      "string.pattern.base": "Ảnh phải có định dạng jpg, png, jpeg"
    });
  }
  if (req.body.published_at) {
    // nếu có phải check xem ngày có lớn hơn ngày hiện tại không, thời gian cũng thế
    rules.published_at = _joi["default"].date().greater("now").messages({
      "date.greater": "Ngày đăng bài phải lớn hơn ngày hiện tại"
    });
  }
  if (req.body.tags) {
    rules.tags = _joi["default"].custom(function (tags, helper) {
      if (tags.length > 0) {
        var checkTags = tags.map(function (tag) {
          return _models["default"].Tag.findByPk(+tag);
        });
        if (checkTags.includes(null)) return helper.message("ID thẻ không tồn tại");
      }
      return true;
    });
  }
  var dataToValidate = _objectSpread({}, req.body);
  if (fileData !== null && fileData !== void 0 && (_fileData$response = fileData.response) !== null && _fileData$response !== void 0 && (_fileData$response = _fileData$response.data) !== null && _fileData$response !== void 0 && _fileData$response.path) {
    dataToValidate.photo = fileData.response.data.path;
  }
  var _joi$object$validate = _joi["default"].object(rules).validate(dataToValidate),
    error = _joi$object$validate.error;
  if (error && error.details[0].path[0] === "name" && error.details[0].type === "any.required" && req.method === "PUT") {
    // Nếu là phương thức PUT và không có sửa đổi tên, bỏ qua lỗi required
    next();
  } else if (error) {
    if (fileData) cloudinary.uploader.destroy(fileData.filename);
    return res.status(422).json({
      message: error.message
    });
  }
  next();
};
var _default = PostRequest;
exports["default"] = _default;