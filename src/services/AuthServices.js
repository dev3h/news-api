import db from "models";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { generateRefreshToken, generateToken } from "../helpers/jwt";

class AuthService {
  static async login(data) {
    try {
      const response = await db.User.findOne({
        where: { username: data.username },
        raw: true,
      });
      const { password, refreshToken, ...userData } = response;

      // so sánh password truyền vào với password trong db
      const isChecked = response && bcrypt.compareSync(data.password, response?.password);

      const accessToken = isChecked ? generateToken(response?.id) : null;

      const newRefreshToken = isChecked ? generateRefreshToken(response?.id) : null;
      if (refreshToken) {
        await db.User.update(
          { refresh_token: newRefreshToken },
          { where: { id: response?.id } }
        );
      }
      return {
        error: accessToken ? 0 : 1,
        mes: accessToken
          ? "Login success"
          : response
          ? "Wrong password"
          : "username not found",
        accessToken: accessToken ? accessToken : null,
        newRefreshToken: newRefreshToken ? newRefreshToken : null,
        userData: userData ? userData : null,
        status: accessToken ? 200 : 400,
      };
    } catch (error) {
      reject(error);
    }
  }
  static async refreshAccessToken(refreshToken) {
    try {
      const rs = await jwt.verify(refreshToken, process.env.JWT_SECRET);
      const response = await db.User.findOne({
        where: {
          id: rs.id,
          refresh_token: refreshToken,
        },
        raw: true,
      });
      if (!response) throw new Error("Refresh token not found");
      const newAccessToken = generateToken(response.id);
      return {
        error: response ? 0 : 1,
        newAccessToken: response ? newAccessToken : null,
        mes: newAccessToken ? "Refresh token success" : "Refresh token fail",
        status: newAccessToken ? 200 : 400,
      };
    } catch (error) {
      reject(error);
    }
  }
  static async logout(refreshToken) {
    try {
      if (!refreshToken) throw new Error("Refresh token is required");

      const rs = await jwt.verify(refreshToken, process.env.JWT_SECRET);

      const response = await db.User.findOne({
        where: {
          id: rs.id,
          // refresh_token: refreshToken,
        },
        raw: true,
      });
      if (!response)
        return {
          error: 1,
          mes: "Refresh token not found",
          status: 400,
        };
      await db.User.update({ refresh_token: null }, { where: { id: response.id } });
      return {
        error: 0,
        mes: "Logout success",
        status: 200,
      };
    } catch (error) {
      reject(error);
    }
  }
}
export default AuthService;
