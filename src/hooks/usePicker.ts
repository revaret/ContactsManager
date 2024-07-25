import {useEffect} from 'react';
import {
  ImagePickerOptions,
  launchImageLibraryAsync,
  MediaTypeOptions,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker';
import {Alert} from 'react-native';

const usePicker = () => {
  const requestPermission = async () => {
    const {granted} = await requestMediaLibraryPermissionsAsync();

    if (!granted) {
      Alert.alert(
        'Device settings alert',
        'You need to allow media library permissions for this to work',
      );
    }
  };

  const selectImage = async (options: ImagePickerOptions | undefined) => {
    options = {mediaTypes: MediaTypeOptions.Images, ...options};

    return await launchImageLibraryAsync(options);
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return {selectImage};
};

export default usePicker;
