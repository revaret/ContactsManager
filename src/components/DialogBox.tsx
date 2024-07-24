import React from 'react';
import {View, Modal, TouchableOpacity, Text} from 'react-native';
import ContactForm from './ContactForm';

const BottomSheetPopup = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        activeOpacity={1}
        onPressOut={onClose}>
        <View style={{backgroundColor: 'white', padding: 16}}>
          <ContactForm />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default BottomSheetPopup;
