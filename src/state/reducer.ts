import * as Actions from './actions';
import {ContactListType} from '../utils/types';

const initialState = {
  contacts: [],
} as ContactListType;

const reducer = (
  state = initialState,
  action:
    | Actions.SyncContactsAction
    | Actions.AddContactAction
    | Actions.UpdateContactAction
    | Actions.DeleteContactAction,
) => {
  switch (action.type) {
    case Actions.ActionTypes.SYNC_CONTACTS:
      const contacts = action.payload;
      return {
        ...state,
        contacts,
      };
    case Actions.ActionTypes.ADD_CONTACT:
      const newContact = {...action.payload, recordID: `${Date.now()}`};
      return {
        ...state,
        contacts: [...state.contacts, newContact],
      };

    case Actions.ActionTypes.UPDATE_CONTACT:
      const updatedContact = action.payload;
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.recordID === updatedContact.recordID
            ? updatedContact
            : contact,
        ),
      };
    case Actions.ActionTypes.DELETE_CONTACT:
      const contactId = action.payload;
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.recordID !== contactId,
        ),
      };
    default:
      return state;
  }
};

export default reducer;
