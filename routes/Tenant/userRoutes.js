import express from "express";
import { createUser } from "../../controllers/Tenant/user.js";

const router = express.Router();

router.get("/list");
router.post("/register",createUser);
router.post("/login");
router.post("/logout");
router.patch("/update");
router.delete("/delete");

export default router;
