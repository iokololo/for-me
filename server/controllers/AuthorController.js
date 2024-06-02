import AuthorService from "../services/AuthorService.js";

class AuthorController {
  async getAll(req, res) {
    const { page, limit, search } = req.query;
    const response = await AuthorService.getAll(page, limit, search);
    return res.status(response.status).json(response);
  }

  async getById(req, res) {
    const response = await AuthorService.getById(req.params.id);
    return res.status(response.status).json(response);
  }

  async hire(req, res) {
    const response = await AuthorService.hire(req.body);
    return res.status(response.status).json(response);
  }

}

export default new AuthorController();
