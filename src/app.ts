import express from "express"
import cors from "cors"
import { configDotenv } from "dotenv";
import { syncModels } from "./models";
import { AuthRouter } from "./routes/authRouter";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middleware/authMiddleWare";
import { MovieRouter } from "./routes/movieRouter";
import { connectDb } from "./config/db";
import { errorHandler } from "./middleware/errorMiddleware";

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

// Health Check
app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        environment: NODE_ENV
    });
});


const NODE_ENV = process.env.NODE_ENV


// Routing 
app.use("/api/auth", AuthRouter);
app.use("/api/favourites", authMiddleware, MovieRouter)


app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})