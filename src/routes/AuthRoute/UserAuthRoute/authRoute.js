import express from "express";
import UserAuthController from "http/controllers/AuthController/UserAuthController";
import UserAuthRequest from "http/requests/UserAuthRequest";
import { verifyAccessToken } from "http/middlewares/verifyToken";

const router = express.Router();

router.put("/final-register/:token", (req, res, next) => {
  /*
    #swagger.tags = ['User Auth']
    #swagger.summary = 'Verify user registration'
    #swagger.description = 'Complete user registration with the email verification token'
    #swagger.parameters['token'] = {
        in: 'path',
        name: 'token',
        required: true,
        description: 'Email verification token',
        schema: { type: 'string' }
    }
    #swagger.responses[200] = {
        description: 'Registration verified successfully',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Xác minh email thành công. Vui lòng đăng nhập lại' }
                    }
                }
            }
        }
    }
    #swagger.responses[400] = {
        description: 'Invalid token',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/ErrorResponseSchema"
                }
            }
        }
    }
  */
  return UserAuthController.verifyRegister(req, res, next);
});

router.get("/forgot-password", (req, res, next) => {
  /*
    #swagger.tags = ['User Auth']
    #swagger.summary = 'Forgot password'
    #swagger.description = 'Send password reset link to the user email'
    #swagger.parameters['email'] = {
        in: 'query',
        name: 'email',
        required: true,
        description: 'Registered user email',
        schema: { type: 'string', format: 'email', example: 'user@example.com' }
    }
    #swagger.responses[200] = {
        description: 'Reset link sent successfully',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Vui lòng kiểm tra email để đổi mật khẩu' }
                    }
                }
            }
        }
    }
    #swagger.responses[400] = {
        description: 'Email not provided or not registered',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/ErrorResponseSchema"
                }
            }
        }
    }
  */
  return UserAuthController.forgotPassword(req, res, next);
});

router.put("/reset-password", (req, res, next) => {
  /*
    #swagger.tags = ['User Auth']
    #swagger.summary = 'Reset password'
    #swagger.description = 'Reset user password with the reset token'
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    required: ['token', 'email', 'password'],
                    properties: {
                        token: { type: 'string', description: 'Password reset token from the reset link' },
                        email: { type: 'string', format: 'email' },
                        password: { type: 'string', minLength: 6 }
                    }
                }
            }
        }
    }
    #swagger.responses[200] = {
        description: 'Password reset successfully',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Đổi mật khẩu thành công' }
                    }
                }
            }
        }
    }
    #swagger.responses[400] = {
        description: 'Invalid or expired token',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/ErrorResponseSchema"
                }
            }
        }
    }
  */
  return UserAuthController.resetPassword(req, res, next);
});

router.get("/logout", (req, res, next) => {
  /*
    #swagger.tags = ['User Auth']
    #swagger.summary = 'User logout'
    #swagger.description = 'Logout user by clearing the refresh token cookie'
    #swagger.responses[200] = {
        description: 'Logout successful',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Logout thành công' }
                    }
                }
            }
        }
    }
  */
  return UserAuthController.logout(req, res, next);
});

router.get("/current", verifyAccessToken, (req, res, next) => {
  /*
    #swagger.tags = ['User Auth']
    #swagger.summary = 'Get current user'
    #swagger.description = 'Retrieve current authenticated user information'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
        description: 'Current user data',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        data: { type: 'object' }
                    }
                }
            }
        }
    }
    #swagger.responses[401] = {
        description: 'Missing or invalid access token',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/UnauthorizedResponseSchema"
                }
            }
        }
    }
  */
  return UserAuthController.getCurrent(req, res, next);
});

router.put("/update-password", verifyAccessToken, (req, res, next) => {
  /*
    #swagger.tags = ['User Auth']
    #swagger.summary = 'Update password'
    #swagger.description = 'Update the authenticated user password'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    required: ['password', 'new_password'],
                    properties: {
                        password: { type: 'string', description: 'Current password' },
                        new_password: { type: 'string', minLength: 6, description: 'New password' }
                    }
                }
            }
        }
    }
    #swagger.responses[200] = {
        description: 'Password updated successfully',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Đổi mật khẩu thành công' }
                    }
                }
            }
        }
    }
    #swagger.responses[400] = {
        description: 'Current password is incorrect',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/ErrorResponseSchema"
                }
            }
        }
    }
    #swagger.responses[401] = {
        description: 'Missing or invalid access token',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/UnauthorizedResponseSchema"
                }
            }
        }
    }
  */
  return UserAuthController.updatePassword(req, res, next);
});

router.post("/refresh-token", (req, res, next) => {
  /*
    #swagger.tags = ['User Auth']
    #swagger.summary = 'Refresh access token'
    #swagger.description = 'Generate new access token using the refreshTokenUser cookie'
    #swagger.responses[200] = {
        description: 'Token refreshed successfully',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        accessToken: { type: 'string' },
                        message: { type: 'string', example: 'Refresh token thành công' }
                    }
                }
            }
        }
    }
    #swagger.responses[400] = {
        description: 'Refresh token is missing or invalid',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/ErrorResponseSchema"
                }
            }
        }
    }
  */
  return UserAuthController.refreshAccessToken(req, res, next);
});

router.use(UserAuthRequest);

router.post("/register", (req, res, next) => {
  /*
    #swagger.tags = ['User Auth']
    #swagger.summary = 'User registration'
    #swagger.description = 'Register a new user account (verification email is sent to the provided address)'
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    required: ['email', 'password', 'name'],
                    properties: {
                        email: { type: 'string', format: 'email', example: 'user@example.com' },
                        password: { type: 'string', minLength: 6 },
                        name: { type: 'string', example: 'Nguyen Van A' }
                    }
                }
            }
        }
    }
    #swagger.responses[200] = {
        description: 'Registration email sent',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Vui lòng kiểm tra email để hoàn tất đăng ký' }
                    }
                }
            }
        }
    }
    #swagger.responses[422] = {
        description: 'Validation failed',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/ValidationErrorResponseSchema"
                }
            }
        }
    }
  */
  return UserAuthController.register(req, res, next);
});

router.post("/login", (req, res, next) => {
  /*
    #swagger.tags = ['User Auth']
    #swagger.summary = 'User login'
    #swagger.description = 'Authenticate user and return access token'
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: { type: 'string', format: 'email', example: 'user@example.com' },
                        password: { type: 'string', example: 'Abcd1234@' }
                    }
                }
            }
        }
    }
    #swagger.responses[200] = {
        description: 'Login successful',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        accessToken: { type: 'string' },
                        message: { type: 'string', example: 'Đăng nhập thành công' },
                        data: { type: 'object' }
                    }
                }
            }
        }
    }
    #swagger.responses[400] = {
        description: 'Invalid credentials',
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/ErrorResponseSchema"
                }
            }
        }
    }
  */
  return UserAuthController.login(req, res, next);
});

export default router;