import express from "express";
import authCtrl from "../controllers/auth.controller";
import sleepCtrl from "../controllers/sleep.controller";

const router = express.Router();

// Protect routes with auth middleware
router
  .route("/api/sleep")
  .post(authCtrl.requireSignin, sleepCtrl.addSleepData)
  .get(authCtrl.requireSignin, sleepCtrl.getUserSleepData);

export default router;
