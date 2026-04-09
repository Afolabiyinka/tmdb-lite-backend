import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { LoginPayload, SignupPayload } from "../types/auth";
import { User } from "../models/User";
import { AuthenticatedRequest } from "../types/request";

const jwtSecret = process.env.JWT_SECRET!;
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: (process.env.NODE_ENV === "production" ? "none" : "lax") as
        | "none"
        | "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body as LoginPayload;

    if (!email || !password) {
        return res.status(400).json({ message: "Email & Password is required" });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: "User not found" });

        const passwordMatch = await bcrypt.compare(
            password,
            user.getDataValue("password"),
        );
        if (!passwordMatch)
            return res.status(400).json({ message: "Incorrect password" });

        const token = jwt.sign({ id: user.getDataValue("id") }, jwtSecret, {
            expiresIn: "7d",
        });

        res.cookie("token", token, cookieOptions);
        res.status(200).json({ message: "Login successfull" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const signup = async (req: Request, res: Response) => {
    const { email, password, username } = req.body as SignupPayload;
    if (!email || !password || !username) {
        return res
            .status(400)
            .json({ message: "Email, Username & Password is required" });
    }

    try {
        const emailTaken = await User.findOne({ where: { email } });
        if (emailTaken)
            return res.status(400).json({ message: "Email already taken" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            username,
            password: hashedPassword,
        });

        const token = jwt.sign({ id: user.getDataValue("id") }, jwtSecret, {
            expiresIn: "7d",
        });

        res.cookie("token", token, cookieOptions);
        res.status(200).json({ message: "Account created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const logout = async (req: AuthenticatedRequest, res: Response) => {
    res.clearCookie("token", cookieOptions);
    res.json({ message: "Logged out" });
};

export { login, signup, logout };
