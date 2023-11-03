"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateUpdatedBy = exports.generateCreatedByAndUpdatedBy = void 0;
var generateCreatedByAndUpdatedBy = function generateCreatedByAndUpdatedBy(id) {
  return {
    created_by: id,
    updated_by: id
  };
};
exports.generateCreatedByAndUpdatedBy = generateCreatedByAndUpdatedBy;
var generateUpdatedBy = function generateUpdatedBy(id) {
  return {
    updated_by: id
  };
};
exports.generateUpdatedBy = generateUpdatedBy;