import express from "express";
import { createCustomer } from "../../controllers/Admin/customer.js";

const router = express.Router();

router.get("/list");
router.post("/create",createCustomer);
router.patch("/update");
router.delete("/delete");

export default router;
