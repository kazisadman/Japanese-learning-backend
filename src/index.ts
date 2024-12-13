import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import cookieparser from "cookie-parser";
import connectDb from "./server";

import userRouter from "./modules/user/user.router";
import lessonRouter from "./modules/lessons/lesson.router";
import vocabularyRouter from "./modules/vocabulary/vocabulary.router";

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://japanese-learning-client.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieparser());

connectDb();

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.use("/api/v1", userRouter);
app.use("/api/v1/lesson", lessonRouter);
app.use("/api/v1/vocabulary", vocabularyRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
