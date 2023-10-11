import createError from "http-errors";

// 500
const internalServerError = (err, res) => {
  const error = createError.InternalServerError(err);

  return res.status(error.status).json({
    mes: error.message,
  });
};

export { internalServerError };
