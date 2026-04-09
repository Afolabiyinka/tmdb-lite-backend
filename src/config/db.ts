import { Sequelize } from "sequelize";
import { configDotenv } from "dotenv";

configDotenv();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not defined");
}

export const sequelize = new Sequelize(DATABASE_URL, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});

export const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log("Neon Postgres connected successfully");
    } catch (err) {
        console.error("Unable to connect to DB", err);
    }
};

