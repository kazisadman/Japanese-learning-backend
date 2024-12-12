"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const server_1 = __importDefault(require("./server"));
const user_router_1 = __importDefault(require("./modules/user/user.router"));
const lesson_router_1 = __importDefault(require("./modules/lessons/lesson.router"));
const vocabulary_router_1 = __importDefault(require("./modules/vocabulary/vocabulary.router"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
(0, server_1.default)();
app.get("/", (req, res) => {
    res.send("hello world");
});
app.use("/api/v1", user_router_1.default);
app.use("/api/v1/lesson", lesson_router_1.default);
app.use("/api/v1/vocabulary", vocabulary_router_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
