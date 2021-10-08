import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useStore} from 'react-redux';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {
  getOtherUserFAndFData,
  getUserFAndFData,
  selectFAndFData,
  selectOtherFAndFData,
  selectUser,
} from '../store/slices/userSlice';
import {windowWidth} from '../utils/measurements';
import UserList from '../components/UserList';

function OtherFollowers({userData}) {
 

  return (
    <View style={styles.container}>
      <FlatList
        nestedScrollEnabled
        data={userData.followers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <UserList fullName={item.fullName} profileImage={item.profileImage} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    backgroundColor: '#ffffff',
  },
});

export default OtherFollowers;
