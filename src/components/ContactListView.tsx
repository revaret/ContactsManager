/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {Alert, FlatList} from 'react-native';
import {Contact} from 'react-native-contacts';
import ContactListRow from './ContactListRow';
import useContacts from '../hooks/useContacts';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const ContactList: React.FC<{}> = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const {getAllContacts} = useContacts();
  const [allContacts, setAllContacts] = React.useState<Contact[] | undefined>();
  const contacts = useSelector(state => state.contacts);
  const renderItem = ({item}: {item: Contact}) => (
    <ContactListRow contact={item} />
  );

  const syncContactPermissionAlert = () =>
    Alert.alert(
      'Sync Contacts?',
      'Your address book seems empty do you want to sync your phone book contacts ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: syncContacts},
      ],
    );

  useEffect(() => {
    if (allContacts === undefined) {
      syncContactPermissionAlert();
    }
  }, [allContacts]);

  const syncContacts = async () => {
    setRefreshing(true);
    const newcontacts = await getAllContacts();
    setAllContacts(newcontacts);
    setRefreshing(false);
  };

  return (
    <FlatList
      data={contacts}
      renderItem={renderItem}
      keyExtractor={item => item.recordID}
      refreshing={refreshing}
      onRefresh={syncContacts}
    />
  );
};

export default ContactList;
