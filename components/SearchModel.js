import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {createConversation} from '../store/slices/chatSlice';
import UserList from './UserList';

function SearchModel({visible, userData, navigation}) {
  if (!visible) return null;
  const dispatch = useDispatch();
  console.log(userData);
  // if (visible && userData.length === 0 && !notFound) return null;

  console.log('userdata----------', userData);
  const navigateToUser = async (item) => {
    const token = await AsyncStorage.getItem('token');
    dispatch(createConversation(token, item._id));
    navigation.navigate('Message', item);
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={userData}
        keyboardShouldPersistTaps={'always'}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <UserList
            profileImage={item.profileImage}
            fullName={item.fullName}
            onPress={() => navigateToUser(item)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    maxHeight: '40%',
    elevation: 3,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default SearchModel;
