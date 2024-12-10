import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./server";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectDb();

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
