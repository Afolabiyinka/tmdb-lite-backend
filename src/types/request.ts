import { Request } from "express";
import { DecodedUser } from "./auth";

export interface AuthenticatedRequest extends Request {
    user?: DecodedUser;
}
