import User from "../models/User.js";
import models from "../models/index.js";
import AuthService from "../services/AuthService.js";
import { generateAccessToken } from "../services/AuthService.js";

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const response = await AuthService.login(email, password);
      return res.status(response.status).json(response);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e });
    }
  }

  async register(req, res) {
    try {
      const { email, name, role } = req.body;
      const response = await AuthService.register(email, name, role);
      return res.status(response.status).json(response);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e });
    }
  }

  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const response = await AuthService.forgotPassword(email);
      return res.status(response.status).json(response);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e });
    }
  }
  async addPassword(req, res) {
    try {
      const { code, password } = req.body;
      const response = await AuthService.addPassword(code, password);
      return res.status(response.status).json(response);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e });
    }
  }

  async verifyPhone(req, res) {
    try {
      const { phone, code } = req.body;
      const response = await AuthService.verifyPhone(phone, code);
      return res.status(response.status).json(response);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e });
    }
  }

  async verifyUser(req, res) {
    try {
      const { verificationCode, phoneVerificationCode } = req.body;
      const response = await AuthService.verifyUser(
        verificationCode,
        phoneVerificationCode
      );
      return res.status(response.status).json(response);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e });
    }
  }

  async verifyEmail(req, res) {
    try {
      const { email, resetPassword } = req.body;
      console.log(email, typeof email);
      console.log(resetPassword, typeof resetPassword);

      const response = await AuthService.verifyEmail(email, resetPassword);
      return res.status(response.status).json(response);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e });
    }
  }

  async newPassword(req, res) {
    try {
      const { email, password } = req.body;
      const response = await AuthService.newPassword(email, password);
      return res.status(response.status).json(response);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e });
    }
  }
  async checkToken(req, res) {
    try {
      const user = await User.findById(req.user?.data?._id);
      const token = await generateAccessToken({ _id: user._id });
      const favorite = await models.Favorite.findOne({ user: user._id });
      return res.status(200).json({
        status: 200,
        data: {
          token,
          user: {
            ...user._doc,
            favorites: { ...favorite?._doc },
            password: null,
            verificationCode: null,
            phoneVerificationCode: null,
            isVerified: null,
            lastLogin: null,
            createdAt: null,
            resetPassword: null,
          },
        },
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e });
    }
  }

  async updateProfile(req, res) {
    try {
      const { name, email, numberOfDocument, iin, address } = req.body;
      const response = await AuthService.updateProfile(
        name,
        email,
        numberOfDocument,
        iin,
        address
      );
      return res.status(response.status).json(response);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e });
    }
  }

  async getFavorites(req, res) {
    try {
      const response = await AuthService.getFavorites(req.user?.data?._id);
      return res.status(response.status).json(response);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e });
    }
  }

  async addFavorites(req, res) {
    try {
      const { product } = req.body;
      const response = await AuthService.addToFavorite(
        req.user?.data?._id,
        product
      );
      return res.status(response.status).json(response);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e });
    }
  }

  async removeFavorites(req, res) {
    try {
      const { product } = req.body;
      const response = await AuthService.removeFromFavorite(
        req.user?.data?._id,
        product
      );
      return res.status(response.status).json(response);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e });
    }
  }

  async editPhone(req, res) {
    try {
      const { phone } = req.body;
      const response = await AuthService.editPhone(
        req.user?.data?._id,
        phone
      );
      return res.status(response.status).json(response);
    } catch (e) {
      console.log(e);
      return res.status(500).json({message: e});
    }
  }

  async verifyEditedPhone(req, res) {
    try {
      const { phone, code } = req.body;
      const response = await AuthService.verifyEditedPhone(
        req.user?.data?._id,
        phone,
        code
      );
      return res.status(response.status).json(response);
    } catch (e) {
      console.log(e);
      return res.status(500).json({message: e});
    }
  }

}

export default new AuthController();
