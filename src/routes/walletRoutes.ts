import express from "express";
import { requireUser } from "../middleware/requireUser.js";
import {
  fetchWallet,
  updateBalance,
  updateIncome,
  updateIncomeChanges,
  updatePassword,
  updateProfile,
} from "../controllers/walletController.js";
const router = express.Router();

router.get("/wallet", requireUser, fetchWallet);
router.post("/update-income", requireUser, updateIncome);
router.post("/update-balance", requireUser, updateBalance);
router.post("/update-profile", requireUser, updateProfile);
router.post("/update-password", requireUser, updatePassword);
router.post("/update-income-changes", requireUser, updateIncomeChanges);

export default router;
