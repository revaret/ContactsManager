import React from 'react';
import {SafeAreaView} from 'react-native';

import AppHeader from '../components/Appheader';
import ContactForm from '../components/ContactForm';
import {ContactFormType} from '../utils/types';

function ContactFormScreen(props: ContactFormType): React.JSX.Element {
  const title = props.route?.params?.isEdit
    ? `${props.route.params.payload.givenName} ${props.route.params.payload.familyName}`
    : 'Add Contact';
  return (
    <SafeAreaView>
      <AppHeader title={title} back />
      <ContactForm {...props} />
    </SafeAreaView>
  );
}

export default ContactFormScreen;
