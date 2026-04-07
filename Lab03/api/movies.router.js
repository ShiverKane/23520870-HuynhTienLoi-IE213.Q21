import express from "express";
import ReviewsController from "./reviews.controller.js";
import movies from "./movies.route.js";

const router = express.Router();

router.use("/", movies);

router
  .route("/review")
  .post(ReviewsController.apiPostReview)
  .put(ReviewsController.apiUpdateReview)
  .delete(ReviewsController.apiDeleteReview);

export default router;
