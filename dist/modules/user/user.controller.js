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
exports.userController = void 0;
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const errorHandler_1 = __importDefault(require("../../utils/errorHandler"));
const responseHandler_1 = __importDefault(require("../../utils/responseHandler"));
const user_service_1 = require("./user.service");
const user_validator_1 = require("./user.validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateAccessToken = (_id, email, role) => {
    return jsonwebtoken_1.default.sign({
        _id,
        email,
        role,
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
};
const registerUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, image, password } = req.body;
    console.log(image);
    if ([name, email, image, password].some((input) => (input === null || input === void 0 ? void 0 : input.trim()) === "")) {
        throw new errorHandler_1.default(400, "Input field is empty");
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const userInfo = { name, email, image, password: hashedPassword };
    const validatedData = user_validator_1.userRegistrationValidation.parse(userInfo);
    const matchUser = yield user_service_1.userService.findUserInDb(validatedData.email);
    if (matchUser) {
        throw new errorHandler_1.default(409, "Username or email already exits.");
    }
    const createUser = yield user_service_1.userService.createUserInDb(validatedData);
    const accessToken = generateAccessToken(createUser === null || createUser === void 0 ? void 0 : createUser._id, createUser === null || createUser === void 0 ? void 0 : createUser.email, createUser === null || createUser === void 0 ? void 0 : createUser.role);
    const options = {
        httpOnly: true,
        secure: true,
    };
    res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json(new responseHandler_1.default(200, true, createUser, "User registered successfully!"));
}));
const loginUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const matchedUser = yield user_service_1.userService.findUserInDb(email);
    if (!matchedUser) {
        throw new errorHandler_1.default(404, "User do not exist.");
    }
    const encryptedPassword = matchedUser === null || matchedUser === void 0 ? void 0 : matchedUser.password;
    const isPasswordCorrect = yield bcrypt_1.default.compare(password, encryptedPassword);
    if (!isPasswordCorrect) {
        throw new errorHandler_1.default(401, "Password is incorrect.");
    }
    const accessToken = generateAccessToken(matchedUser === null || matchedUser === void 0 ? void 0 : matchedUser._id, matchedUser === null || matchedUser === void 0 ? void 0 : matchedUser.email, matchedUser === null || matchedUser === void 0 ? void 0 : matchedUser.role);
    const loginUserInfo = yield user_service_1.userService.findUserByIdInDb(matchedUser === null || matchedUser === void 0 ? void 0 : matchedUser._id);
    const options = {
        httpOnly: true,
        secure: true,
    };
    res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json(new responseHandler_1.default(200, true, loginUserInfo, "User logedin successfully!"));
}));
const logOutUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    yield user_service_1.userService.logOutUserFromDb(userId);
    const options = {
        httpOnly: true,
        secure: true,
    };
    res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new responseHandler_1.default(200, true, {}, "User logged out successfully"));
}));
const getAllUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.getAllUserFromDb();
    if (!result) {
        throw new errorHandler_1.default(500, "Something went wrong while deleting lesson.");
    }
    res
        .status(200)
        .json(new responseHandler_1.default(200, true, result, "User Fetched Successfully"));
}));
const updateRole = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    const result = yield user_service_1.userService.updateRoleInDb(_id);
    if (!result) {
        throw new errorHandler_1.default(500, "Something went wrong while updating user Role.");
    }
    const accessToken = generateAccessToken(result === null || result === void 0 ? void 0 : result._id, result === null || result === void 0 ? void 0 : result.email, result === null || result === void 0 ? void 0 : result.role);
    const options = {
        httpOnly: true,
        secure: true,
    };
    res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json(new responseHandler_1.default(200, true, result, "Role Updated Successfully"));
}));
const checkAuth = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = req.user;
    res
        .status(200)
        .json(new responseHandler_1.default(200, true, userInfo, "Role Updated Successfully"));
}));
exports.userController = {
    registerUser,
    loginUser,
    logOutUser,
    getAllUser,
    updateRole,
    checkAuth,
};
