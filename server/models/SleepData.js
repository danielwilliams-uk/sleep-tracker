const mongoose = require("mongoose");

const sleepDataSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sleepDuration: {
      type: Number, // Duration in minutes
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("SleepData", sleepDataSchema);
