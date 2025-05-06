import { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import './App.css';

import sunny from './assets/sunny.gif';
import cloudy from './assets/cloudy.gif';
import rain from './assets/rainy.gif';
import snow from './assets/snowy.gif';
import mist from './assets/mist.gif';
import haze from './assets/haze.gif';
import scattered from './assets/scattered clouds.gif';
import defaultBg from './assets/default.gif';

const api_key = import.meta.env.VITE_API_KEY;

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Cambiar el fondo dinámicamente
  const fetchWeatherData = debounce((cityName) => {
    if (cityName) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=metric`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.cod === 200) {
            setWeather(data);
          } else {
            setWeather(null);
            alert('Ciudad no encontrada');
          }
        });
    }
  }, 1000);

  useEffect(() => {
    fetchWeatherData(city);
    return () => {
      fetchWeatherData.cancel();
    };
  }, [city]);

  // Función para obtener el fondo según el clima
  const getBackgroundImage = () => {
    if (!weather) return defaultBg;
    const description = weather.weather[0].description.toLowerCase();

    if (description.includes('sun') || description.includes('clear')) return sunny;
    if (description.includes('scattered')) return scattered;
    if (description.includes('cloud')) return cloudy;
    if (description.includes('rain') || description.includes('drizzle')) return rain;
    if (description.includes('snow')) return snow;
    if (description.includes('mist') || description.includes('fog')) return mist;
    if (description.includes('haze')) return haze;

    return defaultBg;
  };

  // Cambiar el fondo de la página cada vez que el clima cambia
  useEffect(() => {
    const backgroundImage = getBackgroundImage();
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';
    document.body.style.minHeight = '100vh';
  }, [weather]); // Se ejecuta cada vez que el clima cambia

  const addToFavorites = () => {
    if (!favorites.includes(city)) {
      const cityFormatted =
        city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
      setFavorites([...favorites, cityFormatted]);
    }
  };

  const removeFromFavorites = (cityToRemove) => {
    setFavorites(favorites.filter((c) => c !== cityToRemove));
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
        <div className="weather-card">
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
