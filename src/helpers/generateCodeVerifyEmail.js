import crypto from "crypto";

const generateCodeVerifyEmail = () => {
  // Tạo buffer ngẫu nhiên với độ dài 2 byte
  const buffer = crypto.randomBytes(2);

  // Chuyển buffer thành số hex và lấy 4 chữ số cuối cùng
  const token = parseInt(buffer.toString("hex"), 16).toString().slice(-4);

  return token;
};

export default generateCodeVerifyEmail;
