import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      if (response.token) {
        localStorage.setItem('token', response.token);
        navigate('/products');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-logo">Silicone</div>
      <div className="login-box">
        <h1>Sign-In</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Email or mobile phone number</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">Sign-In</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p className="login-footer">
          By continuing, you agree to Silicone's <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </p>
      </div>
      <div className="login-divider">
        <hr />
        <span>New to Silicone?</span>
        <hr />
      </div>
      <button className="create-account-button">Create your Silicone account</button>
    </div>
  );
}

export default LoginPage;