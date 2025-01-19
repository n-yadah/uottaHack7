import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import SpotifyConnect from './screens/SpotifyConnect';
import About from './screens/About';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spotify-connect" element={<SpotifyConnect />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
