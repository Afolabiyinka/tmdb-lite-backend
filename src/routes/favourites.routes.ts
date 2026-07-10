import { Router } from "express";
import { addToFavorites, fetchFavourites, inFavourites, removeFromFavourites } from "../controllers/favouritesController";

export const FavouritesRouter = Router()

FavouritesRouter.route("/").get(fetchFavourites)
FavouritesRouter.route("/add").post(addToFavorites)
FavouritesRouter.route("/inFavourites/:movieId").get(inFavourites)
FavouritesRouter.route("/remove/:movieId").delete(removeFromFavourites)