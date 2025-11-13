import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import { connectDB } from "./config/db.js";
import { corsOptions } from "./config/cors.js";
import { commonError } from "./middleware/errorHandler.js";
import authRouter from "./routes/auth.js";
import taskRouter from "./routes/tasks.js";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
connectDB();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter)

app.use(commonError);
mongoose.connection.once("open", () => {
  console.log("MongoDB Connected");
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});
