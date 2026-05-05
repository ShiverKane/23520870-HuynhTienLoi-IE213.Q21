import { useEffect, useState } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';

import MovieDataService from '../services/movies';

export default function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState({
    id: null,
    title: '',
    rated: '',
    reviews: [],
    plot: '',
    poster: '',
  });

  const getMovie = async (movieId) => {
    try {
      const response = await MovieDataService.get(movieId);
      const data = response.data || {};

      setMovie({
        id: data._id || data.id || movieId,
        title: data.title || '',
        rated: data.rated || '',
        reviews: Array.isArray(data.reviews) ? data.reviews : [],
        plot: data.plot || data.fullplot || '',
        poster: data.poster || '',
      });
    } catch {
      setMovie({
        id: movieId,
        title: '',
        rated: '',
        reviews: [],
        plot: '',
        poster: '',
      });
    }
  };

  useEffect(() => {
    if (id) {
      getMovie(id);
    }
  }, [id]);

  return (
    <div>
      <Row className="g-3">
        <Col md={4}>
          {movie.poster ? (
            <Card>
              <Card.Img variant="top" src={movie.poster} alt={movie.title || 'Poster'} />
            </Card>
          ) : null}
        </Col>

        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>{movie.title || 'Movie'}</Card.Title>
              <div style={{ marginBottom: 8 }}>Rating: {movie.rated || 'UNRATED'}</div>
              {movie.plot ? <Card.Text>{movie.plot}</Card.Text> : null}

              <Button as={Link} to={`/movies/${id}/review`} variant="link" className="p-0">
                Add Review
              </Button>
            </Card.Body>
          </Card>

          <div style={{ marginTop: 20 }}>
            <h2>Reviews</h2>
            {movie.reviews.length ? (
              <ListGroup>
                {movie.reviews.map((review, index) => (
                  <ListGroup.Item key={review._id || `${movie.id}-${index}`}>
                    <div>
                      <strong>
                        {review.name || review.user_name || 'Anonymous'} reviewed
                        {review.date && moment(review.date).isValid()
                          ? ` on ${moment(review.date).format('Do MMMM YYYY')}`
                          : review.date
                            ? ` on ${review.date}`
                            : null}
                      </strong>
                    </div>
                    <div>{review.review || review.text || ''}</div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <div>No reviews yet.</div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}
