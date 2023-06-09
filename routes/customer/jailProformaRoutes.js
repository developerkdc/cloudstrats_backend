import express from "express";

const router = express.Router();

router.get("/list");
router.post("/create");
router.patch("/update");
router.delete("/delete");

export default router;
