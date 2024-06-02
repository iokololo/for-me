import { $host, $authHost } from "./index";

class AuthorService {

  async getAuthors(page = 1, limit = 10, search) {
    try {
      const req = await $host.get("authors", {
        params: {
          page,
          limit,
          search
        },
      });
      return req.data;
    } catch (e) {
      return null;
    }
  }

  async getById(id) {
    try {
      const req = await $host.get(`authors/${id}`);
      return req.data;
    } catch (e) {
      return null;
    }
  }

  async hire(data) {
    try {
      const req = await $host.post(`authors/hire`, data);
      return req.data;
    } catch (e) {
      return null;
    }
  }

}

export default new AuthorService();
