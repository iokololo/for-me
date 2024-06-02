import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const AuthMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.json({ message: "Token not found" });
    }
    const decodedData = jsonwebtoken.verify(token, process.env.SECRET);
    req.user = decodedData;
    next();
  } catch (e) {
    req.error = e;
    res
      .status(500)
      .json({ error: "Auth middleware error", message: e.message });
  }
};

export default AuthMiddleware;
