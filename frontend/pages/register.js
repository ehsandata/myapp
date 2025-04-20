import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Register() {
  const [username, setUsername] = useState('');
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
      const res = await axios.post('http://localhost:4000/api/register', { username, email, password });
      setSuccess(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="glass-card flex flex-col gap-3">
        <div className="flex flex-col items-center mb-2">
          <span style={{fontSize:'2.2rem', marginBottom:'0.4rem'}}>📝</span>
          <h2 className="form-title">Create your account</h2>
        </div>
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <input
          type="text"
          placeholder="Username"
          autoComplete="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
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
          autoComplete="new-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        <div className="text-center mt-2 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="form-link">Login</Link>
        </div>
      </form>
    </main>
  );
}
