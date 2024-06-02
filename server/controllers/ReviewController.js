import ReviewService from "../services/ReviewService.js";

class ReviewController {
  async getProductReviews(req, res) {
    const response = await ReviewService.getProductReviews(req.params.id);
    return res.status(response.status).json(response);
    }

  async createReview(req, res) {
    const response = await ReviewService.createReview(req.body, req.user.data._id);
    return res.status(response.status).json(response);
  }
}

export default new ReviewController();
