import UserModel from "../model/user.js";
import { onError } from "../utils/onError.js";


export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data:users,
            count: users.length,
        });
    } catch (error) {
        onError(res, error);
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const whiteListedParams = {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          isAdmin: req.body.isAdmin,
          isActive: req.body.isActive,
        }
        const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, whiteListedParams, { new: true });
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        onError(res, error);
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        onError(res, error);
    }
};
