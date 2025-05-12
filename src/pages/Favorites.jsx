import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';



function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(stored);
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const api_key = import.meta.env.VITE_API_KEY;
      const newWeatherData = {};

      for (const city of favorites) {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}&lang=es`
          );
          newWeatherData[city] = response.data;
        } catch (error) {
          console.error(`Error al cargar clima de ${city}:`, error);
        }
      }

      setWeatherData(newWeatherData);
    };

    if (favorites.length > 0) {
      fetchWeatherData();
    }
  }, [favorites]);

  const handleCityClick = (city) => {
    navigate(`/city/${city}`);
  };

  const removeFavorite = (city) => {
    const updated = favorites.filter((c) => c !== city);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div style={{ padding: '80px 20px' }}>
      <h1>⭐ Favorites cities</h1>
      {favorites.length === 0 ? (
        <p>Not favorites yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {favorites.map((city) => (
            <div
              key={city}
              style={{
                backgroundColor: '#f9f9f9',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
              }}
            >
              <h2>{city}</h2>
              {weatherData[city] ? (
                <>
                  <p>☁️ Condition: {weatherData[city].weather[0].description}</p>
                  <p>🌡️ Temp: {Math.round(weatherData[city].main.temp)}°C</p>
                </>
              ) : (
                <p>Cargando clima...</p>
              )}
              <button onClick={() => removeFavorite(city)}>❌ Delete</button>
            </div>
          ))}
        </div>
      )}
      <Link to="/" style={{ display: 'block', marginTop: '20px' }}>
        🔙 Back to home
      </Link>
    </div>
  );
}

export default Favorites;
