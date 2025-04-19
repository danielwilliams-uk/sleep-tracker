import express from "express";
import authCtrl from "../controllers/auth.controller";
import sleepCtrl from "../controllers/sleepdata.controller";

const router = express.Router();

router
  .route("/api/sleepdata")
  .post(authCtrl.requireSignin, sleepCtrl.create)
  .get(authCtrl.requireSignin, sleepCtrl.listByUser);

export default router;
