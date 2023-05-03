import PropTypes from 'prop-types';
import { Component } from 'react';
import { FaPhoneAlt, FaUserAlt } from 'react-icons/fa';
import { IconSize } from '../constant';
import {
  BtnSubmit,
  ErrorMsg,
  FormPhonebook,
  Input,
  Label,
} from './Form.styled';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';

const NumberRegExp =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;
const NameRegExp = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;

const validationSchema = yup.object().shape({
  name: yup
    .string('Enter your name')
    .matches(
      NameRegExp,
      'Name may contain only letters, apostrophe, dash and spaces.'
    )
    .required('Name is required'),
  number: yup
    .string()
    .matches(
      NumberRegExp,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .min(12, 'Phone number must be at least 12 digits')
    .required('Phone number is required'),
});

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };
  handleSubmit = (values, { resetForm }) => {
    resetForm();
    this.props.onSubmit(values);
  };
  render() {
    return (
      <Formik
        initialValues={this.state}
        validationSchema={validationSchema}
        onSubmit={this.handleSubmit}
      >
        <FormPhonebook>
          <Label>
            <FaUserAlt size={IconSize.sm} />
            <Input
              type="text"
              name="name"
              placeholder="Name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </Label>
          <ErrorMessage component={ErrorMsg} name="name" />
          <Label>
            <FaPhoneAlt size={IconSize.sm} />
            <Input
              type="tel"
              name="number"
              placeholder="Number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </Label>
          <ErrorMessage component={ErrorMsg} name="number" />
          <BtnSubmit type="submit">Add contact</BtnSubmit>
        </FormPhonebook>
      </Formik>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
