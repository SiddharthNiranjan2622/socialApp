import React, {useLayoutEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import PostCard from '../components/PostCard';
import {selectUserPost} from '../store/slices/postSlice';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigationState} from '../context/NavigationContext';

function UserPostsScreen({navigation}) {
  const userPostSelector = useSelector(selectUserPost);
  const navigateBack = async () => {
    navigation.navigate('Profile');
  };
  const {navigationState, setNavigationState, userState, setuserState} =
    useNavigationState();
  useLayoutEffect(() => {
    setNavigationState(false);
  }, [navigation]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Edit Profile',

      headerLeft: () => (
        <View style={{marginLeft: 13.5}}>
          <TouchableOpacity onPress={navigateBack}>
            <Icon name="arrow-back" size={30} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={userPostSelector}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <PostCard
            imageUri={item.image}
            userName={item.userData.fullName}
            profileImage={item.userData.profileImage}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default UserPostsScreen;
