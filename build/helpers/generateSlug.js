"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _slugify = _interopRequireDefault(require("slugify"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var generateSlug = function generateSlug(name) {
  return (0, _slugify["default"])(name, {
    lower: true
  });
};
var _default = generateSlug;
exports["default"] = _default;