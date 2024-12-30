import { Router } from "express";
import { signup } from "../controllers/authController";

const authRoutes: Router = Router();

authRoutes.post("/signup", (req, res, next) => {
  signup(req, res, next).then(() => next());
});
authRoutes.post("/signin", (req, res, next) => {
  signup(req, res, next).then(() => next());
});

export default authRoutes;
