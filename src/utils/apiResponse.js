class APIResponse {
    constructor(statusCode, data, message) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
    }

    static success(data, message = 'Success') {
        return new APIResponse(200, data, message);
    }

    static error(statusCode, message) {
        return new APIResponse(statusCode, null, message);
    }

    toJSON() {
        return {
            statusCode: this.statusCode,
            data: this.data,
            message: this.message,
        };
    }
}
