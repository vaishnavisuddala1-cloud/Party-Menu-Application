import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import '../styles/signin.css';

export default function SignIn() {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const { login, loading, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, location]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await login({ email, password });
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="signin-page">
      <div className="signin-card">
        <div className="signin-branding">
          <div className="signin-icon">PM</div>
          <div>
            <h1>Party Menu</h1>
            <p className="signin-subtitle">Sign in to explore our delicious menu</p>
          </div>
        </div>
        {error ? <div className="signin-error">{error}</div> : null}
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
