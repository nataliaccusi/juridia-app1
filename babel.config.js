module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // NO incluyas 'expo-router/babel'
    plugins: []
  };
};