import express from "express";
import ProductController from "../controllers/ProductController.js";
import Upload from "../middleware/Upload.js";
import AuthMiddleware from "../middleware/Auth.js";
import UserMiddleware from "../middleware/User.js";

const router = express.Router();
router.get("/", ProductController.getAll);
router.get("/id/:id",  [UserMiddleware], ProductController.getById);
router.get("/sales", ProductController.getAllSales);
router.get("/auctions", ProductController.getAllAuctions);
router.get("/businesses", ProductController.getAllBusinesses);
router.get("/investOffers", ProductController.getAllInvestOffers);
router.get("/author/:id", ProductController.getAuthor);
router.get("/getBought", [AuthMiddleware], ProductController.getBought);

router.post("/getCountProperties", ProductController.getCountProperties);
router.post("/getAllProperties", ProductController.getAllProperties);
router.post("/contact", [AuthMiddleware], ProductController.contact);
router.post("/getFilters", ProductController.getFilteredProperties);
router.post(
  "/upload",
  [Upload.array("images")],
  ProductController.uploadImage
);

export default router;
