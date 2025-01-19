import React, { useState, useEffect } from 'react';
import { spotifyAuthConfig } from '../config/spotify.config';
import NavigationBar from '../components/NavigationBar';
import { Container, Navbar, Nav, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SpotifyConnect = () => {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [player, setPlayer] = useState(null);
  const navigate = useNavigate();
  

  const handleSpotifyConnect = () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${spotifyAuthConfig.clientId}&response_type=code&redirect_uri=${encodeURIComponent(spotifyAuthConfig.redirectUri)}&scope=${encodeURIComponent(spotifyAuthConfig.scopes.join(' '))}`;
    window.location.href = authUrl;
  };

  useEffect(() => {
    try {
      // Extract access token from the URL hash (if Spotify redirected)
      const hash = window.location.hash;
      if (hash) {
        const extractedToken = new URLSearchParams(hash.substring(1)).get('access_token');
        if (extractedToken) {
          setToken(extractedToken);
          localStorage.setItem('spotifyToken', extractedToken); // Save token for Home page access
          navigate('/'); // Redirect to Home page
        }
      }
    } catch (err) {
      console.error('Error during Spotify authentication:', err);
      setError('Failed to authenticate with Spotify. Please try again.');
    }
  }, [navigate]);
  

  return (
    <>
      {/* Navbar */}
      <NavigationBar />

      {/* Main Content */}
      <Container className="text-center mt-5">
        {error && <Alert variant="danger">{error}</Alert>}
        {!token ? (
          <div>
            <p>Connect to Spotify to start your music journey!</p>

            <br />
            <Container className="container-with-outline">
            <Button
                onClick={handleSpotifyConnect}
                style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    padding: 0,
                }}
                >
                <img
                    src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png"
                    alt="Connect to Spotify"
                    style={{ width: '200px' }}
                />
            </Button>
            </Container>

          </div>
        ) : (
          <Alert variant="success">Connected to Spotify! Redirecting...</Alert>
        )}
      </Container>
    </>
  );
};

export default SpotifyConnect;
