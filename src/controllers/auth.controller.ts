import { RequestHandler, Response } from "express";
import { GoogleLoginPayload, } from "../types/auth.types";
import { User } from "../models/User";
import { OAuth2Client } from "google-auth-library";
import { generateToken } from "../utils/generateToken";
import { ApiError } from "../types/error.types";
import { COOKIE_NAME, cookieOptions } from "../utils/cookieOptions";

const googleClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
);



const logout: RequestHandler = async (req, res) => {
    res.clearCookie(COOKIE_NAME, cookieOptions);
    res.json({ message: "Logged out" });
};

const googleLogin: RequestHandler = async (req, res, next) => {

    const { credential } = req.body as GoogleLoginPayload

    try {
        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        if (!payload || !payload.email) {
            throw new ApiError(
                400,
                "Invalid Google token",
                "AUTH_INVALID_GOOGLE_TOKEN"
            );
        }

        const email = payload.email;
        const profilePic = payload.picture || ""


        const username =
            payload.given_name ||
            payload.name ||
            email.split("@")[0];

        let user = await User.findOne({ where: { email } });

        if (!user) {
            user = await User.create({
                email,
                username,
                profilePic
            });
        }
        const accessToken = generateToken(user.id)
        res.cookie(COOKIE_NAME, accessToken, cookieOptions);
        res.status(200).json({ message: "Login successfull" });
    } catch (err) {
        console.error(err);
        throw new ApiError(
            500,
            "Google authentication failed",
            "AUTH_GOOGLE_FAILED"
        );
    }

}

export { logout, googleLogin };
