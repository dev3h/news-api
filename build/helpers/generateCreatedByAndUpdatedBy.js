"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateUpdatedBy = exports.generateCreatedByAndUpdatedBy = void 0;
var generateCreatedByAndUpdatedBy = exports.generateCreatedByAndUpdatedBy = function generateCreatedByAndUpdatedBy(id) {
  return {
    created_by: id,
    updated_by: id
  };
};
var generateUpdatedBy = exports.generateUpdatedBy = function generateUpdatedBy(id) {
  return {
    updated_by: id
  };
};