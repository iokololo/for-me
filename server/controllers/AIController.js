import AIService from "../services/AIService.js";

class AIController {
  async getChat(req, res) {
    const response = await AIService.getChat(req.user.data._id);
    return res.status(response.status).json(response);
    }

  async sendMessage(req, res) {
    const response = await AIService.sendMessage(req.body.message, req.user.data._id);
    return res.status(response.status).json(response);
  }
}

export default new AIController();
