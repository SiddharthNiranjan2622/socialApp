import React, {useEffect, useState} from 'react';
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
import {useNavigationState} from '../context/NavigationContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getPost,
  getUserPost,
  selectPost,
  selectUserPost,
} from '../store/slices/postSlice';
import {getUserData, selectToken, selectUser} from '../store/slices/userSlice';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import {useStore} from 'react-redux';

function ProfileScreen({navigation}) {
  const disptach = useDispatch();
  const {navigationState, setNavigationState, userState, setuserState} =
    useNavigationState();
  const userSelector = useSelector(selectUser);
  const userPostSelector = useSelector(selectUserPost);
  const postSelector = useSelector(selectPost);

  const [loading, setloading] = useState(false);
  const store = useStore();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setNavigationState(true);
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    getUser();
    getPost();
  }, []);

  store.subscribe(() => {
    setloading(store.getState().postSlice.userPostLoading);
  });
  const getPost = async () => {
    const userToken = await AsyncStorage.getItem('token');
    disptach(getUserPost(userToken));
  };
  const getUser = async () => {
    const userToken = await AsyncStorage.getItem('token');
    disptach(getUserData(userToken));
  };
  const logOut = async () => {
    const userToken = await AsyncStorage.getItem('token');
    const headers = {
      authorization: userToken,
    };
    try {
      const res = await axios.post(
        'http://192.168.29.189:3000/api/user/log-out',
        null,
        {headers},
      );
      console.log('logout', res.data);
      if (res.data.success) {
        setuserState(null);
        await AsyncStorage.removeItem('token');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <React.Fragment>
        <View style={styles.header}>
          <View style={styles.profileImage}>
            {userSelector.user.profileImage ? (
              <Image
                source={{uri: userSelector.user.profileImage}}
                s
                style={{height: 100, width: 100, borderRadius: 70}}
              />
            ) : (
              <Icon name="person-circle-sharp" size={130} color="#cccccc" />
            )}
          </View>
          <View style={styles.userNumberDetails}>
            <Text
              style={{alignSelf: 'center', fontSize: 18, fontWeight: 'bold'}}>
              {userPostSelector.length}
            </Text>
            <Text style={{fontSize: 18}}>Posts</Text>
          </View>

          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('FAndF')}>
            {userSelector?.user?.followers ? (
              <View style={styles.userNumberDetails}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  {userSelector.user.followers.length}
                </Text>
                <Text style={{fontSize: 18}}>Followers</Text>
              </View>
            ) : (
              <View style={styles.userNumberDetails}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  0
                </Text>
                <Text style={{fontSize: 18}}>Following</Text>
              </View>
            )}
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('FAndF')}>
            {userSelector?.user?.following ? (
              <View style={styles.userNumberDetails}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  {userSelector.user.following.length}
                </Text>
                <Text style={{fontSize: 18}}>Following</Text>
              </View>
            ) : (
              <View style={styles.userNumberDetails}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  0
                </Text>
                <Text style={{fontSize: 18}}>Following</Text>
              </View>
            )}
          </TouchableWithoutFeedback>
        </View>
        <View style={{marginLeft: 20}}>
          <Text style={{fontSize: 17}}>{userSelector.user.fullName}</Text>
          <Text style={{fontSize: 16}}>{userSelector.user.bio}</Text>
        </View>
        <ProfileScreenEditButton
          onPress={logOut}
          textColor="white"
          backgroundColor="rgba(45,66,169,1)"
          buttonTitle="Logout"
        />
        <ProfileScreenEditButton
          buttonTitle="Edit"
          onPress={() => navigation.navigate('ProfileEdit')}
        />
        {!loading ? (
          <View style={{width: windowWidth}}>
            <FlatList
              data={postSelector}
              numColumns={4}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => {
                if (item.userData.email === userSelector.user.email) {
                  return (
                    <TouchableOpacity
                      onPress={() => navigation.navigate('UserPosts')}
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
                } else {
                  null;
                }
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
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  profileImage: {},
  userNumberDetails: {
    alignSelf: 'center',
    marginLeft: 5,
    marginRight: 5,
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

export default ProfileScreen;
