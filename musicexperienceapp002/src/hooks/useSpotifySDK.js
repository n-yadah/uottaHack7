import { useEffect } from 'react';

const useSpotifySDK = () => {
  useEffect(() => {
    // Define the callback function globally before the SDK is loaded
    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log('Spotify Web Playback SDK is ready!');
      // You can initialize the player here if you need to
    };

    if (!document.getElementById('spotify-player-script')) {
      const script = document.createElement('script');
      script.id = 'spotify-player-script';
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        console.log('Spotify Web Playback SDK loaded successfully.');
        // Now you can initialize the player
      };

      script.onerror = () => {
        console.error('Failed to load Spotify Web Playback SDK.');
      };
    }

    return () => {
      // Clean up the script if necessary
      const script = document.getElementById('spotify-player-script');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);
};

export default useSpotifySDK;
