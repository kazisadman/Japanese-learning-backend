"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class responseHandler {
    constructor(statusCode, success, data, message) {
        this.statusCode = statusCode;
        this.success = success;
        this.data = data;
        this.message = message;
    }
}
exports.default = responseHandler;
