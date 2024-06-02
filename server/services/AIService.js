import models from "../models/index.js";
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: 'sk-proj-tNa6LVQLv5yN7OEv5B4pT3BlbkFJ7jobwuXUDOy9l5SAB6Gx',
  });

class AIService {
  async sendMessage(message, userId) {
    try {
        const { data }  = await this.getChat(userId);


        const [response, ] = await Promise.all([
            openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    ...data,
                    { role: "user", content: message }
                ]
              }),
              models.Chat.create({
                content: message,
                user: userId,
                role: 'user'
              })
        ]);

      const botReply = response.choices[0].message.content;

      await models.Chat.create({
        content: botReply,
        user: userId,
        role: 'assistant'
      })

      return this.getChat(userId)
    } catch (e) {
      console.log(e);
      return { status: 500, data: e.message };
    }
  }

  async getChat(userId) {
    try {

        const messages = await models.Chat.find({
            user: userId
        }).sort({ order: 1 });

        return {
          status: 200,
          data: messages
        };
      } catch (e) {
        console.log(e);
        return { status: 500, data: e.message };
      }
  }
}

export default new AIService();
