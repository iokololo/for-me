import express from "express";
import Auth from "../middleware/Auth.js";
import ReviewController from "../controllers/ReviewController.js";
import UserMiddleware from "../middleware/User.js";

const router = express.Router();
router.post("/", [Auth], ReviewController.createReview);
router.get("/product/:id",[UserMiddleware],  ReviewController.getProductReviews);

export default router;
