import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileScreenEditButton from '../components/ProfileScreenEditButton';
import {windowWidth} from '../utils/measurements';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getPost,
  getUserPost,
  selectPost,
  selectUserPost,
} from '../store/slices/postSlice';
import {
  followUser,
  getUserData,
  selectToken,
  selectUser,
  selectOtherFAndFData,
  getOtherUserFAndFData,
} from '../store/slices/userSlice';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import {useStore} from 'react-redux';
import {useNavigationState} from '../context/NavigationContext';

function OtherUserProfile({navigation, route}) {
  const OtherFAndF = useSelector(selectOtherFAndFData);

  // console.log('otherfandf ---------------------------',OtherFAndF)
  const items = route.params;
  // console.log('items-------------------------', items);
  const dispatch = useDispatch();
  const [followUserLoading, setFollowUserLoading] = useState(false);

  // const { userState, setuserState } = useNavigationState();
  const userSelector = useSelector(selectUser);
  const [followers, setFollowers] = useState();
  const [following, setfollowing] = useState();
  // console.log('userselector -----------------------', userSelector);
  const [followed, setFollowed] = useState(false);
  const userPostSelector = useSelector(selectUserPost);
  const postSelector = useSelector(selectPost);
  const {navigationState, setNavigationState} = useNavigationState();
  // console.log('navigationState-----------------------',navigationState)

  const [loading, setloading] = useState(false);
  const store = useStore();

  useEffect(() => {
    // getFAndFData()
    getUser();
    getPost();
  }, []);
  // useLayoutEffect(() => {

  // }, [input])
  useEffect(() => {
    getFAndFData();
  }, [OtherFAndF]);
  const getFAndFData = async () => {
    // const userToken = await AsyncStorage.getItem('token');
    if (OtherFAndF !== null && OtherFAndF !== []) {
      // console.log(
      //   'otherfandf-----------------------',
      //   OtherFAndF.user.following,
      // );
      setfollowing(items.following);
      setFollowers(items.followers);
      checkFollowed(items.followers);
      // console.log('following----------------------------------',following)
    }
  };
  const checkFollowed = following => {
    console.log('following-------------------',following)
    if (!following && following === []) return null;

    if (following.some(following => following._id === userSelector.user._id)) {
      // console.log('following------------------------',following[0])
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  };
  // setTimeout(() => {
  //   console.log('followed-------------------------',followed);
  // }, 10000);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${items.fullName}`,

      headerLeft: () => (
        <View style={{marginLeft: 13.5}}>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Icon name="arrow-back" size={30} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  store.subscribe(() => {
    setloading(store.getState().postSlice.userPostLoading);
    setFollowUserLoading(store.getState().userSlice.userFollowLoading);
  });
  const getPost = async () => {
    const userToken = await AsyncStorage.getItem('token');
    dispatch(getUserPost(userToken));
  };
  const getUser = async () => {
    const userToken = await AsyncStorage.getItem('token');
    dispatch(getUserData(userToken));
  };
  const followUserdispatch = async () => {
    const userToken = await AsyncStorage.getItem('token');
    console.log(items);
    dispatch(followUser(userToken, items._id));
    dispatch(getOtherUserFAndFData(userToken, items._id));
  };

  return (
    <View style={styles.container}>
      <React.Fragment>
        <View style={styles.header}>
          <View style={styles.profileImage}>
            {items.profileImage ? (
              <Image
                source={{uri: items.profileImage}}
                style={{height: 100, width: 100, borderRadius: 70}}
              />
            ) : (
              <Icon name="person-circle-sharp" size={130} color="#cccccc" />
            )}
          </View>
          <View style={styles.userNumberDetails}>
            <Text
              style={{alignSelf: 'center', fontSize: 18, fontWeight: 'bold'}}>
              {items.posts.length}
            </Text>
            <Text style={{fontSize: 18}}>Posts</Text>
          </View>

          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('OtherFAndFScreen', items);
            }}>
            <View style={styles.userNumberDetails}>
              {followers ? (
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  {followers.length}
                </Text>
              ) : (
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  0
                </Text>
              )}

              <Text style={{fontSize: 18}}>Followers</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('OtherFAndFScreen', items);
            }}>
            <View style={styles.userNumberDetails}>
              {following ? (
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  {following.length}
                </Text>
              ) : (
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  0
                </Text>
              )}
              <Text style={{fontSize: 18}}>Following</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{marginLeft: 20}}>
          <Text style={{fontSize: 17}}>{items.fullName}</Text>
          <Text style={{fontSize: 16}}>
            {items.bio ? items.bio : items.bio}
          </Text>
        </View>
        {!followed ? (
          <ProfileScreenEditButton
            buttonTitle="Follow"
            onPress={followUserdispatch}
          />
        ) : (
          <ProfileScreenEditButton disabled={true} buttonTitle="Followed" />
        )}

        {!loading ? (
          <View style={{width: windowWidth}}>
            <FlatList
              data={items.posts}
              numColumns={4}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('OtherUserPostScreen', items)
                    }
                    // style={styles.postSection}
                    style={{padding: 1}}>
                    <Image
                      style={styles.postImageStyle}
                      source={{
                        uri: item.image,
                      }}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <LottieView
              source={require('../assets/loader.json')}
              autoPlay
              loop
              autoSize
            />
          </View>
        )}
      </React.Fragment>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  profileImage: {},
  userNumberDetails: {
    alignSelf: 'center',
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
  },
  numberOfPost: {
    flexDirection: 'column',
  },

  postImageStyle: {
    height: (windowWidth * 1) / 3,
    width: (windowWidth * 1) / 3,
  },
});

export default OtherUserProfile;
