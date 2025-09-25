export const JWT_CONFIG = {
    accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || 60, // 1 minutes
    refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || 604800, // 7 days
}