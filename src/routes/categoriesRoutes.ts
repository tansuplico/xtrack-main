import express from "express";
import {
  createCategories,
  deleteCategories,
  fetchCategories,
  modifyCategories,
} from "../controllers/categoriesController.js";
import { requireUser } from "../middleware/requireUser.js";

const router = express.Router();

router.get("/categories", requireUser, fetchCategories);
router.put("/modify-categories", requireUser, modifyCategories);
router.post("/create-category", requireUser, createCategories);
router.delete("/delete-categories", requireUser, deleteCategories);

export default router;
