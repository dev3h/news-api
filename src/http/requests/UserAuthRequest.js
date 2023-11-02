import joi from "joi";

import { badRequest } from "../middlewares/handle_error";

const UserAuthRequest = (req, res, next) => {
  const rules = {
    email: joi.string().email().required().messages({
      "string.email": "Email không đúng định dạng",
      "string.empty": "Email không được để trống",
      "any.required": "Email là bắt buộc",
    }),
    password: joi.string().required().messages({
      "string.empty": "Mật khẩu không được để trống",
      "any.required": "Mật khẩu là bắt buộc",
    }),
  };
  const { error } = joi.object(rules).validate({
    ...req.body,
  });
  if (error) {
    return res.status(422).json({
      message: error.message,
    });
  }
  next();
};
export default UserAuthRequest;
