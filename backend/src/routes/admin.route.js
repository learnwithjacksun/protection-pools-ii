import {Router} from "express"
import authMiddleware from "../middleware/auth.middleware.js"
import { getCurrentWeek, updateData } from "../controllers/admin.js"

const adminRouter = Router()

adminRouter.get("/", getCurrentWeek)
adminRouter.patch("/:id", authMiddleware, updateData)


export default adminRouter
