import {useEffect} from 'react';
import {Camera} from 'expo-camera';
import {
  ImagePickerOptions,
  launchCameraAsync,
  MediaTypeOptions,
} from 'expo-image-picker';
import {Alert} from 'react-native';

const useCamera = () => {
  const requestPermission = async () => {
    const {granted} = await Camera.requestCameraPermissionsAsync();

    if (!granted) {
      Alert.alert(
        'Device settings alert',
        'You need to allow camera permissions for this to work',
      );
    }
  };

  const takePhoto = async (options: ImagePickerOptions | undefined) => {
    options = {mediaTypes: MediaTypeOptions.Images, ...options};

    return await launchCameraAsync(options);
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return {takePhoto};
};

export default useCamera;
