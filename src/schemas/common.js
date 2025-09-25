/**
 * Common Schemas used across the application
 */

export const ErrorResponseSchema = {
  type: "object",
  properties: {
    message: {
      type: "string",
      example: "Error message describing what went wrong"
    },
    errors: {
      type: "array",
      items: {
        type: "string"
      },
      example: ["Email is required", "Password must be at least 6 characters"],
      description: "Array of validation error messages"
    },
    statusCode: {
      type: "integer",
      example: 400,
      description: "HTTP status code"
    }
  }
};

export const SuccessResponseSchema = {
  type: "object",
  properties: {
    message: {
      type: "string",
      example: "Operation completed successfully"
    },
    data: {
      type: "object",
      description: "Response data (varies by endpoint)"
    }
  }
};

export const PaginationSchema = {
  type: "object",
  properties: {
    currentPage: {
      type: "integer",
      example: 1,
      description: "Current page number"
    },
    totalPages: {
      type: "integer",
      example: 10,
      description: "Total number of pages"
    },
    totalItems: {
      type: "integer",
      example: 100,
      description: "Total number of items"
    },
    itemsPerPage: {
      type: "integer",
      example: 10,
      description: "Number of items per page"
    },
    hasNextPage: {
      type: "boolean",
      example: true,
      description: "Whether there is a next page"
    },
    hasPrevPage: {
      type: "boolean",
      example: false,
      description: "Whether there is a previous page"
    }
  }
};

export const ValidationErrorResponseSchema = {
  type: "object",
  properties: {
    message: {
      type: "string",
      example: "Validation failed"
    },
    errors: {
      type: "object",
      properties: {
        email: {
          type: "array",
          items: {
            type: "string"
          },
          example: ["Email is required", "Email must be valid"]
        },
        password: {
          type: "array",
          items: {
            type: "string"
          },
          example: ["Password is required", "Password must be at least 6 characters"]
        }
      },
      description: "Field-specific validation errors"
    },
    statusCode: {
      type: "integer",
      example: 422
    }
  }
};

export const UnauthorizedResponseSchema = {
  type: "object",
  properties: {
    message: {
      type: "string",
      example: "Unauthorized access"
    },
    statusCode: {
      type: "integer",
      example: 401
    }
  }
};

export const ForbiddenResponseSchema = {
  type: "object",
  properties: {
    message: {
      type: "string",
      example: "Access forbidden - insufficient permissions"
    },
    statusCode: {
      type: "integer",
      example: 403
    }
  }
};

export const NotFoundResponseSchema = {
  type: "object",
  properties: {
    message: {
      type: "string",
      example: "Resource not found"
    },
    statusCode: {
      type: "integer",
      example: 404
    }
  }
};

export const ServerErrorResponseSchema = {
  type: "object",
  properties: {
    message: {
      type: "string",
      example: "Internal server error"
    },
    statusCode: {
      type: "integer",
      example: 500
    }
  }
};