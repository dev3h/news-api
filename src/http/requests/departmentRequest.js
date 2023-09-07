import joi from "joi";

import { badRequest } from "../middlewares/handle_error";

const DepartmentRequest = (req, res, next) => {
  const { error } = joi
    .object({
      name: joi.string().required(),
      company_id: joi.string().required(),
    })
    .validate({
      ...req.body,
    });
  if (error) {
    return badRequest(error.details[0].message, res);
  }
  next();
};
export default DepartmentRequest;
