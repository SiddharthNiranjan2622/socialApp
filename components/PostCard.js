import React, {useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {windowHeight, windowWidth} from '../utils/measurements';
import LottieView from 'lottie-react-native';
import DoubleClick from 'react-native-double-click';
import Icon from 'react-native-vector-icons/Ionicons';

function PostCard({imageUri, profileImage, userName}) {
  const [likes, setLikes] = useState(0);

  const animation = useRef(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (isLiked) {
      animation.current.play(14, 44);
      setLikes(likes + 1);
    } else {
      animation.current.play(60, 60);
      setLikes(likes + 1);
    }
  }, [isLiked]);
  const toggleLike = () => {
    setIsLiked(!isLiked);
  };
  return (
    // <DoubleClick onClick={toggleLike}>
    <View style={styles.container}>
      {imageUri ? (
        <React.Fragment>
          <View style={styles.header}>
            {profileImage ? (
              <Image
                source={{uri: profileImage}}
                style={{height: 45, width: 45, borderRadius: 45,marginRight:10}}
              />
            ) : (
              <View style={{marginRight:10}}>
              <Icon name="person-circle-sharp" size={45} color="#cccccc" />
              </View>
            )}
            {userName ? (
              <Text
                style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 16}}>
                {userName}
              </Text>
            ) : null}
          </View>
          <View>
            <Image
              source={{
                uri: imageUri ? imageUri : null,
              }}
              style={styles.image}
            />
          </View>
        </React.Fragment>
      ) : null}

      <TouchableOpacity onPress={toggleLike} style={{flexDirection: 'row'}}>
        <LottieView
          ref={animation}
          source={require('../assets/likeHeart.json')}
          style={styles.heart}
          autoPlay={false}
          loop={false}
        />
      </TouchableOpacity>
    </View>
    // </DoubleClick>
  );
}

const styles = StyleSheet.create({
  container: {
    height: (windowHeight * 66) / 100,
    width: (windowWidth * 99) / 100,
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    paddingBottom:100
  },
  image: {
    height: '100%',
    width: '100%',
    // resizeMode: 'contain',
    alignSelf: 'center',
    borderRadius: 7,
  },
  heart: {
    width: 50,
    height: 50,
  },
  header: {
    flexDirection: 'row',
    marginLeft: 5,
    marginBottom: 5,
    marginTop: 5,
  },
});

export default PostCard;
