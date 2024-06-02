import express from "express";
import Auth from "../middleware/Auth.js";
import PaymentController from "../controllers/PaymentController.js";

const router = express.Router();

router.post("/create", [Auth], PaymentController.createPayment);
router.post("/check", [Auth], PaymentController.checkPayment);
router.get("/download", PaymentController.downloadStatistic);

export default router;
