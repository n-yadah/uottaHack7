/**
 * Metro configuration for React Native
 * https://github.com/facebook/metro
 *
 * @format
 */
const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// Extend the default configuration with custom settings
config.resolver = {
  ...config.resolver,
  sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json'], // Add extensions as needed
};

config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('metro-react-native-babel-transformer'),
};

module.exports = config;
