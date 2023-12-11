import joi from "joi";
import passwordRule from "rule/PasswordRule";

const UserAuthRequest = (req, res, next) => {
  const rules = {
    email: joi
      .string()
      .max(50)
      .trim()
      .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
      .required()
      .messages({
        "string.empty": "Email không được để trống",
        "any.required": "Email là bắt buộc",
        "string.max": "Email không được quá 50 ký tự",
        "string.pattern.base": "Email không đúng định dạng",
      }),
    ...passwordRule(),
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
