import React from 'react';
import {View} from 'react-native';

type SpacerProps = {
  size: 'S' | 'L' | 'XL' | 'XXL';
};

const Spacer: React.FC<SpacerProps> = ({size}) => {
  let height;

  switch (size) {
    case 'S':
      height = 8;
      break;
    case 'L':
      height = 16;
      break;
    case 'XL':
      height = 24;
      break;
    case 'XXL':
      height = 32;
      break;
    default:
      height = 0;
      break;
  }

  return <View style={{height}} />;
};

export default Spacer;
