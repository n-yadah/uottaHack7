export const initializeSpotifyPlayer = (token, onReadyCallback, onStateChangeCallback) => {
    // Ensure the SDK script is loaded
    if (!window.onSpotifyWebPlaybackSDKReady) {
      window.onSpotifyWebPlaybackSDKReady = () => {
        console.log('Spotify Web Playback SDK is ready!');
      };
    }
  
    // Check if Spotify Web Playback SDK is available
    if (!window.Spotify || !window.Spotify.Player) {
      console.error('Spotify Web Playback SDK is not loaded. Make sure you have included the SDK.');
      return null;
    }
  
    try {
      // Initialize the Spotify player
      const player = new window.Spotify.Player({
        name: 'MusicExperienceApp Player',
        getOAuthToken: (cb) => cb(token),
        volume: 0.5,
      });
  
      // Event listeners
      player.addListener('ready', ({ device_id }) => {
        console.log('Spotify Player is ready with Device ID:', device_id);
        if (onReadyCallback && typeof onReadyCallback === 'function') {
          onReadyCallback(device_id);
        }
      });
  
      player.addListener('not_ready', ({ device_id }) => {
        console.warn('Device ID has gone offline:', device_id);
      });
  
      player.addListener('player_state_changed', (state) => {
        console.log('Player state changed:', state);
        if (onStateChangeCallback && typeof onStateChangeCallback === 'function') {
          onStateChangeCallback(state);
        }
      });
  
      player.addListener('initialization_error', ({ message }) => {
        console.error('Initialization error:', message);
      });
  
      player.addListener('authentication_error', ({ message }) => {
        console.error('Authentication error:', message);
      });
  
      player.addListener('account_error', ({ message }) => {
        console.error('Account error:', message);
      });
  
      // Connect the player
      player.connect().then(success => {
        if (success) {
          console.log('Spotify Player connected successfully!');
        } else {
          console.error('Spotify Player failed to connect.');
        }
      });
  
      return player;
    } catch (error) {
      console.error('Error initializing Spotify Player:', error);
      return null;
    }
  };
  