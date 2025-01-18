import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const PlaybackScreen = () => {
  const [message, setMessage] = useState('Welcome to Spotify Playback!');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{message}</Text>
      <Button title="Test Playback" onPress={() => setMessage('Playback Works!')} />
    </View>
  );
};

export default PlaybackScreen;