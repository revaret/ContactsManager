import {createStore, Store} from 'redux';
import * as Actions from './actions';

import rootReducer from './reducer';
import {ContactListType} from '../utils/types';

const store: Store<
  ContactListType,
  | Actions.SyncContactsAction
  | Actions.AddContactAction
  | Actions.UpdateContactAction
  | Actions.DeleteContactAction
> = createStore(rootReducer);

export default store;
