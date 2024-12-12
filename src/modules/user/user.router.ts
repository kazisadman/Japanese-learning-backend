import express from "express";
import { userController } from "./user.controller";
import { verifyJWT, verifyRoleAccess } from "./user.middlewares";

const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/", verifyJWT, verifyRoleAccess("admin"), userController.getAllUser);
router.get("/check-auth", verifyJWT,userController.checkAuth);
router.patch("/:_id", verifyJWT, verifyRoleAccess("admin"), userController.updateRole);

export default router;
