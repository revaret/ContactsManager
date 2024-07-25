import React from 'react';
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  View,
  Text,
  TextStyle,
} from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  error?: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = props => {
  return (
    <View>
      <Text style={styles.label}>{props.placeholder}</Text>
      <TextInput
        {...props}
        placeholder=""
        style={[
          styles.input,
          props.style as TextStyle,
          props.error && styles.error,
        ]}
      />
      {props.error && <Text style={styles.errorText}>{props.error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  error: {
    borderColor: 'red',
    borderWidth: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default CustomTextInput;
