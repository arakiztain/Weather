import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(stored);
  }, []);

  const handleCityClick = (city) => {
    navigate(`/city/${city}`);
  };

  const removeFavorite = (city) => {
    const updated = favorites.filter((c) => c !== city);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div className="App">
      <h1>⭐ Favorite Cities</h1>
      {favorites.length === 0 ? (
        <p>No favorites yet</p>
      ) : (
        <ul>
          {favorites.map((city) => (
            <li key={city}>
              <button onClick={() => handleCityClick(city)}>{city}</button>
              <button onClick={() => removeFavorite(city)}>❌</button>
            </li>
          ))}
        </ul>
      )}
      <Link to="/">🔙 Back to Home</Link>
    </div>
  );
}

export default Favorites;
