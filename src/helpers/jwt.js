import jwt from "jsonwebtoken";

const generateToken = ({ id, role }) => {
  return jwt.sign(
    {
      id,
      role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2d",
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
      expiresIn: "7d",
    }
  );
};

export { generateToken, generateRefreshToken };
