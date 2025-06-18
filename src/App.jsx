import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";

function App() {
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [ultimaBusqueda, setUltimaBusqueda] = useState("");
  const [cancion, setCancion] = useState("");
  const [canciones, setCanciones] = useState([]);
  const [playList, setPlaylist] = useState([]);
  const [currentPreview, setCurrentPreview] = useState(null); // URL activa
  const [audio, setAudio] = useState(null); // Objeto Audio en reproducción

  const addToPlaylist = (track) => {
    if (!playList.find((t) => t.id === track.id)) {
      setPlaylist([...playList, track]);
    }
  };

  const removeFromPlaylist = (track) => {
    setPlaylist(playList.filter((t) => t.id !== track.id));
  };

  const handleClearPlaylist = () => {
    setPlaylist([]);
  };

  const handlePreview = (url) => {
    if (audio) {
      audio.pause();
      setAudio(null);
      if (currentPreview === url) {
        setCurrentPreview(null);
        return;
      }
    }

    const newAudio = new Audio(url);
    newAudio.play();
    setAudio(newAudio);
    setCurrentPreview(url);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (cancion.trim() === "") {
      alert("Debes ingresar algo");
      return;
    }
    setUltimaBusqueda(cancion);
    setCancion("");
    getSong(cancion);
  };

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "ee2fce47fdmshab66b47f1059676p162ffbjsn5c2ecc403e87",
      "x-rapidapi-host": "spotify23.p.rapidapi.com",
    },
  };

  const getSong = async (cancion) => {
    try {
      const url = `https://spotify23.p.rapidapi.com/search/?q=${cancion}&type=multi&offset=0&limit=20&numberOfTopResults=5`;
      let data = await fetch(url, options);
      let res = await data.json();
      const items = res?.tracks?.items || [];
      if (items.length === 0) {
        alert("No se encontraron canciones.");
      }
      console.log(items);
      setCanciones(items);
      setMostrarResultados(true);
    } catch (error) {
      console.error("Error al buscar canción:", error);
      alert("Ocurrió un error. Intenta de nuevo.");
    }
  };

  return (
    <>
      <h2 className="title-app">
        Ja<span className="mmm">mmm</span>ing
      </h2>

      <SearchBar
        handleSearch={handleSearch}
        cancion={cancion}
        setCancion={setCancion}
      />

      {mostrarResultados && (
        <div className="container-results-and-playlist">
          <SearchResults
            canciones={canciones}
            terminoBusqueda={ultimaBusqueda}
            onAdd={addToPlaylist}
            handlePreview={handlePreview}
            currentPreview={currentPreview}
          />
          {playList.length > 0 && (
            <Playlist
              canciones={playList}
              onRemove={removeFromPlaylist}
              onClear={handleClearPlaylist}
              handlePreview={handlePreview}
              currentPreview={currentPreview}
            />
          )}
        </div>
      )}
    </>
  );
}

export default App;
