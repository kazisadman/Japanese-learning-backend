"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const user_middlewares_1 = require("./user.middlewares");
const router = express_1.default.Router();
router.post("/register", user_controller_1.userController.registerUser);
router.post("/login", user_controller_1.userController.loginUser);
router.get("/", user_middlewares_1.verifyJWT, (0, user_middlewares_1.verifyRoleAccess)("admin"), user_controller_1.userController.getAllUser);
router.get("/check-auth", user_middlewares_1.verifyJWT, user_controller_1.userController.checkAuth);
router.patch("/:_id", user_middlewares_1.verifyJWT, (0, user_middlewares_1.verifyRoleAccess)("admin"), user_controller_1.userController.updateRole);
exports.default = router;
