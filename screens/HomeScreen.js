import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useStore} from 'react-redux';
import {useSelector} from 'react-redux';
import AddPostBarButton from '../components/AddPostBarButton';
import FormSubmitButton from '../components/FormSubmitButton';
import PostCard from '../components/PostCard';
import {addPost, getPost, getUserPost, selectPost} from '../store/slices/postSlice';
import {getUserData, selectToken, selectUser} from '../store/slices/userSlice';

function HomeScreen({navigation}) {
  const postSelector = useSelector(selectPost);
  const dispatch = useDispatch();
  const tokenSelector = useSelector(selectToken);
  const userSelector = useSelector(selectUser);
  const [post, setPost] = useState();
  const store = useStore();
  const [loading, setloading] = useState();
  const [loaded, setloaded] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    fetchPosts();
  }, []);
  const fetchPosts = async () => {
    // await AsyncStorage.removeItem('token')
    const userToken = await AsyncStorage.getItem('token');
    console.log(userToken)
    dispatch(getPost(userToken));
    dispatch(getUserData(userToken));
    // disptach(getUserPost(userToken));
  };

  useEffect(() => {
    if(postSelector.length ===0 ) return setloaded(false)
    console.log('postselector',postSelector)
    setloaded(true)
    setPost(postSelector);
  }, [postSelector]);
  const refreshList = async () => {
    refreshing = true;
    const userToken = await AsyncStorage.getItem('token');
    dispatch(getPost(userToken));
  };
  return (
    <View style={styles.container}>
      {loaded ? (
        <FlatList
          refreshing={refreshing}
          onRefresh={fetchPosts}
          data={post}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <PostCard
              imageUri={item.image}
              userName={item.userData.fullName}
              profileImage={item.userData.profileImage}
            />
          )}
        />
      ) : (
        <View style={{alignSelf:'center'}}>
        
        <FormSubmitButton title="reload" onPress={fetchPosts} width={100} />
        </View>
      )}
    </View>
  );
}
// <FormSubmitButton title="getposts" onPress={getPosts} />;
// <Text>{userSelector.user.fullName}</Text>
// <Text>{userSelector.user.email}</Text>

const styles = StyleSheet.create({
  container: {},
});

export default HomeScreen;
