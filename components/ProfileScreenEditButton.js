import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {windowWidth} from '../utils/measurements';

function ProfileScreenEditButton({onPress,backgroundColor,textColor,buttonTitle,disabled}) {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.container,{backgroundColor:backgroundColor}]}>
      <Text style={{alignSelf: 'center', fontSize: 20,color:textColor}}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: (windowWidth * 95) / 100,
    alignSelf: 'center',
    alignItems:'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginTop:15,
    marginBottom:15
  },
});

export default ProfileScreenEditButton;
