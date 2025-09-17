"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get("/", function (req, res) {
  // #swagger.tags = ['Health']
  // #swagger.summary = 'Health check endpoint'
  // #swagger.description = 'Check if the API is running'
  /* #swagger.responses[200] = {
    description: 'API is healthy',
    schema: {
      status: 'OK',
      message: 'API is running',
      timestamp: '2024-01-01T00:00:00.000Z'
    }
  } */

  res.status(200).json({
    status: "OK",
    message: "API is running",
    timestamp: new Date().toISOString()
  });
});
var _default = exports["default"] = router;