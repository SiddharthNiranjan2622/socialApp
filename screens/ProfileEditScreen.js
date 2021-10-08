import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigationState} from '../context/NavigationContext';
import EditScreenInput from '../components/EditScreenInput';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import {
  getUserData,
  selectUser,
  updateUserProfileData,
} from '../store/slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useStore} from 'react-redux';
import LottieView from 'lottie-react-native';
  
function ProfileEditScreen({navigation}) {
  const userSelector = useSelector(selectUser);
  const sheetRef = React.useRef(null);
  const dispatch = useDispatch();
  const {navigationState, setNavigationState} = useNavigationState();
  const [editable, setEditable] = useState(true);
  const profileImage = useRef(userSelector.user.profileImage);
  const store = useStore();
  const [loading, setloading] = useState(false);
  const [ddProfileImage, setddProfileImage] = useState(
    userSelector.user.profileImage,
  );
  const fullName = useRef(userSelector.user.fullName);
  const bio = useRef(userSelector.user.bio);
  const [newUserInfo, setNewUserInfo] = useState({
    fullName: '',
    bio: '',
  });
  const handleSubmit = (value, fieldName) => {
    setNewUserInfo({...newUserInfo, [fieldName]: value});
    // console.log(newUserInfo)
  };
  const updateUserData = async () => {
    const userToken = await AsyncStorage.getItem('token');
    // console.log('profileeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',profileImage.current)
    const formData = new FormData();
    formData.append('profileImage', {
      name: new Date() + '_postImage',
      uri: profileImage.current,
      type: 'image/jpg',
    });
    formData.append('fullName', fullName.current);
    formData.append('bio', bio.current);
    console.log(formData);
    dispatch(updateUserProfileData(formData, userToken));
  };
  useEffect(() => {
    if (profileImage.current !== null) {
      sheetRef.current.snapTo(1);
      setEditable(true);
    }
  }, [profileImage.current]);

  store.subscribe(() => {
    setloading(store.getState().userSlice.loading);
  });
  const takePhotoFromCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 500,
        height: 500,
        cropping: true,
      });
      // profileImage = image.path
      // setProfileImage(image.path)
      profileImage.current = image.path;
      setddProfileImage(image.path);
    } catch (error) {
      alert('you cancelled the Photo');
    }
  };
  const chooseFromLibrary = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 500,
        height: 500,
        cropping: true,
      });

      profileImage.current = image.path;
      setddProfileImage(image.path);
    } catch (error) {
      alert('you cancelled Image Selection');
    }
  };

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={chooseFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => {
          setEditable(true);
          sheetRef.current.snapTo(1);
        }}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );
  const fall = new Animated.Value(1);

  const navigateBack = async () => {
    navigation.navigate('Profile');
    const userToken = await AsyncStorage.getItem('token');
    dispatch(getUserData(userToken));
  };

  useEffect(() => {
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
      headerRight: () => (
        <View style={{marginRight: 10}}>
          <TouchableOpacity onPress={updateUserData}>
            <Icon name="checkmark-sharp" size={35} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);
  const checkData = () => {
    console.log(fullName);
    console.log(bio);
    console.log(profileImage);
  };
  const handleFullName = value => {
    fullName.current = value;
  };
  const handleBio = value => {
    bio.current = value;
  };
  const handleProfileImage = value => {
    profileImage = value;
  };
  return (
    <View style={styles.container}>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[350, 0, 0]}
        borderRadius={10}
        initialSnap={1}
        renderContent={renderInner}
        renderHeader={renderHeader}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      {!loading ? (
        <React.Fragment>
          <Animated.View
            style={{
              margin: 20,
              opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
            }}>
            <View style={styles.header}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setEditable(false);
                  sheetRef.current.snapTo(0);
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}>
                  {ddProfileImage ? (
                    <Image
                      source={{uri: profileImage.current}}
                      style={{height: 130, width: 130, borderRadius: 65}}
                    />
                  ) : (
                    <Icon
                      name="person-circle-sharp"
                      size={130}
                      color="#b3b3b3"
                    />
                  )}
                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    Change Profile Photo
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.input}>
              <EditScreenInput
                title="Name"
                editable={editable}
                value={fullName.current}
                onChangeText={value => handleFullName(value)}
              />
              <EditScreenInput
                title="Bio"
                editable={editable}
                value={bio.current}
                onChangeText={value => handleBio(value)}
              />
            </View>
          </Animated.View>
        </React.Fragment>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginTop: 20,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.4,
    elevation: 3,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: 'rgba(45,66,169,1)',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ProfileEditScreen;
