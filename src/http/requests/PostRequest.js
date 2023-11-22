import joi from "joi";
import db from "models";
const cloudinary = require("cloudinary").v2;
import PostStatusEnum from "enums/PostStatusEnum";

const PostRequest = (req, res, next) => {
  const fileData = req?.body?.photo?.file;
  const rules = {
    title: joi
      .string()
      .required()
      .min(5)
      .max(100)
      .trim()
      .pattern(/^[a-zA-Z0-9 ]+$/)
      .messages({
        "string.base": "Tên bài viết phải là chuỗi",
        "string.empty": "Tên bài viết không được để trống",
        "any.required": "Tên bài viết là bắt buộc",
        "string.min": "Tên bài viết phải có ít nhất 5 ký tự",
        "string.max": "Tên bài viết không được vượt quá 100 ký tự",
        "string.pattern.base": "Tên bài viết không được chứa ký tự đặc biệt",
      }),
    content: joi.string().max(1000).required().messages({
      "string.base": "Nội dung bài viết phải là chuỗi",
      "string.empty": "Nội dung bài viết không được để trống",
      "any.required": "Nội dung bài viết là bắt buộc",
      "string.max": "Nội dung bài viết không được vượt quá 1000 ký tự",
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
      })
      .custom((value, helpers) => {
        // Kiểm tra kích thước file
        const maxSizeInMB = 5;
        const fileSizeInMB = fileData.size / 1024 / 1024;

        if (fileSizeInMB > maxSizeInMB) {
          return helpers.message(`Ảnh phải có kích thước nhỏ hơn ${maxSizeInMB}MB`);
        }

        return value;
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
