import joi from "joi";

import { badRequest } from "../middlewares/handle_error";

const AuthRequest = (req, res, next) => {
  const { error } = joi
    .object({
      username: joi.string().required(),
      password: joi.string().required(),
    })
    .validate({
      ...req.body,
    });
  if (error) {
    return badRequest(error.details[0].message, res);
  }
  next();
};
export default AuthRequest;
