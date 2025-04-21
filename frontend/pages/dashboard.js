import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
        const res = await fetch(`${apiBase}/api/me`, { credentials: 'include' });
        if (res.status === 401) {
          router.replace('/');
          return;
        }
        const data = await res.json();
        setUser(data.user);
      } catch {
        router.replace('/');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
    await fetch(`${apiBase}/api/logout`, { method: 'POST', credentials: 'include' });
    router.replace('/');
  };

  if (loading) return null;
  if (!user) return null;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="glass-card flex flex-col items-center gap-3">
        <span style={{fontSize:'2.2rem', marginBottom:'0.4rem'}}>📊</span>
        <h2 className="form-title">Dashboard</h2>
        <div className="mb-2 text-lg font-semibold">Welcome, {user.username || user.email}!</div>
        <div className="mb-2 text-base text-gray-300">Email: <span className="text-white">{user.email}</span></div>
        <button
          type="button"
          onClick={handleLogout}
          className="form-button mt-2"
        >
          Logout
        </button>
      </div>
    </main>
  );
}
