"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _models = _interopRequireDefault(require("../../models"));
var _generateOrderBasic = _interopRequireDefault(require("./generateOrderBasic"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var generateOrderCategory = function generateOrderCategory(sortBy, sortType) {
  if (sortBy === "group_category.name") {
    var order = (0, _generateOrderBasic["default"])(sortBy, sortType, [{
      model: _models["default"].GroupCategory,
      as: "group_category"
    }, "name", sortType]);
    return order;
  } else {
    var _order = (0, _generateOrderBasic["default"])(sortBy, sortType);
    return _order;
  }
};
var _default = generateOrderCategory;
exports["default"] = _default;