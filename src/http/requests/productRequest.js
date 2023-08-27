import joi from "joi";
import fs from "fs";
import db from "models";

import { badRequest } from "../middlewares/handle_error";

const productRequest = async (req, res, next) => {
  const fileData = req.file;
  console.log(req.body);
  const rules = {
    name: joi.string().required(),
    group_product_id: joi.number().required(),
  };
  if (req.body.id) rules.id = joi.number().required();
  if (fileData) rules.photo = joi.string().pattern(/\.jpg$|\.png$|\.jpeg$/);
  const { error } = joi.object(rules).validate({
    ...req.body,
  });
  if (error) {
    // Xóa file nếu có lỗi và người dùng đã gửi file hình lên
    if (fileData) fs.unlinkSync(fileData.path);
    return badRequest(error.details[0].message, res);
  }

  next();
};
export default productRequest;
