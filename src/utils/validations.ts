import * as yup from 'yup';
import {ContactForm} from './enums';

export const ContactSchema = yup
  .object({
    [ContactForm.firstName]: yup.string().required(),
    [ContactForm.lastName]: yup.string().optional(),
    [ContactForm.phoneNumber]: yup.string().required(),
    [ContactForm.email]: yup.string().email().optional(),
  })
  .required();
