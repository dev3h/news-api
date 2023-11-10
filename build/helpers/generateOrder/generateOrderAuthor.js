"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _models = _interopRequireDefault(require("../../models"));
var _generateOrderBasic = _interopRequireDefault(require("./generateOrderBasic"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var generateOrderAuthor = function generateOrderAuthor(sortBy, sortType) {
  if (sortBy === "roleInfo.name") {
    var order = (0, _generateOrderBasic["default"])("role", sortType);
    return order;
  } else {
    var _order = (0, _generateOrderBasic["default"])(sortBy, sortType);
    return _order;
  }
};
var _default = exports["default"] = generateOrderAuthor;