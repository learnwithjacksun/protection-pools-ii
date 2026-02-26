import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import { deleteUser, getUsers, updateUser } from "../controllers/user.js";

const userRouter = Router();

userRouter.use(authMiddleware);

userRouter.get("/", getUsers);
userRouter.patch("/update/:id", updateUser);
userRouter.delete("/delete/:id", deleteUser);


export default userRouter;
