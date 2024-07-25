module.exports = {
  testEnvironment: 'jsdom',
  preset: 'react-native',
  moduleDirectories: ['node_modules', '<rootDir>'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@react-native|react-native|react-redux|expo-image-picker|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
};
