import joi from "joi";

const CategoryRequest = (req, res, next) => {
  const { error } = joi
    .object({
      name: joi.string().required().messages({
        "string.base": "Tên nhóm phải là chuỗi",
        "string.empty": "Tên nhóm không được để trống",
        "any.required": "Tên nhóm là bắt buộc",
      }),
      group_category_id: joi.required().messages({
        "number.empty": "ID nhóm không được để trống",
        "any.required": "ID nhóm là bắt buộc",
      }),
    })
    .validate({
      ...req.body,
    });
  if (
    error &&
    error.details[0].path[0] === "name" &&
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
export default CategoryRequest;
