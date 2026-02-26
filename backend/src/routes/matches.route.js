import { Router } from "express";
import {
  getMatches,
  createMatch,
  updateMatch,
  deleteMatch,
} from "../controllers/matches.js";
import authMiddleware from "../middleware/auth.middleware.js";
import isAdmin from "../middleware/admin.middleware.js";

const matchesRouter = Router();

// Public routes - no authentication required
matchesRouter.get("/", getMatches);

// Admin routes - require authentication and admin role
matchesRouter.post("/", authMiddleware, isAdmin, createMatch);
matchesRouter.patch("/update/:id", authMiddleware, isAdmin, updateMatch);
matchesRouter.delete("/delete/:id", authMiddleware, isAdmin, deleteMatch);

export default matchesRouter;

