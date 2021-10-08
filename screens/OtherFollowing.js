import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import UserList from '../components/UserList';
import {selectFAndFData} from '../store/slices/userSlice';
import {windowWidth} from '../utils/measurements';


function OtherFollowing({userData}) {


  return (
    <View style={styles.container}>
      <FlatList
        nestedScrollEnabled
        data={userData.following}
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

export default OtherFollowing;
