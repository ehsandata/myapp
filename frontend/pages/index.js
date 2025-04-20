import { useState } from 'react';
import axios from 'axios';


export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
      const res = await axios.post(`${apiBase}/api/login`, { email, password });
      setSuccess('Login successful!');
      if (res.data.user) {
        setTimeout(() => {
          localStorage.setItem('user', JSON.stringify(res.data.user));
          localStorage.setItem('loginTime', new Date().toLocaleString());
          window.location.href = '/dashboard';
        }, 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="glass-card flex flex-col gap-3 mx-2 mb-4">
        <div className="flex flex-col items-center mb-2">
          <span style={{fontSize:'2.2rem', marginBottom:'0.4rem'}}>🔒</span>
          <h2 className="form-title">{success === 'Login successful!' ? 'Just a Second...' : 'Sign in to your account'}</h2>
        </div>
        {error && <div className="alert alert-error">{error}</div>}
        {success === 'Login successful!' ? (
          <div className="login-success-message">{success}</div>
        ) : (
          <>
            <input
              type="email"
              placeholder="Email address"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <hr className="form-divider" />
            <div className="text-center mt-2 text-sm">
              Don&apos;t have an account?{' '}
              <a href="/register" className="form-link">Register</a>
            </div>
          </>
        )}
      </form>
    </main>
  );
}
