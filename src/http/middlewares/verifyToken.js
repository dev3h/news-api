import jwt from "jsonwebtoken";
import { notAuth } from "helpers/generateError";

const verifyAccessToken = (req, res, next) => {
  const token = req?.headers?.authorization;
  if (token?.startsWith("Bearer")) {
    const accessToken = token.split(" ")[1];

    jwt.verify(accessToken, process.env.JWT_SECRET, (err, decode) => {
      if (err) notAuth(err, res);
      req.user = decode;
      next();
    });
  } else {
    notAuth(new Error("Yêu cầu đăng nhập"), res);
  }
};

// const isAdmin = (req, res, next) => {
//   const { role } = req.user;

//   if (role !== "admin" && role !== "sadmin") {
//     console.log("hello");
//     return res
//       .status(401)
//       .json({ success: false, mes: "Require admin or super admin role!" });
//   }

//   next();
// };

export { verifyAccessToken };
