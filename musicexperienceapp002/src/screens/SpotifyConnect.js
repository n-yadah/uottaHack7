import React, { useState, useEffect } from 'react';
import { spotifyAuthConfig } from '../config/spotify.config';
import NavigationBar from '../components/NavigationBar';
import { Container, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useSpotifySDK from '../hooks/useSpotifySDK';

const SpotifyConnect = () => {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Load Spotify SDK
  useSpotifySDK(
    () => console.log('Spotify SDK is ready to use.'),
    (error) => console.error('Error loading Spotify SDK:', error)
  );

  const handleSpotifyConnect = () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${spotifyAuthConfig.clientId}&response_type=token&redirect_uri=${encodeURIComponent(spotifyAuthConfig.redirectUri)}&scope=${encodeURIComponent(spotifyAuthConfig.scopes.join(' '))}&show_dialog=true`;
    window.location.href = authUrl;
  };

  useEffect(() => {
    try {
      // Extract access token from the URL hash (if Spotify redirected)
      const hash = window.location.hash;
      if (hash) {
        const extractedToken = new URLSearchParams(hash.substring(1)).get('access_token');
        if (extractedToken) {
          console.log('Token Extracted:', extractedToken); // Debugging: Log token
          setToken(extractedToken);
          localStorage.setItem('spotifyToken', extractedToken); // Save token for Home page access
          navigate('/'); // Redirect to Home page
        } else {
          console.error('No token found in the URL hash');
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

            <br />
            <br />
            <br />

            <p style={{fontSize: "24px", fontFamily: "Georgia"}}> <strong> Connect to Spotify to start your music experience! </strong></p>

            <br />
            <br />
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

            <br />
            <br />
            <br />
        <img
          src="/../../public/20250119_0114_Immersive Music Experience_simple_compose_01jhyk53w5eqja2bp4zr46zcyw.gif"
          alt="Music Animation"
          style={{
            width: '100%',
            maxWidth: '350px',
            borderRadius: '10px',
          }}
        />
      </div>
        ) : (
          <Alert variant="success">Connected to Spotify! Redirecting...</Alert>
        )}
      </Container>
    </>
  );
};

export default SpotifyConnect;
