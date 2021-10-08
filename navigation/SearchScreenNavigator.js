import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import OtherFAndFScreen from '../screens/OtherFAndFScreen';
import OtherUserPostScreen from '../screens/OtherUserPostScreen';
import OtherUserProfile from '../screens/OtherUserProfile';
import SearchScreen from '../screens/SearchScreen';

const Stack = createStackNavigator()

const SearchScreenNavigator = () =>{
    return (
        <Stack.Navigator>
        <Stack.Screen component={SearchScreen} name="Search" options={{headerShown:false}} />
        <Stack.Screen component={OtherUserProfile} name="OtherUserProfile" />
        <Stack.Screen component={OtherUserPostScreen} name="OtherUserPostScreen" />
        <Stack.Screen component={OtherFAndFScreen} name="OtherFAndFScreen" />
        </Stack.Navigator>
    )
}
export default SearchScreenNavigator