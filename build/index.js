"use strict";

var _api = require("@bull-board/api");
var _bullAdapter = require("@bull-board/api/bullAdapter");
var _express = require("@bull-board/express");
var _app = _interopRequireDefault(require("./app"));
var _database = _interopRequireDefault(require("./config/database"));
var _queues = require("./queues");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
(0, _database["default"])();
var serverAdapter = new _express.ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");
var _createBullBoard = (0, _api.createBullBoard)({
    queues: [new _bullAdapter.BullAdapter(_queues.emailQueue)],
    serverAdapter: serverAdapter
  }),
  addQueue = _createBullBoard.addQueue,
  removeQueue = _createBullBoard.removeQueue,
  setQueues = _createBullBoard.setQueues,
  replaceQueues = _createBullBoard.replaceQueues;
_app["default"].use("/admin/queues", serverAdapter.getRouter());
var PORT = process.env.PORT || 5000;
var listener = _app["default"].listen(PORT, function () {
  console.log("Server is running on port ".concat(listener.address().port));
  console.log("For Bull Queue UI, open http://localhost:5000/admin/queues");
  console.log("Make sure Redis is running on port 6379 by default");
});