import { RequestHandler } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { DecodedUser } from "../types/auth";
import { COOKIE_NAME } from "../utils/cookieOptions";

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined");
}

export const authMiddleware: RequestHandler = (
    req,
    res,
    next,
) => {
    if (req.method === "OPTIONS") {
        return next();
    }

    const token = req.cookies?.[COOKIE_NAME];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);

        if (typeof decoded !== "object" || !decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const user = decoded as DecodedUser;

        req.user = { id: user.id };
        next();
    } catch (err) {
        if (err instanceof TokenExpiredError) {
            return res.status(401).json({ message: "Token expired" });
        }
        return res.status(401).json({ message: "Invalid token" });
    }
};