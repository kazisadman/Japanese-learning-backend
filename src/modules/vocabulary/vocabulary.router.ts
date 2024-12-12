import express from "express";
import { verifyJWT, verifyRoleAccess } from "../user/user.middlewares";
import { vocabularyController } from "./vocabulary.controller";
const router = express.Router();

router.post(
  "/",
  verifyJWT,
  verifyRoleAccess("admin"),
  vocabularyController.createVocabulary
);
router.get(
  "/",
  verifyJWT,
  verifyRoleAccess("admin"),
  vocabularyController.getAllVocabularys
);
router.delete(
  "/:_id",
  verifyJWT,
  verifyRoleAccess("admin"),
  vocabularyController.deleteVocabulary
);
router.patch(
  "/:_id",
  verifyJWT,
  verifyRoleAccess("admin"),
  vocabularyController.updateVocabulary
);

export default router;
