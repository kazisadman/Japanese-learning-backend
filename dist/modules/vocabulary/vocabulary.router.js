"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_middlewares_1 = require("../user/user.middlewares");
const vocabulary_controller_1 = require("./vocabulary.controller");
const router = express_1.default.Router();
router.post("/", user_middlewares_1.verifyJWT, (0, user_middlewares_1.verifyRoleAccess)("admin"), vocabulary_controller_1.vocabularyController.createVocabulary);
router.get("/", user_middlewares_1.verifyJWT, (0, user_middlewares_1.verifyRoleAccess)("admin"), vocabulary_controller_1.vocabularyController.getAllVocabularys);
router.delete("/:_id", user_middlewares_1.verifyJWT, (0, user_middlewares_1.verifyRoleAccess)("admin"), vocabulary_controller_1.vocabularyController.deleteVocabulary);
router.patch("/:_id", user_middlewares_1.verifyJWT, (0, user_middlewares_1.verifyRoleAccess)("admin"), vocabulary_controller_1.vocabularyController.updateVocabulary);
exports.default = router;
