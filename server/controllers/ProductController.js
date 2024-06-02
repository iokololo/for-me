import ProductService from "../services/ProductService.js";

class ProductController {
  async getAll(req, res) {
    const response = await ProductService.getAll();
    return res.status(response.status).json(response);
  }

  async getBought(req, res) {
    const response = await ProductService.getBoughtProperties(
      req.user.data._id
    );
    return res.status(response.status).json(response);
  }

  async getDeveloper(req, res) {
    const response = await ProductService.getDeveloper(req.params.id);
    return res.status(response.status).json(response);
  }

  async getAuthor(req, res) {
    const response = await ProductService.getAuthor(req.params.id);
    return res.status(response.status).json(response);
  }

  async getById(req, res) {
    const userId = req.user ? req.user.data._id : null; 
    const response = await ProductService.getById(req.params.id, userId);
    return res.status(response.status).json(response);
  }

  async uploadImage(req, res) {
    try {
      console.log(16, req.files)
      const images = req.files.map((file) => file.path);
      return res.status(200).json(images);
    } catch (e) {}
  }

  async getAllSales(req, res) {
    try {
      const { page, limit, main } = req.query;
      console.log(12, main)
      const response = await ProductService.getAllSales(page, limit, main);
      return res.status(response.status).json(response);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }

  async getAllAuctions(req, res) {
    try {
      const { page, limit, main } = req.query;
      const response = await ProductService.getAllAuctions(page, limit, main);
      return res.status(response.status).json(response);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }

  async getAllBusinesses(req, res) {
    try {
      const { page, limit, main } = req.query;
      const response = await ProductService.getAllBusinesses(
        page,
        limit,
        main
      );
      return res.status(response.status).json(response);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }

  async getAllInvestOffers(req, res) {
    try {
      const { page, limit, main } = req.query;
      const response = await ProductService.getAllInvestOffers(
        page,
        limit,
        main
      );
      return res.status(response.status).json(response);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }

  async getFilteredProperties(req, res) {
    try {
      const { page, limit } = req.query;
      const { filters, currentSort } = req.body;
      const { properties, totalProperties } =
        await ProductService.getFilteredProperties(
          filters,
          currentSort,
          page,
          limit
        );

      if (properties) {
        res.setHeader("x-total-count", totalProperties);
        res.setHeader("Access-Control-Expose-Headers", "x-total-count");
        res.status(200).json(properties);
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }

  async getAllProperties(req, res) {
    try {
      const { page, limit } = req.query;
      const currentSort = req.body;
      const { properties, totalProperties } =
        await ProductService.getAllProperties(page, limit, currentSort);
      if (properties) {
        res.setHeader("x-total-count", totalProperties);
        res.setHeader("Access-Control-Expose-Headers", "x-total-count");
        return res.status(200).json(properties);
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }

  async getCountProperties(req, res) {
    try {
      const filters = req.body;
      const { maxPrice, count } = await ProductService.getCountProperties(
        filters
      );
      return res.status(200).json({ maxPrice, count });
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }

  async contact(req, res) {
    try {
      console.log(req.body);
      const { id } = req.body;
      const response = await ProductService.contact(req.user.data._id, id);
      return res.status(response.status).json(response);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }
}

export default new ProductController();
