"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPagingData = exports.getPagination = void 0;
var getPagination = exports.getPagination = function getPagination(page, limit) {
  var offset = !page || +page <= 1 ? 0 : +page - 1;
  var fLimit = limit ? +limit : Number.MAX_SAFE_INTEGER;
  return {
    offset: offset * fLimit,
    limit: fLimit
  };
};
var getPagingData = exports.getPagingData = function getPagingData(result, page, limit) {
  var totalItems = result.count,
    data = result.rows;
  var currentPage = page ? +page : 0;
  var totalPages = Math.ceil(totalItems / limit);
  return {
    totalItems: totalItems,
    data: data,
    totalPages: totalPages,
    currentPage: currentPage
  };
};