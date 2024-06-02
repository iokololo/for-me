import multer from "multer";
import moment from "moment";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${moment().format("DDMMYYYY-HHmmss_SSS")}-${file.originalname}`);
  },
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
});

const limits = {
  fileSize: 1024 * 1024 * 100,
};

export default multer({
  storage,
  limits,
});
