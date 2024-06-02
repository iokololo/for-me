import models from "../models/index.js";

class ReviewService {
  async createReview(data, userId) {
    try {
      await models.Review.create(
        {
            user: userId,
            ...data
        });

      return this.getProductReviews(data.product)
    } catch (e) {
      console.log(e);
      return { status: 500, data: e.message };
    }
  }

  async getProductReviews(productId) {
    try {

        const reviews = await models.Review.find({
            product: productId
        }).populate(['user']);

        return {
          status: 200,
          data: reviews
        };
      } catch (e) {
        console.log(e);
        return { status: 500, data: e.message };
      }
  }
}

export default new ReviewService();
