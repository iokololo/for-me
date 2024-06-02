import express from "express";
import AuthController from "../controllers/AuthController.js";
import Auth from "../middleware/Auth.js";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.post("/forgotPassword", AuthController.forgotPassword);
router.post("/addPassword", AuthController.addPassword);
router.post("/verifyPhone", AuthController.verifyPhone);
router.post("/verifyUser", AuthController.verifyUser);
router.post("/verifyEmail", AuthController.verifyEmail);
router.post("/newPassword", AuthController.newPassword);
router.post("/updateProfile", AuthController.updateProfile);
router.post("/add-favorite", [Auth], AuthController.addFavorites);
router.post("/remove-favorite", [Auth], AuthController.removeFavorites);
router.post("/editPhone", [Auth], AuthController.editPhone);
router.post("/verifyEditedPhone", [Auth], AuthController.verifyEditedPhone);
// router.post("/editProfile", [Auth], AuthController.editProfile);

router.get("/checkToken", [Auth], AuthController.checkToken);
router.get("/favorites", [Auth], AuthController.getFavorites);

export default router;
