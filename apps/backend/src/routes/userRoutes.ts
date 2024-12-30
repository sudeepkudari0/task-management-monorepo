import { Router } from "express";
import { getUser } from "../controllers/userController";
import auth from "../middleware/auth";

const userRoutes: Router = Router();

userRoutes.get("/:id", auth, getUser);

export default userRoutes;
