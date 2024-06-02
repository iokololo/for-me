import express from "express";
import models from "../models/index.js";
import { TGBot } from "../index.js";

const router = express.Router();

const saveData = async (req, res) => {
  try {
    const { city, name, phone, comment } = req.body;
    const contact = new models.LotContactForm({
      city,
      name,
      phone,
      comment,
    });
    await contact.save();
    try {
      console.log("sending tg notification");
      await TGBot.sendMessage(
        process.env.TG_CHAT_ID,
        `Новый запрос на добавление лота!`
      );
    } catch (e) {
      console.log("error sending tg notification");
      console.log(e);
    }
    return res.status(200).json({ message: "success" });
  } catch (e) {
    console.log(e);
  }
};

router.post("/save", saveData);

export default router;
