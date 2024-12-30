import { Router } from "express";
import auth from "../middleware/auth";
import { addTask, getTasks } from "../controllers/taskController";
const taskRoutes: Router = Router();

taskRoutes.post("/", auth, addTask);
taskRoutes.get("/:id", auth, getTasks);

export default taskRoutes;
