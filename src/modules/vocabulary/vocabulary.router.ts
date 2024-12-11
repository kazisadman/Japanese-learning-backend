import express from "express";
import { verifyJWT, verifyRoleAccess } from "../user/user.middlewares";
import { vocabularyController } from "./vocabulary.controller";
const router = express.Router();

router.post(
  "/",
  verifyJWT,
  verifyRoleAccess("user"),
  vocabularyController.createVocabulary
);
router.get(
  "/",
  verifyJWT,
  verifyRoleAccess("user"),
  vocabularyController.getAllVocabularys
);
router.delete(
  "/:_id",
  verifyJWT,
  verifyRoleAccess("user"),
  vocabularyController.deleteVocabulary
);
router.patch(
  "/:_id",
  verifyJWT,
  verifyRoleAccess("user"),
  vocabularyController.updateVocabulary
);

export default router;
