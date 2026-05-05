import { useParams } from 'react-router-dom';

export default function AddReview({ user }) {
  const { id } = useParams();

  return (
    <div>
      <h2>Add Review</h2>
      <div>Movie id: {id}</div>
      <div style={{ marginTop: 12 }}>
        {user ? (
          <form>
            <div>
              <textarea rows={4} style={{ width: '100%', maxWidth: 560 }} />
            </div>
            <button type="button" style={{ marginTop: 8 }}>
              Submit
            </button>
          </form>
        ) : (
          <div>Please login to add a review.</div>
        )}
      </div>
    </div>
  );
}
