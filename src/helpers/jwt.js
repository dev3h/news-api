import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "../config/jwt";

const generateToken = ({ id, role = null }) => {
  return jwt.sign(
    {
      id,
      role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: JWT_CONFIG.accessTokenExpiresIn,
    }
  );
};

const generateRefreshToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: JWT_CONFIG.refreshTokenExpiresIn,
    }
  );
};

export { generateToken, generateRefreshToken };
