import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { models } from "../types/models";

interface UserAttributes {
    id?: string;
    email: string
    username: string;
    profilePic: string
    createdAt?: Date;
    updatedAt?: Date;
}

// Extend sequelize's model 

export class User extends Model<UserAttributes> implements UserAttributes {
    public id!: string;
    public email!: string;
    public profilePic!: string;
    public username!: string;

    static associate(models: models) {
        this.hasMany(models.Movie, {
            as: "movie", foreignKey: "userId"
        })
    }
}

//Iniatilize model
User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        profilePic: {
            type: DataTypes.STRING,
            allowNull: false
        }

    }, {
    timestamps: true,
    sequelize,
    modelName: "User",
    tableName: "Users"
});

