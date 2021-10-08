import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {windowWidth} from '../utils/measurements';

function SenderMessage({message, isMyMessage}) {
  // console.log('is my message-------------',isMyMessage);
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isMyMessage
            ? 'rgba(45,66,169,1)'
            : 'rgba(45,66,169,0.4)',
          alignSelf: isMyMessage ? 'flex-end' : 'flex-start',
          marginRight: isMyMessage ? 10 : null,
          marginLeft: !isMyMessage ? 10 : null,
        },
      ]}>
      <Text
        style={[
          styles.text,
          {
            alignSelf: isMyMessage ? 'flex-end' : 'flex-start',
          },
        ]}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: (windowWidth * 70) / 100,
    minWidth: (windowWidth * 12) / 100,
    borderRadius: 5,
    marginTop: 10,
  },
  text: {
    color: '#ffffff',
    fontSize: 22,
    alignSelf: 'flex-end',
    marginLeft: 7,
    marginRight: 7,
  },
});

export default SenderMessage;
