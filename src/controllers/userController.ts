import { Response } from "express";
import { AuthenticatedRequest } from "../types/request";
import { User } from "../models/User";
import { EditUserPayload } from "../types/auth";

const getUser = async (req: AuthenticatedRequest, res: Response) => {
    const id = req.user?.id;

    if (!id) {
        return res.status(400).json({
            message: "User Id is required",
        });
    }

    try {
        const user = await User.findByPk(id);
        if (!user)
            return res.status(404).json({
                message: "User not found",
            });

        res.status(200).json({
            user: {
                username: user.getDataValue("username"),
                email: user.getDataValue("email"),
                profilePic: user.getDataValue("profilePic")
            },
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

const editUser = async (req: AuthenticatedRequest, res: Response) => {
    const id = req.user?.id;
    if (!id) {
        return res.status(400).json({
            message: "User Id is required",
        });
    }

    const { email, username } = req.body as EditUserPayload;
    if (!email && !username) {
        return res.status(400).json({
            message: "Nothing to update",
        });
    }
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User Not found" });
        }
        await user.update({
            email,
            username,
        });

        return res.status(200).json({
            message: "User updated successfully",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

const deleteAccount = async (req: AuthenticatedRequest, res: Response) => {
    const id = req.user?.id;
    if (!id) {
        return res.status(400).json({
            message: "User id is required",
        });
    }
    try {
        const user = await User.findByPk(id);
        await user?.destroy();
        res.status(200).json({ message: "Account deleted Succesfully" });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(err);
    }
};
export { getUser, editUser, deleteAccount };
