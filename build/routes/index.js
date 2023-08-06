"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var initRoutes = function initRoutes(app) {
  app.get("/", function (req, res) {
    res.send("Hello World!");
  });
};
var _default = initRoutes;
exports["default"] = _default;