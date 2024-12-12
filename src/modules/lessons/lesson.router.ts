import express from "express";
import { lessonController } from "./lesson.controller";
import { verifyJWT, verifyRoleAccess } from "../user/user.middlewares";
const router = express.Router();

router.post(
  "/",
  verifyJWT,
  verifyRoleAccess("admin"),
  lessonController.createLesson
);
router.get(
  "/",
  verifyJWT,
  verifyRoleAccess("user"),
  lessonController.getAllLessons
);
router.get(
  "/admin/",
  verifyJWT,
  verifyRoleAccess("admin"),
  lessonController.getAllLessons
);
router.get(
  "/:lessonNo",
  verifyJWT,
  verifyRoleAccess("user"),
  lessonController.getLessonsByNo
);
router.delete(
  "/:_id",
  verifyJWT,
  verifyRoleAccess("admin"),
  lessonController.deleteLesson
);
router.patch(
  "/:_id",
  verifyJWT,
  verifyRoleAccess("admin"),
  lessonController.updateLesson
);

export default router;
