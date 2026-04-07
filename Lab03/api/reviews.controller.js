export default class ReviewsController {
  static async apiPostReview(req, res) {
    res.json({ action: "post", path: "/api/v1/movies/review" });
  }
  static async apiUpdateReview(req, res) {
    res.json({ action: "put", path: "/api/v1/movies/review" });
  }
  static async apiDeleteReview(req, res) {
    res.json({ action: "delete", path: "/api/v1/movies/review" });
  }
}
