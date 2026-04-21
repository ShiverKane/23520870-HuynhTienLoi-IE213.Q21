import { Link, useParams } from 'react-router-dom';

export default function Movie() {
  const { id } = useParams();

  return (
    <div>
      <h2>Movie</h2>
      <div>Movie id: {id}</div>
      <div style={{ marginTop: 12 }}>
        <Link to={`/movies/${id}/review`}>Add review</Link>
      </div>
    </div>
  );
}
