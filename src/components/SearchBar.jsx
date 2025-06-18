import { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ handleSearch, cancion, setCancion }) => {
  return (
    <form onSubmit={handleSearch}>
      <div>
        <label htmlFor="search">Buscar canción:</label>
        <input
          id="search"
          type="text"
          placeholder="Ingresa una cancion"
          value={cancion}
          onChange={(e) => setCancion(e.target.value)}
        />
      </div>
      <div className="button-search">
        <button type="submit">Buscar</button>
      </div>
    </form>
  );
};

export default SearchBar;
