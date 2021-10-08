import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Animated from 'react-native-reanimated';
import FormSubmitButton from '../components/FormSubmitButton';
import {windowHeight, windowWidth} from '../utils/measurements';
import BottomSheet from 'reanimated-bottom-sheet';
import {Overlay} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {addPost, getPost, selectPost} from '../store/slices/postSlice';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {selectToken, selectUser} from '../store/slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useStore} from 'react-redux';
import LottieView from 'lottie-react-native';

function AddPostScreen({navigation}) {
  const [visible, setVisible] = useState(false);
  const [imageData, setImageData] = useState('');
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const store = useStore();
  const [uploadProgress, setUploadProgress] = useState(1);
  const date = new Date().getTime();
  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Post Image</Text>
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
        onPress={() => sheetRef.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
  useEffect(() => {
    if (imageData !== null) {
      sheetRef.current.snapTo(1);
    }
  }, [imageData]);

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );
  const fall = new Animated.Value(1);

  const sheetRef = React.useRef(null);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setImageData(image.path);
      setVisible(false);
    });
  };
  const chooseFromLibrary = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
    }).then(image => {
      setImageData(image.path);
      setVisible(false);
    });
  };

  const uploadPostImage = async () => {
    if (!imageData) {
      alert('message kindly select image');
    }
    const formData = new FormData();
    // console.log(imageData)
    formData.append('postImage', {
      name: new Date() + '_postImage',
      uri: imageData,
      type: 'image/jpg',
    });
    formData.append('date', date);
    const userToken = await AsyncStorage.getItem('token');

    dispatch(addPost(formData, userToken));

    setImageData('');
  };
  // store.subscribe(() => {
  //   console.log(store.getState().postSlice.uploadProgress);
  //   if (store.getState().postSlice.uploadProgress === 1) {
  //     navigation.navigate('Home');
  //   }
  // });
  store.subscribe(()=>{
    setloading(store.getState().postSlice.loading)
  })

  return (
    <React.Fragment>
      <View style={styles.container}>
        <BottomSheet
          ref={sheetRef}
          snapPoints={[410, 0, 0]}
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
              <TouchableOpacity
                style={styles.image}
                onPress={() => sheetRef.current.snapTo(0)}>
                <View>
                  {!imageData ? (
                    <Icon name="camera" size={100} color="black" />
                  ) : (
                    <Image source={{uri: imageData}} style={styles.image} />
                  )}
                </View>
              </TouchableOpacity>
              <FormSubmitButton
                onPress={uploadPostImage}
                title="Upload Post"
                width={(windowWidth * 90) / 100}
              />
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
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    marginTop: 20,
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 60) / 100,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },
  overlayStyle: {
    position: 'absolute',
    bottom: 0,
    width: windowWidth,
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  overlayComponents: {
    width: (windowWidth * 90) / 100,
    backgroundColor: 'rgba(42,101,219,0.8)',
    height: 50,
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center',
  },
  overlayText: {
    fontSize: 25,
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'white',
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

export default AddPostScreen;
