import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URL } from '@env';

export const spotifyAuthConfig = {
    clientId: SPOTIFY_CLIENT_ID,
    clientSecret: SPOTIFY_CLIENT_SECRET,
    redirectUrl: SPOTIFY_REDIRECT_URL,
    
    scopes: [
      "user-read-playback-state",
      "user-modify-playback-state",
      "playlist-read-private",
    ],
    serviceConfiguration: {
      authorizationEndpoint: "https://accounts.spotify.com/authorize",
      tokenEndpoint: "https://accounts.spotify.com/api/token",
    },
  };