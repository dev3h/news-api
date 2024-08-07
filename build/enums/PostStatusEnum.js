"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var PostStatusEnum = /*#__PURE__*/function () {
  function PostStatusEnum() {
    _classCallCheck(this, PostStatusEnum);
  }
  _createClass(PostStatusEnum, null, [{
    key: "getLabel",
    value: function getLabel(status) {
      switch (status) {
        case 0:
          return "Private";
        case 1:
          return "Public";
        case 2:
          return "Schedule";
        default:
          return "Unknown";
      }
    }
  }, {
    key: "getAll",
    value: function getAll() {
      return [{
        id: PostStatusEnum.PRIVATE,
        name: "Private"
      }, {
        id: PostStatusEnum.PUBLIC,
        name: "Public"
      }, {
        id: PostStatusEnum.SCHEDULE,
        name: "Schedule"
      }];
    }
  }]);
  return PostStatusEnum;
}();
_defineProperty(PostStatusEnum, "PRIVATE", 0);
_defineProperty(PostStatusEnum, "PUBLIC", 1);
_defineProperty(PostStatusEnum, "SCHEDULE", 2);
var _default = exports["default"] = PostStatusEnum;