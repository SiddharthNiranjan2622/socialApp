import React, {useEffect, useLayoutEffect, useRef} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import FormSelectorBtn from '../components/FormSelectorBtn';
import Icon from 'react-native-vector-icons/Ionicons';
import OtherFollowers from './OtherFollowers';
import OtherFollowing from './OtherFollowing';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function OtherFAndFScreen({navigation, route}) {
  const items = route.params;
  console.log('items-----------------------',items)
  // useLayoutEffect(() => {
    
  // }, []);

  const scrollToFollowers = () => {
    scrollView.current.scrollTo({x: windowWidth});
  };
  const scrollToFollowing = () => {
    scrollView.current.scrollTo({x: -windowWidth});
  };
  const animation = useRef(new Animated.Value(0)).current;

  const scrollView = useRef();
  const loginColorInterpolate = animation.interpolate({
    inputRange: [0, windowWidth],
    outputRange: ['rgba(45,66,169,1)', 'rgba(45,66,169,0.4)'],
  });
  const signUpColorInterpolate = animation.interpolate({
    inputRange: [0, windowWidth],
    outputRange: ['rgba(45,66,169,0.4)', 'rgba(45,66,169,1)'],
  });
  const navigateBack = () => {
    navigation.navigate('OtherUserProfile');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${items.fullName}`,

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
      <View style={{flexDirection: 'row'}}>
        <FormSelectorBtn
          title={`${
            items.followers ? items.followers.length : 0
          } Followers`}
          backgroundColor={loginColorInterpolate}
          style={styles.borderLeft}
          onPress={() =>
            scrollView.current.scrollTo(() =>
              scrollView.current.scrollTo({x: -windowWidth}),
            )
          }
        />
        <FormSelectorBtn
          title={`${
            items.following ? items.following.length : 0
          } Following`}
          backgroundColor={signUpColorInterpolate}
          style={styles.borderRight}
          onPress={() => scrollView.current.scrollTo({x: windowWidth})}
        />
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={scrollView}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: animation}}}],
          {useNativeDriver: false},
        )}>
        <OtherFollowers userData={items} />
        <ScrollView>
          <OtherFollowing userData={items} />
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  borderLeft: {},
  borderRight: {},
});
export default OtherFAndFScreen;
