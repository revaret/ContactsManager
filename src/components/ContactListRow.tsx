import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Contact} from 'react-native-contacts';
import Spacer from './Spacer';
import Avatar from './Avatar';
import {getInitials} from '../utils/helper';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

interface ContactRowProps {
  contact: Contact;
}

const ContactRow: React.FC<ContactRowProps> = ({contact}) => {
  const navigation = useNavigation();

  const reduxState = useSelector(state => state.contacts);

  console.log('state=====>', reduxState);
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('ContactFormScreen', {
          payload: contact,
          isEdit: true,
        });
      }}>
      <Spacer size="L" />
      <View style={styles.container}>
        <Avatar
          imageUrl={contact.thumbnailPath}
          initials={getInitials(contact.givenName, contact.familyName)}
        />
        <View style={styles.textContainer}>
          {contact.givenName && (
            <Text>{`${contact.givenName ?? ''} ${
              contact.familyName ?? ''
            }`}</Text>
          )}
          {contact?.emailAddresses[0]?.email && (
            <Text>{contact?.emailAddresses[0]?.email}</Text>
          )}
          {contact?.phoneNumbers[0]?.number && (
            <Text>{contact?.phoneNumbers[0]?.number}</Text>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  textContainer: {
    paddingLeft: 8,
  },
});

export default ContactRow;
