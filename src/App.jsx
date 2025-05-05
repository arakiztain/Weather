import { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import './App.css';

const api_key = import.meta.env.VITE_API_KEY;
console.log(api_key);

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

  // Función de búsqueda con debounce
  const fetchWeatherData = debounce((cityName) => {
    if (cityName) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=metric`)
        .then(res => res.json())
        .then(data => {
          if (data.cod === 200) {
            setWeather(data);
          } else {
            setWeather(null);
            console.log(data);
            alert('Ciudad no encontrada');
          }
        });
    }
  }, 1000); // 1000ms de debounce (1 segundo)

  // Llamada a la API cuando la ciudad cambia
  useEffect(() => {
    fetchWeatherData(city); // Llamamos a la función con debounce
    // Limpiar el debounce cuando el componente se desmonte
    return () => {
      fetchWeatherData.cancel();
    };
  }, [city]);

  // Añadir a favoritos
  const addToFavorites = () => {
    if (!favorites.includes(city)) {
      const cityFormatted = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
      setFavorites([...favorites, cityFormatted]);
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
        onChange={(e) => setCity(e.target.value)} // Actualizamos la ciudad al escribir
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
