import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loginTime, setLoginTime] = useState(null);

  useEffect(() => {
    // Retrieve user info and login time from localStorage
    const userData = localStorage.getItem('user');
    const loginAt = localStorage.getItem('loginTime');
    if (!userData || !loginAt) {
      router.replace('/');
      return;
    }
    setUser(JSON.parse(userData));
    setLoginTime(loginAt);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('loginTime');
    router.replace('/');
  };

  if (!user) return null;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="glass-card flex flex-col items-center gap-3">
        <span style={{fontSize:'2.2rem', marginBottom:'0.4rem'}}>📊</span>
        <h2 className="form-title">Dashboard</h2>
        <div className="mb-2 text-lg font-semibold">Welcome, {user.username || user.email}!</div>
        <div className="mb-2 text-base text-gray-300">Email: <span className="text-white">{user.email}</span></div>
        <div className="mb-4 text-base text-gray-300">Login time: <span className="text-white">{loginTime}</span></div>
        <button type="button" onClick={handleLogout} className="bg-red-600 hover:bg-red-500 transition px-6 py-2 rounded font-semibold text-white mt-2" style={{width:'180px',maxWidth:'100%'}}>
          Logout
        </button>
      </div>
    </main>
  );
}
