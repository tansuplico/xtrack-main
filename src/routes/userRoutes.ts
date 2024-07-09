import express from "express";
import { requireUser } from "../middleware/requireUser.js";
import {
  changePassword,
  fetchUser,
  login,
  logout,
  signUp,
} from "../controllers/userController.js";
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.delete("/logout", requireUser, logout);
router.get("/user", requireUser, fetchUser);
router.post("/change-password", changePassword);

export default router;
