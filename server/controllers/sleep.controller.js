import SleepData from "../models/SleepData";

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
    res.status(201).json(sleepData);
  } catch (error) {
    res.status(500).json({ message: "Failed to save sleep data" });
  }
};

// Get sleep data for a user
const getUserSleepData = async (req, res) => {
  try {
    const sleepData = await SleepData.find({ userId: req.user._id }).sort({
      date: -1,
    });
    res.status(200).json(sleepData);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve sleep data" });
  }
};

export { addSleepData, getUserSleepData };
