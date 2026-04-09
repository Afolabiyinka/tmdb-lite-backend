import { Router } from "express";
import { login, logout, signup } from "../controllers/authController";
import {
    deleteAccount,
    editUser,
    getUser,
} from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleWare";

export const AuthRouter = Router();

AuthRouter.route("/login").post(login);
AuthRouter.route("/signup").post(signup);
AuthRouter.route("/me").get(authMiddleware, getUser);
AuthRouter.route("/logout").post(authMiddleware, logout);
AuthRouter.route("/edit-user").put(authMiddleware, editUser);
AuthRouter.route("/delete").delete(authMiddleware, deleteAccount);
