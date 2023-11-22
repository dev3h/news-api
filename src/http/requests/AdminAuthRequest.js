import joi from "joi";
import passwordRule from "rule/PasswordRule";

const AdminAuthRequest = (req, res, next) => {
  const { error } = joi
    .object({
      username: joi.string().required().min(3).max(50).messages({
        "string.empty": "Tên đăng nhập không được để trống",
        "any.required": "Tên đăng nhập là bắt buộc",
        "string.min": "Tên đăng nhập phải có ít nhất 3 ký tự",
        "string.max": "Tên đăng nhập không được vượt quá 50 ký tự",
      }),
      ...passwordRule(),
    })
    .validate({
      ...req.body,
    });
  if (error) {
    return res.status(422).json({
      message: error.message,
    });
  }
  next();
};
export default AdminAuthRequest;
