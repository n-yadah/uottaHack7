// src/services/apiClient.js
import axios from 'axios';
import { CLIENT_ID, CLIENT_SECRET } from '@env';

// Spotify API endpoints
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const API_BASE_URL = 'https://api.spotify.com/v1';


// Function to get an access token using Client Credentials Flow
const getAccessToken = async () => {
  const response = await axios.post(
    TOKEN_ENDPOINT,
    new URLSearchParams({
      grant_type: 'client_credentials',
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      },
    }
  );
  return response.data.access_token;
};

// Create an Axios instance with the base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Optional: sets a timeout for requests
});

// Interceptor to add the access token to each request
apiClient.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to get user playlists
export const getUserPlaylists = async () => {
  try {
    const response = await apiClient.get('/me/playlists');
    return response.data;
  } catch (error) {
    console.error('Error fetching user playlists:', error);
    throw error;
  }
};

// Function to get user profile
export const getUserProfile = async () => {
  try {
    const response = await apiClient.get('/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};


// Add more functions as needed for other Spotify API endpoints
