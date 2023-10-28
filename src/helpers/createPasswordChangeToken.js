import crypto from "crypto";

const createPasswordChangeToken = (user) => {
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.passwordResetExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
    return resetToken;
  },