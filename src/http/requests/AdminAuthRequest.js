import joi from "joi";
import passwordRule from "rule/PasswordRule";
import BaseRequest from "./BaseRequest";

class AdminAuthReq extends BaseRequest {
  static getSchema() {
    const usenamePattern = /^[a-zA-Z0-9]+$/;
    return joi.object({
      username: joi.string().required().min(3).max(50).pattern(usenamePattern).messages({
        "string.empty": "Username là bắt buộc",
        "any.required": "Username là bắt buộc",
        "string.min": "Username phải có ít nhất 3 ký tự",
        "string.max": "Username không được vượt quá 50 ký tự",
        "string.pattern.base": "Username không được chứa ký tự đặc biệt",
      }),
      ...passwordRule(),
    });
  }

  static validate(req, res, next) {
    const schema = this.getSchema();
    const data = this.prepareData(req);
    return super.validate(schema, data, res, next);
  }
}

const AdminAuthRequest = (req, res, next) => {
  return AdminAuthReq.validate(req, res, next);
};
export default AdminAuthRequest;
