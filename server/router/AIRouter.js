import express from "express";
import AIController from "../controllers/AIController.js";
import Auth from "../middleware/Auth.js";

const router = express.Router();
router.get("/", [Auth], AIController.getChat);
router.post("/",[Auth],  AIController.sendMessage);

export default router;
