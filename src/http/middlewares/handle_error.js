import createError from "http-errors";

// nếu không truyền đoạn text vào trong hàm có sẵn của createError thì nó sẽ lấy mặc định của nó

// badRequest là một hàm trả về lỗi 400
const badRequest = (err, res) => {
  const error = createError.BadRequest(err);

  return res.status(error.status).json({
    err: 1,
    mes: err.message,
  });
};

// internalServerError là một hàm trả về lỗi 500
const internalServerError = (err, res) => {
  const error = createError.InternalServerError(err);

  return res.status(error.status).json({
    err: 1,
    mes: err.message,
  });
};

// notFound là một hàm trả về lỗi 404
const notFound = (req, res) => {
  const error = createError.NotFound("This route does not exist!");

  return res.status(error.status).json({
    err: 1,
    mes: error.message,
  });
};

// notAuth là một hàm trả về lỗi 401
const notAuth = (err, res, isExpired) => {
  const error = createError.Unauthorized(err);

  return res.status(error.status).json({
    err: isExpired ? 2 : 1,
    mes: err.message,
  });
};

export { badRequest, internalServerError, notFound, notAuth };
