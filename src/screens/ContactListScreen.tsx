import React from 'react';
import {SafeAreaView} from 'react-native';

import AppHeader from '../components/Appheader';
import ContactList from '../components/ContactListView';
import {useNavigation} from '@react-navigation/native';

function ContactListScreen(): React.JSX.Element {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <AppHeader
        title="Contact Manager"
        onAdd={() => {
          navigation.navigate('ContactFormScreen');
        }}
      />
      <ContactList />
    </SafeAreaView>
  );
}

export default ContactListScreen;
