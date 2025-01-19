import { useEffect } from 'react';

const useSpotifySDK = () => {
  useEffect(() => {
    if (!window.onSpotifyWebPlaybackSDKReady) {
      window.onSpotifyWebPlaybackSDKReady = () => {
        console.log('Spotify Web Playback SDK loaded.');
      };
    }

    if (!document.getElementById('spotify-player-script')) {
      const script = document.createElement('script');
      script.id = 'spotify-player-script';
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;
      document.body.appendChild(script);

      script.onerror = () => {
        console.error('Failed to load Spotify Web Playback SDK.');
      };
    }

    return () => {
      // Clean up script if necessary
      const script = document.getElementById('spotify-player-script');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);
};

export default useSpotifySDK;
