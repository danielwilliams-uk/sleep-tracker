import SleepData from "../models/SleepData";
import dbErrorHandler from "../helpers/dbErrorHandler";

// Create sleep data
const create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.userId = req.auth._id;
    const sleepData = new SleepData(req.body);
    await sleepData.save();
    return res.status(200).json({
      message: "Sleep data recorded!",
      sleepData,
    });
  } catch (err) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err),
    });
  }
};

// Get sleep data for a user
const sleepDataByID = async (req, res, next, id) => {
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

// List by user for specific date range
const listByUser = async (req, res) => {
  console.log("listByUser called with query parameters:", req.query);

  let firstDay = req.query.firstDay;
  let lastDay = req.query.lastDay;

  if (!firstDay || !lastDay) {
    console.error("Missing query parameters: firstDay or lastDay");
    return res
      .status(400)
      .json({ error: "Missing query parameters: firstDay or lastDay" });
  }
  console.log("Validated query parameters:", { firstDay, lastDay });

  try {
    let sleepdata = await SleepData.find({
      $and: [
        { date: { $gte: firstDay, $lte: lastDay } },
        { userId: req.auth._id },
      ],
    })
      .sort("date")
      .populate("userId", "_id name");

    console.log(
      "=======================>>>> Final response being sent to frontend:",
      sleepdata
    );
    res.json(sleepdata);
  } catch (err) {
    console.error("Error in listByUser:", err);
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err),
    });
  }
};

export default { create, sleepDataByID, listByUser };
