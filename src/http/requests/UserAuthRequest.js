import joi from "joi";
import passwordRule from "rule/PasswordRule";

const UserAuthRequest = (req, res, next) => {
  const commonRules = {
    email: joi
      .string()
      .max(50)
      .trim()
      .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
      .required()
      .messages({
        "string.empty": "Email là bắt buộc",
        "any.required": "Email là bắt buộc",
        "string.max": "Email phải có tối đa 50 ký tự",
        "string.pattern.base": "Email không đúng định dạng",
      }),
    ...passwordRule(),
  };
  const registrationRules = {
    name: joi.string().max(50).trim().required().messages({
      "string.empty": "Name là bắt buộc",
      "any.required": "Name là bắt buộc",
      "string.max": "Name phải có tối đa 50 ký tự",
    }),
  };
  const rules =
    req.path === "/register" ? { ...commonRules, ...registrationRules } : commonRules;
  const dataToValidate = { ...req.body };
  dataToValidate.email = dataToValidate.email?.trim();
  dataToValidate.password = dataToValidate.password?.trim();
  if (req.path === "/register") {
    dataToValidate.name = dataToValidate.name?.trim();
  }
  const { error } = joi.object(rules).validate(dataToValidate);
  if (error) {
    return res.status(422).json({
      message: error.message,
    });
  }
  next();
};
export default UserAuthRequest;
