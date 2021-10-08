import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {windowWidth} from '../utils/measurements';

function RecieverMessage(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium
        illo delectus exercitationem placeat dolor, odio rem quos soluta quasi,
        accusantium est nesciunt
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(45,66,169,0.6)',
    maxWidth: (windowWidth * 70) / 100,
    // height: 30,
    minWidth: (windowWidth * 20) / 100,
    borderRadius: 5,
    marginTop:10,
    marginLeft:10
  },
  text: {
    color: '#ffffff',
    fontSize: 22,
    alignSelf: 'flex-start',
    marginRight: 5,
  },
});

export default RecieverMessage;
