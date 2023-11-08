import joi from "joi";
import db from "models";
const cloudinary = require("cloudinary").v2;
import PostStatusEnum from "enums/PostStatusEnum";

const PostRequest = (req, res, next) => {
  const fileData = req?.body?.photo?.file;
  const rules = {
    title: joi.string().required().messages({
      "string.base": "Tên bài viết phải là chuỗi",
      "string.empty": "Tên bài viết không được để trống",
      "any.required": "Tên bài viết là bắt buộc",
    }),
    content: joi.string().required().messages({
      "string.base": "Nội dung bài viết phải là chuỗi",
      "string.empty": "Nội dung bài viết không được để trống",
      "any.required": "Nội dung bài viết là bắt buộc",
    }),
    status: joi
      .required()
      .custom((value, helper) => {
        if (!Object.values(PostStatusEnum).includes(+value))
          return helper.message("Trạng thái không hợp lệ");
        return true;
      })
      .messages({
        "any.required": "Trạng thái là bắt buộc",
      }),
    category_id: joi
      .required()
      .custom((value, helper) => {
        if (!db.Category.findByPk(+value))
          return helper.message("ID danh mục không tồn tại");
        return true;
      })
      .messages({
        "number.empty": "ID danh mục không được để trống",
        "any.required": "ID danh mục là bắt buộc",
      }),
  };
  if (fileData) {
    rules.photo = joi
      .string()
      .pattern(/\.jpg$|\.png$|\.jpeg$/)
      .messages({
        "string.base": "Ảnh phải là chuỗi",
        "string.pattern.base": "Ảnh phải có định dạng jpg, png, jpeg",
      });
  }
  if (req.body.published_at) {
    // nếu có phải check xem ngày có lớn hơn ngày hiện tại không, thời gian cũng thế
    rules.published_at = joi.date().greater("now").messages({
      "date.greater": "Ngày đăng bài phải lớn hơn ngày hiện tại",
    });
  }
  if (req.body.tags) {
    rules.tags = joi.custom((tags, helper) => {
      if (tags.length > 0) {
        const checkTags = tags.map((tag) => {
          return db.Tag.findByPk(+tag);
        });
        if (checkTags.includes(null)) return helper.message("ID thẻ không tồn tại");
      }
      return true;
    });
  }
  const dataToValidate = { ...req.body };
  if (fileData?.response?.data?.path) {
    dataToValidate.photo = fileData.response.data.path;
  }
  const { error } = joi.object(rules).validate(dataToValidate);
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
