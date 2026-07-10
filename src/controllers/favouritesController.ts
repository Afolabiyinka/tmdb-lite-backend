import { MovieType } from "../types/movie.types";
import { Movie } from "../models/Movie";
import { RequestHandler } from "express";


const fetchFavourites: RequestHandler = async (req, res) => {

    const id = req.user?.id;

    // get page & limit from query params
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const offset = (page - 1) * limit;

    try {
        const { rows, count } = await Movie.findAndCountAll({
            where: { userId: id },
            attributes: { exclude: ["userId"] },
            limit,
            offset,
        });

        return res.status(200).json({
            favourites: rows,
            total: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
        });
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}

const addToFavorites: RequestHandler = async (req, res) => {
    const movie: MovieType = req.body;

    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    if (!movie) {
        return res.status(400).json({ message: "Movie data is required" });
    }

    try {
        await Movie.create({
            ...movie,
            userId: userId
        });
        res.status(200).json({
            message: "Added to favourites"
        })
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}

const inFavourites: RequestHandler = async (req, res) => {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { movieId } = req.params;


    const parsedId = Number(movieId);

    if (isNaN(parsedId)) {
        return res.status(400).json({ message: "Invalid Movie Id" });
    }

    try {
        const movie = await Movie.findOne({
            where: {
                userId,
                id: parsedId,
            },
        });

        return res.status(200).json({
            inFavourites: !!movie,
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
const removeFromFavourites: RequestHandler = async (req, res) => {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const { movieId } = req.params

    const parsedId = Number(movieId);

    if (isNaN(parsedId)) {
        return res.status(400).json({ message: "Invalid Movie Id" });
    }

    if (!movieId) {
        return res.status(400).json({ message: "Movie Id is required" });
    }

    try {
        const movie = await Movie.findOne({
            where: {
                userId,
                id: movieId
            }
        });
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        await movie.destroy();

        return res.status(200).json({ message: "Removed from favorites" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

export { addToFavorites, removeFromFavourites, fetchFavourites, inFavourites }