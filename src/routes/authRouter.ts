import { Router } from "express";
import {
    deleteAccount,
    editUser,
    getUser,
} from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleWare";
import { googleLogin, logout } from "../controllers/authController";

export const AuthRouter = Router();

AuthRouter.route("/google-login").post(googleLogin)

AuthRouter.route("/me").get(authMiddleware, getUser);
AuthRouter.route("/logout").post(authMiddleware, logout);
AuthRouter.route("/edit-user").put(authMiddleware, editUser);
AuthRouter.route("/delete").delete(authMiddleware, deleteAccount);
