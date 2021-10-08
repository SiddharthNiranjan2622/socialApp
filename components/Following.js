import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {selectFAndFData} from '../store/slices/userSlice';
import {windowWidth} from '../utils/measurements';
import UserList from './UserList';

function Following(props) {
  const FAndFSelector = useSelector(selectFAndFData);

  return (
    <View style={styles.container}>
      <FlatList
        nestedScrollEnabled
        data={FAndFSelector.following}
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

export default Following;
