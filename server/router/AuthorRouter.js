import express from "express";
import AuthorController from "../controllers/AuthorController.js";

const router = express.Router();
router.get("/", AuthorController.getAll);
router.get("/:id", AuthorController.getById);
router.post("/hire", AuthorController.hire);

export default router;
