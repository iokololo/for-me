import { $authHost } from "./index";
class ReviewService {

  async getProductReviews(productId) {
    try {
      const response = await $authHost.get(`reviews/product/${productId}`);
      const { data } = response;
      console.log(data);
      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async createReview(productId, stars, text) {
    try {
      const response = await $authHost.post("reviews", { product: productId, stars, text });
      const { data } = response;
      console.log("createReview response" , data);
      return data.data;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

export default new ReviewService();
