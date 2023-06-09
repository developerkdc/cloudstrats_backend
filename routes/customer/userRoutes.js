import express from "express";
import { createUser, getUser } from "../../controllers/Customer/user.js";

const router = express.Router();

router.get("/list",getUser);
router.post("/register",createUser);
router.post("/login");
router.post("/logout");
router.patch("/update");
router.delete("/delete");

export default router;
