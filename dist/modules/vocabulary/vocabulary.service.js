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
exports.VocabularyService = void 0;
const vocabulary_model_1 = __importDefault(require("./vocabulary.model"));
const createVocabularyInDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield vocabulary_model_1.default.create(payload);
    return result;
});
const updateVocabularyInDb = (_a) => __awaiter(void 0, [_a], void 0, function* ({ _id, data }) {
    const result = yield vocabulary_model_1.default.findByIdAndUpdate(_id, data, { new: true });
    return result;
});
const deleteVocabularyInDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield vocabulary_model_1.default.findByIdAndDelete(payload);
    return data;
});
const getAllVocabularysFromDb = (queryTerm) => __awaiter(void 0, void 0, void 0, function* () {
    if (queryTerm) {
        const data = yield vocabulary_model_1.default.aggregate([
            {
                $search: {
                    index: "Vocabulary_search",
                    text: {
                        query: queryTerm,
                        path: ["pronunciation"],
                    },
                },
            },
        ]);
        return data;
    }
    else {
        const data = yield vocabulary_model_1.default.find();
        return data;
    }
});
exports.VocabularyService = {
    createVocabularyInDb,
    updateVocabularyInDb,
    deleteVocabularyInDb,
    getAllVocabularysFromDb,
};
