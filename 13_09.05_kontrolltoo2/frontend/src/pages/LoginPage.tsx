import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Bootstrap from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/users/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
        { method: 'GET' }
      );
      const text = await response.text();
      setMessage(text);

      if (text === 'Login successful') {
        localStorage.setItem('loggedIn', 'true');
        setTimeout(() => navigate('/'), 500);
      }
    } catch (error) {
      console.error('Login failed', error);
      setMessage('Something went wrong');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '80px auto', padding: '1rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email</label>
          <input
            className="form-control"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Bootstrap.Button type="submit">Log In</Bootstrap.Button>
        </div>
      </form>
      {message && (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <span>{message}</span>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
