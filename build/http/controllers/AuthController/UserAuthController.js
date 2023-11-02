"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _models = _interopRequireDefault(require("../../../models"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _uuid = require("uuid");
var _queues = require("../../../queues");
var _sequelize = require("sequelize");
var _crypto = _interopRequireDefault(require("crypto"));
var _generateError = require("../../../helpers/generateError");
var _jwt = require("../../../helpers/jwt");
var _hashPassword = _interopRequireDefault(require("../../../helpers/hashPassword"));
var _createPasswordChangeToken = _interopRequireDefault(require("../../../helpers/createPasswordChangeToken"));
var _excluded = ["id", "password", "refresh_token"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var UserAuthController = /*#__PURE__*/function () {
  function UserAuthController() {
    _classCallCheck(this, UserAuthController);
  }
  _createClass(UserAuthController, null, [{
    key: "register",
    value: function () {
      var _register = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
        var _req$body, email, password, user, token, emailEdited, newUser, html, data;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _req$body = req.body, email = _req$body.email, password = _req$body.password;
              _context2.next = 4;
              return _models["default"].User.findOne({
                where: {
                  email: email
                }
              });
            case 4:
              user = _context2.sent;
              if (!user) {
                _context2.next = 7;
                break;
              }
              return _context2.abrupt("return", (0, _generateError.badRequest)(new Error("Email đã tồn tại"), res));
            case 7:
              // lưu tạm thời thông tin đăng ký vào db
              // lưu 1 email kèm theo token vào db
              // nếu người dùng xác nhận email thì trả lại email cho người dùng ban đầu
              token = (0, _uuid.v4)();
              emailEdited = btoa(email) + "@" + token;
              _context2.next = 11;
              return _models["default"].User.create({
                email: emailEdited,
                password: (0, _hashPassword["default"])(password)
              });
            case 11:
              newUser = _context2.sent;
              if (newUser) {
                _context2.next = 14;
                break;
              }
              return _context2.abrupt("return", (0, _generateError.badRequest)(new Error("Đăng ký thất bại"), res));
            case 14:
              html = "<h2>M\xE3 \u0111\u0103ng k\xFD: </h2> <blockquote>".concat(token, "</blockquote>");
              data = {
                email: email,
                html: html,
                subject: "Xác nhận đăng ký tài khoản"
              };
              _context2.prev = 16;
              _context2.next = 19;
              return _queues.emailQueue.add(data);
            case 19:
              _context2.next = 25;
              break;
            case 21:
              _context2.prev = 21;
              _context2.t0 = _context2["catch"](16);
              console.error("Error sending email:", _context2.t0);
              throw _context2.t0;
            case 25:
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
            case 29:
              _context2.prev = 29;
              _context2.t1 = _context2["catch"](0);
              return _context2.abrupt("return", (0, _generateError.internalServerError)(_context2.t1, res));
            case 32:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 29], [16, 21]]);
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
              if (notVerifyEmail) {
                _context3.next = 7;
                break;
              }
              return _context3.abrupt("return", (0, _generateError.badRequest)(new Error("Email không tồn tại"), res));
            case 7:
              notVerifyEmail.email = atob(notVerifyEmail === null || notVerifyEmail === void 0 || (_notVerifyEmail$email = notVerifyEmail.email) === null || _notVerifyEmail$email === void 0 ? void 0 : _notVerifyEmail$email.split("@")[0]);
              notVerifyEmail.email_verified_at = new Date();
              _context3.next = 11;
              return notVerifyEmail.save();
            case 11:
              return _context3.abrupt("return", res.status(200).json({
                message: "Xác minh email thành công. Vui lòng đăng nhập"
              }));
            case 14:
              _context3.prev = 14;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", (0, _generateError.internalServerError)(_context3.t0, res));
            case 17:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 14]]);
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
              if (user) {
                _context4.next = 6;
                break;
              }
              return _context4.abrupt("return", (0, _generateError.badRequest)(new Error("Email không tồn tại"), res));
            case 6:
              id = user.id, password = user.password, refresh_token = user.refresh_token, rest = _objectWithoutProperties(user, _excluded);
              _context4.next = 9;
              return _bcryptjs["default"].compare((_req$body3 = req.body) === null || _req$body3 === void 0 ? void 0 : _req$body3.password, password);
            case 9:
              comparePassword = _context4.sent;
              accessToken = comparePassword ? (0, _jwt.generateToken)({
                id: id
              }) : null;
              newRefreshToken = comparePassword ? (0, _jwt.generateRefreshToken)(id) : null;
              _context4.next = 14;
              return _models["default"].User.update({
                refresh_token: newRefreshToken
              }, {
                where: {
                  id: id
                }
              });
            case 14:
              if (newRefreshToken) res.cookie("refreshTokenUser", newRefreshToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
              });
              if (accessToken) {
                _context4.next = 17;
                break;
              }
              return _context4.abrupt("return", (0, _generateError.badRequest)(new Error("Sai mật khẩu"), res));
            case 17:
              return _context4.abrupt("return", res.status(200).json({
                accessToken: accessToken,
                data: _objectSpread({}, rest),
                message: "Login thành công"
              }));
            case 20:
              _context4.prev = 20;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", (0, _generateError.internalServerError)(_context4.t0, res));
            case 23:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 20]]);
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
              if (!(!cookie && !cookie.refreshTokenUser)) {
                _context5.next = 4;
                break;
              }
              return _context5.abrupt("return", (0, _generateError.badRequest)(new Error("Không có refreshToken trong cookie"), res));
            case 4:
              _context5.next = 6;
              return _jsonwebtoken["default"].verify(cookie.refreshTokenUser, process.env.JWT_SECRET);
            case 6:
              verifyRefreshToken = _context5.sent;
              _context5.next = 9;
              return _models["default"].User.findOne({
                where: {
                  id: verifyRefreshToken.id,
                  refresh_token: cookie.refreshTokenUser
                }
              });
            case 9:
              response = _context5.sent;
              if (response) {
                _context5.next = 12;
                break;
              }
              return _context5.abrupt("return", (0, _generateError.badRequest)(new Error("Refresh token không tồn tại"), res));
            case 12:
              newAccessToken = (0, _jwt.generateToken)({
                id: response.id
              });
              return _context5.abrupt("return", res.status(200).json({
                accessToken: newAccessToken,
                message: "Refresh token thành công"
              }));
            case 16:
              _context5.prev = 16;
              _context5.t0 = _context5["catch"](0);
              return _context5.abrupt("return", (0, _generateError.internalServerError)(_context5.t0, res));
            case 19:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 16]]);
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
              if (!(!cookie && !cookie.refreshTokenUser)) {
                _context6.next = 4;
                break;
              }
              return _context6.abrupt("return", (0, _generateError.badRequest)(new Error("Không có refreshToken trong cookie"), res));
            case 4:
              _context6.next = 6;
              return _jsonwebtoken["default"].verify(cookie.refreshTokenUser, process.env.JWT_SECRET);
            case 6:
              verifyRefreshToken = _context6.sent;
              id = verifyRefreshToken.id;
              _context6.next = 10;
              return _models["default"].User.findOne({
                where: {
                  id: id,
                  refresh_token: cookie.refreshTokenUser
                },
                raw: true
              });
            case 10:
              response = _context6.sent;
              if (response) {
                _context6.next = 13;
                break;
              }
              return _context6.abrupt("return", (0, _generateError.badRequest)(new Error("Refresh token không tồn tại"), res));
            case 13:
              _context6.next = 15;
              return _models["default"].User.update({
                refresh_token: null
              }, {
                where: {
                  id: id
                }
              });
            case 15:
              res.clearCookie("refreshTokenUser", "", {
                httpOnly: true,
                secure: true
              });
              return _context6.abrupt("return", res.status(200).json({
                message: "Logout thành công"
              }));
            case 19:
              _context6.prev = 19;
              _context6.t0 = _context6["catch"](0);
              return _context6.abrupt("return", (0, _generateError.internalServerError)(res));
            case 22:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[0, 19]]);
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
              if (email) {
                _context7.next = 3;
                break;
              }
              return _context7.abrupt("return", (0, _generateError.badRequest)(new Error("Cung cấp email"), res));
            case 3:
              _context7.next = 5;
              return _models["default"].User.findOne({
                where: {
                  email: email
                }
              });
            case 5:
              user = _context7.sent;
              if (user) {
                _context7.next = 8;
                break;
              }
              return _context7.abrupt("return", (0, _generateError.badRequest)(new Error("Email không tồn tại"), res));
            case 8:
              _context7.next = 10;
              return (0, _createPasswordChangeToken["default"])(user);
            case 10:
              resetToken = _context7.sent;
              html = "Vui l\xF2ng click v\xE0o link \u0111\u1EC3 \u0111\u1ED5i m\u1EADt kh\u1EA9u. Link n\xE0y h\u1EBFt h\u1EA1n sau 15p: <a href=".concat(process.env.URL_CLIENT, "/auth/reset-password?token=").concat(resetToken, "&email=").concat(user.email, ">B\u1EA5m v\xE0o \u0111\xE2y</a>");
              data = {
                email: email,
                html: html,
                subject: "Đổi mật khẩu"
              };
              _context7.prev = 13;
              _context7.next = 16;
              return _queues.emailQueue.add(data);
            case 16:
              _context7.next = 22;
              break;
            case 18:
              _context7.prev = 18;
              _context7.t0 = _context7["catch"](13);
              console.error("Error sending email:", _context7.t0);
              throw _context7.t0;
            case 22:
              return _context7.abrupt("return", res.status(200).json({
                message: "Vui lòng kiểm tra email để đổi mật khẩu"
              }));
            case 23:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[13, 18]]);
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
              if (!(!token || !password || !email)) {
                _context8.next = 4;
                break;
              }
              return _context8.abrupt("return", (0, _generateError.badRequest)(new Error("Yêu cầu cung cấp token, email và mật khẩu mới"), res));
            case 4:
              passwordChangeToken = _crypto["default"].createHash("sha256").update(token).digest("hex");
              _context8.next = 7;
              return _models["default"].User.findOne({
                where: {
                  email: email
                }
              });
            case 7:
              user = _context8.sent;
              if (user) {
                _context8.next = 10;
                break;
              }
              return _context8.abrupt("return", (0, _generateError.badRequest)(new Error("Email không tồn tại"), res));
            case 10:
              _context8.next = 12;
              return _models["default"].User.findOne({
                where: {
                  email: email,
                  password_reset_token: passwordChangeToken,
                  password_reset_token_expired_at: _defineProperty({}, _sequelize.Op.gte, Date.now())
                }
              });
            case 12:
              userWithToken = _context8.sent;
              if (userWithToken) {
                _context8.next = 15;
                break;
              }
              return _context8.abrupt("return", (0, _generateError.badRequest)(new Error("Token không hợp lệ hoặc hết hạn"), res));
            case 15:
              _context8.next = 17;
              return user.update({
                password: (0, _hashPassword["default"])(password),
                password_reset_token: null,
                password_reset_token_expired_at: null,
                password_changed_at: Date.now()
              });
            case 17:
              return _context8.abrupt("return", res.status(200).json({
                message: "Đổi mật khẩu thành công"
              }));
            case 20:
              _context8.prev = 20;
              _context8.t0 = _context8["catch"](0);
              return _context8.abrupt("return", (0, _generateError.internalServerError)(_context8.t0, res));
            case 23:
            case "end":
              return _context8.stop();
          }
        }, _callee8, null, [[0, 20]]);
      }));
      function resetPassword(_x13, _x14) {
        return _resetPassword.apply(this, arguments);
      }
      return resetPassword;
    }()
  }]);
  return UserAuthController;
}();
var _default = UserAuthController;
exports["default"] = _default;