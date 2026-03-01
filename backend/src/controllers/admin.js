import AdminModel from "../model/admin.js";
import { onError } from "../utils/onError.js";

export const getCurrentWeek = async (req, res) => {
  try {
    const adminData = await AdminModel.find();
    if (!adminData?.length) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Data fetched",
      data: adminData[0],
    });
  } catch (error) {
    onError(res, error);
  }
};

export const updateData = async (req, res) => {
  const { week } = req.body;
  const id = req.params.id;
  try {
    const weekNumber = Number(week);
    if (!Number.isInteger(weekNumber) || weekNumber < 0) {
      return res.status(400).json({
        success: false,
        message: "Week must be a non-negative integer",
      });
    }
    const admin = await AdminModel.findById(id);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }
    admin.currentWeek = weekNumber;
    await admin.save();
    res.status(200).json({
      success: true,
      message: "Week updated",
      data: admin.currentWeek,
    });
  } catch (error) {
    onError(res, error);
  }
};
