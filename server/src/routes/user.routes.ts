import { Router } from "express";
import {
  register,
  login,
  logout,
  validation,
  changePassword,
  addToSearchHistory,
} from "../controllers/user.controllers";

import validateUser from "../middleware/auth";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/me", validateUser, validation);

router.put("/changePassword/:id", changePassword);

router.post("/search/save", addToSearchHistory);

export default router;
