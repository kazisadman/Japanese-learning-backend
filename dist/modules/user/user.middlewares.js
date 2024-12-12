"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRoleAccess = exports.verifyJWT = void 0;
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const errorHandler_1 = __importDefault(require("../../utils/errorHandler"));
const user_model_1 = __importDefault(require("./user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyJWT = (0, asyncHandler_1.default)((req, _, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken) ||
            ((_b = req.header("Authorization")) === null || _b === void 0 ? void 0 : _b.replace("Bearer ", ""));
        if (!token) {
            throw new errorHandler_1.default(401, "Unauthorized request");
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = yield user_model_1.default.findById(decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken._id).select("-password -refresh_token");
        if (!user) {
            throw new errorHandler_1.default(401, "Invalid access token");
        }
        req.user = user;
        next();
    }
    catch (error) {
        throw new errorHandler_1.default(401, "Unauthorized request");
    }
}));
exports.verifyJWT = verifyJWT;
const verifyRoleAccess = (allowedRole) => {
    return (req, res, next) => {
        var _a;
        const roleInDb = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
        if (!(allowedRole === roleInDb)) {
            throw new errorHandler_1.default(403, "Access denied.");
        }
        next();
    };
};
exports.verifyRoleAccess = verifyRoleAccess;
