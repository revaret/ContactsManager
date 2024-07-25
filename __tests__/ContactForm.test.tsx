import React from 'react';
import {render, fireEvent, act, waitFor} from '@testing-library/react-native';
import ContactForm from '../src/components/ContactForm';
import {ContactForm as ContactFields} from '../src/utils/enums';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

const mockedSubmit = jest.fn().mockReturnValue({name: 'test'});

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  handleSubmit: mockedSubmit,
}));

jest.mock('expo-image-picker', () => {
  return {
    launchImageLibraryAsync: () => mockLaunchImage(),
    launchCameraAsync: () => mockLaunchImage(),
    requestMediaLibraryPermissionsAsync: jest.fn().mockImplementation(() => {
      return Promise.resolve({status: 'granted'});
    }),
  };
});

jest.mock('expo-camera', () => {
  return {
    Camera: {
      requestCameraPermissionsAsync: jest.fn().mockImplementation(() => {
        return Promise.resolve({status: 'granted'});
      }),
    },
  };
});

const mockState = {};

jest.mock('react-redux', () => {
  const ActualReactRedux = jest.requireActual('react-redux');
  return {
    ...ActualReactRedux,
    useSelector: jest.fn().mockImplementation(() => {
      return mockState;
    }),
  };
});

const navigation = {};
const mockContact = {
  recordID: '',
  backTitle: '',
  company: '',
  emailAddresses: [],
  displayName: '',
  familyName: '',
  givenName: '',
  middleName: '',
  jobTitle: '',
  phoneNumbers: [],
  hasThumbnail: false,
  thumbnailPath: '',
};

describe('ContactForm', () => {
  const initialState = {output: 10};
  const mockStore = configureStore();
  let store = mockStore(initialState);
  it('should render the contact form correctly', () => {
    const {getByTestId, getByText} = render(
      <Provider store={store}>
        <ContactForm
          navigation={navigation}
          route={{params: {payload: mockContact, isEdit: false}}}
        />
      </Provider>,
    );

    expect(getByTestId(ContactFields.firstName)).toBeDefined();
    expect(getByTestId(ContactFields.email)).toBeDefined();
    expect(getByTestId(ContactFields.phoneNumber)).toBeDefined();
    expect(getByText('Add')).toBeDefined();
  });

  it('should update the form fields when user types', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <ContactForm
          navigation={navigation}
          route={{params: {payload: mockContact, isEdit: false}}}
        />
      </Provider>,
    );
    const nameInput = getByTestId(ContactFields.firstName);
    const emailInput = getByTestId(ContactFields.email);
    const phoneInput = getByTestId(ContactFields.phoneNumber);

    fireEvent.changeText(nameInput, 'John Doe');
    fireEvent.changeText(emailInput, 'johndoe@example.com');
    fireEvent.changeText(phoneInput, '1234567890');

    expect(nameInput.props.value).toBe('John Doe');
    expect(emailInput.props.value).toBe('johndoe@example.com');
    expect(phoneInput.props.value).toBe('1234567890');
  });

  it('should call the onSubmit function when submit button is pressed', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <ContactForm
          navigation={navigation}
          route={{params: {payload: mockContact, isEdit: false}}}
        />
      </Provider>,
    );
    const nameInput = getByTestId(ContactFields.firstName);
    const emailInput = getByTestId(ContactFields.email);
    const phoneInput = getByTestId(ContactFields.phoneNumber);

    fireEvent.changeText(nameInput, 'John Doe');
    fireEvent.changeText(emailInput, 'johndoe@example.com');
    fireEvent.changeText(phoneInput, '1234567890');

    expect(nameInput.props.value).toBe('John Doe');
    expect(emailInput.props.value).toBe('johndoe@example.com');
    expect(phoneInput.props.value).toBe('1234567890');
    const submitButton = getByTestId('submit');

    waitFor(
      () => {
        console.log(submitButton.props.accessibilityState.disabled);
        expect(submitButton.props.accessibilityState.disabled).toBe(false);
        fireEvent.press(submitButton);
        expect(mockedSubmit).toHaveBeenCalled();
      },
      {timeout: 100},
    );
  });
});
