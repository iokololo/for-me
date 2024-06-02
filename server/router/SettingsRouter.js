import express from "express";
import models from "../models/index.js";

const router = express.Router();

const sendData = async (req, res) => {
  try {
    const settings = await models.Settings.find({});
    return res.status(200).json(settings[0]);
  } catch (e) {
    console.log(e);
  }
};

router.get("/get", sendData);

export default router;
