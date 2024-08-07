"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _models = _interopRequireDefault(require("../../../models"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _queues = require("../../../queues");
var _sequelize = require("sequelize");
var _crypto = _interopRequireDefault(require("crypto"));
var _buffer = require("buffer");
var _generateError = require("../../../helpers/generateError");
var _jwt = require("../../../helpers/jwt");
var _hashPassword = _interopRequireDefault(require("../../../helpers/hashPassword"));
var _createPasswordChangeToken = _interopRequireDefault(require("../../../helpers/createPasswordChangeToken"));
var _generateCodeVerifyEmail = _interopRequireDefault(require("../../../helpers/generateCodeVerifyEmail"));
var _excluded = ["id", "password", "refresh_token"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // for production
var UserAuthController = /*#__PURE__*/function () {
  function UserAuthController() {
    _classCallCheck(this, UserAuthController);
  }
  _createClass(UserAuthController, null, [{
    key: "register",
    value: function () {
      var _register = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
        var _req$body, email, password, name, user, token, emailEdited, newUser, html, data;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _req$body = req.body, email = _req$body.email, password = _req$body.password, name = _req$body.name;
              _context2.next = 4;
              return _models["default"].User.findOne({
                where: {
                  email: email
                }
              });
            case 4:
              user = _context2.sent;
              if (user) (0, _generateError.badRequest)(new Error("Email đã tồn tại"), res);
              // lưu tạm thời thông tin đăng ký vào db
              // lưu 1 email kèm theo token vào db
              // nếu người dùng xác nhận email thì trả lại email cho người dùng ban đầu
              // tạo 1 token random 4 chữ số
              token = (0, _generateCodeVerifyEmail["default"])();
              emailEdited = (0, _buffer.btoa)(email) + "@" + token;
              _context2.next = 10;
              return _models["default"].User.create({
                email: emailEdited,
                password: (0, _hashPassword["default"])(password),
                name: name
              });
            case 10:
              newUser = _context2.sent;
              if (!newUser) (0, _generateError.badRequest)(new Error("Đăng ký thất bại"), res);
              html = "<h2>M\xE3 \u0111\u0103ng k\xFD: </h2> <blockquote>".concat(token, "</blockquote>");
              data = {
                email: email,
                html: html,
                subject: "Xác nhận đăng ký tài khoản"
              };
              _context2.prev = 14;
              _context2.next = 17;
              return _queues.emailQueue.add(data);
            case 17:
              _context2.next = 23;
              break;
            case 19:
              _context2.prev = 19;
              _context2.t0 = _context2["catch"](14);
              console.error("Error sending email:", _context2.t0);
              (0, _generateError.internalServerError)(_context2.t0, res);
            case 23:
              setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
                var user;
                return _regeneratorRuntime().wrap(function _callee$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return _models["default"].User.findOne({
                        where: {
                          email: emailEdited
                        }
                      });
                    case 2:
                      user = _context.sent;
                      if (!user) {
                        _context.next = 6;
                        break;
                      }
                      _context.next = 6;
                      return user.destroy({
                        // hard delete
                        force: true
                      });
                    case 6:
                    case "end":
                      return _context.stop();
                  }
                }, _callee);
              })), 1000 * 60 * 15); // 15p
              return _context2.abrupt("return", res.status(200).json({
                message: "Vui lòng kiểm tra email để hoàn tất đăng ký"
              }));
            case 27:
              _context2.prev = 27;
              _context2.t1 = _context2["catch"](0);
              (0, _generateError.internalServerError)(_context2.t1, res);
            case 30:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 27], [14, 19]]);
      }));
      function register(_x, _x2) {
        return _register.apply(this, arguments);
      }
      return register;
    }()
  }, {
    key: "verifyRegister",
    value: function () {
      var _verifyRegister = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
        var _notVerifyEmail$email, token, notVerifyEmail;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              token = req.params.token;
              _context3.next = 4;
              return _models["default"].User.findOne({
                where: {
                  email: _defineProperty({}, _sequelize.Op.like, "%".concat(token))
                }
              });
            case 4:
              notVerifyEmail = _context3.sent;
              if (!notVerifyEmail) (0, _generateError.badRequest)(new Error("Email không tồn tại"), res);
              notVerifyEmail.email = (0, _buffer.atob)(notVerifyEmail === null || notVerifyEmail === void 0 || (_notVerifyEmail$email = notVerifyEmail.email) === null || _notVerifyEmail$email === void 0 ? void 0 : _notVerifyEmail$email.split("@")[0]);
              notVerifyEmail.email_verified_at = new Date();
              _context3.next = 10;
              return notVerifyEmail.save();
            case 10:
              return _context3.abrupt("return", res.status(200).json({
                message: "Xác minh email thành công. Vui lòng đăng nhập lại"
              }));
            case 13:
              _context3.prev = 13;
              _context3.t0 = _context3["catch"](0);
              (0, _generateError.internalServerError)(_context3.t0, res);
            case 16:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 13]]);
      }));
      function verifyRegister(_x3, _x4) {
        return _verifyRegister.apply(this, arguments);
      }
      return verifyRegister;
    }()
  }, {
    key: "login",
    value: function () {
      var _login = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
        var _req$body2, _req$body3, user, id, password, refresh_token, rest, comparePassword, accessToken, newRefreshToken;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _models["default"].User.findOne({
                where: {
                  email: (_req$body2 = req.body) === null || _req$body2 === void 0 ? void 0 : _req$body2.email
                },
                raw: true
              });
            case 3:
              user = _context4.sent;
              if (!user) (0, _generateError.badRequest)(new Error("Email không tồn tại"), res);
              id = user.id, password = user.password, refresh_token = user.refresh_token, rest = _objectWithoutProperties(user, _excluded);
              _context4.next = 8;
              return _bcryptjs["default"].compare((_req$body3 = req.body) === null || _req$body3 === void 0 ? void 0 : _req$body3.password, password);
            case 8:
              comparePassword = _context4.sent;
              accessToken = comparePassword ? (0, _jwt.generateToken)({
                id: id
              }) : null;
              newRefreshToken = comparePassword ? (0, _jwt.generateRefreshToken)(id) : null;
              _context4.next = 13;
              return _models["default"].User.update({
                refresh_token: newRefreshToken
              }, {
                where: {
                  id: id
                }
              });
            case 13:
              if (newRefreshToken) res.cookie("refreshTokenUser", newRefreshToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
              });

              if (!accessToken) (0, _generateError.badRequest)(new Error("Sai mật khẩu"), res);
              return _context4.abrupt("return", res.status(200).json({
                accessToken: accessToken,
                data: _objectSpread({}, rest),
                message: "Đăng nhập thành công"
              }));
            case 18:
              _context4.prev = 18;
              _context4.t0 = _context4["catch"](0);
              (0, _generateError.internalServerError)(_context4.t0, res);
            case 21:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 18]]);
      }));
      function login(_x5, _x6) {
        return _login.apply(this, arguments);
      }
      return login;
    }()
  }, {
    key: "refreshAccessToken",
    value: function () {
      var _refreshAccessToken = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
        var cookie, verifyRefreshToken, response, newAccessToken;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              cookie = req.cookies;
              if (!cookie && !cookie.refreshTokenUser) (0, _generateError.badRequest)(new Error("Không có refreshToken trong cookie"), res);
              _context5.next = 5;
              return _jsonwebtoken["default"].verify(cookie.refreshTokenUser, process.env.JWT_SECRET);
            case 5:
              verifyRefreshToken = _context5.sent;
              _context5.next = 8;
              return _models["default"].User.findOne({
                where: {
                  id: verifyRefreshToken.id,
                  refresh_token: cookie.refreshTokenUser
                }
              });
            case 8:
              response = _context5.sent;
              if (!response) (0, _generateError.badRequest)(new Error("Refresh token không tồn tại"), res);
              newAccessToken = (0, _jwt.generateToken)({
                id: response.id
              });
              return _context5.abrupt("return", res.status(200).json({
                accessToken: newAccessToken,
                message: "Refresh token thành công"
              }));
            case 14:
              _context5.prev = 14;
              _context5.t0 = _context5["catch"](0);
              (0, _generateError.internalServerError)(_context5.t0, res);
            case 17:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 14]]);
      }));
      function refreshAccessToken(_x7, _x8) {
        return _refreshAccessToken.apply(this, arguments);
      }
      return refreshAccessToken;
    }()
  }, {
    key: "logout",
    value: function () {
      var _logout = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
        var cookie, verifyRefreshToken, id, response;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              cookie = req.cookies;
              if (!cookie && !cookie.refreshTokenUser) (0, _generateError.badRequest)(new Error("Không có refreshToken trong cookie"), res);
              _context6.next = 5;
              return _jsonwebtoken["default"].verify(cookie.refreshTokenUser, process.env.JWT_SECRET);
            case 5:
              verifyRefreshToken = _context6.sent;
              id = verifyRefreshToken.id;
              _context6.next = 9;
              return _models["default"].User.findOne({
                where: {
                  id: id,
                  refresh_token: cookie.refreshTokenUser
                },
                raw: true
              });
            case 9:
              response = _context6.sent;
              if (!response) (0, _generateError.badRequest)(new Error("Refresh token không tồn tại"), res);
              _context6.next = 13;
              return _models["default"].User.update({
                refresh_token: null
              }, {
                where: {
                  id: id
                }
              });
            case 13:
              res.clearCookie("refreshTokenUser", "", {
                httpOnly: true,
                secure: true
              });
              return _context6.abrupt("return", res.status(200).json({
                message: "Logout thành công"
              }));
            case 17:
              _context6.prev = 17;
              _context6.t0 = _context6["catch"](0);
              (0, _generateError.internalServerError)(_context6.t0, res);
            case 20:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[0, 17]]);
      }));
      function logout(_x9, _x10) {
        return _logout.apply(this, arguments);
      }
      return logout;
    }()
  }, {
    key: "forgotPassword",
    value: function () {
      var _forgotPassword = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
        var email, user, resetToken, html, data;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              email = req.query.email;
              if (!email) (0, _generateError.badRequest)(new Error("Cung cấp email"), res);
              _context7.next = 4;
              return _models["default"].User.findOne({
                where: {
                  email: email
                }
              });
            case 4:
              user = _context7.sent;
              if (!user) (0, _generateError.badRequest)(new Error("Email không tồn tại"), res);
              _context7.next = 8;
              return (0, _createPasswordChangeToken["default"])(user);
            case 8:
              resetToken = _context7.sent;
              html = "Vui l\xF2ng click v\xE0o link \u0111\u1EC3 \u0111\u1ED5i m\u1EADt kh\u1EA9u. Link n\xE0y h\u1EBFt h\u1EA1n sau 15p: <a href=".concat(process.env.URL_CLIENT, "/auth/reset-password?token=").concat(resetToken, "&email=").concat(user.email, ">B\u1EA5m v\xE0o \u0111\xE2y</a>");
              data = {
                email: email,
                html: html,
                subject: "Đổi mật khẩu"
              };
              _context7.prev = 11;
              _context7.next = 14;
              return _queues.emailQueue.add(data);
            case 14:
              _context7.next = 20;
              break;
            case 16:
              _context7.prev = 16;
              _context7.t0 = _context7["catch"](11);
              console.error("Error sending email:", _context7.t0);
              throw _context7.t0;
            case 20:
              return _context7.abrupt("return", res.status(200).json({
                message: "Vui lòng kiểm tra email để đổi mật khẩu"
              }));
            case 21:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[11, 16]]);
      }));
      function forgotPassword(_x11, _x12) {
        return _forgotPassword.apply(this, arguments);
      }
      return forgotPassword;
    }()
  }, {
    key: "resetPassword",
    value: function () {
      var _resetPassword = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
        var _req$body4, token, password, email, passwordChangeToken, user, userWithToken;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _req$body4 = req.body, token = _req$body4.token, password = _req$body4.password, email = _req$body4.email;
              if (!token || !password || !email) (0, _generateError.badRequest)(new Error("Yêu cầu cung cấp token, email và mật khẩu mới"), res);
              passwordChangeToken = _crypto["default"].createHash("sha256").update(token).digest("hex");
              _context8.next = 6;
              return _models["default"].User.findOne({
                where: {
                  email: email
                }
              });
            case 6:
              user = _context8.sent;
              if (!user) (0, _generateError.badRequest)(new Error("Email không tồn tại"), res);
              _context8.next = 10;
              return _models["default"].User.findOne({
                where: {
                  email: email,
                  password_reset_token: passwordChangeToken,
                  password_reset_token_expired_at: _defineProperty({}, _sequelize.Op.gte, Date.now())
                }
              });
            case 10:
              userWithToken = _context8.sent;
              if (!userWithToken) (0, _generateError.badRequest)(new Error("Token không hợp lệ hoặc hết hạn"), res);
              _context8.next = 14;
              return user.update({
                password: (0, _hashPassword["default"])(password),
                password_reset_token: null,
                password_reset_token_expired_at: null,
                password_changed_at: Date.now()
              });
            case 14:
              return _context8.abrupt("return", res.status(200).json({
                message: "Đổi mật khẩu thành công"
              }));
            case 17:
              _context8.prev = 17;
              _context8.t0 = _context8["catch"](0);
              (0, _generateError.internalServerError)(_context8.t0, res);
            case 20:
            case "end":
              return _context8.stop();
          }
        }, _callee8, null, [[0, 17]]);
      }));
      function resetPassword(_x13, _x14) {
        return _resetPassword.apply(this, arguments);
      }
      return resetPassword;
    }()
  }, {
    key: "getCurrent",
    value: function () {
      var _getCurrent = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
        var id, user;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              id = req.user.id;
              _context9.next = 4;
              return _models["default"].User.findOne({
                where: {
                  id: id
                },
                raw: true
              });
            case 4:
              user = _context9.sent;
              if (!user) (0, _generateError.badRequest)(new Error("Không tìm thấy user"), res);
              return _context9.abrupt("return", res.status(200).json({
                data: user
              }));
            case 9:
              _context9.prev = 9;
              _context9.t0 = _context9["catch"](0);
              (0, _generateError.internalServerError)(_context9.t0, res);
            case 12:
            case "end":
              return _context9.stop();
          }
        }, _callee9, null, [[0, 9]]);
      }));
      function getCurrent(_x15, _x16) {
        return _getCurrent.apply(this, arguments);
      }
      return getCurrent;
    }()
  }, {
    key: "updatePassword",
    value: function () {
      var _updatePassword = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
        var id, _req$body5, password, new_password, user, comparePassword;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              id = req.user.id;
              _req$body5 = req.body, password = _req$body5.password, new_password = _req$body5.new_password;
              _context10.next = 5;
              return _models["default"].User.findOne({
                where: {
                  id: id
                },
                raw: true
              });
            case 5:
              user = _context10.sent;
              if (!user) (0, _generateError.badRequest)(new Error("Không tìm thấy user"), res);
              _context10.next = 9;
              return _bcryptjs["default"].compare(password, user.password);
            case 9:
              comparePassword = _context10.sent;
              if (!comparePassword) (0, _generateError.badRequest)(new Error("Mật khẩu hiện tại không đúng"), res);
              _context10.next = 13;
              return _models["default"].User.update({
                password: (0, _hashPassword["default"])(new_password),
                password_changed_at: Date.now()
              }, {
                where: {
                  id: id
                }
              });
            case 13:
              return _context10.abrupt("return", res.status(200).json({
                message: "Đổi mật khẩu thành công"
              }));
            case 16:
              _context10.prev = 16;
              _context10.t0 = _context10["catch"](0);
              (0, _generateError.internalServerError)(_context10.t0, res);
            case 19:
            case "end":
              return _context10.stop();
          }
        }, _callee10, null, [[0, 16]]);
      }));
      function updatePassword(_x17, _x18) {
        return _updatePassword.apply(this, arguments);
      }
      return updatePassword;
    }()
  }]);
  return UserAuthController;
}();
var _default = exports["default"] = UserAuthController;