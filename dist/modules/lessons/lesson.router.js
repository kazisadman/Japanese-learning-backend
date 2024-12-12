"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lesson_controller_1 = require("./lesson.controller");
const user_middlewares_1 = require("../user/user.middlewares");
const router = express_1.default.Router();
router.post("/", user_middlewares_1.verifyJWT, (0, user_middlewares_1.verifyRoleAccess)("admin"), lesson_controller_1.lessonController.createLesson);
router.get("/", user_middlewares_1.verifyJWT, (0, user_middlewares_1.verifyRoleAccess)("user"), lesson_controller_1.lessonController.getAllLessons);
router.get("/admin/", user_middlewares_1.verifyJWT, (0, user_middlewares_1.verifyRoleAccess)("admin"), lesson_controller_1.lessonController.getAllLessons);
router.get("/:lessonNo", user_middlewares_1.verifyJWT, (0, user_middlewares_1.verifyRoleAccess)("user"), lesson_controller_1.lessonController.getLessonsByNo);
router.delete("/:_id", user_middlewares_1.verifyJWT, (0, user_middlewares_1.verifyRoleAccess)("admin"), lesson_controller_1.lessonController.deleteLesson);
router.patch("/:_id", user_middlewares_1.verifyJWT, (0, user_middlewares_1.verifyRoleAccess)("admin"), lesson_controller_1.lessonController.updateLesson);
exports.default = router;
