let accessToken;
let expiresIn;

const clientId = "528f7c6ba17a4adf9147a4d6a0013a11";
const redirectUri = "https://app-jammming.netlify.app";
const scopes = "playlist-modify-public";

const Spotify = {
  getAccessToken() {
    if (accessToken) return accessToken;

    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

    if (urlAccessToken && urlExpiresIn) {
      accessToken = urlAccessToken[1];
      expiresIn = Number(urlExpiresIn[1]);
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${scopes}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}`;
      window.location = authUrl;
    }
  },

  async savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      alert("La playlist debe tener nombre y al menos una canción.");
      return;
    }

    const token = Spotify.getAccessToken();

    try {
      // 1. Obtener el ID del usuario
      const userResponse = await fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = await userResponse.json();
      const userId = userData.id;

      // 2. Crear la nueva playlist
      const playlistResponse = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            description: "Creada con Jammming 💿",
            public: true,
          }),
        }
      );
      const playlistData = await playlistResponse.json();
      const playlistId = playlistData.id;

      // 3. Agregar canciones a la nueva playlist
      await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris: trackUris,
        }),
      });

      alert(`✅ ¡Playlist "${name}" guardada exitosamente en Spotify!`);
    } catch (error) {
      console.error("Error al guardar en Spotify:", error);
      alert("❌ Hubo un error al guardar la playlist.");
    }
  },
};

export default Spotify;
