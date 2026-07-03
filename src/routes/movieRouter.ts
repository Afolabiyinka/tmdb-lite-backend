import { Router } from "express";
import { addToFavorites, fetchFavourites, inFavourites, removeFromFavourites } from "../controllers/favouritesController";

export const MovieRouter = Router()

MovieRouter.route("/").get(fetchFavourites)
MovieRouter.route("/add").post(addToFavorites)
MovieRouter.route("/inFavourites/:movieId").get(inFavourites)
MovieRouter.route("/remove/:movieId").delete(removeFromFavourites)