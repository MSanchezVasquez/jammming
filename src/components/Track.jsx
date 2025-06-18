import "./Track.css";
import { FaCirclePlay } from "react-icons/fa6";
import { IoAdd } from "react-icons/io5";
import { IoRemove } from "react-icons/io5";

const Track = ({
  track,
  onAdd,
  onRemove,
  isRemovable,
  handlePreview,
  currentPreview,
}) => {
  const artistas = track.artists.items
    .map((artista) => artista.profile.name)
    .join(", ");

  return (
    <div className="track">
      <img
        title={track.albumOfTrack.name}
        src={track.albumOfTrack.coverArt.sources[0].url}
        alt={`Portada de ${track.name}`}
      />
      <h2 title={track.name}>{track.name}</h2>
      <p title={artistas}>{artistas}</p>
      <div className="botones">
        <a href={track.uri} target="_blank" rel="noopener noreferrer">
          <button className="button-play">
            <FaCirclePlay
              style={{
                marginRight: "1px",
                color: "#ededed",
              }}
            />{" "}
            Play song
          </button>
        </a>

        {!isRemovable ? (
          <button
            className="button-add-playlist"
            onClick={() => onAdd && onAdd(track)}
          >
            <IoAdd />
          </button>
        ) : (
          <button
            className="button-remove-playlist"
            onClick={() => onRemove && onRemove(track)}
          >
            <IoRemove />
          </button>
        )}
      </div>
      {track.preview_url && (
        <button
          className="preview-button"
          onClick={() => handlePreview(track.preview_url)}
        >
          {currentPreview === track.preview_url ? "⏸️" : "▶️"}
        </button>
      )}
    </div>
  );
};

export default Track;
