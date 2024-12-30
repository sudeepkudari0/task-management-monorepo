import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import client from "./src/db/database";
import authRoutes from "./src/routes/authRoutes";
import taskRoutes from "./src/routes/taskRoutes";
import userRoutes from "./src/routes/userRoutes";

dotenv.config();

const app: Application = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

client
  .connect()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err: Error) => {
    console.error("Database connection error:", err);
  });

app.get("/health", (req: Request, res: Response) => {
  res.send("OK");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/user", userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
