import SleepData from "../models/SleepData";
import dbErrorHandler from "../helpers/dbErrorHandler";

const addSleepData = async (req, res) => {
  const { name, gender, sleepDuration } = req.body;
  try {
    const sleepData = new SleepData({
      name,
      gender,
      sleepDuration,
      date: new Date(),
      userId: req.user._id,
    });
    await sleepData.save();
    return res.status(201).json(sleepData);
  } catch (err) {
    return res.status(500).json(dbErrorHandler.getErrorMessage(err));
  }
};

// Get sleep data for a user
const getUserSleepData = async (req, res) => {
  try {
    const sleepData = await SleepData.find({ userId: req.user._id }).sort({
      date: -1,
    });
    return res.status(200).json(sleepData);
  } catch (err) {
    return res.status(500).json({ error: dbErrorHandler.getErrorMessage(err) });
  }
};

export default { addSleepData, getUserSleepData };
