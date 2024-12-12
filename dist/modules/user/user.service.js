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
exports.userService = void 0;
const errorHandler_1 = __importDefault(require("../../utils/errorHandler"));
const user_model_1 = __importDefault(require("./user.model"));
const findUserInDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findOne({ email: payload });
    return result;
});
const findUserByIdInDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findById({ _id: payload }).select("-password -accessToken");
    return result;
});
const createUserInDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.create(payload);
    if (result) {
        const userInfo = yield user_model_1.default.findById(result._id).select("-password -accessToken");
        return userInfo;
    }
    else {
        throw new errorHandler_1.default(500, "Something went wrong while registering user");
    }
});
const logOutUserFromDb = (paylaod) => __awaiter(void 0, void 0, void 0, function* () {
    const result = user_model_1.default.findByIdAndUpdate(paylaod, {
        $unset: {
            accessToken: 1,
        },
    }, {
        new: true,
    });
    return result;
});
const getAllUserFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_model_1.default.find().select("-password -accessToken");
    return data;
});
const updateRoleInDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findByIdAndUpdate(payload, [
        {
            $set: {
                role: { $cond: [{ $eq: ["$role", "user"] }, "admin", "user"] },
            },
        },
    ], {
        new: true,
        select: "-password -accessToken",
    });
    return result;
});
exports.userService = {
    findUserInDb,
    createUserInDb,
    findUserByIdInDb,
    logOutUserFromDb,
    getAllUserFromDb,
    updateRoleInDb,
};
