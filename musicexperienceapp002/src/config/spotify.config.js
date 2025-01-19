
export const spotifyAuthConfig = {
  clientId:  'e09ce886105947c19bbc508f3d168b2d', //process.env.REACT_APP_SPOTIFY_CLIENT_ID,
  redirectUri: "http://localhost:3000", //process.env.REACT_APP_SPOTIFY_REDIRECT_URI,
  scopes: [
    "user-read-playback-state",
    "user-modify-playback-state",
    "playlist-read-private",
    "user-read-playback-state",
    "user-top-read",
    "streaming",
  ],
  serviceConfiguration: {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token", // Only needed for server-side flows
  },
};
