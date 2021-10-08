import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {windowWidth} from '../utils/measurements';

function EditScreenInput({title,keyboardType,editable,value,onChangeText,placeholder}) {
  return (
    <View style={styles.container}>
    <Text style={{color:'#666666',marginBottom:-10}}>{title}</Text>
      <TextInput onChangeText={text =>onChangeText(text)} placeholder={placeholder} defaultValue={value} editable={editable} underlineColorAndroid="transparent" accessible={false} style={styles.textInput} keyboardType={keyboardType} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  alignSelf:'center',
  marginBottom:15
  },
  textInput: {
    fontSize: 18,
    borderBottomWidth: 2,
    width:windowWidth*90/100,
    paddingBottom:2
  },
});

export default EditScreenInput;
