/**
 * Format validation errors to Laravel-like structure
 * @param {Object} joiError - Joi validation error object
 * @returns {Object} Formatted error response
 */
export const formatValidationError = (joiError) => {
  const errors = {};

  joiError.details.forEach((detail) => {
    const field = detail.path.join(".");
    const message = detail.message;

    if (!errors[field]) {
      errors[field] = [];
    }

    errors[field].push(message);
  });

  return {
    message: joiError.details[0]?.message || "The given data was invalid.",
    errors: errors,
  };
};

/**
 * Send validation error response
 * @param {Object} joiError - Joi validation error object
 * @param {Object} res - Express response object
 * @returns {Object} Response
 */
export const sendValidationError = (joiError, res) => {
  const formattedError = formatValidationError(joiError);

  return res.status(422).json(formattedError);
};

/**
 * Create validation error manually
 * @param {Object} errors - Object with field: [messages] structure
 * @param {Object} res - Express response object
 * @returns {Object} Response
 */
export const sendCustomValidationError = (errors, res) => {
  return res.status(422).json({
    message: "The given data was invalid.",
    errors: errors,
  });
};

export default {
  formatValidationError,
  sendValidationError,
  sendCustomValidationError,
};
