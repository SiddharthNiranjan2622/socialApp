import React, {useRef} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
} from 'react-native';
import FormHeader from './FormHeader';
import FormSelectorBtn from './FormSelectorBtn';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function AppForm(props) {
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

  return (
    <View style={styles.container}>
      <FormHeader
        leftHeading="FS"
        rightHeading=" Social"
        subHeading="Youtube Task manager "
      />
      <View
        style={{flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20}}>
        <FormSelectorBtn
          title="Login"
          backgroundColor={loginColorInterpolate}
          style={styles.borderLeft}
          onPress={() =>
            scrollView.current.scrollTo(() =>
              scrollView.current.scrollTo({x: -windowWidth}),
            )
          }
        />
        <FormSelectorBtn
          title="Sign Up"
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
        <LoginForm />
        <ScrollView>
          <SignUpForm />
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  borderLeft: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  borderRight: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});
export default AppForm;
