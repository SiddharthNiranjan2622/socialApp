import React, {useLayoutEffect, useRef} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import Followers from '../components/Followers';
import Following from '../components/Following';
import FormHeader from '../components/FormHeader';
import FormSelectorBtn from '../components/FormSelectorBtn';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import {useNavigationState} from '../context/NavigationContext';
import {selectUser} from '../store/slices/userSlice';
import Icon from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function FAndFScreen({navigation}) {
  const userSelector = useSelector(selectUser);
  // console.log('userselector-------------------------', userSelector);
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
      <View style={{flexDirection: 'row'}}>
        <FormSelectorBtn
          title={`${userSelector.user.followers.length} Followers`}
          backgroundColor={loginColorInterpolate}
          style={styles.borderLeft}
          onPress={() =>
            scrollView.current.scrollTo(() =>
              scrollView.current.scrollTo({x: -windowWidth}),
            )
          }
        />
        <FormSelectorBtn
          title={`${userSelector.user.following.length} Following`}
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
        <View>
          <Followers />
        </View>
        <ScrollView>
          <View>
            <Following />
          </View>
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
export default FAndFScreen;
