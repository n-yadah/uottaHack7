import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import NavigationBar from '../components/NavigationBar';

const About = () => {
  return (
    <>
      {/* Navbar */}
      <NavigationBar />

      {/* About Content */}
      <div style={{ backgroundColor: '#660E60', color: '#ffffff', minHeight: '100vh', padding: '20px 0' }}>
        <Container>
          <h1 className="mb-4" style={{fontFamily: 'Courier New'}}>About MusEx</h1>
          <hr style={{ backgroundColor: '#ffffff' }} />
          <p className="mb-4" style={{ fontSize: '18px', lineHeight: '1.6', textAlign: 'left' }}>
          <strong>Music Experience </strong> is a revolutionary platform designed to transform how people with hearing impairments engage with music. By integrating vibration hardware, this app enables users to literally "feel" the rhythm and vibrations of their favorite tunes, offering an immersive and inclusive musical experience.           </p>
          <p className="mb-4" style={{ fontSize: '18px', lineHeight: '1.6', textAlign: 'left' }}>
           Our mission is to break barriers and redefine music as an experience that transcends hearing, allowing users to connect with the art of sound in a deeply personal and tactile way. The app’s features are designed to enable users to explore music beyond traditional listening, enhancing accessibility and joy for everyone.          </p>
          <p className="mb-4" style={{ fontSize: '18px', lineHeight: '1.6', textAlign: 'left' }}>
           Created by <strong>Zachary Pelletier</strong> and <strong>Yadah Ngolo</strong>, Music Experience represents a blend of innovative technology and a passion for inclusivity. The project is supported by a commitment to pushing the boundaries of how we interact with music.          </p>
          <footer className="mt-5" style={{ textAlign: 'left' }}>
            <p>&copy; {new Date().getFullYear()} Music Experience. All rights reserved.</p>
          </footer>
        </Container>
      </div>
    </>
  );
};

export default About;
