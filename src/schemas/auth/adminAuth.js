export const AdminLoginSchema = {
  $username: "admin",
  $password: "Abcd1234@",
};

export const AdminLoginResponseSchema = {
  accessToken: "eyJdfgdgdInR5cCI6IkpXVCJ9...",
  message: "Login successful",
};

export const RefreshTokenResponseSchema = {
  type: "object",
  properties: {
    message: {
      type: "string",
      example: "Token refreshed successfully"
    },
    data: {
      type: "object",
      properties: {
        accessToken: {
          type: "string",
          example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          description: "New JWT access token"
        }
      }
    }
  }
};

export const AdminCurrentUserResponseSchema = {
  data: {
    username: "admin",
    display_name: "Admin",
    email: "admin@example.com",
    refresh_token: "sdfdsfsdfd....",
    created_at: "2025-09-24T04:19:15.000Z",
    updated_at: "2025-09-24T04:34:33.000Z",
    deleted_at: null,
    role: {
      role_id: 1,
      role_name: "AUTHOR",
    },
  },
};

export const AdminCheckRoleResponseSchema = {
  role_id: 0,
  role_name: "ADMIN"
};

export const AdminLogoutResponseSchema = {
  message: "Logout successful"
}