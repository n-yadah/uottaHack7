import React from 'react';
import { Container, Form, FormControl, Row, Col } from 'react-bootstrap';
import Typewriter from 'typewriter-effect';
import NavigationBar from '../components/NavigationBar'; // Adjust the path based on your file structure

const Home = () => {
  return (
    <>
      {/* Navigation Bar */}
      <NavigationBar />

      {/* Main Content */}
      <Container className="mt-5">
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

        <br />

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

        <br />

        {/* Recently Played Section */}
        <h3>Recently Played</h3>

        <div className="border-top my-3" style={{ borderColor: '#660E60' }}></div>

        <Row className="mb-4" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Col
              key={index}
              className="d-inline-block"
              style={{ width: '150px', marginRight: '10px' }}
            >
              <div
                style={{
                  width: '150px',
                  height: '150px',
                  backgroundColor: '#660E60',
                  borderRadius: '10px',
                }}
              />
            </Col>
          ))}
        </Row>

        {/* Featured Playlists Section */}
        <h3>Featured Playlists</h3>

        <div className="border-top my-3" style={{ borderColor: '#660E60' }}></div>

        <Row style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Col
              key={index}
              className="d-inline-block"
              style={{ width: '150px', marginRight: '10px' }}
            >
              <div
                style={{
                  width: '150px',
                  height: '150px',
                  backgroundColor: '#660E60',
                  borderRadius: '10px',
                }}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
