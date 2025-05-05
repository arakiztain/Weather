// src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';
require('dotenv').config();

const api_key = process.env.API_KEY;

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );

  // Guardar favoritos en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Buscar el clima cada vez que la ciudad cambia
  useEffect(() => {
    if (city) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)
        .then(res => res.json())
        .then(data => {
          if (data.cod === 200) {
            setWeather(data);
          } else {
            setWeather(null);
            alert('Ciudad no encontrada');
          }
        });
    }
  }, [city]);

  // Añadir a favoritos
  const addToFavorites = () => {
    if (!favorites.includes(city)) {
      setFavorites([...favorites, city]);
    }
  };

  // Eliminar de favoritos
  const removeFromFavorites = (cityToRemove) => {
    setFavorites(favorites.filter(c => c !== cityToRemove));
  };

  return (
    <div className="App">
      <h1>🌤️ Weather App</h1>

      <input
        type="text"
        placeholder="Introduce una ciudad..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={addToFavorites}>⭐ Añadir a favoritos</button>

      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>🌡️ Temp: {weather.main.temp}°C</p>
          <p>☁️ Estado: {weather.weather[0].description}</p>
          <p>💨 Viento: {weather.wind.speed} m/s</p>
        </div>
      )}

      <h3>⭐ Favoritas</h3>
      <ul>
        {favorites.map((fav) => (
          <li key={fav}>
            <button onClick={() => setCity(fav)}>{fav}</button>
            <button onClick={() => removeFromFavorites(fav)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
