import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;

let movies;

export default class MoviesDAO {
  static async injectDB(conn) {
    if (movies) return;

    try {
      movies = await conn
        .db(process.env.MOVIEREVIEWS_NS || "sample_mflix")
        .collection("movies");
    } catch (e) {
      console.error(`Unable to connect: ${e}`);
      throw e;
    }
  }

  static async getMovies({
    filters = null,
    page = 0,
    moviesPerPage = 20,
  } = {}) {
    if (!movies) {
      throw new Error("Database not initialized");
    }

    let query = {};

    if (filters) {
      if ("title" in filters) {
        query = { $text: { $search: filters.title } };
      } else if ("rated" in filters) {
        query = { rated: { $eq: filters.rated } };
      }
    }

    try {
      const cursor = await movies
        .find(query)
        .limit(moviesPerPage)
        .skip(moviesPerPage * page);

      const moviesList = await cursor.toArray();
      const totalNumMovies = await movies.countDocuments(query);

      return { moviesList, totalNumMovies };

    } catch (e) {
      console.error(`Error: ${e}`);
      throw e;
    }
  }

  static async getMovieById(id) {
    try {
      const pipeline = [
        { $match: { _id: new ObjectId(id) } },
        {
          $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "movie_id",
            as: "reviews",
          },
        },
      ];

      return await movies.aggregate(pipeline).next();
    } catch (e) {
      console.error(`Unable to get movie by id: ${e}`);
      throw e;
    }
  }

  static async getRatings() {
    try {
      return await movies.distinct("rated");
    } catch (e) {
      console.error(`Unable to get ratings: ${e}`);
      throw e;
    }
  }
}
