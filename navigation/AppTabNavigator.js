import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import AddPostScreen from '../screens/AddPostScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {Image, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ChatScreen from '../screens/ChatScreen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ProfileScreenNavigator from './ProfileScreenNavigator';
import {useSelector} from 'react-redux';
import {tabNavigationState} from '../store/slices/navigationSlice';
import { useNavigationState } from '../context/NavigationContext';
import SearchScreenNavigator from './SearchScreenNavigator';
import ChatScreenNavigator from './ChatScreenNavigator';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity
    style={{
      top: -10,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={onPress}>
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'rgba(45,66,169,1)',
      }}>
      {children}
    </View>
  </TouchableOpacity>
);
const AppTabNavigator = () => {
  // const navigationState = useSelector(tabNavigationState);
  const {navigationState,setNavigationState} = useNavigationState()
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          bottom: 10,
          left: 7,
          right: 7,
          elevation: 3,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 70,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, size}) => {
            let iconColor;

            if (focused) {
              iconColor = 'rgba(45,66,169,1)';
            } else {
              iconColor = 'rgba(45,66,169,0.4)';
            }

            return (
              <View>
                <View style={{alignSelf: 'center'}}>
                  <Icon name="home" size={35} color={iconColor} />
                </View>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreenNavigator}
        options={{
          tabBarVisible: navigationState,

          tabBarIcon: ({focused, size}) => {
            let iconColor;

            if (focused) {
              iconColor = 'rgba(45,66,169,1)';
            } else {
              iconColor = 'rgba(45,66,169,0.4)';
            }

            return (
              <View>
                <View style={{alignSelf: 'center', marginRight: 8}}>
                  <Icon name="search" size={35} color={iconColor} />
                </View>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Add Post"
        component={AddPostScreen}
        options={{
          tabBarIcon: ({focused, size}) => {
            let iconColor;

            if (focused) {
              iconColor = 'rgba(45,66,169,1)';
            } else {
              iconColor = 'rgba(45,66,169,0.4)';
            }

            return (
              <View>
                <View style={{alignSelf: 'center'}}>
                  <Icon name="add-circle" size={60} color={iconColor} />
                </View>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreenNavigator}
        options={{
          tabBarVisible: navigationState,

          tabBarIcon: ({focused, size}) => {
            let iconColor;

            if (focused) {
              iconColor = 'rgba(45,66,169,1)';
            } else {
              iconColor = 'rgba(45,66,169,0.4)';
            }

            return (
              <View>
                <Icon
                  name="chatbox-ellipses-outline"
                  size={35}
                  color={iconColor}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreenNavigator}
        options={{
          tabBarVisible: navigationState,
          tabBarIcon: ({focused, size}) => {
            let iconColor;

            if (focused) {
              iconColor = 'rgba(45,66,169,1)';
            } else {
              iconColor = 'rgba(45,66,169,0.4)';
            }

            return (
              <View>
                <View style={{alignSelf: 'center'}}>
                  <Icon
                    name="person-circle-sharp"
                    size={35}
                    color={iconColor}
                  />
                </View>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
export default AppTabNavigator;
