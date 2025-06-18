import "./Tracklist.css";
import Track from "./Track";

const TrackList = ({
  canciones,
  onAdd,
  onRemove,
  isRemovable = false,
  handlePreview,
  currentPreview,
}) => {
  return (
    <div className="container-tracks">
      {canciones.map((cancion) => {
        const track = cancion.data || cancion; // permite recibir desde búsqueda o playlist;

        // Validación defensiva
        if (!track?.albumOfTrack?.coverArt?.sources?.[0]?.url) {
          return null; // O podrías mostrar un fallback
        }

        return (
          <div key={track.id} className="flex">
            <Track
              track={track}
              onAdd={onAdd}
              onRemove={onRemove}
              isRemovable={isRemovable}
              handlePreview={handlePreview}
              currentPreview={currentPreview}
            />
          </div>
        );
      })}
    </div>
  );
};

export default TrackList;
