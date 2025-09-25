import bcrypt from "bcryptjs";

export class PasswordHelper {
  /**
   * Hash password
   * @param {string} plainPassword
   * @param {number} saltRounds
   * @returns {Promise<string>}
   */
  static async hash(plainPassword, saltRounds = 10) {
    const salt = bcrypt.genSaltSync(saltRounds);
    return await bcrypt.hash(plainPassword, salt);
  }

  /**
   * Compare password with hash
   * @param {string} plainPassword
   * @param {string} hashedPassword
   * @returns {Promise<boolean>}
   */
  static async compare(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

export default PasswordHelper;
