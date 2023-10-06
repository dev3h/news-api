"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function calculateChecksum(code) {
  var digits = code.split("").map(Number);
  var sum = 0;
  var multiplier = 1;

  // Tính tổng của các số ở vị trí chẵn
  for (var i = digits.length - 2; i >= 0; i -= 2) {
    sum += digits[i];
  }

  // Tính tổng của các số ở vị trí lẻ và nhân 3
  for (var _i = digits.length - 1; _i >= 0; _i -= 2) {
    sum += digits[_i] * multiplier;
    multiplier = multiplier === 1 ? 3 : 1;
  }

  // Tìm số dư của tổng chia cho 10
  var remainder = sum % 10;

  // Tính checksum bằng cách lấy 10 trừ số dư
  var checksum = remainder === 0 ? 0 : 10 - remainder;
  return checksum;
}

/*
barcode (13 số): (year + group_product_id + số prefix 0 và số thứ tự tăng dần) (12 số) + checksum (tự phát sinh) (1 số)

trên thực tế thì  là mã vạch có 12 số, số cuối cùng là checksum
thực tế mã quốc gia + mã sản phẩm + checksum
*/

function generateBarcode(groupProductId, counter) {
  var barCodeNumber = 13;
  var currentYear = new Date().getFullYear();
  var currentYearLength = currentYear.toString().length;
  var counterLength = counter.toString().length;
  var groupProductIdLength = groupProductId.toString().length;
  var counterZero = barCodeNumber - currentYearLength - groupProductIdLength - counterLength - 1;
  if (counterZero < 0) throw new Error("Barcode quá dài");else if (counterZero > 0) {
    var _checksum = calculateChecksum("".concat(currentYear).concat(groupProductId).concat("0".repeat(counterZero)).concat(counter));
    return "".concat(currentYear).concat(groupProductId).concat("0".repeat(counterZero)).concat(counter).concat(_checksum);
  }
  return "".concat(currentYear).concat(groupProductId).concat(counter).concat(checksum);
}
var _default = generateBarcode;
exports["default"] = _default;