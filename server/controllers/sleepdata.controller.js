import SleepData from "../models/SleepData";
import dbErrorHandler from "../helpers/dbErrorHandler";

const create = async (req, res) => {
  try {
    req.body.recorded_by = req.auth._id;
    const { name, gender, sleepDuration } = req.body;
    const sleepData = new SleepData({
      name,
      gender,
      sleepDuration,
      date: new Date(),
      userId: req.auth.user._id,
    });
    await sleepData.save();
    return res.status(200).json({
      message: "Sleep data recorded!",
      sleepData,
    });
  } catch (err) {
    return res.status(400).json(dbErrorHandler.getErrorMessage(err));
  }
};

// Get sleep data for a user
const getUserSleepData = async (req, res, next, id) => {
  try {
    const sleepData = await SleepData.findByid(id)
      .populate("userId", "_id name")
      .exec();
    if (!sleepData)
      return res.status("400").json({
        error: "Sleep data not found",
      });
    req.sleepData = sleepData;
    next();
  } catch (err) {
    return res.status(400).json({ error: dbErrorHandler.getErrorMessage(err) });
  }
};

export default { create, getUserSleepData };
