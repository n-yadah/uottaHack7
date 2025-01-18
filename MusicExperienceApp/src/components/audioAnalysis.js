import React from 'react';
import { WebView } from 'react-native-webview';

const AudioAnalysis = () => {
  const handleWebViewMessage = (event) => {
    const features = JSON.parse(event.nativeEvent.data);
    console.log('Audio Features:', features);
  };

  return (
    <WebView
      source={{ uri: 'file:///path-to/meyda-analyzer.html' }}
      onMessage={handleWebViewMessage}
    />
  );
};

export default AudioAnalysis;
