import Contacts, {Contact} from 'react-native-contacts';
import {PermissionStatus} from '../utils/enums';
import {FormType} from '../utils/types';
import {useDispatch} from 'react-redux';
import * as Actions from '../state/actions';

const useContacts = () => {
  const dispatch = useDispatch();

  const getAllContacts = async () => {
    const permission = await Contacts.checkPermission();
    if (
      permission === PermissionStatus.Undefined ||
      permission === PermissionStatus.Denied
    ) {
      const permissionRequest = await Contacts.requestPermission();
      if (permissionRequest === PermissionStatus.Authorized) {
        const contacts = await Contacts.getAll();
        dispatch(Actions.syncContacts(contacts));
        return contacts;
      }
    } else {
      const contacts = await Contacts.getAll();
      dispatch(Actions.syncContacts(contacts));
      return contacts;
    }
  };

  const addContact = async (contact: FormType) => {
    const newContact = {
      emailAddresses: [
        {
          label: 'work',
          email: contact.email || '',
        },
      ],
      familyName: contact.lastName,
      givenName: contact.firstName,
      phoneNumbers: [
        {
          label: 'mobile',
          number: contact.phoneNumber,
        },
      ],
      thumbnailPath: contact.thumbnailPath,
    };
    dispatch(Actions.addContact(newContact as Contact));
  };

  const updateContact = async (contact: FormType, payload: Contact) => {
    const updatedContact = {
      emailAddresses: [
        {
          label: 'work',
          email: contact.email || '',
        },
      ],
      familyName: contact.lastName || '',
      givenName: contact.firstName,
      phoneNumbers: [
        {
          label: 'mobile',
          number: contact.phoneNumber,
        },
      ],
      thumbnailPath: contact.thumbnailPath || '',
    };
    dispatch(Actions.updateContact({...payload, ...updatedContact}));
  };

  const deleteContact = async (contact: Contact) => {
    dispatch(Actions.deleteContact(contact.recordID));
  };

  return {getAllContacts, addContact, updateContact, deleteContact};
};

export default useContacts;
