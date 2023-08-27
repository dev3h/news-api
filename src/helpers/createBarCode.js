function calculateChecksum(code) {
  const digits = code.split("").map(Number);
  let sum = 0;
  let multiplier = 1;

  // Tính tổng của các số ở vị trí chẵn
  for (let i = digits.length - 2; i >= 0; i -= 2) {
    sum += digits[i];
  }

  // Tính tổng của các số ở vị trí lẻ và nhân 3
  for (let i = digits.length - 1; i >= 0; i -= 2) {
    sum += digits[i] * multiplier;
    multiplier = multiplier === 1 ? 3 : 1;
  }

  // Tìm số dư của tổng chia cho 10
  const remainder = sum % 10;

  // Tính checksum bằng cách lấy 10 trừ số dư
  const checksum = remainder === 0 ? 0 : 10 - remainder;

  return checksum;
}

/*
barcode (13 số): (year + group_product_id + số prefix 0 và số thứ tự tăng dần) (12 số) + checksum (tự phát sinh) (1 số)

trên thực tế thì  là mã vạch có 12 số, số cuối cùng là checksum
thực tế mã quốc gia + mã sản phẩm + checksum
*/

function generateBarcode(groupProductId, counter) {
  const barCodeNumber = 13;
  const currentYear = new Date().getFullYear();
  const currentYearLength = currentYear.toString().length;
  const counterLength = counter.toString().length;
  const groupProductIdLength = groupProductId.toString().length;

  const counterZero =
    barCodeNumber - currentYearLength - groupProductIdLength - counterLength - 1;
  if (counterZero < 0) throw new Error("Barcode quá dài");
  else if (counterZero > 0) {
    const checksum = calculateChecksum(
      `${currentYear}${groupProductId}${"0".repeat(counterZero)}${counter}`
    );
    return `${currentYear}${groupProductId}${"0".repeat(
      counterZero
    )}${counter}${checksum}`;
  }
  return `${currentYear}${groupProductId}${counter}${checksum}`;
}
export default generateBarcode;
