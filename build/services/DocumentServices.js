"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = void 0;
var _models = _interopRequireDefault(require("../models"));
var _sequelize = require("sequelize");
var _xlsx = _interopRequireDefault(require("xlsx"));
var _fs = _interopRequireDefault(require("fs"));
var _excluded = ["page", "limit", "name", "orderBy", "orderType"],
  _excluded2 = ["product_info"];
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  return (
    (_typeof =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (obj) {
            return typeof obj;
          }
        : function (obj) {
            return obj &&
              "function" == typeof Symbol &&
              obj.constructor === Symbol &&
              obj !== Symbol.prototype
              ? "symbol"
              : typeof obj;
          }),
    _typeof(obj)
  );
}
function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}
function _nonIterableRest() {
  throw new TypeError(
    "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit(arr, i) {
  var _i =
    null == arr
      ? null
      : ("undefined" != typeof Symbol && arr[Symbol.iterator]) || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (((_x = (_i = _i.call(arr)).next), 0 === i)) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else
        for (
          ;
          !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i);
          _n = !0
        );
    } catch (err) {
      (_d = !0), (_e = err);
    } finally {
      try {
        if (!_n && null != _i["return"] && ((_r = _i["return"]()), Object(_r) !== _r))
          return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _regeneratorRuntime() {
  "use strict";
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime =
    function _regeneratorRuntime() {
      return exports;
    };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty =
      Object.defineProperty ||
      function (obj, key, desc) {
        obj[key] = desc.value;
      },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return (
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0,
      }),
      obj[key]
    );
  }
  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return (obj[key] = value);
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator =
        outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return (
      defineProperty(generator, "_invoke", {
        value: makeInvokeMethod(innerFn, self, context),
      }),
      generator
    );
  }
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype &&
    NativeIteratorPrototype !== Op &&
    hasOwn.call(NativeIteratorPrototype, iteratorSymbol) &&
    (IteratorPrototype = NativeIteratorPrototype);
  var Gp =
    (GeneratorFunctionPrototype.prototype =
    Generator.prototype =
      Object.create(IteratorPrototype));
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == _typeof(value) && hasOwn.call(value, "__await")
          ? PromiseImpl.resolve(value.__await).then(
              function (value) {
                invoke("next", value, resolve, reject);
              },
              function (err) {
                invoke("throw", err, resolve, reject);
              }
            )
          : PromiseImpl.resolve(value).then(
              function (unwrapped) {
                (result.value = unwrapped), resolve(result);
              },
              function (error) {
                return invoke("throw", error, resolve, reject);
              }
            );
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function value(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return (previousPromise = previousPromise
          ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg)
          : callInvokeWithMethodAndArg());
      },
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg; ; ) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;
        else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw ((state = "completed"), context.arg);
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (
            ((state = context.done ? "completed" : "suspendedYield"),
            record.arg === ContinueSentinel)
          )
            continue;
          return { value: record.arg, done: context.done };
        }
        "throw" === record.type &&
          ((state = "completed"), (context.method = "throw"), (context.arg = record.arg));
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method)
      return (
        (context.delegate = null),
        ("throw" === methodName &&
          delegate.iterator["return"] &&
          ((context.method = "return"),
          (context.arg = undefined),
          maybeInvokeDelegate(delegate, context),
          "throw" === context.method)) ||
          ("return" !== methodName &&
            ((context.method = "throw"),
            (context.arg = new TypeError(
              "The iterator does not provide a '" + methodName + "' method"
            )))),
        ContinueSentinel
      );
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type)
      return (
        (context.method = "throw"),
        (context.arg = record.arg),
        (context.delegate = null),
        ContinueSentinel
      );
    var info = record.arg;
    return info
      ? info.done
        ? ((context[delegate.resultName] = info.value),
          (context.next = delegate.nextLoc),
          "return" !== context.method &&
            ((context.method = "next"), (context.arg = undefined)),
          (context.delegate = null),
          ContinueSentinel)
        : info
      : ((context.method = "throw"),
        (context.arg = new TypeError("iterator result is not an object")),
        (context.delegate = null),
        ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };
    1 in locs && (entry.catchLoc = locs[1]),
      2 in locs && ((entry.finallyLoc = locs[2]), (entry.afterLoc = locs[3])),
      this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    (record.type = "normal"), delete record.arg, (entry.completion = record);
  }
  function Context(tryLocsList) {
    (this.tryEntries = [{ tryLoc: "root" }]),
      tryLocsList.forEach(pushTryEntry, this),
      this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length; )
              if (hasOwn.call(iterable, i))
                return (next.value = iterable[i]), (next.done = !1), next;
            return (next.value = undefined), (next.done = !0), next;
          };
        return (next.next = next);
      }
    }
    return { next: doneResult };
  }
  function doneResult() {
    return { value: undefined, done: !0 };
  }
  return (
    (GeneratorFunction.prototype = GeneratorFunctionPrototype),
    defineProperty(Gp, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0,
    }),
    defineProperty(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0,
    }),
    (GeneratorFunction.displayName = define(
      GeneratorFunctionPrototype,
      toStringTagSymbol,
      "GeneratorFunction"
    )),
    (exports.isGeneratorFunction = function (genFun) {
      var ctor = "function" == typeof genFun && genFun.constructor;
      return (
        !!ctor &&
        (ctor === GeneratorFunction ||
          "GeneratorFunction" === (ctor.displayName || ctor.name))
      );
    }),
    (exports.mark = function (genFun) {
      return (
        Object.setPrototypeOf
          ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype)
          : ((genFun.__proto__ = GeneratorFunctionPrototype),
            define(genFun, toStringTagSymbol, "GeneratorFunction")),
        (genFun.prototype = Object.create(Gp)),
        genFun
      );
    }),
    (exports.awrap = function (arg) {
      return { __await: arg };
    }),
    defineIteratorMethods(AsyncIterator.prototype),
    define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    }),
    (exports.AsyncIterator = AsyncIterator),
    (exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      void 0 === PromiseImpl && (PromiseImpl = Promise);
      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList),
        PromiseImpl
      );
      return exports.isGeneratorFunction(outerFn)
        ? iter
        : iter.next().then(function (result) {
            return result.done ? result.value : iter.next();
          });
    }),
    defineIteratorMethods(Gp),
    define(Gp, toStringTagSymbol, "Generator"),
    define(Gp, iteratorSymbol, function () {
      return this;
    }),
    define(Gp, "toString", function () {
      return "[object Generator]";
    }),
    (exports.keys = function (val) {
      var object = Object(val),
        keys = [];
      for (var key in object) keys.push(key);
      return (
        keys.reverse(),
        function next() {
          for (; keys.length; ) {
            var key = keys.pop();
            if (key in object) return (next.value = key), (next.done = !1), next;
          }
          return (next.done = !0), next;
        }
      );
    }),
    (exports.values = values),
    (Context.prototype = {
      constructor: Context,
      reset: function reset(skipTempReset) {
        if (
          ((this.prev = 0),
          (this.next = 0),
          (this.sent = this._sent = undefined),
          (this.done = !1),
          (this.delegate = null),
          (this.method = "next"),
          (this.arg = undefined),
          this.tryEntries.forEach(resetTryEntry),
          !skipTempReset)
        )
          for (var name in this)
            "t" === name.charAt(0) &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1)) &&
              (this[name] = undefined);
      },
      stop: function stop() {
        this.done = !0;
        var rootRecord = this.tryEntries[0].completion;
        if ("throw" === rootRecord.type) throw rootRecord.arg;
        return this.rval;
      },
      dispatchException: function dispatchException(exception) {
        if (this.done) throw exception;
        var context = this;
        function handle(loc, caught) {
          return (
            (record.type = "throw"),
            (record.arg = exception),
            (context.next = loc),
            caught && ((context.method = "next"), (context.arg = undefined)),
            !!caught
          );
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i],
            record = entry.completion;
          if ("root" === entry.tryLoc) return handle("end");
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            } else {
              if (!hasFinally) throw new Error("try statement without catch or finally");
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            }
          }
        }
      },
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (
            entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc
          ) {
            var finallyEntry = entry;
            break;
          }
        }
        finallyEntry &&
          ("break" === type || "continue" === type) &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc &&
          (finallyEntry = null);
        var record = finallyEntry ? finallyEntry.completion : {};
        return (
          (record.type = type),
          (record.arg = arg),
          finallyEntry
            ? ((this.method = "next"),
              (this.next = finallyEntry.finallyLoc),
              ContinueSentinel)
            : this.complete(record)
        );
      },
      complete: function complete(record, afterLoc) {
        if ("throw" === record.type) throw record.arg;
        return (
          "break" === record.type || "continue" === record.type
            ? (this.next = record.arg)
            : "return" === record.type
            ? ((this.rval = this.arg = record.arg),
              (this.method = "return"),
              (this.next = "end"))
            : "normal" === record.type && afterLoc && (this.next = afterLoc),
          ContinueSentinel
        );
      },
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc)
            return (
              this.complete(entry.completion, entry.afterLoc),
              resetTryEntry(entry),
              ContinueSentinel
            );
        }
      },
      catch: function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if ("throw" === record.type) {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        return (
          (this.delegate = {
            iterator: values(iterable),
            resultName: resultName,
            nextLoc: nextLoc,
          }),
          "next" === this.method && (this.arg = undefined),
          ContinueSentinel
        );
      },
    }),
    exports
  );
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly &&
      (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })),
      keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2
      ? ownKeys(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
      : ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(source, key)
          );
        });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var DocumentService = /*#__PURE__*/ (function () {
  function DocumentService() {
    _classCallCheck(this, DocumentService);
  }
  _createClass(DocumentService, null, [
    {
      key: "getAll",
      value: (function () {
        var _getAll = _asyncToGenerator(
          /*#__PURE__*/ _regeneratorRuntime().mark(function _callee(_ref) {
            var page,
              limit,
              name,
              orderBy,
              orderType,
              query,
              queries,
              offset,
              fLimit,
              response;
            return _regeneratorRuntime().wrap(
              function _callee$(_context) {
                while (1)
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      (page = _ref.page),
                        (limit = _ref.limit),
                        (name = _ref.name),
                        (orderBy = _ref.orderBy),
                        (orderType = _ref.orderType),
                        (query = _objectWithoutProperties(_ref, _excluded));
                      _context.prev = 1;
                      queries = {
                        raw: true,
                        nest: true,
                      };
                      offset = !page || +page <= 1 ? 0 : +page - 1;
                      fLimit = +limit || 10;
                      queries.offset = offset * fLimit;
                      queries.limit = fLimit;
                      queries.order = [[orderBy || "created_at", orderType || "DESC"]];
                      if (name) {
                        queries.where = {
                          name: _defineProperty(
                            {},
                            _sequelize.Op.like,
                            "%".concat(name, "%")
                          ),
                        };
                      }
                      _context.next = 11;
                      return _models["default"].Document.findAndCountAll(
                        _objectSpread(
                          _objectSpread(
                            {
                              where: query,
                            },
                            queries
                          ),
                          {},
                          {
                            include: [
                              {
                                model: _models["default"].Document_Detail,
                                as: "document_detail",
                                include: [
                                  {
                                    model: _models["default"].Product,
                                    as: "product",
                                    attributes: ["id", "name"],
                                  },
                                ],
                                attributes: {
                                  exclude: [
                                    "product_id",
                                    "document_id",
                                    "createdBy",
                                    "updatedBy",
                                    "created_at",
                                    "updated_at",
                                    "deletedAt",
                                  ],
                                },
                              },
                            ],
                          }
                        )
                      );
                    case 11:
                      response = _context.sent;
                      return _context.abrupt("return", {
                        error: response ? 0 : 1,
                        data: response,
                      });
                    case 15:
                      _context.prev = 15;
                      _context.t0 = _context["catch"](1);
                      throw _context.t0;
                    case 18:
                    case "end":
                      return _context.stop();
                  }
              },
              _callee,
              null,
              [[1, 15]]
            );
          })
        );
        function getAll(_x) {
          return _getAll.apply(this, arguments);
        }
        return getAll;
      })(), // phần này cần phải sửa lại
    },
    {
      key: "create",
      value: (function () {
        var _create = _asyncToGenerator(
          /*#__PURE__*/ _regeneratorRuntime().mark(function _callee2(data) {
            var product_info,
              document_data,
              response,
              _response,
              document,
              created,
              document_detail_data,
              current_document;
            return _regeneratorRuntime().wrap(
              function _callee2$(_context2) {
                while (1)
                  switch ((_context2.prev = _context2.next)) {
                    case 0:
                      (product_info = data.product_info),
                        (document_data = _objectWithoutProperties(data, _excluded2));
                      _context2.prev = 1;
                      _context2.next = 4;
                      return _models["default"].Document.findOrCreate({
                        where: {
                          document_import: data.document_import,
                        },
                        defaults: document_data,
                      });
                    case 4:
                      response = _context2.sent;
                      (_response = _slicedToArray(response, 2)),
                        (document = _response[0]),
                        (created = _response[1]);
                      if (created) {
                        _context2.next = 8;
                        break;
                      }
                      throw new Error("document already exists");
                    case 8:
                      document_detail_data = product_info.map(function (item) {
                        var total_price = item.quantity * item.price;
                        return {
                          document_id: document.id,
                          product_id: item.id,
                          quantity: item.quantity,
                          price: item.price,
                          total_price: total_price,
                        };
                      }); // insert multiple rows
                      _context2.next = 11;
                      return _models["default"].Document_Detail.bulkCreate(
                        document_detail_data
                      );
                    case 11:
                      return _context2.abrupt("return", {
                        error: response[1] ? 0 : 1,
                        mes: response[1] ? "create success" : "create failed",
                      });
                    case 14:
                      _context2.prev = 14;
                      _context2.t0 = _context2["catch"](1);
                      _context2.next = 18;
                      return _models["default"].Document.findOne({
                        where: {
                          document_import: data.document_import,
                        },
                      });
                    case 18:
                      current_document = _context2.sent;
                      if (!current_document) {
                        _context2.next = 22;
                        break;
                      }
                      _context2.next = 22;
                      return _models["default"].Document.destroy({
                        where: {
                          id: current_document.id,
                        },
                        force: true,
                      });
                    case 22:
                      throw _context2.t0;
                    case 23:
                    case "end":
                      return _context2.stop();
                  }
              },
              _callee2,
              null,
              [[1, 14]]
            );
          })
        );
        function create(_x2) {
          return _create.apply(this, arguments);
        }
        return create;
      })(),
    },
    {
      key: "getOne",
      value: (function () {
        var _getOne = _asyncToGenerator(
          /*#__PURE__*/ _regeneratorRuntime().mark(function _callee3(id) {
            var response;
            return _regeneratorRuntime().wrap(
              function _callee3$(_context3) {
                while (1)
                  switch ((_context3.prev = _context3.next)) {
                    case 0:
                      _context3.prev = 0;
                      _context3.next = 3;
                      return _models["default"].Document.findByPk(id, {
                        include: [
                          {
                            model: _models["default"].Document_Detail,
                            as: "document_detail",
                            include: [
                              {
                                model: _models["default"].Product,
                                as: "product",
                                attributes: ["id", "name"],
                              },
                            ],
                            attributes: {
                              exclude: [
                                "product_id",
                                "document_id",
                                "createdBy",
                                "updatedBy",
                                "created_at",
                                "updated_at",
                                "deletedAt",
                              ],
                            },
                          },
                        ],
                      });
                    case 3:
                      response = _context3.sent;
                      return _context3.abrupt("return", {
                        error: response ? 0 : 1,
                        data: response,
                      });
                    case 7:
                      _context3.prev = 7;
                      _context3.t0 = _context3["catch"](0);
                      throw _context3.t0;
                    case 10:
                    case "end":
                      return _context3.stop();
                  }
              },
              _callee3,
              null,
              [[0, 7]]
            );
          })
        );
        function getOne(_x3) {
          return _getOne.apply(this, arguments);
        }
        return getOne;
      })(),
    },
    {
      key: "update",
      value: (function () {
        var _update = _asyncToGenerator(
          /*#__PURE__*/ _regeneratorRuntime().mark(function _callee4(id, data) {
            var response;
            return _regeneratorRuntime().wrap(
              function _callee4$(_context4) {
                while (1)
                  switch ((_context4.prev = _context4.next)) {
                    case 0:
                      _context4.prev = 0;
                      _context4.next = 3;
                      return _models["default"].Document.update(data, {
                        where: {
                          id: id,
                        },
                      });
                    case 3:
                      response = _context4.sent;
                      return _context4.abrupt("return", {
                        error: response[0] > 0 ? 0 : 1,
                        mes: response[0] > 0 ? "update success" : "update failed",
                      });
                    case 7:
                      _context4.prev = 7;
                      _context4.t0 = _context4["catch"](0);
                      throw _context4.t0;
                    case 10:
                    case "end":
                      return _context4.stop();
                  }
              },
              _callee4,
              null,
              [[0, 7]]
            );
          })
        );
        function update(_x4, _x5) {
          return _update.apply(this, arguments);
        }
        return update;
      })(),
    },
    {
      key: "destroy",
      value: (function () {
        var _destroy = _asyncToGenerator(
          /*#__PURE__*/ _regeneratorRuntime().mark(function _callee5(id) {
            var response;
            return _regeneratorRuntime().wrap(
              function _callee5$(_context5) {
                while (1)
                  switch ((_context5.prev = _context5.next)) {
                    case 0:
                      _context5.prev = 0;
                      _context5.next = 3;
                      return _models["default"].Document.destroy({
                        where: {
                          id: id,
                        },
                      });
                    case 3:
                      response = _context5.sent;
                      return _context5.abrupt("return", {
                        error: response > 0 ? 0 : 1,
                        mes: response > 0 ? "delete success" : "delete failed",
                      });
                    case 7:
                      _context5.prev = 7;
                      _context5.t0 = _context5["catch"](0);
                      throw _context5.t0;
                    case 10:
                    case "end":
                      return _context5.stop();
                  }
              },
              _callee5,
              null,
              [[0, 7]]
            );
          })
        );
        function destroy(_x6) {
          return _destroy.apply(this, arguments);
        }
        return destroy;
      })(),
    },
    {
      key: "importExcel",
      value: (function () {
        var _importExcel = _asyncToGenerator(
          /*#__PURE__*/ _regeneratorRuntime().mark(function _callee6(fileData) {
            var workbook, sheetName, sheetData, columnNames, expectedColumnNames;
            return _regeneratorRuntime().wrap(
              function _callee6$(_context6) {
                while (1)
                  switch ((_context6.prev = _context6.next)) {
                    case 0:
                      _context6.prev = 0;
                      workbook = _xlsx["default"].readFile(fileData.path);
                      sheetName = workbook.SheetNames[0];
                      sheetData = _xlsx["default"].utils.sheet_to_json(
                        workbook.Sheets[sheetName]
                      ); // Check if sheet has exactly 2 columns
                      columnNames = Object.keys(sheetData[0]);
                      if (!(columnNames.length !== 2)) {
                        _context6.next = 8;
                        break;
                      }
                      _fs["default"].unlinkSync(fileData.path);
                      return _context6.abrupt("return", {
                        error: 1,
                        mes: "Sheet không có đúng 2 cột",
                        data: null,
                      });
                    case 8:
                      // Check if the column names are "product_id" and "quantity"
                      expectedColumnNames = ["product_id", "quantity"];
                      if (
                        columnNames.every(function (name) {
                          return expectedColumnNames.includes(name);
                        })
                      ) {
                        _context6.next = 12;
                        break;
                      }
                      _fs["default"].unlinkSync(fileData.path);
                      return _context6.abrupt("return", {
                        error: 1,
                        mes: "Cột phải có tên là product_id và quantity",
                        data: null,
                      });
                    case 12:
                      _fs["default"].unlinkSync(fileData.path);
                      return _context6.abrupt("return", {
                        error: 0,
                        mes: "import success",
                        data: sheetData,
                      });
                    case 16:
                      _context6.prev = 16;
                      _context6.t0 = _context6["catch"](0);
                      _fs["default"].unlinkSync(fileData.path);
                      throw _context6.t0;
                    case 20:
                    case "end":
                      return _context6.stop();
                  }
              },
              _callee6,
              null,
              [[0, 16]]
            );
          })
        );
        function importExcel(_x7) {
          return _importExcel.apply(this, arguments);
        }
        return importExcel;
      })(),
    },
  ]);
  return DocumentService;
})();
var _default = DocumentService;
exports["default"] = _default;
