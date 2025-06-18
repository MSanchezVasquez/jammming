import TrackList from "./TrackList";
import "./SearchResults.css";

const SearchResults = ({ canciones, terminoBusqueda, onAdd }) => {
  return (
    <div className="container-results">
      {}
      {terminoBusqueda && canciones.length > 0 ? (
        <h2 className="title-results">
          Results for:{" "}
          <span style={{ color: "#00FF7F" }}>{terminoBusqueda}</span>
        </h2>
      ) : (
        <h2 className="title">Results...</h2>
      )}

      <TrackList canciones={canciones} onAdd={onAdd} />
    </div>
  );
};

export default SearchResults;
