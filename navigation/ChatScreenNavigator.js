import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ChatScreen from '../screens/ChatScreen';
import MessageScreen from '../screens/MessageScreen';

const Stack = createStackNavigator();

const ChatScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Chat" component={ChatScreen} options={{headerShown:false}} />
      <Stack.Screen name="Message" component={MessageScreen} />
    </Stack.Navigator>
  );
};
export default ChatScreenNavigator
