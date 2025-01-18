/**
 * Metro configuration for React Native
 * https://github.com/facebook/metro
 *
 * @format
 */

module.exports = {
    resolver: {
      sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json'], // Add extensions as needed
    },
    transformer: {
      babelTransformerPath: require.resolve('metro-react-native-babel-transformer'),
    },
  };
  