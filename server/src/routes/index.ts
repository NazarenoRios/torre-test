import { Router } from "express";
const router = Router();

import users from "./user.routes";

router.use("/users", users);

export default router;
