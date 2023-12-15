import joi from "joi";
import passwordRule from "rule/PasswordRule";

const AdminAuthRequest = (req, res, next) => {
  const usenamePattern = /^[a-zA-Z0-9]+$/;
  const { error } = joi
    .object({
      username: joi.string().required().min(3).max(50).pattern(usenamePattern).messages({
        "string.empty": "Username là bắt buộc",
        "any.required": "Username là bắt buộc",
        "string.min": "Username phải có ít nhất 3 ký tự",
        "string.max": "Username không được vượt quá 50 ký tự",
        "string.pattern.base": "Username không được chứa ký tự đặc biệt",
      }),
      ...passwordRule(),
    })
    .validate({
      username: req.body?.username?.trim(),
      password: req.body?.password?.trim(),
    });
  if (error) {
    return res.status(422).json({
      message: error.message,
    });
  }
  next();
};
export default AdminAuthRequest;
