import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const lastCity = localStorage.getItem('lastCity');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('currentUser'));
    if (stored) setUser(stored.username);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-spacer" /> {/* Espaciador izquierdo */}
        
        <div className="nav-links">
          <Link to="/" className="nav-link">🏠 Home</Link>
          <Link to="/favorites" className="nav-link">⭐ Favoritos</Link>
          <Link
            to={lastCity ? `/city/${lastCity}` : '/'}
            className="nav-link"
            onClick={(e) => {
              if (!lastCity) {
                e.preventDefault();
                alert('Primero busca una ciudad');
              }
            }}
          >
            🌆 City
          </Link>
        </div>

        <div className="user-section">
          {user ? (
            <>
              <span className="username">👤 {user}</span>
              <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Iniciar sesión</Link>
              <Link to="/register" className="nav-link">Registrarse</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
