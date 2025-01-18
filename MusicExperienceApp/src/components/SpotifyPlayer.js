import { useEffect, useState } from 'react';

const SpotifyPlayer = ({ accessToken }) => {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    if (!accessToken) return;

    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new Spotify.Player({
        name: 'MusicExperienceApp Player',
        getOAuthToken: (cb) => cb(accessToken),
        volume: 0.5,
      });

      // Connect to the player
      player.connect();

      // Event listeners
      player.addListener('player_state_changed', (state) => {
        if (!state) return;
        console.log('Player State:', state);
      });

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID:', device_id);
      });

      player.addListener('not_ready', ({ device_id }) => {
        console.error('Device ID has gone offline:', device_id);
      });

      setPlayer(player);
    };

    return () => {
      if (player) player.disconnect();
    };
  }, [accessToken]);

  return null; // No visual UI for the player
};

export default SpotifyPlayer;
