import joi from "joi";

const ManagerAuthorRequest = (req, res, next) => {
  const { error } = joi
    .object({
      username: joi.string().required().messages({
        "string.base": "Tên đăng nhập phải là chuỗi",
        "string.empty": "Tên đăng nhập không được để trống",
        "any.required": "Tên đăng nhập là bắt buộc",
      }),
      email: joi.string().email().required().messages({
        "string.base": "Email phải là chuỗi",
        "string.empty": "Email không được để trống",
        "string.email": "Email không hợp lệ",
        "any.required": "Email là bắt buộc",
      }),
    })
    .validate({
      ...req.body,
    });
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
