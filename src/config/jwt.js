export const JWT_CONFIG = {
    accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || 172800, // 2 days in seconds
    refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || 604800, // 7 days in seconds
}