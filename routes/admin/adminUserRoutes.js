import express from "express";
import { addUser, getUser } from "../../controllers/Admin/user.js";
const router = express.Router();

router.get("/list",getUser);
router.post("/register",addUser);
router.post("/login");
router.post("/logout");
router.patch("/update");
router.delete("/delete");

export default router;
