import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {
  static async apiPostReview(req, res) {
    try {
      const { movie_id, review, userinfo } = req.body ?? {};
      const date = new Date();

      const reviewResponse = await ReviewsDAO.addReview(movie_id, userinfo, review, date);
      if (reviewResponse?.error) {
        console.error(reviewResponse.error);
        res.status(500).json({ error: "unable to post review" });
        return;
      }

      res.json({ status: "success" });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  }
  static async apiUpdateReview(req, res) {
    try {
      const { review_id, user_id, review } = req.body ?? {};
      const date = new Date();

      const reviewResponse = await ReviewsDAO.updateReview(
        review_id,
        user_id,
        review,
        date
      );

      if (reviewResponse?.error) {
        console.error(reviewResponse.error);
        res.status(500).json({ error: "unable to update review" });
        return;
      }

      if (!reviewResponse?.modifiedCount) {
        throw new Error("unable to update review");
      }

      res.json({ status: "success" });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  }
  static async apiDeleteReview(req, res) {
    try {
      const { review_id, user_id } = req.body ?? {};

      const reviewResponse = await ReviewsDAO.deleteReview(review_id, user_id);
      if (reviewResponse?.error) {
        console.error(reviewResponse.error);
        res.status(500).json({ error: "unable to delete review" });
        return;
      }

      res.json({ status: "success" });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  }
}
