import joi from "joi";
import RoleSysEnum from "enums/RoleSysEnum";

const ManagerAuthorRequest = (req, res, next) => {
  const { role } = req.body;
  const rules = {
    username: joi.string().required().messages({
      "string.base": "Tên đăng nhập phải là chuỗi",
      "string.empty": "Tên đăng nhập không được để trống",
      "any.required": "Tên đăng nhập là bắt buộc",
    }),
    display_name: joi.string().required().messages({
      "string.base": "Tên hiển thị phải là chuỗi",
      "string.empty": "Tên hiển thị không được để trống",
      "any.required": "Tên hiển thị là bắt buộc",
    }),
    email: joi.string().email().required().messages({
      "string.base": "Email phải là chuỗi",
      "string.empty": "Email không được để trống",
      "string.email": "Email không hợp lệ",
      "any.required": "Email là bắt buộc",
    }),
  };
  if (role) {
    rules.role = joi
      .required()
      .custom((value, helper) => {
        if (!Object.values(RoleSysEnum).includes(+value))
          return helper.message("Role không hợp lệ");
        return true;
      })
      .messages({
        "any.required": "Role là bắt buộc",
      });
  }
  const dataToValidate = { ...req.body };
  if (role) {
    dataToValidate.role = +role;
  }
  const { error } = joi.object(rules).validate(dataToValidate);
  if (
    error &&
    error.details[0].path[0] === "username" &&
    error.details[0].type === "any.required" &&
    req.method === "PUT"
  ) {
    // Nếu là phương thức PUT và không có sửa đổi tên, bỏ qua lỗi required
    next();
  } else if (error) {
    return res.status(422).json({
      message: error.message,
    });
  }
  next();
};
export default ManagerAuthorRequest;
