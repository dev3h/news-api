import crypto from "crypto";

const createPasswordChangeToken = async (user) => {
  const resetToken = crypto.randomBytes(32).toString("hex");
  user.password_reset_token = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.password_reset_token_expired_at = Date.now() + 15 * 60 * 1000; // 15 minutes
  await user.save();

  return resetToken;
};

export default createPasswordChangeToken;
