import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigationState} from '../context/NavigationContext';
import Icon from 'react-native-vector-icons/Ionicons';
import MessageInput from '../components/MessageInput';
import {useStore} from 'react-redux';
import {useSelector} from 'react-redux';
import {
  createMessage,
  getMessages,
  selectConversation,
  selectMessages,
} from '../store/slices/chatSlice';
import {io} from 'socket.io-client';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SenderMessage from '../components/SenderMessage';
import RecieverMessage from '../components/RecieverMessage';
import {selectUser} from '../store/slices/userSlice';

function MessageScreen({navigation, route}) {
  const {navigationState, setNavigationState, userState, setuserState} =
    useNavigationState();
  const [previousMessages, setPreviousMessages] = useState();
  const [chatUsers, setChatUsers] = useState();
  const userSelector = useSelector(selectUser);
  const [conversation, setConversation] = useState();
  const dispatch = useDispatch();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const messageSelector = useSelector(selectMessages);
  const [message, setMessage] = useState('');
  const items = route.params;
  // console.log('items--------', items);
  const store = useStore();
  const socket = useRef();

  useEffect(() => {
    socket.current = io('ws://192.168.29.189:4000');
    socket.current.on('getMessage', data => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage
      ? setPreviousMessages(prev => [...prev, arrivalMessage])
      : null;
  }, [arrivalMessage]);

  useEffect(() => {
    socket.current.emit('addUser', userSelector.user._id);
    socket.current.on('getUsers', users => {
      // console.log('chatUser-------------', users);
      setChatUsers(users);
    });
  }, [userSelector]);

  // store.subscribe(()=>{
  //   console.log('chatSlice-----------------',store.getState().chatSlice.message)
  // })
  useLayoutEffect(() => {
    setNavigationState(false);
  }, [navigation]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {items.profileImage ? (
            <Image
              source={{uri: items.profileImage}}
              style={{height: 35, width: 35, borderRadius: 35}}
            />
          ) : (
            <Icon name="person-circle-sharp" size={35} color="#cccccc" />
          )}

          <Text style={{marginLeft: 10, fontWeight: 'bold', fontSize: 18}}>
            {items.fullName}
          </Text>
        </View>
      ),

      headerLeft: () => (
        <View style={{marginLeft: 13.5}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  const conversationSelector = useSelector(selectConversation);

  useEffect(() => {
    console.log(
      'conversationselector ------------------',
      conversationSelector,
    );
    if (conversationSelector?.success) {
      console.log('success:true-----------', conversationSelector);

      getMessagesUesr(conversationSelector.conversation._id);
      setConversation(conversationSelector.conversation);
    }
  }, [conversationSelector]);

  const getMessagesUesr = async conversationId => {
    const token = await AsyncStorage.getItem('token');
    // console.log('token-------------       ',token)
    dispatch(getMessages(token, conversationId));
  };

  useEffect(() => {
    setPreviousMessages(messageSelector?.messages);
  }, [messageSelector]);

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem('token');
    // console.log('conversation----------------------',conversation)
    const messageToSend = {
      conversationId: conversation._id,
      message: message,
      nTitle: userSelector.user.fullName,
      nBody: message,
      nToken: items.nToken,
    };

    const receiverId = chatUsers.find(
      member => member.userId !== userSelector.user._id,
    );
    console.log('chatusers----------------', chatUsers);
    console.log('receiverid---------------', receiverId);

    socket.current.emit('sendMessage', {
      senderId: userSelector.user._id,
      receiverId: receiverId?.userId,
      text: message,
    });
    dispatch(createMessage(token, messageToSend));
    setMessage('');
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <FlatList
        data={previousMessages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          if (item.sender === userSelector.user._id) {
            return <SenderMessage message={item.text} isMyMessage={true} />;
          } else {
            return <SenderMessage message={item.text} isMyMessage={false} />;
          }
        }}
      />
      <View style={styles.messageInput}>
        <MessageInput
          value={message}
          onChangeText={text => setMessage(text)}
          onPress={handleSubmit}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  messageInput: {
    position: 'absolute',
    bottom: 10,
    height: 50,
  },
});

export default MessageScreen;
