/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
  Alert,
  Button,
} from 'react-native';
import Avatar from './Avatar';
import {getInitials} from '../utils/helper';
import Spacer from './Spacer';
import {ContactSchema} from '../utils/validations';
import {ContactForm as ContactFields} from '../utils/enums';
import {ContactFormType, FormType, PayloadType} from '../utils/types';
import useContacts from '../hooks/useContacts';
import useCamera from '../hooks/useCamera';
import usePicker from '../hooks/usePicker';

const ContactForm = (props: ContactFormType) => {
  const [avatar, setAvatar] = useState('');
  const {addContact, updateContact, deleteContact} = useContacts();
  const {navigation, route} = props;
  const camera = useCamera();
  const photos = usePicker();

  const {payload = {} as PayloadType, isEdit = false} = route.params || {};
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: {isValid},
  } = useForm({
    resolver: yupResolver(ContactSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: FormType) => {
    const params = {...data, thumbnailPath: avatar};
    if (isEdit) {
      updateContact(params, payload);
    } else {
      addContact(params);
    }
    navigation.goBack();
  };

  const handleDelete = () => {
    deleteContact(payload);
    navigation.goBack();
  };

  const TriggerDeletePermission = () =>
    Alert.alert(
      `Delete ${payload.givenName} ${payload.familyName}!`,
      'Are you sure you want to delete this contact',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'OK', onPress: handleDelete},
      ],
    );

  const handlePress = async () => {
    Alert.alert('Please choose', '', [
      {text: 'Photos', onPress: () => selectImage('photos')},
      {text: 'Camera', onPress: () => selectImage('camera')},
      {text: 'Cancel', style: 'cancel'},
    ]);
  };

  const selectImage = async (pickerType: string) => {
    try {
      if (pickerType === 'camera') {
        const result = await camera.takePhoto({
          allowsEditing: true,
          quality: 0.5,
        });

        console.log('results', result);
        result.canceled
          ? () => {}
          : (result: any) => {
              console.log('result', result);
            };
      } else {
        const result = await photos.selectImage({
          quality: 0.5,
        });
        if (result?.assets?.length === 0) {
          return;
        }
        if (result?.assets) {
          setAvatar(result.assets[0].uri);
          console.log('result', result.assets[0].uri);
        }
        result.canceled
          ? () => {}
          : () => {
              setAvatar(result.assets[0].uri);
              console.log('result', result.assets[0].uri);
            };
      }
    } catch (error) {
      Alert.alert('Image error', 'Error reading image');
      console.log(error);
    }
  };

  useEffect(() => {
    if (isEdit) {
      setAvatar(payload.thumbnailPath);
      setValue(ContactFields.firstName, payload.givenName);
      setValue(ContactFields.lastName, payload.familyName);
      setValue(ContactFields.phoneNumber, payload.phoneNumbers[0]?.number);
      setValue(ContactFields.email, payload.emailAddresses[0]?.email);
      trigger();
    }
  }, [isEdit, payload]);

  return (
    <View style={styles.container}>
      <Spacer size="XL" />
      <View style={{alignItems: 'center'}}>
        <Avatar
          imageUrl={avatar}
          initials={getInitials(
            watch(ContactFields.firstName) || '',
            watch(ContactFields.lastName) || '',
          )}
          extraContainerStyle={{height: 100, width: 100, borderRadius: 50}}
          extraTextStyle={{fontSize: 40}}
        />
        <Spacer size="L" />
        <Pressable onPress={handlePress}>
          <Button
            title={avatar ? 'Update photo' : 'Add photo'}
            onPress={handlePress}
          />
        </Pressable>
      </View>
      <Spacer size="L" />
      <Controller
        control={control}
        name={ContactFields.firstName}
        render={({field: {onChange, value, onBlur}}) => (
          <TextInput
            placeholder="Firstname"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            style={styles.textInput}
          />
        )}
      />
      <Spacer size="L" />
      <Controller
        control={control}
        name={ContactFields.lastName}
        render={({field: {onChange, value, onBlur}}) => (
          <TextInput
            placeholder="Lastname"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            style={styles.textInput}
          />
        )}
      />
      <Spacer size="L" />
      <Controller
        control={control}
        name={ContactFields.phoneNumber}
        render={({field: {onChange, value, onBlur}}) => (
          <TextInput
            placeholder="Mobile Number"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType="phone-pad"
            style={styles.textInput}
          />
        )}
      />
      <Spacer size="L" />
      <Controller
        control={control}
        name={ContactFields.email}
        render={({field: {onChange, value, onBlur}}) => (
          <TextInput
            placeholder="Email"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType="email-address"
            style={styles.textInput}
          />
        )}
      />
      <Spacer size="L" />
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
          style={[styles.button, !isValid && styles.buttonDisabled]}>
          <Text style={styles.buttonText}>{isEdit ? 'Update' : 'Add'}</Text>
        </Pressable>
        {isEdit && (
          <Pressable
            onPress={TriggerDeletePermission}
            disabled={!isValid}
            style={[styles.button, !isValid && styles.buttonDisabled]}>
            <Text style={styles.buttonText}>Delete</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {padding: 10},
  textInput: {borderWidth: 1, borderColor: 'gray', padding: 10},
  button: {
    backgroundColor: 'blue',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonDisabled: {backgroundColor: 'lightblue'},
  buttonText: {color: 'white', fontWeight: 'bold'},
  buttonContainer: {flexDirection: 'row', justifyContent: 'space-around'},
});

export default ContactForm;
