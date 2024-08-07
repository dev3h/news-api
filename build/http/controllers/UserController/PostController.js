"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _models = _interopRequireDefault(require("../../../models"));
var _PostFilter = _interopRequireDefault(require("../../../modelFilters/PostFilter"));
var _generateError = require("../../../helpers/generateError");
var _UserCache = _interopRequireDefault(require("../../../cache/UserCache"));
var _PostStatusEnum = _interopRequireDefault(require("../../../enums/PostStatusEnum"));
var _GroupPostFilter = _interopRequireDefault(require("../../../modelFilters/GroupPostFilter"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var PostController = /*#__PURE__*/function () {
  function PostController() {
    _classCallCheck(this, PostController);
  }
  _createClass(PostController, null, [{
    key: "getAll",
    value: function () {
      var _getAll = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
        var _req$query, _req$query$search, search, _req$query$sortBy, sortBy, _req$query$sortType, sortType, _req$query$page, page, flimit, filter, response;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$query = req.query, _req$query$search = _req$query.search, search = _req$query$search === void 0 ? "" : _req$query$search, _req$query$sortBy = _req$query.sortBy, sortBy = _req$query$sortBy === void 0 ? "id" : _req$query$sortBy, _req$query$sortType = _req$query.sortType, sortType = _req$query$sortType === void 0 ? "ASC" : _req$query$sortType, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? 1 : _req$query$page, flimit = _req$query.flimit;
              filter = {
                search: search,
                sortBy: sortBy,
                sortType: sortType,
                page: page,
                flimit: flimit,
                isPublic: true
              };
              _context.next = 5;
              return _PostFilter["default"].handleList(filter);
            case 5:
              response = _context.sent;
              return _context.abrupt("return", res.status(200).json(response));
            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              (0, _generateError.internalServerError)(_context.t0, res);
            case 12:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 9]]);
      }));
      function getAll(_x, _x2) {
        return _getAll.apply(this, arguments);
      }
      return getAll;
    }()
  }, {
    key: "getAllPostByGroupAndCategory",
    value: function () {
      var _getAllPostByGroupAndCategory = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
        var _req$query2, _req$query2$sortBy, sortBy, _req$query2$sortType, sortType, _req$query2$page, page, flimit, _req$params, groupSlug, categorySlug, filter, response;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _req$query2 = req.query, _req$query2$sortBy = _req$query2.sortBy, sortBy = _req$query2$sortBy === void 0 ? "id" : _req$query2$sortBy, _req$query2$sortType = _req$query2.sortType, sortType = _req$query2$sortType === void 0 ? "ASC" : _req$query2$sortType, _req$query2$page = _req$query2.page, page = _req$query2$page === void 0 ? 1 : _req$query2$page, flimit = _req$query2.flimit;
              _req$params = req.params, groupSlug = _req$params.groupSlug, categorySlug = _req$params.categorySlug;
              filter = {
                sortBy: sortBy,
                sortType: sortType,
                page: page,
                flimit: flimit,
                groupSlug: groupSlug,
                categorySlug: categorySlug
              };
              _context2.next = 6;
              return _GroupPostFilter["default"].handleList(filter);
            case 6:
              response = _context2.sent;
              return _context2.abrupt("return", res.status(200).json(response));
            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](0);
              (0, _generateError.internalServerError)(_context2.t0, res);
            case 13:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 10]]);
      }));
      function getAllPostByGroupAndCategory(_x3, _x4) {
        return _getAllPostByGroupAndCategory.apply(this, arguments);
      }
      return getAllPostByGroupAndCategory;
    }()
  }, {
    key: "getGroupCategory",
    value: function () {
      var _getGroupCategory = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
        var response;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _models["default"].GroupCategory.findAll({
                attributes: ["id", "name", "slug"]
              });
            case 3:
              response = _context3.sent;
              return _context3.abrupt("return", res.status(200).json(response));
            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              (0, _generateError.internalServerError)(_context3.t0, res);
            case 10:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 7]]);
      }));
      function getGroupCategory(_x5, _x6) {
        return _getGroupCategory.apply(this, arguments);
      }
      return getGroupCategory;
    }()
  }, {
    key: "getCategoriesByGroup",
    value: function () {
      var _getCategoriesByGroup = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
        var _req$params2, response;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _models["default"].GroupCategory.findOne({
                where: {
                  slug: (_req$params2 = req.params) === null || _req$params2 === void 0 ? void 0 : _req$params2.slug
                },
                attributes: ["id", "name", "slug"],
                include: [{
                  model: _models["default"].Category,
                  as: "categories",
                  attributes: ["id", "name", "slug"]
                }]
              });
            case 3:
              response = _context4.sent;
              if (response) {
                _context4.next = 6;
                break;
              }
              return _context4.abrupt("return", res.status(404).json({
                message: "Không tìm thấy nhóm danh mục"
              }));
            case 6:
              return _context4.abrupt("return", res.status(200).json(response));
            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](0);
              (0, _generateError.internalServerError)(_context4.t0, res);
            case 12:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 9]]);
      }));
      function getCategoriesByGroup(_x7, _x8) {
        return _getCategoriesByGroup.apply(this, arguments);
      }
      return getCategoriesByGroup;
    }()
  }, {
    key: "getPostOfGroup",
    value: function () {
      var _getPostOfGroup = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
        var response, postsOfGroupCategory, filteredResult;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _models["default"].GroupCategory.findAll({
                attributes: ["id", "name", "slug"],
                include: [{
                  model: _models["default"].Category,
                  as: "categories",
                  attributes: ["id", "name", "slug"],
                  include: [{
                    model: _models["default"].Post,
                    as: "posts",
                    attributes: ["id", "title", "slug", "photo", "view", "created_at"],
                    limit: 5,
                    order: [["view", "DESC"]],
                    include: [{
                      model: _models["default"].User,
                      as: "users_like",
                      through: {
                        model: _models["default"].PostUserLike
                      },
                      attributes: ["email"]
                    }, {
                      model: _models["default"].PostComment,
                      as: "comments",
                      attributes: ["id", "user_id"],
                      order: [["created_at", "DESC"]]
                    }],
                    where: {
                      status: _PostStatusEnum["default"].PUBLIC
                    }
                  }]
                }]
              });
            case 3:
              response = _context5.sent;
              postsOfGroupCategory = response.map(function (groupCategory) {
                var categories = groupCategory.categories;
                var filteredCategories = categories.filter(function (category) {
                  return category.posts.length > 0;
                });
                if (filteredCategories.length === 0) return null;
                var posts = filteredCategories.map(function (category) {
                  var posts = category.posts;
                  var newPosts = posts.map(function (post) {
                    var users_like = post.users_like,
                      comments = post.comments;
                    return _objectSpread(_objectSpread({}, post.toJSON()), {}, {
                      users_like: users_like.length,
                      comments: comments.length
                    });
                  });
                  return _objectSpread(_objectSpread({}, category.toJSON()), {}, {
                    posts: newPosts
                  });
                });
                return _objectSpread(_objectSpread({}, groupCategory.toJSON()), {}, {
                  categories: posts
                });
              });
              filteredResult = postsOfGroupCategory.filter(function (groupCategory) {
                return groupCategory !== null;
              });
              return _context5.abrupt("return", res.status(200).json(filteredResult));
            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](0);
              (0, _generateError.internalServerError)(_context5.t0, res);
            case 12:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 9]]);
      }));
      function getPostOfGroup(_x9, _x10) {
        return _getPostOfGroup.apply(this, arguments);
      }
      return getPostOfGroup;
    }()
  }, {
    key: "getOne",
    value: function () {
      var _getOne = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
        var response;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return _models["default"].Post.findOne({
                where: {
                  slug: req.params.slug,
                  status: _PostStatusEnum["default"].PUBLIC
                },
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
                  attributes: ["id"]
                }, {
                  model: _models["default"].User,
                  as: "users_like",
                  through: {
                    model: _models["default"].PostUserLike
                  },
                  attributes: ["email"]
                }, {
                  model: _models["default"].PostComment,
                  as: "comments",
                  include: [{
                    model: _models["default"].User,
                    as: "user",
                    attributes: ["id", "email"]
                  }],
                  attributes: {
                    exclude: ["post_id", "user_id"]
                  },
                  order: [["created_at", "DESC"]]
                }]
              });
            case 3:
              response = _context6.sent;
              if (response) {
                _context6.next = 6;
                break;
              }
              return _context6.abrupt("return", res.status(404).json({
                message: "Không tìm thấy bài viết"
              }));
            case 6:
              return _context6.abrupt("return", res.status(200).json(response));
            case 9:
              _context6.prev = 9;
              _context6.t0 = _context6["catch"](0);
              (0, _generateError.internalServerError)(_context6.t0, res);
            case 12:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[0, 9]]);
      }));
      function getOne(_x11, _x12) {
        return _getOne.apply(this, arguments);
      }
      return getOne;
    }()
  }, {
    key: "toggleLike",
    value: function () {
      var _toggleLike = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
        var user_id, post, postUserLike;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              user_id = req.user.id;
              _context7.next = 4;
              return _models["default"].Post.findOne({
                where: {
                  slug: req.params.slug,
                  status: _PostStatusEnum["default"].PUBLIC
                }
              });
            case 4:
              post = _context7.sent;
              if (post) {
                _context7.next = 7;
                break;
              }
              return _context7.abrupt("return", res.status(404).json({
                message: "Không tìm thấy bài viết"
              }));
            case 7:
              _context7.next = 9;
              return _models["default"].PostUserLike.findOne({
                where: {
                  post_id: post.id,
                  user_id: user_id
                }
              });
            case 9:
              postUserLike = _context7.sent;
              if (!postUserLike) {
                _context7.next = 14;
                break;
              }
              _context7.next = 13;
              return postUserLike.destroy();
            case 13:
              return _context7.abrupt("return", res.status(200).json({
                message: "Bỏ thích thành công"
              }));
            case 14:
              _context7.next = 16;
              return _models["default"].PostUserLike.create({
                post_id: post.id,
                user_id: user_id
              });
            case 16:
              return _context7.abrupt("return", res.status(200).json({
                message: "Thích thành công"
              }));
            case 19:
              _context7.prev = 19;
              _context7.t0 = _context7["catch"](0);
              (0, _generateError.internalServerError)(_context7.t0, res);
            case 22:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[0, 19]]);
      }));
      function toggleLike(_x13, _x14) {
        return _toggleLike.apply(this, arguments);
      }
      return toggleLike;
    }()
  }, {
    key: "createComment",
    value: function () {
      var _createComment = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
        var _req$body, user_id, post, response;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              user_id = req.user.id;
              _context8.next = 4;
              return _models["default"].Post.findOne({
                where: {
                  slug: req.params.slug,
                  status: _PostStatusEnum["default"].PUBLIC
                }
              });
            case 4:
              post = _context8.sent;
              if (post) {
                _context8.next = 7;
                break;
              }
              return _context8.abrupt("return", res.status(404).json({
                message: "Không tìm thấy bài viết"
              }));
            case 7:
              _context8.next = 9;
              return _models["default"].PostComment.create({
                content: (_req$body = req.body) === null || _req$body === void 0 ? void 0 : _req$body.content,
                post_id: post.id,
                user_id: user_id
              });
            case 9:
              response = _context8.sent;
              return _context8.abrupt("return", res.status(200).json(response));
            case 13:
              _context8.prev = 13;
              _context8.t0 = _context8["catch"](0);
              (0, _generateError.internalServerError)(_context8.t0, res);
            case 16:
            case "end":
              return _context8.stop();
          }
        }, _callee8, null, [[0, 13]]);
      }));
      function createComment(_x15, _x16) {
        return _createComment.apply(this, arguments);
      }
      return createComment;
    }()
  }, {
    key: "increaseViewOfPost",
    value: function () {
      var _increaseViewOfPost = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
        var ip, post, key, lastView, a;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              ip = req.body.ip;
              _context9.next = 4;
              return _models["default"].Post.findOne({
                where: {
                  slug: req.params.slug,
                  status: _PostStatusEnum["default"].PUBLIC
                }
              });
            case 4:
              post = _context9.sent;
              if (post) {
                _context9.next = 7;
                break;
              }
              return _context9.abrupt("return", res.status(404).json({
                message: "Không tìm thấy bài viết"
              }));
            case 7:
              key = "views:".concat(post.id, ":").concat(ip);
              lastView = _UserCache["default"].get(key);
              if (!(lastView !== ip)) {
                _context9.next = 13;
                break;
              }
              a = _UserCache["default"].set(key, ip, 86400); // 1 day
              _context9.next = 13;
              return _models["default"].Post.update({
                view: post.view + 1
              }, {
                where: {
                  id: post.id
                }
              });
            case 13:
              return _context9.abrupt("return", res.status(200).json({
                message: "Tăng lượt xem thành công"
              }));
            case 16:
              _context9.prev = 16;
              _context9.t0 = _context9["catch"](0);
              (0, _generateError.internalServerError)(_context9.t0, res);
            case 19:
            case "end":
              return _context9.stop();
          }
        }, _callee9, null, [[0, 16]]);
      }));
      function increaseViewOfPost(_x17, _x18) {
        return _increaseViewOfPost.apply(this, arguments);
      }
      return increaseViewOfPost;
    }()
  }]);
  return PostController;
}();
var _default = exports["default"] = PostController;