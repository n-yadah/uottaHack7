const axios = require('axios');
const express = require('express');
const app = express();

app.post('/auth/token', async (req, res) => {
  const { code } = req.body;
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
      params: {
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.REACT_APP_SPOTIFY_REDIRECT_URI,
        client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
        client_secret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error exchanging code for token:', error.response.data);
    res.status(500).send('Token exchange failed');
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
