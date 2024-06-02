import { $authHost, $host } from "./index";
import Cookies from "js-cookie";
class AuthService {
  async login(email, password) {
    try {
      const response = await $host.post("auth/login", { email, password });
      const { data } = response;
      Cookies.set("token", data.data.token);
      console.log(data.data.token);
      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async register({ email, name, role }) {
    try {
      const response = await $host.post("auth/register", { email, name, role });
      const { status, data } = response;
      if (status == 200) {
        return true;
      }
      return data;
    } catch (e) {
      return null;
    }
  }

  async forgotPassword(email) {
    try {
      const response = await $host.post("auth/forgotPassword", { email });
      const { data } = response;
      console.log(data);
      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async addPassword({ code, password }) {
    try {
      const response = await $host.post("auth/addPassword", { code, password });
      const { data } = response;
      Cookies.set("token", data.code);
      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async verifyPhone({ phone, code }) {
    try {
      const response = await $host.post("auth/verifyPhone", { phone, code });
      const { data } = response;
      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async verifyUser({ verificationCode, phoneVerificationCode }) {
    try {
      const response = await $host.post("auth/verifyUser", {
        verificationCode,
        phoneVerificationCode,
      });
      const { data } = response;
      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async verifyEmail(email, otp) {
    try {
      const response = await $host.post("auth/verifyEmail", {
        email,
        resetPassword: otp,
      });
      const { data } = response;
      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async newPassword(email, password) {
    try {
      const response = await $host.post("auth/newPassword", {
        email,
        password,
      });
      const { data } = response;
      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async checkToken() {
    try {
      const response = await $authHost.get("auth/checkToken");
      const { data } = response;
      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async updateProfile({ name, email, numberOfDocument, iin, address }) {
    try {
      const response = await $authHost.post("auth/updateProfile", {
        name,
        email,
        numberOfDocument,
        iin,
        address,
      });
      const { data } = response;
      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getSettings() {
    const req = await $host.get("settings/get");
    const { data } = req;
    return data;
  }

  async editPhone({phone}) {
    const req = await $authHost.post("auth/editPhone", { phone });
    const { data } = req;
    return data;
  }

  async verifyEditedPhone({phone, code}) {
    const req = await $authHost.post("auth/verifyEditedPhone", {
      phone,
      code
    });
    return req.data;
  }
}

export default new AuthService();
