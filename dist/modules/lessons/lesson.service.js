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
exports.lessonService = void 0;
const lesson_model_1 = __importDefault(require("./lesson.model"));
const createLessonInDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield lesson_model_1.default.create(payload);
    return result;
});
const updateLessonInDb = (_a) => __awaiter(void 0, [_a], void 0, function* ({ _id, data }) {
    const result = yield lesson_model_1.default.findByIdAndUpdate(_id, data, { new: true });
    return result;
});
const deleteLessonInDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield lesson_model_1.default.findByIdAndDelete(payload);
    return data;
});
const getAllLessonsFromDb = (queryTerm) => __awaiter(void 0, void 0, void 0, function* () {
    if (queryTerm) {
        const data = yield lesson_model_1.default.aggregate([
            {
                $search: {
                    index: "Lesson_search",
                    text: {
                        query: queryTerm,
                        path: ["name", "number"],
                    },
                },
            },
        ]);
        return data;
    }
    else {
        const data = yield lesson_model_1.default.aggregate([
            {
                $lookup: {
                    from: "vocabularies",
                    localField: "number",
                    foreignField: "lesson_no",
                    as: "result",
                },
            },
            {
                $addFields: {
                    word_count: {
                        $size: "$result",
                    },
                },
            },
        ]);
        return data;
    }
});
const getLessonsByNoFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(typeof payload);
    const lesson = yield lesson_model_1.default.aggregate([
        {
            $match: {
                number: payload,
            },
        },
        {
            $lookup: {
                from: "vocabularies",
                localField: "number",
                foreignField: "lesson_no",
                as: "words",
            },
        },
    ]);
    return lesson;
});
exports.lessonService = {
    createLessonInDb,
    updateLessonInDb,
    deleteLessonInDb,
    getAllLessonsFromDb,
    getLessonsByNoFromDB,
};
