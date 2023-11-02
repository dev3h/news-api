"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _models = _interopRequireDefault(require("../../models"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var generateOrderBasic = function generateOrderBasic(sortBy, sortType) {
  var custom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var order = [];
  if (sortBy && sortType) {
    if (sortBy === "created_by_admin.username") {
      order.push([{
        model: _models["default"].Admin,
        as: "created_by_admin"
      }, "username", sortType]);
    } else if (sortBy === "updated_by_admin.username") {
      order.push([{
        model: _models["default"].Admin,
        as: "updated_by_admin"
      }, "username", sortType]);
    } else if (custom !== null) {
      order.push(custom);
    } else {
      order.push([sortBy, sortType]);
    }
  }
  return order;
};
var _default = generateOrderBasic;
exports["default"] = _default;