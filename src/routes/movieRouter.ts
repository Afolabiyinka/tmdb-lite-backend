import { Router } from "express";
import { addToFavorites, fetchFavourites, removeFromFavourites } from "../controllers/favouritesController";

export const MovieRouter = Router()

MovieRouter.route("/").get(fetchFavourites)
MovieRouter.route("/add").post(addToFavorites)
MovieRouter.route("/remove").delete(removeFromFavourites)