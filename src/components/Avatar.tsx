import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface AvatarProps {
  imageUrl?: string;
  initials: string;
  extraContainerStyle?: StyleProp<{}>;
  extraTextStyle?: StyleProp<{}>;
}

const Avatar: React.FC<AvatarProps> = ({
  imageUrl,
  initials,
  extraContainerStyle,
  extraTextStyle,
}) => {
  return (
    <View>
      {imageUrl ? (
        <Image
          source={{uri: imageUrl}}
          style={[styles.container, extraContainerStyle]}
        />
      ) : (
        <View style={[styles.container, extraContainerStyle]}>
          <Text style={[styles.textStyle, extraTextStyle]}>{initials}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  textStyle: {
    color: 'white',
    fontSize: 20,
  },
});

export default Avatar;
