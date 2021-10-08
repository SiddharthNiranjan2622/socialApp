import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import { Dimensions } from 'react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;   

const FormInput = props => {
  const {placeholder, label, error} = props;
  return (
    <React.Fragment>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}>
        <Text style={{fontWeight: 'bold'}}>{label}</Text>
        {error ? (
          <Text style={{color: 'red', fontSize: 16,fontWeight:'bold'}}>{error}</Text>
        ) : null}
      </View>
      <TextInput {...props} placeholder={placeholder} style={styles.input} />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingLeft: 10,
        width: 87 / 100 * windowWidth,
        borderRadius: 15,
        height: 50,
        borderColor: '#FFFFFF',
        backgroundColor: '#FFFFFF',
        fontSize: 18,
        elevation: 3,
        marginBottom:10
  },
});

export default FormInput;
