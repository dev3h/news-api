const joi = require("joi");
const cloudinary = require("cloudinary").v2;

const UploadRequest = async (req, res, next) => {
  const fileData = req.file;
  const rules = {};
  if (fileData)
    rules.photo = joi
      .string()
      .pattern(/\.jpg$|\.png$|\.jpeg$/)
      .messages({
        "string.pattern.base": "Ảnh phải có định dạng jpg, png, jpeg",
      });
  const { error } = joi.object(rules).validate({
    photo: fileData?.path,
  });
  if (error) {
    // Xóa file nếu có lỗi và người dùng đã gửi file hình lên
    if (fileData) cloudinary.uploader.destroy(fileData.filename);
    return res.status(422).json({
      message: error.message,
    });
  }

  next();
};
export default UploadRequest;
