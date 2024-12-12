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
exports.lessonController = void 0;
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const errorHandler_1 = __importDefault(require("../../utils/errorHandler"));
const responseHandler_1 = __importDefault(require("../../utils/responseHandler"));
const lesson_service_1 = require("./lesson.service");
const createLesson = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield lesson_service_1.lessonService.createLessonInDb(req.body);
    if (!result) {
        throw new errorHandler_1.default(500, "Something went wrong while creating new lesson.");
    }
    res
        .status(200)
        .json(new responseHandler_1.default(200, true, result, "User registered successfully!"));
}));
const updateLesson = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    const payload = {
        _id,
        data: req.body,
    };
    const result = yield lesson_service_1.lessonService.updateLessonInDb(payload);
    if (!result) {
        throw new errorHandler_1.default(500, "Something went wrong while creating new lesson.");
    }
    res
        .status(200)
        .json(new responseHandler_1.default(200, true, result, "Lesson Updated Successfully"));
}));
const deleteLesson = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    const result = yield lesson_service_1.lessonService.deleteLessonInDb(_id);
    if (!result) {
        throw new errorHandler_1.default(500, "Something went wrong while deleting lesson.");
    }
    res
        .status(200)
        .json(new responseHandler_1.default(200, true, result, "Lesson deleted Successfully"));
}));
const getAllLessons = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.query;
    const result = yield lesson_service_1.lessonService.getAllLessonsFromDb(query || "");
    if (!result) {
        throw new errorHandler_1.default(500, "Something went wrong while deleting lesson.");
    }
    res
        .status(200)
        .json(new responseHandler_1.default(200, true, result, "Lessons Fetched Successfully"));
}));
const getLessonsByNo = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lessonNo } = req.params;
    const result = yield lesson_service_1.lessonService.getLessonsByNoFromDB(Number(lessonNo));
    if (!result) {
        throw new errorHandler_1.default(500, "Something went wrong while deleting lesson.");
    }
    res
        .status(200)
        .json(new responseHandler_1.default(200, true, result, "Lessons Fetched Successfully"));
}));
exports.lessonController = {
    createLesson,
    updateLesson,
    deleteLesson,
    getAllLessons,
    getLessonsByNo,
};
