class ApiError extends Error {
    constructor(message, statusCode, errors = []) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'ApiError';
        this.errors = errors;
        this.success = false;
        this.data = null;
    }

    static badRequest(message, errors = []) {
        return new ApiError(message, 400, errors);
    }

    static unauthorized(message, errors = []) {
        return new ApiError(message, 401, errors);
    }

    static forbidden(message, errors = []) {
        return new ApiError(message, 403, errors);
    }

    static notFound(message, errors = []) {
        return new ApiError(message, 404, errors);
    }

    static internalServerError(message, errors = []) {
        return new ApiError(message, 500, errors);
    }
}

export  {ApiError};
