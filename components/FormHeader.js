import React from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';

const FormHeader = ({
  leftHeading,
  rightHeading,
  subHeading,
//   leftHeaderTranslateX = 40,
//   rightHeaderTranslateY = -20,
//   rightHeaderOpacity = 0,
}) => {
  return (
    <React.Fragment>
      <View style={styles.container}>
        <Animated.Text
          style={[
            styles.heading,
          ]}
        >
          {leftHeading}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.heading,
            
          ]}
        >
          {rightHeading}
        </Animated.Text>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: { fontSize: 45, fontWeight: 'bold', color: 'rgba(45,66,169,1)',marginBottom:15 },
  subHeading: { fontSize: 18, color: '#1b1b33', textAlign: 'center' },
});

export default FormHeader;