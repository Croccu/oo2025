import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Bootstrap from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/LoginPage.css';

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
    <div className="login-wrapper">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Login</h2>
        <div className="mb-3">
          <label>Email</label>
          <input
            className="form-control"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="text-center mt-3">
          <Bootstrap.Button type="submit">Log In</Bootstrap.Button>
        </div>
        {message && (
          <div className="text-center mt-3">
            <span>{message}</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
