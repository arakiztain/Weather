// src/components/SearchBar.jsx
function SearchBar({ value, onChange, onAddFavorite }) {
    return (
      <div>
        <input
          type="text"
          placeholder="Introduce una ciudad..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button onClick={onAddFavorite}>⭐ Añadir a favoritos</button>
      </div>
    );
  }
  
  export default SearchBar;
  