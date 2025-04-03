import express from "express";
import authCtrl from "../controllers/auth.controller";
import {
  addSleepData,
  getUserSleepData,
} from "../controllers/sleep.controller";

const router = express.Router();

// Protect routes with auth middleware
router
  .post("/add", authCtrl, addSleepData)
  .get("/", authCtrl, getUserSleepData);

export default router;
