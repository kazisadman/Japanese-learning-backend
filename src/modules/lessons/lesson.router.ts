import express from "express";
import { lessonController } from "./lesson.controller";
import { verifyJWT, verifyRoleAccess } from "../user/user.middlewares";
const router = express.Router();

router.post(
  "/",
  verifyJWT,
  verifyRoleAccess("user"),
  lessonController.createLesson
);
router.get(
  "/",
  verifyJWT,
  verifyRoleAccess("user"),
  lessonController.getAllLessons
);
router.delete(
  "/:_id",
  verifyJWT,
  verifyRoleAccess("user"),
  lessonController.deleteLesson
);
router.patch(
  "/:_id",
  verifyJWT,
  verifyRoleAccess("user"),
  lessonController.updateLesson
);

export default router;
