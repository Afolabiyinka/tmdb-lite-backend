import { sequelize } from "../config/db";

export const syncModels = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log("All models synchronized successfully.");
    } catch (error) {
        console.error("Error syncing models:", error);
    }
};