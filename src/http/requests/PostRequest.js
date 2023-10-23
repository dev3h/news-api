import joi from "joi";
const cloudinary = require("cloudinary").v2;

const PostRequest = (req, res, next) => {
  const fileData = req?.photo?.file;
  const rules = {
    title: joi.string().required().messages({
      "string.base": "Tên bài viết phải là chuỗi",
      "string.empty": "Tên bài viết không được để trống",
      "any.required": "Tên bài viết là bắt buộc",
    }),
    category_id: joi.required().messages({
      "number.empty": "ID danh mục không được để trống",
      "any.required": "ID danh mục là bắt buộc",
    }),
    photo: joi
      .string()
      .pattern(/\.jpg$|\.png$|\.jpeg$/)
      .messages({
        "string.pattern.base": "Ảnh phải có định dạng jpg, png, jpeg",
      }),
  };
  if (fileData) {
    rules.photo = joi
      .string()
      .pattern(/\.jpg$|\.png$|\.jpeg$/)
      .messages({
        "string.pattern.base": "Ảnh phải có định dạng jpg, png, jpeg",
      });
  }
  const { error } = joi.object(rules).validate({
    ...req.body,
    photo: fileData?.response?.data?.path,
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
    if (fileData) cloudinary.uploader.destroy(fileData.filename);
    return res.status(422).json({
      message: error.message,
    });
  }
  next();
};
export default PostRequest;
