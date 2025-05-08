// src/components/Layout.jsx
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';

function Layout() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setUser(storedUser.username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <>
      <Navbar />
      <main className="page-container">
        {user && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
         
          </div>
        )}
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
