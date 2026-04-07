import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) return;

    try {
      reviews = await conn
        .db(process.env.MOVIEREVIEWS_NS || "sample_mflix")
        .collection("reviews");
    } catch (e) {
      console.error(`Unable to establish collection handles in ReviewsDAO: ${e}`);
      throw e;
    }
  }

  static async addReview(movieId, userInfo, review, date) {
    try {
      const reviewDoc = {
        movie_id: new ObjectId(movieId),
        user_id: userInfo.id,
        name: userInfo.name,
        review,
        date,
      };

      return await reviews.insertOne(reviewDoc);
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }

  static async updateReview(reviewId, userId, review, date) {
    try {
      const updateResponse = await reviews.updateOne(
        { _id: new ObjectId(reviewId), user_id: userId },
        { $set: { review, date } }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }

  static async deleteReview(reviewId, userId) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: new ObjectId(reviewId),
        user_id: userId,
      });

      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }
}
