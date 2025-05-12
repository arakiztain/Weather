// src/components/FavoritesList.jsx
function FavoritesList({ favorites, onSelect, onRemove }) {
  return (
    <div>
      <h3>⭐ Favorites</h3>
      <ul>
        {favorites.map((city) => (
          <li key={city}>
            <button onClick={() => onSelect(city)}>{city}</button>
            <button onClick={() => onRemove(city)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoritesList;
