import { $host, $authHost } from "./index";

class ProductController {
  async getAll() {
    try {
      const req = await $host.get("product/");
      return req.data;
    } catch (e) {
      return null;
    }
  }

  async getCourses(page = 1, limit = 5, main = false) {
    try {
      const req = await $host.get("product/sales", {
        params: {
          page,
          limit,
          main,
        },
      });
      return req.data;
    } catch (e) {
      return null;
    }
  }

  async getBooks(page = 1, limit = 5, main = false) {
    try {
      const req = await $host.get("product/auctions", {
        params: {
          page: page,
          limit: limit,
          main: main,
        },
      });
      return req.data;
    } catch (e) {
      return null;
    }
  }

  async getBestBooks() {
    try {
      const req = await $host.get("product/books", {
        params: {
          page: 1,
          limit: 5,
        },
      });
      return req.data;
    } catch (e) {
      return null;
    }
  }

  async getBusinesses(page = 1, limit = 5, main = false) {
    try {
      const req = await $host.get("product/businesses", {
        params: {
          page: page,
          limit: limit,
          main: main,
        },
      });
      return req.data;
    } catch (e) {
      return null;
    }
  }

  async getInvestOffers(page = 1, limit = 5, main = false) {
    try {
      const req = await $host.get("product/investOffers", {
        params: {
          page: page,
          limit: limit,
          main: main,
        },
      });
      return req.data;
    } catch (e) {
      return null;
    }
  }

  async getProduct(id) {
    try {
      console.log(54, id)
      const req = await $authHost.get(`product/id/${id}`);
      return req.data;
    } catch (e) {
      return null;
    }
  }

  async getDeveloper(id) {
    try {
      const req = await $host.get(`product/author/${id}`);
      return req.data;
    } catch (e) {
      return null;
    }
  }

  async getFilteredProperties(filters, currentSort, page, limit) {
    try {
      const req = await $host.post(
        `product/getFilters?page=${page}&limit=${limit}`,
        {
          filters,
          currentSort,
        }
      );
      return req;
    } catch (e) {
      return null;
    }
  }

  async getAllProperties(page, limit, currentSort) {
    try {
      const req = await $host.post(
        `product/getAllProperties?page=${page}&limit=${limit}`,
        currentSort
      );
      return req;
    } catch (e) {
      return null;
    }
  }

  async getCountProperties(filters) {
    try {
      const req = await $host.post("product/getCountProperties", filters);
      return req.data;
    } catch (e) {
      return null;
    }
  }

  async removeFavorite(product) {
    try {
      const req = await $authHost.post("auth/remove-favorite", {
        product,
      });
      return req;
    } catch (e) {
      return null;
    }
  }

  async addFavorite(product) {
    try {
      const req = await $authHost.post("auth/add-favorite", {
        product,
      });
      return req;
    } catch (e) {
      return null;
    }
  }

  async getBuyHistory() {
    try {
      const req = await $authHost.get("product/getBought");
      if (req.status === 200) {
        return req.data;
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  async cotact(id) {
    try {
      const req = await $authHost.post("product/contact", { id });
      if (req.status === 200) {
        return req.data;
      }
      return null;
    } catch (e) {
      return null;
    }
  }

}

export default new ProductController();
