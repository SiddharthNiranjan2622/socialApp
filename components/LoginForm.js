import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addUser, loginUser, selectUser} from '../store/slices/userSlice';
import FormContainer from './FormContainer';
import FormInput from './FormInput';
import messaging from '@react-native-firebase/messaging';
import FormSubmitButton from './FormSubmitButton';
import * as Yup from 'yup';
import {Formik} from 'formik';

const {width} = Dimensions.get('window');

function LoginForm(props) {
  const dispatch = useDispatch();
  const userSelector = useSelector(selectUser);

  const submitData = async(values, formikActions) => {
    const nToken = await messaging().getToken();

    dispatch(loginUser({...values,nToken}));
    // console.log({...values,nToken})
    // formikActions.resetForm();
    formikActions.setSubmitting(false);

    // console.log(userSelector);
  };
  const userInfo = {
    email: '',
    password: '',
  };
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid Email').required('email is required'),
    password: Yup.string().trim().min(8, 'password is too short'),
  });
  const logData = (values, formikActions) => {
    console.log(values);
    formikActions.reset();
    formikActions();
    formikActions.setSubmitting(false);
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
          const {email, password} = values;
          // console.log(values);
          return (
            <React.Fragment>
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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    width,
  },
});

export default LoginForm;
