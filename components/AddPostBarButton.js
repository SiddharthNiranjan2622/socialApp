import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AddPostBarButton = ({onPress}) => (
  <TouchableOpacity
    style={{
      top: -10,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={onPress}
    >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'rgba(45,66,169,1)',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Icon name="add" size={50} color="white" />
    </View>
  </TouchableOpacity>
);

export default AddPostBarButton;
