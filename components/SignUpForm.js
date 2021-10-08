import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {registerUser, selectUser} from '../store/slices/userSlice';
import FormContainer from './FormContainer';
import FormInput from './FormInput';
import FormSubmitButton from './FormSubmitButton';
import messaging from '@react-native-firebase/messaging';
import * as Yup from 'yup';
import {Formik} from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('window');

function SignUpForm(props) {
  const dispatch = useDispatch();
  const userSelector = useSelector(selectUser);

  const submitData = async (values, formikActions) => {
    // const nToken = await AsyncStorage.getItem('nToken');
    const nToken = await messaging().getToken();
    console.log(nToken);
    dispatch(registerUser({...values, nToken}));
    console.log({...values, nToken});
    formikActions.setSubmitting(false);

    console.log(userSelector);
  };

  const userInfo = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const validationSchema = Yup.object({
    fullName: Yup.string()
      .trim()
      .min(3, 'invalid name')
      .required('Name is required'),
    email: Yup.string().email('Invalid Email').required('email is required'),
    password: Yup.string().trim().min(8, 'password is too short'),
    confirmPassword: Yup.string().equals(
      [Yup.ref('password'), null],
      'password does not match',
    ),
  });
  const logData = async (values, formikActions) => {
    setTimeout(() => {
      // console.log(values);
      formikActions.resetForm();
      formikActions.setSubmitting(false);
    }, 3000);
  };

  return (
    <FormContainer>
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={submitData}>
        {({
          values,
          handleChange,
          errors,
          handleBlur,
          touched,
          isSubmitting,
          handleSubmit,
        }) => {
          const {fullName, email, password, confirmPassword} = values;
          // console.log(values);
          return (
            <React.Fragment>
              <FormInput
                label="Full Name"
                placeholder="Full Name"
                onChangeText={handleChange('fullName')}
                value={fullName}
                onBlur={handleBlur('fullName')}
                error={touched.fullName && errors.fullName}
              />
              <FormInput
                label="Email"
                placeholder="example@gmail.com"
                onChangeText={handleChange('email')}
                value={email}
                onBlur={handleBlur('email')}
                error={touched.email && errors.email}
              />
              <FormInput
                label="Password"
                placeholder="********"
                onChangeText={handleChange('password')}
                value={password}
                onBlur={handleBlur('password')}
                error={touched.password && errors.password}
                secureTextEntry={true}
              />
              <FormInput
                label="Confirm Password"
                placeholder="********"
                onChangeText={handleChange('confirmPassword')}
                value={confirmPassword}
                onBlur={handleBlur('confirmPassword')}
                error={touched.confirmPassword && errors.confirmPassword}
                secureTextEntry={true}
              />

              <FormSubmitButton
                submitting={isSubmitting}
                title="Submit"
                back
                onPress={handleSubmit}
              />
            </React.Fragment>
          );
        }}
      </Formik>
    </FormContainer>
  );
}
// <FormSubmitButton title="check data" back onPress={checkData} />

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width,
  },
});

export default SignUpForm;
