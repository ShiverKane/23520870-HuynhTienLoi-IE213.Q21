import { Link } from 'react-router-dom';

export default function MoviesList() {
  return (
    <div>
      <h2>Movies</h2>
      <ul>
        <li>
          <Link to="/movies/1">Movie 1</Link>
        </li>
        <li>
          <Link to="/movies/2">Movie 2</Link>
        </li>
      </ul>
    </div>
  );
}
