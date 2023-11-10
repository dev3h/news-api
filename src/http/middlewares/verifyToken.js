import jwt from "jsonwebtoken";
import { notAuth } from "helpers/generateError";

const verifyAccessToken = (req, res, next) => {
  const token = req?.headers?.authorization;
  if (token?.startsWith("Bearer")) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, decode) => {
      if (err) notAuth(new Error("Access Token không hợp lệ"), res);
      else {
        req.user = decode;
        next();
      }
    });
  } else {
    notAuth(new Error("Yêu cầu đăng nhập"), res);
  }
};

export { verifyAccessToken };
