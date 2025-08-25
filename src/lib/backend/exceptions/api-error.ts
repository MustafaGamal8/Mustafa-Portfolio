export interface ApiErrorDetails {
  field?: string;
  reason?: string;
  suggestion?: string;
  timestamp?: string;
  path?: string;
  [key: string]: any;
}

export class ApiError extends Error {
  public timestamp: string;

  constructor(
    public statusCode: number,
    message: string,
    public code?: string,
    public details?: ApiErrorDetails | ApiErrorDetails[]
  ) {
    super(message);
    this.name = 'ApiError';
    this.timestamp = new Date().toISOString();
  }

  static notFound(message = 'Resource not found', details?: ApiErrorDetails) {
    return new ApiError(404, message, 'NOT_FOUND', {
      ...details,
      suggestion: details?.suggestion || 'Please verify the requested resource exists'
    });
  }

  static badRequest(message: string, details?: ApiErrorDetails) {
    return new ApiError(400, message, 'BAD_REQUEST', {
      ...details,
      suggestion: details?.suggestion || 'Please check your request parameters'
    });
  }

  static conflict(message: string, details?: ApiErrorDetails) {
    return new ApiError(409, message, 'CONFLICT', {
      ...details,
      suggestion: details?.suggestion || 'Please resolve the conflict before retrying'
    });
  }

  static unauthorized(message = 'Unauthorized access', details?: ApiErrorDetails) {
    return new ApiError(401, message, 'UNAUTHORIZED', {
      ...details,
      suggestion: details?.suggestion || 'Please provide valid authentication credentials'
    });
  }

  static forbidden(message = 'Access forbidden', details?: ApiErrorDetails) {
    return new ApiError(403, message, 'FORBIDDEN', {
      ...details,
      suggestion: details?.suggestion || 'You do not have permission to perform this action'
    });
  }

  static validation(errors: Array<{ field: string; message: string }>) {
    return new ApiError(400, 'Validation failed', 'VALIDATION_ERROR', 
      errors.map(error => ({
        field: error.field,
        reason: error.message,
        suggestion: 'Please provide a valid value'
      }))
    );
  }

  static internal(message = 'Internal server error', details?: ApiErrorDetails) {
    return new ApiError(500, message, 'INTERNAL_SERVER_ERROR', {
      ...details,
      suggestion: details?.suggestion || 'Please try again later or contact support if the problem persists'
    });
  }

  toJSON() {
    return {
      error: {
        message: this.message,
        code: this.code,
        statusCode: this.statusCode,
        timestamp: this.timestamp,
        details: this.details
      }
    };
  }
} 