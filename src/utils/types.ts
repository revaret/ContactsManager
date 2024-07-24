import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Contact} from 'react-native-contacts';

export interface FormType {
  lastName?: string | undefined;
  email?: string | undefined;
  firstName: string;
  phoneNumber: string;
  thumbnailPath?: string;
}

export type PayloadType = Contact;

export type ContactFormType = {
  navigation: NavigationProp<{}>;
  route: RouteProp<{params: {payload: PayloadType; isEdit: boolean}}, 'params'>;
};

export type ContactListType = {
  contacts: Contact[];
};
