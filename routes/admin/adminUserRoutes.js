import express from "express";
const router = express.Router();

router.get("/list");
router.post("/register");
router.post("/login");
router.post("/logout");
router.patch("/update");
router.delete("/delete");

export default router;
