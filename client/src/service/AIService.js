import { $host, $authHost } from "./index";
class AIService {

  async getChat() {
    try {
      const response = await $authHost.get("chat");
      const { data } = response;
      console.log(data);
      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async sendMessage(message) {
    try {
      const response = await $authHost.post("chat", { message });
      const { data } = response;
      console.log("sendMessage response" , data);
      return data.data;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

export default new AIService();
