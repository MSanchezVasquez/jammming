import TrackList from "./TrackList";
import "./Playlist.css";
import { useState } from "react";
import { LiaTrashAlt } from "react-icons/lia";
import Spotify from "../utils/Spotify";

const Playlist = ({
  canciones,
  onRemove,
  onClear,
  handlePreview,
  currentPreview,
}) => {
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    const trackUris = canciones.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackUris);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };
  return (
    <div className="container-playlist">
      {isEditing ? (
        <input
          className="editable-title"
          type="text"
          value={playlistName}
          autoFocus
          onChange={(e) => setPlaylistName(e.target.value)}
          onBlur={() => setIsEditing(false)}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <h2
          className="title-playlist editable-title"
          onClick={() => setIsEditing(true)}
          title="Haz clic para editar"
        >
          {playlistName} ({canciones.length})
        </h2>
      )}

      <button className="clear-playlist-button" onClick={onClear}>
        <LiaTrashAlt />
      </button>

      <div className="playlist-track-grid">
        <TrackList canciones={canciones} onRemove={onRemove} isRemovable />
      </div>
      <button className="save-button" onClick={handleSave}>
        Save to Spotify
      </button>
    </div>
  );
};

export default Playlist;
