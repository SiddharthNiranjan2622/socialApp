import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import ProfileEditScreen from '../screens/ProfileEditScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UserPostsScreen from '../screens/UserPostsScreen';
import FAndFScreen from '../screens/FAndFScreen';

const Stack = createStackNavigator();

const ProfileScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown:false}} />
      <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} options={{title:'Edit'}}  />
      <Stack.Screen name="UserPosts" component={UserPostsScreen} options={{title:"Posts"}} />
      <Stack.Screen name="FAndF" component={FAndFScreen} options={{title:"Posts"}} />
    </Stack.Navigator>
  );
};

export default ProfileScreenNavigator