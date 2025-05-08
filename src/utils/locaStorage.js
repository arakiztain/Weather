// utils/localStorage.js
export function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  }
  
  export function addFavorite(city) {
    const favs = getFavorites();
    if (!favs.includes(city)) {
      localStorage.setItem('favorites', JSON.stringify([...favs, city]));
    }
  }
  
  export function removeFavorite(city) {
    const favs = getFavorites().filter(c => c !== city);
    localStorage.setItem('favorites', JSON.stringify(favs));
  }
  