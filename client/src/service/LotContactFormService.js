import { $authHost, $host } from "./index.js";

class LotContactFormService {
  async saveData(city, name, phone, comment) {
    try {
      const response = await $host.post("/lot/save", {
        city,
        name,
        phone,
        comment,
      });
      return response.status === 200;
    } catch (e) {
      console.log(e);
    }
  }
}

export default new LotContactFormService();
