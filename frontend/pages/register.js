import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Link from 'next/link';
import ProjectIcon from '../components/ProjectIcon';

import { PasswordRules, isPasswordValid } from '../components/Functions';



export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPwRules, setShowPwRules] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const fadeTimeout = useRef(null);
  const unmountTimeout = useRef(null);

  // Show rules box when password starts being typed
  useEffect(() => {
    if (password) {
      setShowPwRules(true);
      setFadeOut(false); // reset fade on typing
      if (fadeTimeout.current) {
        clearTimeout(fadeTimeout.current);
        fadeTimeout.current = null;
      }
      if (unmountTimeout.current) {
        clearTimeout(unmountTimeout.current);
        unmountTimeout.current = null;
      }
    } else {
      setShowPwRules(false);
    }
    // cleanup on unmount
    return () => {
      if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
      if (unmountTimeout.current) clearTimeout(unmountTimeout.current);
    };
  }, [password]);

  useEffect(() => {
    // When all rules are valid, fade out after 3s
    if (password && isPasswordValid(password) && showPwRules) {
      fadeTimeout.current = setTimeout(() => {
        setFadeOut(true);
        // Remove box after fade out duration (0.5s)
        unmountTimeout.current = setTimeout(() => setShowPwRules(false), 500);
      }, 3000);
    }
    // cleanup on unmount
    return () => {
      if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
      if (unmountTimeout.current) clearTimeout(unmountTimeout.current);
    };
    // eslint-disable-next-line
  }, [password, showPwRules]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!isPasswordValid(password)) {
      setError('Password does not meet all requirements.');
      return;
    }
    setLoading(true);
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
      const res = await axios.post(`${apiBase}/api/register`, { username, email, password });
      setSuccess(res.data.message);
      setTimeout(() => {
        window.location.href = '/'; // Redirect to login after 3 sec
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="glass-card flex flex-col gap-3">
        <div className="flex flex-col items-center justify-center mb-2 w-full">
  <div className="flex justify-center items-center w-full">
    <ProjectIcon type="register" style={{ marginBottom: '0.4rem' }} width={48} height={48} />
  </div>
  <h2 className="form-title">Create your account</h2>
</div>
        {error && <div className="alert alert-error alert-left">{error}</div>}
        {success && <div className="alert alert-success alert-left">{success}</div>}
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
        {showPwRules && (
          <div
            className={`password-rules-fade-box${fadeOut ? ' password-rules-fadeout' : ''}`}
            style={{ opacity: 0.7 }}
          >
            <PasswordRules password={password} />
          </div>
        )}
        <button
          type="submit"
          disabled={loading || !isPasswordValid(password)}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        <hr className="form-divider" />
        <div className="text-center mt-2 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="form-link">Login</Link>
        </div>
      </form>
    </main>
  );
}
