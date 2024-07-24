import {Contact} from 'react-native-contacts';

export enum ActionTypes {
  SYNC_CONTACTS = 'SYNC_CONTACTS',
  ADD_CONTACT = 'ADD_CONTACT',
  UPDATE_CONTACT = 'UPDATE_CONTACT',
  DELETE_CONTACT = 'DELETE_CONTACT',
}

export type SyncContactsAction = {
  type: ActionTypes.SYNC_CONTACTS;
  payload: Contact[];
};

export type AddContactAction = {
  type: ActionTypes.ADD_CONTACT;
  payload: Contact;
};

export type UpdateContactAction = {
  type: ActionTypes.UPDATE_CONTACT;
  payload: Contact;
};

export type DeleteContactAction = {
  type: ActionTypes.DELETE_CONTACT;
  payload: string;
};

export const syncContacts = (contacts: Contact[]): SyncContactsAction => ({
  type: ActionTypes.SYNC_CONTACTS,
  payload: contacts,
});

export const addContact = (contact: Contact): AddContactAction => ({
  type: ActionTypes.ADD_CONTACT,
  payload: contact,
});

export const updateContact = (contact: Contact): UpdateContactAction => ({
  type: ActionTypes.UPDATE_CONTACT,
  payload: contact,
});

export const deleteContact = (contactId: string): DeleteContactAction => ({
  type: ActionTypes.DELETE_CONTACT,
  payload: contactId,
});
