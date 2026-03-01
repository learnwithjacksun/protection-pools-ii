import { onError } from "../utils/onError.js";
import BetModel from "../model/bets.js";
import UserModel from "../model/user.js";
import generateRandomNumber from "../utils/generateRandomNumbers.js";

// Place a new bet
export const placeBet = async (req, res) => {
  const { matches, stakeAmount, betType, week } = req.body;
  const userId = req.user.id;

  try {

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
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

    if (!betType || !["perming", "nap"].includes(betType)) {
      return res.status(400).json({
        success: false,
        message: "Valid bet type is required (perming, nap)",
      });
    }

    // Normalize matches to array of ObjectIds (accept either IDs or full objects)
    const matchIds = matches.map((m) =>
      typeof m === "object" && m !== null && (m.id ?? m._id) ? (m.id ?? m._id) : m
    );

    const bookingCode = `BK${generateRandomNumber(6)}`;



    // Create bet (no wallet check needed - pool system)
    const bet = await BetModel.create({
      user: userId,
      week,
      bookingCode,
      matches: matchIds,
      stakeAmount,
      betType,
    });



    res.status(201).json({
      success: true,
      message: "Bet placed successfully",
      data: bet,
    });
  } catch (error) {
    onError(res, error);
  }
};

// Get all bets for the authenticated user
export const getUserBets = async (req, res) => {
  const userId = req.user.id;

  try {
    const query = { user: userId };


    const bets = await BetModel.find(query)
      .sort({ createdAt: -1 })
      .populate("user", "name phone email")
      .populate("matches");

    res.status(200).json({
      success: true,
      message: "Bets fetched successfully",
      data: bets,
      count: bets.length,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const getAllBets = async (_, res) => {
  try {
    const bets = await BetModel.find();
    res.status(200).json({
      success: true,
      message: "Bets fetched successfully",
      data: bets,
      count: bets.length,
    });
  } catch (error) {
    onError(res, error);
  }
};



export const updateBetStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;


  try {
    if (!status || !["awaiting", "done"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Valid status is required (awaiting, done)",
      });
    }

    const bet = await BetModel.findById(id);
    if (!bet) {
      return res.status(404).json({
        success: false,
        message: "Bet not found",
      });
    }

    if (bet.status === "done") {
      return res.status(400).json({
        success: false,
        message: "Bet is already completed",
      });
    }

    bet.status = status;

    await bet.save();

    res.status(200).json({
      success: true,
      message: "Bet status updated successfully",
      data: bet,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const deleteBet = async (req, res) => {
  const { id } = req.params;

  try {
    const bet = await BetModel.findById(id);
    if (!bet) {
      return res.status(404).json({
        success: false,
        message: "Bet not found",
      });
    }

    if (bet.status !== "awaiting") {
      return res.status(400).json({
        success: false,
        message: "Only awaiting bets can be deleted",
      });
    }

    await bet.deleteOne();

    res.status(200).json({
      success: true,
      message: "Bet deleted successfully",
    });
  } catch (error) {
    onError(res, error);
  }
};


// get bet by booking code
export const getBetByBookingCode = async (req, res) => {
  const { bookingCode } = req.params;
  try {
    const bet = await BetModel.findOne({ bookingCode })
      .populate("user", "name phone email")
      .populate("matches");
    if (!bet) {
      return res.status(404).json({
        success: false,
        message: "Bet not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Bet found successfully",
      data: bet,
    });
  } catch (error) {
    onError(res, error);
  }
};

