import createError from "http-errors";

// 400
const badRequest = (err, res) => {
  const error = createError.BadRequest(err);

  return res.status(error.status).json({
    message: err.message,
  });
};

// 401
const notAuth = (err, res) => {
  const error = createError.Unauthorized(err);

  return res.status(error.status).json({
    message: err.message,
  });
};

// 404
const notFoundRoute = (req, res) => {
  const error = createError.NotFound("Route không tồn tại!");

  return res.status(error.status).json({
    message: error.message,
  });
};

// 500
const internalServerError = (err, res) => {
  const error = createError.InternalServerError(err);

  return res.status(error.status).json({
    message: err.message,
  });
};

export { internalServerError, badRequest, notFoundRoute, notAuth };
