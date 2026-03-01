import { Router } from "express";
import {
  placeBet,
  updateBetStatus,
  getBetByBookingCode,
  deleteBet,
  getAllBets,
  getUserBets,
} from "../controllers/bets.js";
import authMiddleware from "../middleware/auth.middleware.js";

const betsRouter = Router();

betsRouter.use(authMiddleware);

betsRouter.post("/", placeBet);
betsRouter.get("/", getAllBets);
betsRouter.get("/user", getUserBets);
betsRouter.get("/:bookingCode", getBetByBookingCode);
betsRouter.patch("/:id/status", updateBetStatus);
betsRouter.delete("/:id", deleteBet);

export default betsRouter;

