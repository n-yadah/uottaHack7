import { authorize } from 'react-native-app-auth';
import { spotifyAuthConfig } from '../../spotify.config';


export const authenticateWithSpotify = async () => {
  try {
    const result = await authorize(spotifyAuthConfig);
    console.log('Access Token:', result.accessToken);
    return result; // Return the access token and other data
  } catch (error) {
    console.error('Spotify Authentication Error:', error);
    throw error;
  }
};
