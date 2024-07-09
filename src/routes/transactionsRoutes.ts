import express from "express";
import {
  addTransactions,
  clearHistory,
  fetchTransactions,
  removeTransactions,
} from "../controllers/transactionsController.js";
import { requireUser } from "../middleware/requireUser.js";
const router = express.Router();

router.get("/transactions", requireUser, fetchTransactions);
router.post("/add-transactions", requireUser, addTransactions);
router.put("/clear-history", requireUser, clearHistory);
router.delete("/remove-transaction", requireUser, removeTransactions);

export default router;
