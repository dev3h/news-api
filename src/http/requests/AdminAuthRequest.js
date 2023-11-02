import joi from "joi";

import { badRequest } from "../middlewares/handle_error";

const AdminAuthRequest = (req, res, next) => {
  const { error } = joi
    .object({
      username: joi.string().required().messages({
        "string.empty": "Tên đăng nhập không được để trống",
        "any.required": "Tên đăng nhập là bắt buộc",
      }),
      password: joi.string().required().messages({
        "string.empty": "Mật khẩu không được để trống",
        "any.required": "Mật khẩu là bắt buộc",
      }),
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
