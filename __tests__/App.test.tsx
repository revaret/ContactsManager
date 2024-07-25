/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shipped with jest.
import {it} from '@jest/globals';

const mockLaunchImage = jest.fn();

jest.mock('expo-image-picker', () => {
  return {
    launchImageLibraryAsync: () => mockLaunchImage(),
    launchCameraAsync: () => mockLaunchImage(),
  };
});

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});
