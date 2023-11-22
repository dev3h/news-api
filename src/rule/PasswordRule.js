import joi from "joi";

const passwordRule = () => {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
  return {
    password: joi.string().min(8).max(20).required().pattern(passwordPattern).messages({
      "string.empty": "Mật khẩu không được để trống",
      "any.required": "Mật khẩu là bắt buộc",
      "string.min": "Mật khẩu phải có ít nhất 8 ký tự",
      "string.max": "Mật khẩu không được vượt quá 20 ký tự",
      "string.pattern.base":
        "Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ hoa, 1 số và 1 ký tự đặc biệt (@#$%^&+=!)",
    }),
  };
};

export default passwordRule;
