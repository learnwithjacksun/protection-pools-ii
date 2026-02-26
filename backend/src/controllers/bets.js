import { onError } from "../utils/onError.js";
import BetModel from "../model/bets.js";
import UserModel from "../model/user.js";
import generateRandomNumber from "../utils/generateRandomNumbers.js";

// Place a new bet
export const placeBet = async (req, res) => {
  const { matches, stakeAmount, betType } = req.body;
  const userId = req.user.id;

  try {
    // Validate required fields
    if (!matches || !Array.isArray(matches) || matches.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one match selection is required",
      });
    }

    if (!stakeAmount || stakeAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid stake amount is required",
      });
    }

    if (!betType || !["Perming", "Nap"].includes(betType)) {
      return res.status(400).json({
        success: false,
        message: "Valid bet type is required",
      });
    }

    const bookingCode = `BK${generateRandomNumber(6)}`;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Create bet (no wallet check needed - pool system)
    const bet = await BetModel.create({
      user: userId,
      bookingCode,
      matches,
      stakeAmount,
      betType,
      status: "pending",
    });

 

    res.status(201).json({
      success: true,
      message: "Bet placed successfully",
      bet,
    });
  } catch (error) {
    onError(res, error);
  }
};

// Get all bets for the authenticated user
export const getBets = async (req, res) => {
  const userId = req.user.id;
  const { status } = req.query; // Optional filter by status

  try {
    const query = { user: userId };
    if (status && ["pending", "won", "lost", "cancelled"].includes(status)) {
      query.status = status;
    }

    const bets = await BetModel.find(query)
      .sort({ createdAt: -1 })
      .populate("user", "username email")
      .populate("matches");

    res.status(200).json({
      success: true,
      message: "Bets fetched successfully",
      bets,
      count: bets.length,
    });
  } catch (error) {
    onError(res, error);
  }
};

// Get a single bet by ID
export const getBetById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const bet = await BetModel.findOne({ _id: id, user: userId })
      .populate("user", "username email")
      .populate("matches");

    if (!bet) {
      return res.status(404).json({
        success: false,
        message: "Bet not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Bet fetched successfully",
      bet,
    });
  } catch (error) {
    onError(res, error);
  }
};

// Update bet status (typically for admin use, but can be used for cancellation)
export const updateBetStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const userId = req.user.id;

  try {
    if (!status || !["pending", "won", "lost", "cancelled"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Valid status is required (pending, won, lost, cancelled)",
      });
    }

    const bet = await BetModel.findOne({ _id: id, user: userId });
    if (!bet) {
      return res.status(404).json({
        success: false,
        message: "Bet not found",
      });
    }

    // If bet is already settled, don't allow changes unless cancelling
    if (bet.status !== "pending" && status !== "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Cannot change status of a settled bet",
      });
    }

    const oldStatus = bet.status;
    bet.status = status;

    // Handle wallet updates based on status change
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // No wallet updates needed - pool system

    await bet.save();

    res.status(200).json({
      success: true,
      message: "Bet status updated successfully",
      bet,
    });
  } catch (error) {
    onError(res, error);
  }
};

// Cancel a pending bet (user can cancel their own pending bets)
export const cancelBet = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const bet = await BetModel.findOne({ _id: id, user: userId });
    if (!bet) {
      return res.status(404).json({
        success: false,
        message: "Bet not found",
      });
    }

    if (bet.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending bets can be cancelled",
      });
    }

    // Refund stake to user
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    bet.status = "cancelled";

    await bet.save();

    res.status(200).json({
      success: true,
      message: "Bet cancelled successfully",
      bet,
    });
  } catch (error) {
    onError(res, error);
  }
};

