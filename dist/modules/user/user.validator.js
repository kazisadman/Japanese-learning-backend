"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegistrationValidation = void 0;
const zod_1 = require("zod");
const userRegistrationValidation = zod_1.z.object({
    name: zod_1.z.string().trim(),
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    image: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.userRegistrationValidation = userRegistrationValidation;
