import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useStore} from 'react-redux';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import AppForm from '../components/AppForm';
import {useNavigationState} from '../context/NavigationContext';
import messaging from '@react-native-firebase/messaging';
import AppTabNavigator from '../navigation/AppTabNavigator';
import {
  getUserData,
  selectToken,
} from '../store/slices/userSlice';

function MainScreen({naivgation}) {
  const tokenSelector = useSelector(selectToken);
  const dispatch = useDispatch();
  const [userData, setuserData] = useState();
  const store = useStore();
  const {userState, setuserState} = useNavigationState();

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('a new fcm message has arrived', remoteMessage);
    });
    return unsubscribe
  }, []);

  useEffect(() => {
    checkLoggedInUser();

    if (tokenSelector) {
      const token = tokenSelector;
      if (token.success) {
        setuserState(token);
        storeToken(token.token);
      }
    }
  }, [tokenSelector]);

  const getUser = async () => {
    const userToken = await AsyncStorage.getItem('token');
    dispatch(getUserData(userToken));
  };
  const checkLoggedInUser = async () => {
    // await AsyncStorage.removeItem('token')
    const userToken = await AsyncStorage.getItem('token');
    // dispatch(getUserData(userToken));
    if (userToken !== null) {
      setuserState(userToken);
      // console.log('from the main screen token',userToken)
    }
  };

  const storeToken = async token => {
    console.log('from the token recieved to storetoken', token);
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.log(error.message);
    }
    console.log('from the user token', token);
  };

  return (
    <NavigationContainer>
      {userState ? <AppTabNavigator /> : <AppForm />}
    </NavigationContainer>
    // <NavigationContainer>
    //   <AppTabNavigator />
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default MainScreen;
