import joi from "joi";
import passwordRule from "rule/PasswordRule";

const AdminAuthRequest = (req, res, next) => {
  const { error } = joi
    .object({
      username: joi.string().required().messages({
        "string.empty": "Tên đăng nhập không được để trống",
        "any.required": "Tên đăng nhập là bắt buộc",
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
