"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _supertest = _interopRequireDefault(require("supertest"));
var _app = _interopRequireDefault(require("../app"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var request = (0, _supertest["default"])(_app["default"]);

// Login admin api '/api/v1/auth/admin/login'

describe("Login admin api '/api/v1/auth/admin/login'", function () {
  // Test case DN05: Để trống field hoặc nhập “UserName” = chuỗi space
  // expect: status code 422, message: 'UserName là bắt buộc'
  it("DN05: Để trống field UserName", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var response;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return request.post("/api/v1/auth/admin/login").send({
            username: "",
            password: "Abcd1234!"
          });
        case 2:
          response = _context.sent;
          expect(response.status).toBe(422);
          expect(response.body.message).toBe("Username là bắt buộc");
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  it("DN05: nhập UserName = chuỗi space", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var response;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return request.post("/api/v1/auth/admin/login").send({
            username: "         ",
            password: "Abcd1234!"
          });
        case 2:
          response = _context2.sent;
          expect(response.status).toBe(422);
          expect(response.body.message).toBe("Username là bắt buộc");
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));

  // Test case DN06': Nhập UserName không tồn tại trong hệ thống
  // expect: status code 400, message: 'UserName không tồn tại'
  it("DN06': Nhập UserName không tồn tại trong hệ thống", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var response;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return request.post("/api/v1/auth/admin/login").send({
            username: "admin123",
            password: "Abcd1234!"
          });
        case 2:
          response = _context3.sent;
          expect(response.status).toBe(400);
          expect(response.body.message).toBe("Username không tồn tại");
        case 5:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  // Test case DN06: Nhập UserName tồn tại trong hệ thống
  // expect: status code 200, message: 'Đăng nhập thành công'
  it("DN06: Nhập UserName tồn tại trong hệ thống", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var response;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return request.post("/api/v1/auth/admin/login").send({
            username: "HortenseWatsica27",
            password: "Abcd1234@"
          });
        case 2:
          response = _context4.sent;
          expect(response.status).toBe(200);
          expect(response.body.message).toBe("Đăng nhập thành công");
        case 5:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  })));
  // Test case DN07: Nhập UserName tồn tại trong hệ thống với 3 ký tự
  // expect: status code 200, message: 'Đăng nhập thành công'
  it("DN07: Nhập UserName tồn tại trong hệ thống với 3 ký tự", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    var response;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return request.post("/api/v1/auth/admin/login").send({
            username: "Bet",
            password: "Abcd1234@"
          });
        case 2:
          response = _context5.sent;
          expect(response.status).toBe(200);
          expect(response.body.message).toBe("Đăng nhập thành công");
        case 5:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  })));
  // Test case DN08: Nhập UserName > 50 ký tự
  // expect: status code 422, message: 'Username không được vượt quá 50 ký tự'
  it("DN08: Nhập UserName > 50 ký tự", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
    var response;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return request.post("/api/v1/auth/admin/login").send({
            username: "AbcdefghijklmnopqrstuvwxyzAbcdefghijklmnopqrstuvwxyz",
            password: "Abcd1234@"
          });
        case 2:
          response = _context6.sent;
          expect(response.status).toBe(422);
          expect(response.body.message).toBe("Username không được vượt quá 50 ký tự");
        case 5:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  })));
  // Test case DN09: Nhập UserName tồn tại trong hệ thống với 50 ký tự
  // expect: status code 200, message: 'Đăng nhập thành công'
  it("DN09: Nhập UserName tồn tại trong hệ thống với 50 ký tự", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
    var response;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return request.post("/api/v1/auth/admin/login").send({
            username: "DiamondCarter49AdditionalText123456789012345678901",
            password: "Abcd1234@"
          });
        case 2:
          response = _context7.sent;
          expect(response.status).toBe(200);
          expect(response.body.message).toBe("Đăng nhập thành công");
        case 5:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  })));
  // Test case DN10: Nhập UserName có ký tự đặc biệt
  // expect: status code 422, message: 'Username không được chứa ký tự đặc biệt'
  it("DN10: Nhập UserName có ký tự đặc biệt", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
    var response;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return request.post("/api/v1/auth/admin/login").send({
            username: "Abc@",
            password: "Abcd1234@"
          });
        case 2:
          response = _context8.sent;
          expect(response.status).toBe(422);
          expect(response.body.message).toBe("Username không được chứa ký tự đặc biệt");
        case 5:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  })));
  // Test case DN12: Bỏ trống field Password
  // expect: status code 422, message: 'Password là bắt buộc'
  it("DN12: Bỏ trống field Password", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
    var response;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return request.post("/api/v1/auth/admin/login").send({
            username: "RodolfoLang5",
            password: ""
          });
        case 2:
          response = _context9.sent;
          expect(response.status).toBe(422);
          expect(response.body.message).toBe("Password là bắt buộc");
        case 5:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  })));
  // Test case DN14: Nhập Password có 7 ký tự
  // expect: status code 422, message: 'Password phải có ít nhất 8 ký tự'
  it("DN14: Nhập Password có 7 ký tự", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
    var response;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return request.post("/api/v1/auth/admin/login").send({
            username: "RodolfoLang5",
            password: "Abcd123"
          });
        case 2:
          response = _context10.sent;
          expect(response.status).toBe(422);
          expect(response.body.message).toBe("Password phải có ít nhất 8 ký tự");
        case 5:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  })));
  // Test case DN15: Nhập Password hợp lệ có 8 ký tự
  // expect: status code 200, message: 'Đăng nhập thành công'
  it("DN15: Nhập Password hợp lệ có 8 ký tự", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
    var response;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return request.post("/api/v1/auth/admin/login").send({
            username: "Mossie44",
            password: "Abcd123@"
          });
        case 2:
          response = _context11.sent;
          expect(response.status).toBe(200);
          expect(response.body.message).toBe("Đăng nhập thành công");
        case 5:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  })));
  // Test case DN16: Nhập Password hợp lệ có 20 ký tự
  // expect: status code 200, message: 'Đăng nhập thành công'
  it("DN16: Nhập Password hợp lệ có 20 ký tự", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
    var response;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return request.post("/api/v1/auth/admin/login").send({
            username: "Geovanni88",
            password: "Acbdefghiklmnop1234@"
          });
        case 2:
          response = _context12.sent;
          expect(response.status).toBe(200);
          expect(response.body.message).toBe("Đăng nhập thành công");
        case 5:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  })));
  // Test case DN17: Nhập Password hợp lệ có 21 ký tự
  // expect: status code 422, message: 'Password không được vượt quá 20 ký tự'
  it("DN17: Nhập Password hợp lệ có 21 ký tự", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
    var response;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return request.post("/api/v1/auth/admin/login").send({
            username: "RodolfoLang5",
            password: "Abcd1234@Abcd1234@Abcd1234@A"
          });
        case 2:
          response = _context13.sent;
          expect(response.status).toBe(422);
          expect(response.body.message).toBe("Password không được vượt quá 20 ký tự");
        case 5:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  })));
  // Test case DN18: Nhập Password hợp lệ có cả chữ, số, ký tự đặc biệt
  // expect: status code 200, message: 'Đăng nhập thành công'
  it("DN18: Nhập Password có độ dài hợp lệ [8,20] có cả chữ, số, ký tự đặc biệt", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14() {
    var response;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return request.post("/api/v1/auth/admin/login").send({
            username: "HortenseWatsica27",
            password: "Abcd1234@"
          });
        case 2:
          response = _context14.sent;
          expect(response.status).toBe(200);
          expect(response.body.message).toBe("Đăng nhập thành công");
        case 5:
        case "end":
          return _context14.stop();
      }
    }, _callee14);
  })));
  // Test case DN19: Nhập Password có độ dài [8,20] nhưng chứa toàn chữ hoa
  // expect: status code 422, message: 'Password phải bao gồm cả chữ chữ hoa, chữ thường, số và ký tự đặc biệt (@#$%^&+=!)'
  it("DN19: Nhập Password có độ dài [8,20] nhưng chứa toàn chữ hoa", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15() {
    var response;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.next = 2;
          return request.post("/api/v1/auth/admin/login").send({
            username: "RodolfoLang5",
            password: "ABCDEF123@"
          });
        case 2:
          response = _context15.sent;
          expect(response.status).toBe(422);
          expect(response.body.message).toBe("Password phải bao gồm cả chữ chữ hoa, chữ thường, số và ký tự đặc biệt (@#$%^&+=!)");
        case 5:
        case "end":
          return _context15.stop();
      }
    }, _callee15);
  })));
  // Test case DN20: Nhập Password có độ dài [8,20] nhưng chứa toàn chữ thường
  // expect: status code 422, message: 'Password phải bao gồm cả chữ chữ hoa, chữ thường, số và ký tự đặc biệt (@#$%^&+=!)'
  it("DN20: Nhập Password có độ dài [8,20] nhưng chứa toàn chữ thường", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16() {
    var response;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.next = 2;
          return request.post("/api/v1/auth/admin/login").send({
            username: "RodolfoLang5",
            password: "abcdef123@"
          });
        case 2:
          response = _context16.sent;
          expect(response.status).toBe(422);
          expect(response.body.message).toBe("Password phải bao gồm cả chữ chữ hoa, chữ thường, số và ký tự đặc biệt (@#$%^&+=!)");
        case 5:
        case "end":
          return _context16.stop();
      }
    }, _callee16);
  })));
});