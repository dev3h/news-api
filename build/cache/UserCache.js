"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _nodeCache = _interopRequireDefault(require("node-cache"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var UserCache = new _nodeCache["default"]();
var _default = exports["default"] = UserCache;