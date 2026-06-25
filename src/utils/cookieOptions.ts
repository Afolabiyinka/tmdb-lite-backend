import { CookieOptions } from "express";

const cookieOptions: CookieOptions = {
   httpOnly: true,
   secure: process.env.NODE_ENV === "production",
   sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
   path: "/",
   maxAge: 7 * 24 * 60 * 60 * 1000,
};

const COOKIE_NAME = "tmdb-lite-token";

export { cookieOptions, COOKIE_NAME };