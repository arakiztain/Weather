import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './City.css';

const weatherApiKey = import.meta.env.VITE_API_KEY;
const unsplashApiKey = import.meta.env.VITE_UNSPLASH_KEY;

function City() {
  const { name } = useParams();
  const [imageUrl, setImageUrl] = useState('');
  const [weatherDescription, setWeatherDescription] = useState('');

  const formatCityName = (name) =>
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${weatherApiKey}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cod === 200) {
          const description = data.weather[0].description;
          setWeatherDescription(description);
          searchImage(name, description);
        } else {
          setImageUrl('');
          alert('City not found');
        }
      });
  }, [name]);

  const searchImage = (city, weatherDesc) => {
    const query = `${city} ${weatherDesc}`;
    fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&client_id=${unsplashApiKey}&per_page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          setImageUrl(data.results[0].urls.regular);
        } else {
          setImageUrl('');
          alert('No image found');
        }
      });
  };

  return (
    <div className="city-container">
      {imageUrl ? (
        <div className="image-wrapper">
          <div className="overlay-text">
            <h1>{formatCityName(name)}</h1>
            <h2>{weatherDescription}</h2>
          </div>
          <img src={imageUrl} alt={`${name} weather`} />
        </div>
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
}

export default City;
