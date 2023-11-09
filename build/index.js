"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _express = _interopRequireWildcard(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
require("dotenv/config");
var _api = require("@bull-board/api");
var _bullAdapter = require("@bull-board/api/bullAdapter");
var _express2 = require("@bull-board/express");
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _database = _interopRequireDefault(require("./config/database"));
var _routes = _interopRequireDefault(require("./routes"));
var _queues = require("./queues");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var app = (0, _express["default"])();
var corsOption = {
  credentials: true,
  origin: [process.env.URL_CLIENT]
};
app.use((0, _cors["default"])(corsOption));
app.use(_bodyParser["default"].json({
  limit: "10mb"
}));
app.use((0, _cookieParser["default"])());
app.use((0, _express.json)());
app.use((0, _express.urlencoded)({
  extended: true
}));
(0, _database["default"])();
var serverAdapter = new _express2.ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");
var _createBullBoard = (0, _api.createBullBoard)({
    queues: [new _bullAdapter.BullAdapter(_queues.emailQueue)],
    serverAdapter: serverAdapter
  }),
  addQueue = _createBullBoard.addQueue,
  removeQueue = _createBullBoard.removeQueue,
  setQueues = _createBullBoard.setQueues,
  replaceQueues = _createBullBoard.replaceQueues;
app.use("/admin/queues", serverAdapter.getRouter());
(0, _routes["default"])(app);
var PORT = process.env.PORT || 5000;
var listener = app.listen(PORT, function () {
  console.log("Server is running on port ".concat(listener.address().port));
  console.log("For Bull Queue UI, open http://localhost:5000/admin/queues");
  console.log("Make sure Redis is running on port 6379 by default");
});