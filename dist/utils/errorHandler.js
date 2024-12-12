"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class errorHandler extends Error {
    constructor(statusCode, message = "Something went wrong", errors = [], statck = "") {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.success = false;
        this.errors = errors;
        if (statck) {
            this.stack = statck;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = errorHandler;
