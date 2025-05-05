// src/components/WeatherCard.jsx
function WeatherCard({ weather }) {
    if (!weather) return null;
  
    return (
      <div>
        <h2>{weather.name}</h2>
        <p>🌡️ Temp: {weather.main.temp}°C</p>
        <p>☁️ Estado: {weather.weather[0].description}</p>
        <p>💨 Viento: {weather.wind.speed} m/s</p>
      </div>
    );
  }
  
  export default WeatherCard;
  