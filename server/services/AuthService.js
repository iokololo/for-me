import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import models from "../models/index.js";
import generateRandomArrays, {
  generateRandomPhoneCode,
} from "../utils/generators.js";
import EmailSender from "../utils/EmailSender.js";
import PhoneSender from "../utils/PhoneSender.js";
import { passwordValidate } from "../utils/validators.js";
import { TGBot } from "../index.js";

export const generateAccessToken = (data) => {
  const payload = {
    data,
  };
  return jsonwebtoken.sign(payload, process.env.SECRET, { expiresIn: "24h" });
};

class AuthService {
  async login(email, password) {
    try {
      const candidate = await models.User.findOne({ email });
      if (!candidate) {
        return { error: "Email not found", status: 400 };
      }
      if (!candidate.isVerified) {
        return { error: "Activate your account", status: 205 };
      }
      const isMatch = await bcrypt.compare(password, candidate.password);
      if (!isMatch) {
        return { error: "Wrong password", status: 400 };
      }
      candidate.lastLogin = Date.now();
      await candidate.save();
      const token = generateAccessToken({
        _id: candidate._id,
      });
      return {
        status: 200,
        data: {
          token,
          user: {
            _id: candidate._id,
            email: candidate.email,
            phone: candidate.phone,
            name: candidate.name,
            lastLogin: candidate.lastLogin,
          },
        },
      };
    } catch (e) {
      console.log(e);
      return { error: e, status: 500 };
    }
  }
  async register(email, name, role) {
    try {
      const candidate = await models.User.findOne({ email });
      if (candidate) {
        if (candidate.isVerified) {
          return { error: "Email already exists", status: 400 };
        }

        if (Date.now() - candidate.createdAt > 600000) {
          await candidate.remove();
          const code = generateRandomArrays();
          const user = await models.User.create({
            email,
            name,
            verificationCode: code,
            isVerified: false,
            role
          });
          await user.save();
          await EmailSender.sendEmail(
            email,
            "Verification code",
            `<a href="${process.env.CURRENT_URL}verify/${code}"> Verify </a>`
          );
          return { message: "User created", status: 201 };
        }
        return { error: "Email already exists", status: 400 };
      }
      const code = generateRandomArrays();
      const user = await models.User.create({
        email,
        name,
        verificationCode: code,
        isVerified: false,
        role
      });
      await user.save();
      const verificationLink = `<a href="${process.env.CURRENT_URL}verify/${code}"> Verify </a>`
      console.log(verificationLink)
      await EmailSender.sendEmail(
        email,
        "Verification code",
        verificationLink
      );
      return { message: "User created", status: 201 };
    } catch (e) {
      console.log(e);
      return { error: e, status: 500 };
    }
  }
  async forgotPassword(email) {
    try {
      const candidate = await models.User.findOne({ email });

      if (!candidate) {
        return { error: "User with this email not found", status: 404 };
      }

      if (!candidate.isVerified) {
        return { error: "User doesn't verified", status: 400 };
      }

      candidate.resetPassword = `${generateRandomPhoneCode()}${generateRandomPhoneCode()}`;

      await EmailSender.sendEmail(
        email,
        "Reset Password",
        candidate.resetPassword
      );

      await candidate.save();

      return { message: "Password reset code sent successfully", status: 200 };
    } catch (e) {
      console.log(e);
      return { error: e, status: 500 };
    }
  }

  async addPassword(code, password) {
    try {
      if (!passwordValidate(password)) {
        return { error: "Password is not valid", status: 400 };
      }
      const user = await models.User.findOne({ verificationCode: code });
      if (!user) {
        return { error: "User not found", status: 400 };
      }
      if (user.isVerified) {
        return { error: "User already verified", status: 400 };
      }
      user.password = await bcrypt.hash(password, 10);
      await user.save();
      return { message: "Password added", status: 200 };
    } catch (e) {
      console.log(e);
      return { error: e, status: 500 };
    }
  }
  async verifyPhone(phone, code) {
    try {
      const user = await models.User.findOne({ verificationCode: code });
      if (!user) {
        return { error: "User not found", status: 400 };
      }
      if (user.isVerified) {
        return { error: "User already verified", status: 400 };
      }
      user.phone = phone;
      user.phoneVerificationCode = generateRandomPhoneCode();
      console.log(user.phoneVerificationCode);
      await user.save();
      await PhoneSender.sendSMS(phone, user.phoneVerificationCode);
      return { message: "Phone added", status: 200 };
    } catch (e) {
      console.log(e);
      return { error: e, status: 500 };
    }
  }
  async verifyUser(verificationCode, phoneVerificationCode) {
    try {
      const user = await models.User.findOne({ verificationCode });
      if (!user) {
        return { error: "User not found", status: 400 };
      }
      if (user.isVerified) {
        return { error: "User already verified", status: 400 };
      }
      if (user.phoneVerificationCode !== phoneVerificationCode) {
        return { error: "Wrong phone code", status: 400 };
      }
      const favorites = await models.Favorite.create({
        user: user._id,
      });
      await favorites.save();
      user.isVerified = true;
      await user.save();
      const token = generateAccessToken({
        _id: user._id,
      });

      try {
        console.log("sending tg notification");
        await TGBot.sendMessage(
          process.env.TG_CHAT_ID,
          `New user registered: ${user.email}`
        );
      } catch (e) {
        console.log("error sending tg notification");
        console.log(e);
      }

      return {
        status: 200,
        data: {
          token,
          user: {
            _id: user._id,
            email: user.email,
            phone: user.phone,
            name: user.name,
            lastLogin: user.lastLogin,
          },
        },
      };
    } catch (e) {
      console.log(e);
      return { error: e, status: 500 };
    }
  }

