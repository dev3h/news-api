import joi from "joi";
import passwordRule from "rule/PasswordRule";

const UserAuthRequest = (req, res, next) => {
  const rules = {
    email: joi.string().email().required().messages({
      "string.email": "Email không đúng định dạng",
      "string.empty": "Email không được để trống",
      "any.required": "Email là bắt buộc",
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
