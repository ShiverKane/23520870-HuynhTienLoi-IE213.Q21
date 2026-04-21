export default function Login({ onLogin }) {
  return (
    <div>
      <h2>Login</h2>
      <button type="button" onClick={onLogin}>
        Login as Guest
      </button>
    </div>
  );
}
