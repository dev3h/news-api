import jwt from "jsonwebtoken";

const generateToken = (id) =>
  jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2d",
    }
  );

const generateRefreshToken = (id) =>
  jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

export { generateToken, generateRefreshToken };
