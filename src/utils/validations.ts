import * as yup from 'yup';
import {ContactForm} from './enums';

export const ContactSchema = yup
  .object({
    [ContactForm.firstName]: yup.string().required('First name is required'),
    [ContactForm.lastName]: yup.string().optional(),
    [ContactForm.phoneNumber]: yup
      .string()
      .length(10, 'Phone number must be 10 digits')
      .required('Phone number is required'),
    [ContactForm.email]: yup.string().email().optional(),
  })
  .required();
