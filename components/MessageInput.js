import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {windowWidth} from '../utils/measurements';

function MessageInput({onChangeText, onPress,value}) {
  
  return (
    <View style={styles.container}>
      <View style={styles.messageInput}>
        <TextInput
          
          placeholder="Message"
          style={{fontSize: 18}}
          value={value}
          onChangeText={text => onChangeText(text)}
        />
      </View>
      <TouchableOpacity style={styles.sendIcon} onPress={onPress}>
        <Icon name="send" size={30} color="rgba(45,66,169,1)" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  messageInput: {
    width: (windowWidth * 88) / 100,
    backgroundColor: '#ffffff',
    height: 45,
    borderRadius: 10,
    elevation: 3,
    alignSelf: 'flex-start',
    marginLeft: 5,
    // marginRight:5
  },
  sendIcon: {
    alignSelf: 'center',
    marginLeft: 5,
  },
});

export default MessageInput;
