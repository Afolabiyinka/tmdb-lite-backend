import { Movie } from "../models/Movie";
import { User } from "../models/User";

export type models = {
    User: typeof User;
    Movie: typeof Movie

};