  async verifyEmail(email, resetPassword) {
    try {
      const user = await models.User.findOne({ email });
      if (!user) {
        return { error: "User not found", status: 400 };
      }
      if (!user.isVerified) {
        return { error: "User already verified", status: 400 };
      }
      user.isVerified = true;
      await user.save();
      return { message: "User verified", status: 200 };
    } catch (e) {
      console.log(e);
      return { error: e, status: 500 };
    }
  }

  async newPassword(email, password) {
    try {
      const user = await models.User.findOne({ email });
      if (!user) {
        return { error: "User not found", status: 400 };
      }
      if (!user.isVerified) {
        return { error: "User already verified", status: 400 };
      }
      if (!passwordValidate(password)) {
        return { error: "Password is not valid", status: 400 };
      }
      user.password = await bcrypt.hash(password, 10);
      await user.save();
      return { message: "Password changed", status: 200 };
    } catch (e) {
      console.log(e);
      return { error: e, status: 500 };
    }
  }

  async updateProfile(name, email, numberOfDocument, iin, address) {
    try {
      const user = await models.User.findOne({ email });
      if (!user) {
        return { error: "User not found", status: 400 };
      }
      if (!user.isVerified) {
        return { error: "User already verified", status: 400 };
      }
      user.name = name;
      user.email = email;
      user.numberOfDocument = numberOfDocument;
      user.iin = iin;
      user.address = address;
      await user.save();
      return { message: "Profile updated", status: 200 };
    } catch (e) {
      console.log(e);
      return { error: e, status: 500 };
    }
  }

  async addToFavorite(userId, productId) {
    try {
      const user = await models.User.findById(userId);
      if (!user) {
        return { error: "User not found", status: 400 };
      }

      const favorites = await models.Favorite.findOne({ user: userId });
      if (!favorites) {
        return { error: "Server error, fav df", status: 500 };
      }

      const product = await models.Product.findById(productId);
      if (!product || favorites.items.includes(productId)) {
        return { error: "Product not found or already in list", status: 400 };
      }

      // favorites.properties = favorites.properties.push(productId);
      const items = favorites.items;
      items.push(productId);
      favorites.items = items;

      await favorites.save();
      return { message: "Product added to favorites", status: 200 };
    } catch (e) {
      console.log(e);
      return { error: e, status: 500 };
    }
  }

  async getFavorites(userId) {
    try {
      const user = await models.User.findById(userId);
      if (!user || !user?.isVerified || !user?.favorites) {
        return { error: "User not found", status: 400 };
      }
      const favorites = await models.Favorite.findOne({ user: userId });
      return { message: "Favorites", status: 200, data: favorites };
    } catch (e) {
      console.log(e);
      return { error: e, status: 500 };
    }
  }

  async removeFromFavorite(userId, productId) {
    try {
      const user = await models.User.findById(userId);
      if (!user) {
        return { error: "User not found", status: 400 };
      }

      const favorites = await models.Favorite.findOne({ user: userId });
      if (!favorites) {
        return { error: "Server error, fav df", status: 500 };
      }

      const product = await models.Product.findById(productId);
      if (!product || !favorites.items.includes(productId)) {
        return {
          error: "Product not found or already not in list",
          status: 400,
        };
      }

      const items = favorites.items;
      const index = items.indexOf(productId);
      if (index > -1) {
        items.splice(index, 1);
      }
      favorites.items = items;

      await favorites.save();
      return { message: "Product removed from favorites", status: 200 };
    } catch (e) {
      console.log(e);
      return { error: e, status: 500 };
    }
  }

  async editPhone(userId, phone) {
    try {
      const user = await models.User.findById(userId);
      if (!user) {
        return { error: "User not found", status: 400 };
      }
      if (!user.isVerified) {
        return { error: "User already verified", status: 400 };
      }
      user.phoneVerificationCode = generateRandomPhoneCode();
      await user.save();
      await PhoneSender.sendSMS(phone, user.phoneVerificationCode);
      return { message: "Phone updated", status: 200 };
    } catch (e) {
      console.log(e);
      return { error: e, status: 500 };
    }
  }

  async verifyEditedPhone(userId, phone, code) {
    try {
      const user = await models.User.findById(userId);
      console.log(user.phoneVerificationCode);
      console.log(code);
      if (!user) {
        return { error: "User not found", status: 400 };
      }
      if (!user.isVerified) {
        return { error: "User already verified", status: 400 };
      }
      if (user.phoneVerificationCode !== code) {
        return { error: "Wrong phone code", status: 400 };
      }
      user.phone = phone;
      await user.save();
      return { message: "Phone updated", status: 200 };
    } catch (e) {
      console.log(e);
      return { error: e, status: 500 };
    }
  }
}

export default new AuthService();
