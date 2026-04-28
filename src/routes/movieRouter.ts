import { Router } from "express";
import { addToFavorites, fetchFavourites, inFavourites, removeFromFavourites } from "../controllers/favouritesController";

export const MovieRouter = Router()

MovieRouter.route("/").get(fetchFavourites)
MovieRouter.route("/add").post(addToFavorites)
MovieRouter.route("/inFavourites").get(inFavourites)
MovieRouter.route("/remove").delete(removeFromFavourites)