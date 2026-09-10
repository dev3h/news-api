import db from "models";
import { badRequest, internalServerError } from "helpers/generateError";
import { generateToken, generateRefreshToken } from "helpers/jwt";
import PasswordHelper from "helpers/passwordHelper";
import jwt from "jsonwebtoken";
import RoleSysEnum from "enums/RoleSysEnum";

class AdminAuthService {
  static async login(req, res) {
    const admin = await db.Admin.findOne({
      where: { username: req.body?.username?.trim() },
      raw: true,
    });
    if (!admin) badRequest(new Error("Username không tồn tại"), res);

    const { id, password, role } = admin;

    const isValidPassword = await PasswordHelper.compare(req.body?.password?.trim(), password);
    if (!isValidPassword) badRequest(new Error("Sai mật khẩu"), res);

    const accessToken = isValidPassword ? generateToken({ id, role }) : null;
    const newRefreshToken = isValidPassword ? generateRefreshToken(id) : null;

    await db.Admin.update({ refresh_token: newRefreshToken }, { where: { id } });

    return {
      accessToken,
      refreshToken: newRefreshToken,
      message: "Đăng nhập thành công"
    };
  }
  static async refreshAccessToken(refreshToken) {
    const verifyRefreshToken = await jwt.verify(
      refreshToken,
      process.env.JWT_SECRET
    );
    const admin = await db.Admin.findOne({
      where: {
        id: verifyRefreshToken.id,
        refresh_token: refreshToken
      },
    });

    if (!admin) badRequest(new Error("Refresh token không tồn tại"), res);
    const newAccessToken = generateToken({ id: admin.id, role: admin.role });
    return {
      accessToken: newAccessToken,
      message: "Refresh token thành công",
    };
  }
  static async logout(refreshToken) {
    const verifyRefreshToken = await jwt.verify(
      refreshToken,
      process.env.JWT_SECRET
    );
    const { id } = verifyRefreshToken;
    const response = await db.Admin.findOne({
      where: {
        id,
        refresh_token: cookie.refreshToken,
      },
      raw: true,
    });
    if (!response) badRequest(new Error("Refresh token không tồn tại"), res);
    await db.Admin.update({ refresh_token: null }, { where: { id } });

    return {
      message: "Logout thành công",
    }
  }
  static async checkRole(role) {
    const roleName = RoleSysEnum.getRoleSysName(role);
    return {
      role_id: role,
      role_name: roleName,
    };
  }
  static async getCurrent(id) {
    const user = await db.Admin.findOne({
      where: { id },
      raw: true,
    });
    if (!user) badRequest(new Error("Không tìm thấy user"), res);
    return {
      ...user,
        role: {
          role_id: user.role,
          role_name: RoleSysEnum.getRoleSysName(user.role),
        },
    }
  }
}

export default AdminAuthService;
