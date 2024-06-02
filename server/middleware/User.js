import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const UserMiddleware = (req, res, next) => {
  try {
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
         next()
        }
        const decodedData = jsonwebtoken.verify(token, process.env.SECRET);
        req.user = decodedData;
    }
    next();
  } catch (e) {
    next();
  }
};

export default UserMiddleware;
