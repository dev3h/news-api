import joi from "joi";
import fs from "fs";

import { badRequest } from "../middlewares/handle_error";

const DocumentUploadRequest = (req, res, next) => {
  const fileData = req.file;
  const { error } = joi
    .object({
      data_excel: joi.string().pattern(/\.xlsx$/),
    })
    .validate({
      ...req.body,
    });
  if (error) {
    return badRequest(error.details[0].message, res);
  } else if (
    fileData.mimetype !==
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    fs.unlinkSync(fileData.path);
    return badRequest("File không hợp lệ. Vui lòng tải lên một file Excel (.xlsx).", res);
  }
  next();
};
export default DocumentUploadRequest;
