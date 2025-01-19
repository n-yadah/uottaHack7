import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';


const NavigationBar = () => {
  const location = useLocation();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand id ="brand" as={Link} to="/" >MusEx</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/"
              className={`nav-link-title ${
                location.pathname === '/' ? 'active-page' : ''
              }`}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/spotify-connect"
              className={`nav-link-title ${
                location.pathname === '/spotify-connect' ? 'active-page' : ''
              }`}
            >
              Spotify
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/about"
              className={`nav-link-title ${
                location.pathname === '/about' ? 'active-page' : ''
              }`}
            >
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
