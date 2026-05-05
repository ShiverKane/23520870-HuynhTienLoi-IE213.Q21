import MoviesDAO from "../dao/moviesDAO.js";

export default class MoviesController {
  static async apiGetMovies(req, res) {
    try {
      const moviesPerPageRaw = req.query.moviesPerPage
        ? Number.parseInt(req.query.moviesPerPage, 10)
        : NaN;
      const moviesPerPage = Number.isFinite(moviesPerPageRaw) && moviesPerPageRaw > 0
        ? Math.min(moviesPerPageRaw, 100)
        : 20;

      const pageRaw = req.query.page
        ? Number.parseInt(req.query.page, 10)
        : NaN;
      const page = Number.isFinite(pageRaw) && pageRaw >= 0
        ? pageRaw
        : 0;

      let filters = {};
      if (typeof req.query.rated === "string" && req.query.rated.trim()) {
        filters.rated = req.query.rated.trim();
      } else if (typeof req.query.title === "string" && req.query.title.trim()) {
        filters.title = req.query.title.trim();
      }

      const { moviesList, totalNumMovies } =
        await MoviesDAO.getMovies({
          filters,
          page,
          moviesPerPage
        });

      res.json({
        movies: moviesList,
        page: page,
        filters: filters,
        entries_per_page: moviesPerPage,
        total_results: totalNumMovies,
      });

    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetMovieById(req, res) {
    try {
      const movieId = req.params.id;
      const movie = await MoviesDAO.getMovieById(movieId);
      if (!movie) {
        res.status(404).json({ error: "not found" });
        return;
      }

      res.json(movie);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetRatings(req, res) {
    try {
      const ratings = await MoviesDAO.getRatings();
      res.json(ratings);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  }
}
