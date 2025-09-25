import db from "models";
import { badRequest, internalServerError } from "helpers/generateError";
import { generateToken, generateRefreshToken } from "helpers/jwt";
import RoleSysEnum from "enums/RoleSysEnum";
import PasswordHelper from "helpers/passwordHelper";

class AdminAuthService {
  static async login(req, res) {
    try {
      const admin = await db.Admin.findOne({
        where: { username: req.body?.username?.trim() },
        raw: true,
      });
      if (!admin) badRequest(new Error("Username không tồn tại"), res);

      const { id, password, role, ...rest } = admin;

      const isValidPassword = await PasswordHelper.compare(req.body?.password?.trim(), password);
      const accessToken = isValidPassword ? generateToken({ id, role }) : null;

      const newRefreshToken = isValidPassword ? generateRefreshToken(id) : null;

      await db.Admin.update({ refresh_token: newRefreshToken }, { where: { id } });

      if (newRefreshToken) {
        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
      }
      if (!accessToken) badRequest(new Error("Sai mật khẩu"), res);
      return res.status(200).json({
        accessToken,
        data: {
          ...rest,
          role: {
            role_id: role,
            role_name: RoleSysEnum.getRoleSysName(role),
          },
        },
        message: "Đăng nhập thành công",
      });
    } catch (error) {
      internalServerError(error, res);
    }
  }
}

export default AdminAuthService;
