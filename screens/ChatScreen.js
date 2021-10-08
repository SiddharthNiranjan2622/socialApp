import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Button, LogBox, StyleSheet, Text, TextInput, View} from 'react-native';
import {ThemeProvider, SearchBar} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
import {useStore} from 'react-redux';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {io} from 'socket.io-client';
import SearchModel from '../components/SearchModel';
import UserList from '../components/UserList';
import messaging from '@react-native-firebase/messaging';
import {useNavigationState} from '../context/NavigationContext';
import {
  createConversation,
  getConversations,
  selectAllConversations,
} from '../store/slices/chatSlice';
import {searchUser} from '../store/slices/userSlice';

let timeOutId;

const debounce = (func, delay) => {
  return (...args) => {
    if (timeOutId) clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

function ChatScreen({navigation}) {
  const {navigationState, setNavigationState, userState, setuserState} =
    useNavigationState();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setNavigationState(true);
    });
    return unsubscribe;
  }, [navigation]);
  const [userData, setUserData] = useState();
  const dispatch = useDispatch();
  const [query, setQuery] = useState();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allConversations, setAllConversations] = useState();
  const allConversationsSelector = useSelector(selectAllConversations);
  const store = useStore();

  store.subscribe(() => {
    setLoading(store.getState().userSlice.searchUserLoading);

    if (store.getState().userSlice.searchedUser !== []) {
      // setVisible(true)
      setUserData(store.getState().userSlice.searchedUser.user);
    }
  });
  // const [chatMessage, setChatMessage] = useState('');
  // const socket = io('http://192.168.29.189:4000');

  // const submitChatMessage = () => {
  //   socket.emit('chat message', chatMessage);
  //   setChatMessage('');
  // };
  const handleSearch = async user => {
    // setQuery(user);
    const userToken = await AsyncStorage.getItem('token');

    dispatch(searchUser(userToken, user));
  };

  useEffect(() => {
    getAllCovo();
    requestUserPermission();
  }, []);
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

   
  }

  useEffect(() => {
    setAllConversations(allConversationsSelector.conversation);
    console.log('allconversations', allConversationsSelector.conversation);
    console.log('allconversations-------------------', allConversations);
  }, [allConversationsSelector]);
  const getPost = async () => {
    const userToken = await AsyncStorage.getItem('token');
    dispatch(getUserPost(userToken));
  };
  const getAllCovo = async () => {
    const token = await AsyncStorage.getItem('token');

    dispatch(getConversations(token));
  };
  const handleChange = user => {
    setVisible(true);
    setQuery(user);
    debounceSearch(user);
  };
  const debounceSearch = debounce(handleSearch, 500);

  const showmodel = () => {
    setVisible(true);
  };
  const navigateToUser = async item => {
    const token = await AsyncStorage.getItem('token');
    dispatch(createConversation(token, item._id));
    navigation.navigate('Message', item);
  };
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: visible ? '#e6e6e6' : '#ffffff'},
      ]}
      onStartShouldSetResponder={evt => {
        setVisible(false);
      }}>
      <SearchBar
        placeholder="User Name"
        lightTheme
        onChangeText={text => handleChange(text)}
        value={query}
        showLoading={loading}
        onFocus={() => {
          setVisible(true);
        }}
        onBlur={() => {
          setVisible(false);
          setUserData(null);
          // console.log('blur----------------------------')
        }}
        onClear={() => {
          setVisible(false);
          setUserData(null);
          setQuery(null);
        }}
        onCancel={() => {
          setVisible(false);
        }}
      />
      <SearchModel
        userData={userData}
        visible={visible}
        navigation={navigation}
      />
      <FlatList
        data={allConversations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <UserList
              fullName={item.members[1].fullName}
              profileImage={item.members[1].profileImage}
              onPress={() => navigateToUser(item.members[1])}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatScreen;
