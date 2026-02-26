import MatchModel from "../model/matches.js";
import BetModel from "../model/bets.js";
import { onError } from "../utils/onError.js";
import { calculateBetOutcome } from "../utils/betCalculator.js";

/**
 * Get all matches (public endpoint)
 */
export const getMatches = async (req, res) => {
  try {
    const matches = await MatchModel.find();

    res.status(200).json({
      success: true,
      message: "Matches fetched successfully",
      data: matches,
    });
  } catch (error) {
    onError(res, error);
  }
};

/**
 * Create a new match (admin only)
 */
export const createMatch = async (req, res) => {
  try {
    const { week, homeTeam, awayTeam, isAvailable } = req.body;

    if (!week || !homeTeam || !awayTeam) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const matchNo = await MatchModel.countDocuments();

    const match = await MatchModel.create({
      week,
      homeTeam,
      awayTeam,
      matchNo: matchNo + 1,
      isAvailable: isAvailable || false,
    });

    res.status(201).json({
      success: true,
      message: "Match created successfully",
      data: match,
    });
  } catch (error) {
    onError(res, error);
  }
};

/**
 * Update a match (admin only)
 * Automatically updates bet statuses when match is finished
 */
export const updateMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const whiteListedParams = {
      week: updateData.week,
      homeTeam: updateData.homeTeam,
      awayTeam: updateData.awayTeam,
      homeScore: updateData.homeScore,
      awayScore: updateData.awayScore,
      status: updateData.status,
      isAvailable: updateData.isAvailable,
    };

    const match = await MatchModel.findById(id);
    if (!match) {
      return res.status(404).json({
        success: false,
        message: "Match not found",
      });
    }

    const updatedMatch = await MatchModel.findByIdAndUpdate(
      id,
      whiteListedParams,
    );

    res.status(200).json({
      success: true,
      message: "Match updated successfully",
      data: updatedMatch,
    });
  } catch (error) {
    onError(res, error);
  }
};

/**
 * Delete a match (admin only)
 */
export const deleteMatch = async (req, res) => {
  try {
    const { id } = req.params;

    const match = await MatchModel.findByIdAndDelete(id);
    if (!match) {
      return res.status(404).json({
        success: false,
        message: "Match not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Match deleted successfully",
    });
  } catch (error) {
    onError(res, error);
  }
};
