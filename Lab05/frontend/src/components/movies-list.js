import { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import MovieDataService from '../services/movies';

export default function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchRating, setSearchRating] = useState('');
  const [ratings, setRatings] = useState(['All Ratings']);

  const retrieveMovies = async () => {
    try {
      const response = await MovieDataService.getAll();
      setMovies(response.data.movies || []);
    } catch {
      setMovies([]);
    }
  };

  const retrieveRatings = async () => {
    try {
      const response = await MovieDataService.getRatings();
      setRatings(['All Ratings', ...(response.data || [])]);
    } catch {
      setRatings(['All Ratings']);
    }
  };

  useEffect(() => {
    retrieveMovies();
    retrieveRatings();
  }, []);

  const findByTitle = async (e) => {
    e.preventDefault();
    const title = searchTitle.trim();
    if (!title) {
      retrieveMovies();
      return;
    }

    try {
      const response = await MovieDataService.getAll({ title });
      setMovies(response.data.movies || []);
    } catch {
      setMovies([]);
    }
  };

  const findByRating = async (e) => {
    e.preventDefault();
    if (!searchRating || searchRating === 'All Ratings') {
      retrieveMovies();
      return;
    }

    try {
      const response = await MovieDataService.getAll({ rated: searchRating });
      setMovies(response.data.movies || []);
    } catch {
      setMovies([]);
    }
  };

  const clearSearch = async () => {
    setSearchTitle('');
    setSearchRating('');
    retrieveMovies();
  };

  return (
    <div>
      <h2>Movies</h2>

      <Row className="g-3" style={{ marginBottom: 16 }}>
        <Col md={6}>
          <Form onSubmit={findByTitle}>
            <Row className="g-2">
              <Col xs={8}>
                <Form.Control
                  placeholder="Search by title"
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
                />
              </Col>
              <Col xs={4}>
                <Button type="submit" variant="primary" className="w-100">
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>

        <Col md={6}>
          <Form onSubmit={findByRating}>
            <Row className="g-2">
              <Col xs={8}>
                <Form.Select
                  value={searchRating}
                  onChange={(e) => setSearchRating(e.target.value)}
                >
                  {ratings.map((rating) => (
                    <option key={rating} value={rating}>
                      {rating}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={4}>
                <Button type="submit" variant="primary" className="w-100">
                  Filter
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>

        <Col xs={12}>
          <Button variant="secondary" onClick={clearSearch}>
            Clear
          </Button>
        </Col>
      </Row>

      <Row className="g-3">
        {movies.map((movie) => (
          <Col key={movie._id} xs={12} sm={6} lg={4}>
            <Card className="h-100">
              {movie.poster ? <Card.Img variant="top" src={movie.poster} alt={movie.title || 'Poster'} /> : null}
              <Card.Body className="d-flex flex-column">
                <Card.Title>{movie.title || movie.name || movie._id}</Card.Title>
                <div style={{ marginBottom: 8 }}>Rating: {movie.rated || 'UNRATED'}</div>
                {movie.plot || movie.fullplot ? <Card.Text>{movie.plot || movie.fullplot}</Card.Text> : null}
                <Button
                  as={Link}
                  to={`/movies/${movie._id}`}
                  variant="primary"
                  className="mt-auto"
                >
                  View Reviews
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
