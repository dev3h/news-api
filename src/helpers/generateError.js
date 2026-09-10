import createError from "http-errors";

// 400
const badRequest = (err, res) => {
  if (res.headersSent) {
    return;
  }
  const error = createError.BadRequest(err);
  return res.status(error.status).json({
    message: err.message,
  });
};

// 401
const notAuth = (err, res, authError = false) => {
  if (res.headersSent) {
    return;
  }
  const error = createError.Unauthorized(err);
  if (err?.cause) {
    return res.status(error.status).json({
      message: err.message,
      cause: err.cause,
      authError,
    });
  }

  return res.status(error.status).json({
    message: err.message,
    authError: authError,
  });
};

// 403
const forbidden = (err, res) => {
  if (res.headersSent) {
    return;
  }
  const error = createError.Forbidden(err);

  return res.status(error.status).json({
    message: err.message,
  });
};

// 404
const notFoundRoute = (req, res) => {
  if (res.headersSent) {
    return;
  }
  const error = createError.NotFound("Route không tồn tại!");

  return res.status(error.status).json({
    message: error.message,
  });
};

// 500
const internalServerError = (err, res) => {
  if (res.headersSent) {
    return;
  }
  const error = createError.InternalServerError(err);

  return res.status(error.status).json({
    message: err.message,
  });
};

export { internalServerError, badRequest, notFoundRoute, notAuth, forbidden };
