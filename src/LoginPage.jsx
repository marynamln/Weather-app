import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function LoginPage({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'maryna3@gmail.com' && password === 'maryna3') {
      setIsAuthenticated(true);
      Cookies.set('auth', 'true', { expires: 1, secure: true, sameSite: 'strict' });
      navigate('/dashboard');
    } else {
      setError('Invalid login or password!');
    }
  };

  return (
    <div className="login-container">
      <h2>Log to Web App</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}
        
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;