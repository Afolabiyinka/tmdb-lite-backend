import express from "express"
import cors from "cors"
import { configDotenv } from "dotenv";
import { syncModels } from "./models";
import { AuthRouter } from "./routes/auth.routes";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middlewares/auth.middleware";
import { FavouritesRouter } from "./routes/favourites.routes";
import { connectDb } from "./config/db";
import { errorHandler } from "./middlewares/error.middleware";

configDotenv();

const PORT = process.env.PORT || 5050
const app = express();

app.use(cors(
    {
        credentials: true,
        origin: ["http://localhost:5173", "https://tmdb-lite.vercel.app"],

    }
))

app.use(express.json())
app.use(cookieParser());


//Connecting the database
connectDb()
syncModels()


const NODE_ENV = process.env.NODE_ENV

// Health Check
app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        environment: NODE_ENV
    });
});




// Routing 
app.use("/api/auth", AuthRouter);
app.use("/api/favourites", authMiddleware, FavouritesRouter)

app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})