import { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

import AddReview from './components/add-review';
import Login from './components/login';
import Movie from './components/movie';
import MoviesList from './components/movies-list';

export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    setUser({ name: 'Guest' });
    navigate('/movies');
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/movies');
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/movies">
            Movie Reviews
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/movies">
                Movies
              </Nav.Link>
            </Nav>
            <Nav>
              {user ? (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container style={{ paddingTop: 16 }}>
        <Routes>
          <Route path="/movies/:id/review" element={<AddReview user={user} />} />
          <Route path="/movies/:id" element={<Movie />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/" element={<MoviesList />} />
          <Route path="/movies" element={<MoviesList />} />
        </Routes>
      </Container>
    </div>
  );
}
