import { sendValidationError } from "helpers/validationError";

class BaseRequest {
  /**
   * Validate request data
   * @param {Object} schema - Joi schema object
   * @param {Object} data - Data to validate
   * @param {Object} res - Express response object
   * @param {Function} next - Next middleware function
   * @returns {Boolean} True if valid, false if invalid
   */
  static validate(schema, data, res, next) {
    const { error } = schema.validate(data, {
      abortEarly: false, // Collect all errors, not just the first one
      allowUnknown: false,
      stripUnknown: true,
    });

    if (error) {
      sendValidationError(error, res);
      return false;
    }

    next();
    return true;
  }

  /**
   * Create middleware function for validation
   * @param {Object} schema - Joi schema object
   * @returns {Function} Express middleware function
   */
  static middleware(schema) {
    return (req, res, next) => {
      // Clean and prepare data
      const data = this.prepareData(req);

      return this.validate(schema, data, res, next);
    };
  }

  /**
   * Prepare request data (trim strings, etc.)
   * @param {Object} req - Express request object
   * @returns {Object} Cleaned data
   */
  static prepareData(req) {
    const data = { ...req.body };

    // Trim all string values
    Object.keys(data).forEach((key) => {
      if (typeof data[key] === "string") {
        data[key] = data[key].trim();
      }
    });

    return data;
  }
}

export default BaseRequest;
