import React, { useEffect, useState } from 'react';
import { Container, Form, FormControl, Row, Col } from 'react-bootstrap';
import Typewriter from 'typewriter-effect';
import NavigationBar from '../components/NavigationBar';

const spotifyAuthConfig = {
  clientId: 'e09ce886105947c19bbc508f3d168b2d',
  redirectUri: 'http://localhost:3000',
  scopes: ['user-top-read', 'playlist-read-private'],
};

const Home = () => {
  const [token, setToken] = useState('');
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [activeTrack, setActiveTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('spotifyToken');
    if (storedToken) {
      setToken(storedToken);
      fetchTopTracks(storedToken);
      fetchUserPlaylists(storedToken);
    }
  }, []);
  

  const fetchTopTracks = async (token) => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=5', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        // Token is invalid, clear it and redirect to Spotify auth
        localStorage.removeItem('spotifyToken');
        localStorage.removeItem('spotifyTokenExpiry');
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${spotifyAuthConfig.clientId}&response_type=token&redirect_uri=${spotifyAuthConfig.redirectUri}&scope=${spotifyAuthConfig.scopes.join(' ')}`;
        return;
      }

      const data = await response.json();
      setTracks(data.items || []);
    } catch (error) {
      console.error('Error fetching top tracks:', error);
      setTracks([]);
    }
  };

  const fetchUserPlaylists = async (token) => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me/playlists?limit=5', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setPlaylists(data.items || []);
    } catch (error) {
      console.error('Error fetching user playlists:', error);
      setPlaylists([]);
    }
  };

  const handlePlayPause = (track) => {
    if (activeTrack && activeTrack.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveTrack(track);
      setIsPlaying(true);
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('spotifyToken');
    setTracks([]);
    setPlaylists([]);
  };

  const renderPlaceholders = () =>
    Array.from({ length: 5 }).map((_, index) => (
      <Col
        key={index}
        className="d-inline-block"
        style={{ width: '150px', marginRight: '10px' }}
      >
        <div
          style={{
            width: '150px',
            height: '150px',
            backgroundColor: '#e0e0e0',
            borderRadius: '10px',
          }}
        />
      </Col>
    ));

  return (
    <>
      {/* Navigation Bar */}
      <NavigationBar token={token} handleLogout={handleLogout} />

      {/* Main Content */}
      <Container className="mt-5">

        {/* Animated GIF */}
        <div className="text-center mb-4">
          <img
            src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExajlxcHA3YmswM2p1anJiYmpiY2Z4YWthdXkyNXVnNjVkNnVvemlobSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gK6cKnD7GTjqkM45Qq/giphy.gif"
            alt="Music Animation"
            style={{
              width: '100%',
              maxWidth: '350px',
              borderRadius: '10px',
            }}
          />
        </div>

        {/* Search Bar */}
        <Form className="mb-4">
          <FormControl
            type="search"
            placeholder="Search"
            style={{
              width: '500px',
              borderRadius: '10px',
              justifyContent: 'center',
              justifySelf: 'center',
              border: '2px solid #660e60',
            }}
            className="me-2"
            aria-label="Search"
          />
        </Form>

        {/* Animated Typing Message */}
        <div className="animated-text">
          <Typewriter
            options={{
              strings: [
                "Touch the sound, feel the rhythm.",
                "Experience music like never before.",
                "Immerse yourself in the sound.",
                "Feel every beat, live every note.",
                "Rediscover music on a whole new level.",
                "Where music meets your senses.",
                "Dive into the ultimate sound experience.",
                "Feel the music, live the moment.",
                "Unleash the power of rhythm and melody.",
                "Your music journey starts here.",
              ],
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 30,
            }}
          />
        </div>

        {/* Recently Played Section */}
        <h3>Recently Played 🎶 </h3>
        <div className="border-top my-3" style={{ borderColor: '#660E60' }}></div>
        <Row className="mb-4" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
        {tracks.length > 0
            ? tracks.map((track, index) => (
                <Col
                key={index}
                className="d-inline-block"
                style={{ width: '150px', marginRight: '10px' }}
                >
                <div
                    style={{
                    width: '150px',
                    height: '150px',
                    position: 'relative',
                    cursor: 'pointer',
                    }}
                    onClick={() => handlePlayPause(track)}
                >
                    <img
                    src={track.album.images[0]?.url || 'https://via.placeholder.com/150'}
                    alt={track.name}
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '10px',
                    }}
                    />
                    {activeTrack && activeTrack.id === track.id && (
                    <div
                        style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '20px',
                        borderRadius: '10px',
                        }}
                    >
                        {isPlaying ? 'Pause' : 'Play'}
                    </div>
                    )}
                </div>
                </Col>
            ))
            : renderPlaceholders()}
        </Row>

        {/* Featured Playlists Section */}
        <h3>Featured Playlists 🎧</h3>
        <div className="border-top my-3" style={{ borderColor: '#660E60' }}></div>
        <Row style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
  {playlists.length > 0
    ? playlists.map((playlist, index) => (
        <Col
          key={index}
          className="d-inline-block"
          style={{ width: '150px', marginRight: '10px' }}
        >
          <a
            href={playlist.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={playlist.images[0]?.url || 'https://via.placeholder.com/150'}
              alt={playlist.name}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '10px',
              }}
            />
          </a>
          <p style={{ color: '#660E60', marginTop: '10px', textAlign: 'center' }}>
            {playlist.name}
          </p>
        </Col>
      ))
    : renderPlaceholders()}
</Row>

      </Container>
    </>
  );
};

export default Home;
