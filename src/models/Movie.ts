import { DataTypes, Model } from "sequelize";
import { MovieType } from "../types/movie.types";
import { sequelize } from "../config/db";
import { models } from "../types/models.types";

export class Movie extends Model<MovieType> implements MovieType {
    public id!: number;
    public title?: string
    public name?: string;
    public poster_path?: string
    public release_date?: string;
    public vote_average?: number;
    [key: string]: any;

    //associations
    static associate(models: models) {
        this.belongsTo(models.User, {
            as: "user", foreignKey: "userId"
        })
    }
}

//Initialize model

Movie.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
        },
        poster_path: {
            type: DataTypes.STRING,
        },
        release_date: {
            type: DataTypes.STRING,
        },
        vote_average: {
            type: DataTypes.FLOAT,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        }

    },

    {
        sequelize,
        modelName: "Movie",
        tableName: "Movies"
    }
);