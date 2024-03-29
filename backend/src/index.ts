import express, {Request, Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRouters from "./routes/users";
import authRouters from "./routes/auth";
import cookieParser from "cookie-parser";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/auth", authRouters);
app.use("/api/users", userRouters);

app.get("/api/test", async (_req: Request, res: Response) => {
  res.json({message: "hello test"});
});

app.listen(7000, () => {
  console.log("Server running on port 7000");
});
