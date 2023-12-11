"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _models = _interopRequireDefault(require("../../../models"));
var _generateSlug = _interopRequireDefault(require("../../../helpers/generateSlug"));
var _generateCreatedByAndUpdatedBy = require("../../../helpers/generateCreatedByAndUpdatedBy");
var _generateError = require("../../../helpers/generateError");
var _PostFilter = _interopRequireDefault(require("../../../modelFilters/PostFilter"));
var _PostStatusEnum = _interopRequireDefault(require("../../../enums/PostStatusEnum"));
var _RoleSysEnum = _interopRequireDefault(require("../../../enums/RoleSysEnum"));
var _PostObservers = _interopRequireDefault(require("../../../observers/PostObservers"));
var _PostSchedule = _interopRequireDefault(require("../../../schedule/PostSchedule"));
var _excluded = ["title", "photo", "tags"],
  _excluded2 = ["title", "photo", "tags"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // import { badRequest, internalServerError } from "../middlewares/handle_error";
var cloudinary = require("cloudinary").v2;
var PostController = /*#__PURE__*/function () {
  function PostController() {
    _classCallCheck(this, PostController);
  }
  _createClass(PostController, null, [{
    key: "getAll",
    value: function () {
      var _getAll = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
        var user, _req$query, _req$query$search, search, _req$query$sortBy, sortBy, _req$query$sortType, sortType, _req$query$page, page, flimit, filter, response;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              user = req.user;
              _req$query = req.query, _req$query$search = _req$query.search, search = _req$query$search === void 0 ? "" : _req$query$search, _req$query$sortBy = _req$query.sortBy, sortBy = _req$query$sortBy === void 0 ? "id" : _req$query$sortBy, _req$query$sortType = _req$query.sortType, sortType = _req$query$sortType === void 0 ? "ASC" : _req$query$sortType, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? 1 : _req$query$page, flimit = _req$query.flimit;
              filter = {
                search: search,
                sortBy: sortBy,
                sortType: sortType,
                page: page,
                flimit: flimit,
                user: user
              };
              _context.next = 6;
              return _PostFilter["default"].handleList(filter);
            case 6:
              response = _context.sent;
              return _context.abrupt("return", res.status(200).json(response));
            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](0);
              (0, _generateError.internalServerError)(_context.t0, res);
            case 13:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 10]]);
      }));
      function getAll(_x, _x2) {
        return _getAll.apply(this, arguments);
      }
      return getAll;
    }()
  }, {
    key: "create",
    value: function () {
      var _create = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
        var _photo$file, _photo$file2, id, _generateCreatedByAnd, created_by, updated_by, _req$body, title, photo, tags, rest, response, _photo$file3, _photo;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              id = req.user.id;
              _generateCreatedByAnd = (0, _generateCreatedByAndUpdatedBy.generateCreatedByAndUpdatedBy)(id), created_by = _generateCreatedByAnd.created_by, updated_by = _generateCreatedByAnd.updated_by;
              _req$body = req.body, title = _req$body.title, photo = _req$body.photo, tags = _req$body.tags, rest = _objectWithoutProperties(_req$body, _excluded);
              _context2.next = 6;
              return _models["default"].Post.findOrCreate({
                where: {
                  title: title
                },
                defaults: _objectSpread(_objectSpread({}, rest), {}, {
                  slug: (0, _generateSlug["default"])(title),
                  photo: photo === null || photo === void 0 || (_photo$file = photo.file) === null || _photo$file === void 0 || (_photo$file = _photo$file.response) === null || _photo$file === void 0 || (_photo$file = _photo$file.data) === null || _photo$file === void 0 ? void 0 : _photo$file.path,
                  filename: photo === null || photo === void 0 || (_photo$file2 = photo.file) === null || _photo$file2 === void 0 || (_photo$file2 = _photo$file2.response) === null || _photo$file2 === void 0 || (_photo$file2 = _photo$file2.data) === null || _photo$file2 === void 0 ? void 0 : _photo$file2.filename,
                  created_by: created_by,
                  updated_by: updated_by
                })
              });
            case 6:
              response = _context2.sent;
              if (!(response[1] === false)) {
                _context2.next = 11;
                break;
              }
              return _context2.abrupt("return", res.status(400).json({
                message: "Tên bài viết đã tồn tại"
              }));
            case 11:
              if (response[0].status === _PostStatusEnum["default"].SCHEDULE) {
                _PostSchedule["default"].schedulePost(response[0].id);
              }
              _PostObservers["default"].saved(response[0].id, tags);
              return _context2.abrupt("return", res.status(200).json({
                message: "Tạo bài viết thành công"
              }));
            case 14:
              _context2.next = 21;
              break;
            case 16:
              _context2.prev = 16;
              _context2.t0 = _context2["catch"](0);
              _photo = req.body.photo;
              if (_photo) cloudinary.uploader.destroy(_photo === null || _photo === void 0 || (_photo$file3 = _photo.file) === null || _photo$file3 === void 0 || (_photo$file3 = _photo$file3.response) === null || _photo$file3 === void 0 || (_photo$file3 = _photo$file3.data) === null || _photo$file3 === void 0 ? void 0 : _photo$file3.filename);
              (0, _generateError.internalServerError)(_context2.t0, res);
            case 21:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 16]]);
      }));
      function create(_x3, _x4) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
  }, {
    key: "uploadPhoto",
    value: function uploadPhoto(req, res) {
      try {
        var file = req.file;
        if (!file) return res.status(400).json({
          message: "Không có file nào được gửi lên"
        });
        // Lấy filename của file cũ từ request (nếu có)
        var oldFilename = req.body.oldPhoto;

        // Nếu có file cũ, xóa nó trên Cloudinary
        if (oldFilename) {
          cloudinary.uploader.destroy(oldFilename, function (error, result) {
            if (error) {
              console.error("Lỗi khi xóa file cũ trên Cloudinary: " + error);
            }
          });
        }
        return res.status(200).json({
          data: {
            path: file.path,
            filename: file.filename
          }
        });
      } catch (error) {
        if (req.file) cloudinary.uploader.destroy(req.file.filename);
        (0, _generateError.internalServerError)(error, res);
      }
    }
  }, {
    key: "deletePhoto",
    value: function () {
      var _deletePhoto = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
        var filename;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              filename = req.body.filename;
              if (filename) {
                _context3.next = 4;
                break;
              }
              return _context3.abrupt("return", res.status(400).json({
                message: "Không có file nào được gửi lên"
              }));
            case 4:
              cloudinary.uploader.destroy(filename, function (error, result) {
                if (error) {
                  console.error("Lỗi khi xóa file cũ trên Cloudinary: " + error);
                }
              });
              return _context3.abrupt("return", res.status(200).json({
                message: "Xóa ảnh thành công"
              }));
            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](0);
              (0, _generateError.internalServerError)(_context3.t0, res);
            case 11:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 8]]);
      }));
      function deletePhoto(_x5, _x6) {
        return _deletePhoto.apply(this, arguments);
      }
      return deletePhoto;
    }()
  }, {
    key: "getOne",
    value: function () {
      var _getOne = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
        var response, tagIds;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _models["default"].Post.findByPk(req.params.id, {
                include: [{
                  model: _models["default"].Admin,
                  as: "created_by_admin",
                  attributes: ["id", "username", "email"]
                }, {
                  model: _models["default"].Admin,
                  as: "updated_by_admin",
                  attributes: ["id", "username", "email"]
                }, {
                  model: _models["default"].Category,
                  as: "category",
                  attributes: ["id", "name"]
                }, {
                  model: _models["default"].Tag,
                  as: "tags",
                  through: {
                    model: _models["default"].PostTag
                  },
                  attributes: ["id", "name"]
                }]
              });
            case 3:
              response = _context4.sent;
              if (response) {
                _context4.next = 6;
                break;
              }
              return _context4.abrupt("return", res.status(404).json({
                message: "Không tìm thấy bài viết"
              }));
            case 6:
              tagIds = response.tags.map(function (tag) {
                return tag.id.toString();
              });
              return _context4.abrupt("return", res.status(200).json(_objectSpread(_objectSpread({}, response.toJSON()), {}, {
                tags: tagIds,
                tags_info: response.tags
              })));
            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4["catch"](0);
              (0, _generateError.internalServerError)(_context4.t0, res);
            case 13:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 10]]);
      }));
      function getOne(_x7, _x8) {
        return _getOne.apply(this, arguments);
      }
      return getOne;
    }()
  }, {
    key: "getAllStatus",
    value: function () {
      var _getAllStatus = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(_, res) {
        var response;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              response = _PostStatusEnum["default"].getAll();
              return _context5.abrupt("return", res.status(200).json(response));
            case 5:
              _context5.prev = 5;
              _context5.t0 = _context5["catch"](0);
              (0, _generateError.internalServerError)(_context5.t0, res);
            case 8:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 5]]);
      }));
      function getAllStatus(_x9, _x10) {
        return _getAllStatus.apply(this, arguments);
      }
      return getAllStatus;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
        var _photo$file4, _photo$file5, user, _generateUpdatedBy, updated_by, _req$body2, title, photo, tags, rest, oldImage, post, postByTitle, response, _photo$file6, _photo2$file, _photo2;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              // change this
              user = req.user;
              _generateUpdatedBy = (0, _generateCreatedByAndUpdatedBy.generateUpdatedBy)(user === null || user === void 0 ? void 0 : user.id), updated_by = _generateUpdatedBy.updated_by;
              _req$body2 = req.body, title = _req$body2.title, photo = _req$body2.photo, tags = _req$body2.tags, rest = _objectWithoutProperties(_req$body2, _excluded2);
              _context6.next = 6;
              return _models["default"].Post.findOne({
                where: {
                  id: req.params.id
                },
                attributes: ["filename"]
              });
            case 6:
              oldImage = _context6.sent;
              _context6.next = 9;
              return _models["default"].Post.findByPk(req.params.id);
            case 9:
              post = _context6.sent;
              _context6.next = 12;
              return _models["default"].Post.findOne({
                where: {
                  title: title
                },
                attributes: ["id"]
              });
            case 12:
              postByTitle = _context6.sent;
              if (!(postByTitle && postByTitle.id !== post.id)) {
                _context6.next = 15;
                break;
              }
              return _context6.abrupt("return", res.status(400).json({
                message: "Tên bài viết đã tồn tại"
              }));
            case 15:
              if (!post) {
                _context6.next = 18;
                break;
              }
              if (!(user.role !== _RoleSysEnum["default"].ADMIN && post.created_by !== user.id)) {
                _context6.next = 18;
                break;
              }
              return _context6.abrupt("return", (0, _generateError.forbidden)(new Error("Bạn không có quyền cập nhật bài viết này"), res));
            case 18:
              _context6.next = 20;
              return _models["default"].Post.update(_objectSpread(_objectSpread({}, rest), {}, {
                title: title,
                slug: (0, _generateSlug["default"])(title),
                photo: photo === null || photo === void 0 || (_photo$file4 = photo.file) === null || _photo$file4 === void 0 || (_photo$file4 = _photo$file4.response) === null || _photo$file4 === void 0 || (_photo$file4 = _photo$file4.data) === null || _photo$file4 === void 0 ? void 0 : _photo$file4.path,
                filename: photo === null || photo === void 0 || (_photo$file5 = photo.file) === null || _photo$file5 === void 0 || (_photo$file5 = _photo$file5.response) === null || _photo$file5 === void 0 || (_photo$file5 = _photo$file5.data) === null || _photo$file5 === void 0 ? void 0 : _photo$file5.filename,
                updated_by: updated_by
              }), {
                where: {
                  id: req.params.id
                }
              });
            case 20:
              response = _context6.sent;
              if (!(response[0] === 0)) {
                _context6.next = 25;
                break;
              }
              if (photo) cloudinary.uploader.destroy(photo === null || photo === void 0 || (_photo$file6 = photo.file) === null || _photo$file6 === void 0 || (_photo$file6 = _photo$file6.response) === null || _photo$file6 === void 0 || (_photo$file6 = _photo$file6.data) === null || _photo$file6 === void 0 ? void 0 : _photo$file6.filename);
              if (req.body.status === _PostStatusEnum["default"].SCHEDULE) {
                _PostSchedule["default"].schedulePost(req.params.id);
              }
              return _context6.abrupt("return", res.status(404).json({
                message: "Không tìm thấy bài viết"
              }));
            case 25:
              if (response[0] > 0 && photo && oldImage) cloudinary.uploader.destroy(oldImage.filename);
              _PostObservers["default"].saved(post.id, tags);
              return _context6.abrupt("return", res.status(200).json({
                message: "Cập nhật bài viết thành công"
              }));
            case 30:
              _context6.prev = 30;
              _context6.t0 = _context6["catch"](0);
              _photo2 = req.body.photo;
              if (_photo2) cloudinary.uploader.destroy(_photo2 === null || _photo2 === void 0 || (_photo2$file = _photo2.file) === null || _photo2$file === void 0 || (_photo2$file = _photo2$file.response) === null || _photo2$file === void 0 || (_photo2$file = _photo2$file.data) === null || _photo2$file === void 0 ? void 0 : _photo2$file.filename);
              (0, _generateError.internalServerError)(_context6.t0, res);
            case 35:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[0, 30]]);
      }));
      function update(_x11, _x12) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
  }, {
    key: "destroy",
    value: function () {
      var _destroy = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
        var user, post, response;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              user = req.user;
              _context7.next = 4;
              return _models["default"].Post.findByPk(req.params.id);
            case 4:
              post = _context7.sent;
              if (!post) {
                _context7.next = 8;
                break;
              }
              if (!(user.role !== _RoleSysEnum["default"].ADMIN && post.created_by !== user.id)) {
                _context7.next = 8;
                break;
              }
              return _context7.abrupt("return", (0, _generateError.forbidden)(new Error("Bạn không có quyền xóa bài viết này"), res));
            case 8:
              _context7.next = 10;
              return _models["default"].Post.destroy({
                where: {
                  id: req.params.id
                }
              });
            case 10:
              response = _context7.sent;
              if (!(response === 0)) {
                _context7.next = 13;
                break;
              }
              return _context7.abrupt("return", res.status(404).json({
                message: "Không tìm thấy bài viết"
              }));
            case 13:
              return _context7.abrupt("return", res.status(200).json({
                message: "Xóa bài viết thành công"
              }));
            case 16:
              _context7.prev = 16;
              _context7.t0 = _context7["catch"](0);
              (0, _generateError.internalServerError)(_context7.t0, res);
            case 19:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[0, 16]]);
      }));
      function destroy(_x13, _x14) {
        return _destroy.apply(this, arguments);
      }
      return destroy;
    }()
  }]);
  return PostController;
}();
var _default = exports["default"] = PostController;