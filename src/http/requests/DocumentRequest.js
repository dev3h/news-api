import joi from "joi";

import { badRequest } from "../middlewares/handle_error";

const DocumentRequest = (req, res, next) => {
  const { error } = joi
    .object({
      document_import: joi.string().required(),
      product_info: joi.array().items(
        joi.object({
          id: joi.string().required(),
          quantity: joi.number().required(),
          price: joi.number().required(),
        })
      ),
    })
    .validate({
      ...req.body,
    });
  if (error) {
    return badRequest(error.details[0].message, res);
  }
  next();
};
export default DocumentRequest;
